from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
import datetime
import os
from cryptography.fernet import Fernet
from dotenv import load_dotenv

load_dotenv()

# .env dosyasından anahtarı çekiyoruz
SECRET_KEY = os.getenv("FERNET_KEY")
if not SECRET_KEY:
    SECRET_KEY = "v-CB-hQnFBCHHNSpyvOHZFkW7e_5WGclnUySGD_nGwg="

cipher = Fernet(SECRET_KEY.encode())

class User(Base):
    # Supabase videondaki tablo adıyla eşitledik
    __tablename__ = "kullanicilar" 
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True) 
    hashed_password = Column(String)
    
    # Videodaki 'ad_soyad' sütun ismiyle eşledik
    ad_soyad = Column(String, nullable=True) 
    
    vfs_email = Column(String, nullable=True)
    encrypted_vfs_password = Column(String, nullable=True)
    
    balance = Column(Float, default=0.0)
    plan_type = Column(String, default="starter")
    
    # İlişki aynı kaldı
    appointments = relationship("AppointmentRequest", back_populates="owner")

    def set_vfs_password(self, password):
        if password:
            self.encrypted_vfs_password = cipher.encrypt(password.encode()).decode()

    def get_vfs_password(self):
        if self.encrypted_vfs_password:
            return cipher.decrypt(self.encrypted_vfs_password.encode()).decode()
        return None

class AppointmentRequest(Base):
    __tablename__ = "appointment_requests"
    id = Column(Integer, primary_key=True, index=True)
    
    # --- KRİTİK DÜZELTME BURASI ---
    # Tablo adı "kullanicilar" olduğu için burayı da "kullanicilar.id" yaptık.
    user_id = Column(Integer, ForeignKey("kullanicilar.id")) 
    # ------------------------------
    
    target_country = Column(String)
    office = Column(String) 
    visa_type = Column(String) 
    
    encrypted_passport = Column(String)
    encrypted_tc_no = Column(String, nullable=True)
    
    first_name = Column(String)
    last_name = Column(String)
    birth_date = Column(String)
    gender = Column(String)
    phone = Column(String)
    email = Column(String)
    
    start_date = Column(String) 
    end_date = Column(String)
    
    is_found = Column(Boolean, default=False)
    status = Column(String, default="searching") 
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    owner = relationship("User", back_populates="appointments")

    def set_sensitive_data(self, passport, tc=None):
        self.encrypted_passport = cipher.encrypt(passport.encode()).decode()
        if tc:
            self.encrypted_tc_no = cipher.encrypt(tc.encode()).decode()

    def get_passport(self):
        return cipher.decrypt(self.encrypted_passport.encode()).decode()

    def get_tc(self):
        if self.encrypted_tc_no:
            return cipher.decrypt(self.encrypted_tc_no.encode()).decode()
        return None