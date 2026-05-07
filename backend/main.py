import asyncio
from fastapi import FastAPI, BackgroundTasks, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uvicorn
from datetime import datetime

from database import SessionLocal, engine, get_db
import models

# Botlarımızı çekiyoruz
from bots.idata_bot import run_visa_bot as run_idata_bot
from bots.vfs_bot import run_vfs_bot

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# --- CORS AYARI (KRİTİK DÜZELTME) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tüm adreslerden (IP'lerden) gelen isteklere izin veriyoruz
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- KAYIT VE GİRİŞ SİSTEMİ ---

from pydantic import BaseModel
from typing import Optional

class UserRegister(BaseModel):
    email: str
    password: str
    fullName: Optional[str] = None
    full_name: Optional[str] = None
    name: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

@app.post("/api/register")
def register_user(user_data: UserRegister, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user_data.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Bu e-posta zaten kayıtlı!")
    
    gelen_isim = user_data.fullName or user_data.full_name or user_data.name or 'Bilinmeyen Kullanıcı'
    
    new_user = models.User(
        email=user_data.email,
        hashed_password=user_data.password,
        ad_soyad=gelen_isim 
    )
    db.add(new_user)
    db.commit()
    return {"status": "success", "message": "Kayıt başarılı!"}

@app.post("/api/login")
def login_user(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == user_data.email).first()
    if not user or user.hashed_password != user_data.password:
        raise HTTPException(status_code=401, detail="Hatalı e-posta veya şifre!")
    
    isim = getattr(user, 'ad_soyad', 'Değerli Kullanıcı')
    
    return {
        "status": "success", 
        "user_id": user.id, 
        "email": user.email,
        "full_name": isim,
        "fullName": isim 
    }

# --- VİZE SORGULAMA ---

@app.get("/api/vize-sorgula")
async def vize_sorgula(
    country: str, start: str, end: str, type: str, 
    office: str, passport: str, name: str, surname: str,
    birthDate: str, gender: str, phone: str, email: str,
    tcNo: str = None, user_id: int = 1, 
    background_tasks: BackgroundTasks = BackgroundTasks(),
    db: Session = Depends(get_db)
):
    new_request = models.AppointmentRequest(
        user_id=user_id,
        target_country=country,
        office=office,
        visa_type=type,
        first_name=name,
        last_name=surname,
        birth_date=birthDate,
        gender=gender,
        phone=phone,
        email=email,
        start_date=start,
        end_date=end,
        status="searching"
    )
    
    new_request.set_sensitive_data(passport, tcNo)
    
    db.add(new_request)
    db.commit()
    db.refresh(new_request)

    country_clean = str(country).strip().lower()
    
    vfs_list = ["fransa", "france", "hollanda", "netherlands", "ispanya", "spain", "lithuania", "litvanya", "estonia", "estonya", "croatia", "hırvatistan", "bulgaria", "bulgaristan"]
    idata_list = ["almanya", "germany", "italya", "italy"]

    if country_clean in vfs_list:
        background_tasks.add_task(run_vfs_bot, country, type, start, end)
        msg = f"{country.upper()} için VFS Otonom Sistem başlatıldı!"
    elif country_clean in idata_list:
        background_tasks.add_task(run_idata_bot, country, type, start, end)
        msg = f"{country.upper()} için iData botu başlatıldı."
    else:
        background_tasks.add_task(run_idata_bot, country, type, start, end)
        msg = f"{country.upper()} bilinmiyor, varsayılan bot denenecek."

    return {
        "status": "success", 
        "message": msg,
        "request_id": new_request.id
    }

if __name__ == "__main__":
    # --- HOST DÜZELTMESİ ---
    # 0.0.0.0 yaparak yerel ağdaki (192.168.0.113 gibi) tüm isteklere cevap veriyoruz
    uvicorn.run(app, host="0.0.0.0", port=8000)