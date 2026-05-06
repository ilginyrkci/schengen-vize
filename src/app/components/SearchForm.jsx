"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

// burası config merkezimiz. Doğum tarihi ve Cinsiyet artık her ülkede standart.
const countryRequirements = {
  germany: { 
    provider: 'idata', 
    fields: ['office', 'passport', 'firstName', 'lastName', 'tcNo', 'birthDate', 'gender', 'phone', 'email'],
    offices: ['Istanbul-Gayrettepe', 'Istanbul-Altunizade', 'Ankara', 'Izmir', 'Bursa', 'Gaziantep']
  },
  italy: { 
    provider: 'idata', 
    fields: ['office', 'passport', 'firstName', 'lastName', 'birthDate', 'gender', 'phone', 'email'],
    offices: ['Istanbul-Gayrettepe', 'Istanbul-Altunizade', 'Ankara', 'Izmir']
  },
  france: { 
    provider: 'vfs', 
    fields: ['office', 'passport', 'firstName', 'lastName', 'birthDate', 'gender', 'phone', 'email'],
    offices: ['Beyoglu', 'Altunizade', 'Ankara', 'Izmir']
  },
  netherlands: { 
    provider: 'vfs', 
    fields: ['office', 'passport', 'firstName', 'lastName', 'birthDate', 'gender', 'phone', 'email'],
    offices: ['Beyoglu', 'Ankara', 'Izmir']
  },
  estonia: { 
    provider: 'vfs', 
    fields: ['office', 'passport', 'firstName', 'lastName', 'birthDate', 'gender', 'phone', 'email'],
    offices: ['Altunizade', 'Ankara']
  },
  lithuania: { 
    provider: 'vfs', 
    fields: ['office', 'passport', 'firstName', 'lastName', 'birthDate', 'gender', 'phone', 'email'],
    offices: ['Beyoglu', 'Ankara']
  },
  croatia: { 
    provider: 'vfs', 
    fields: ['office', 'passport', 'firstName', 'lastName', 'birthDate', 'gender', 'phone', 'email'],
    offices: ['Altunizade', 'Ankara']
  },
  // 🎯 BURAYA EKLENDİ: Bulgaristan konfigürasyonu
  bulgaristan: { 
    provider: 'vfs', 
    fields: ['office', 'passport', 'firstName', 'lastName', 'birthDate', 'gender', 'phone', 'email'],
    offices: ['Beyoglu', 'Altunizade', 'Ankara', 'Izmir', 'Bursa', 'Gaziantep', 'Antalya', 'Edirne'] // VFS Bulgaristan'ın genel ofisleri
  }
};

export default function SearchForm() {
  const router = useRouter()

  const [form, setForm] = useState({
    country: "",
    startDate: "",
    endDate: "",
    type: "",
    office: "",
    passport: "",
    firstName: "",
    lastName: "",
    tcNo: "",
    birthDate: "",
    gender: "",
    phone: "",
    email: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    const finalValue = (name === "firstName" || name === "lastName") ? value.toUpperCase() : value;
    
    setForm({
      ...form,
      [name]: finalValue
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!form.country || !form.type) {
      alert("Lütfen ülke ve vize türünü seçiniz.");
      return;
    }

    const queryParams = new URLSearchParams({
      country: form.country,
      start: form.startDate,
      end: form.endDate,
      type: form.type,
      office: form.office,
      passport: form.passport,
      name: form.firstName,
      surname: form.lastName,
      tcNo: form.tcNo,
      birthDate: form.birthDate,
      gender: form.gender,
      phone: form.phone,
      email: form.email
    }).toString();

    try {
      console.log("Backend tetikleniyor...");
      const response = await fetch(`http://localhost:8000/api/vize-sorgula?${queryParams}`);
      const data = await response.json();

      if (data.status === "success") {
        console.log("Bot başlatıldı!");
        alert(`${form.country.toUpperCase()} için tarama başlatıldı! Terminali kontrol et.`);
      }
    } catch (error) {
      console.error("Bağlantı hatası:", error);
      alert("Backend'e bağlanılamadı! Lütfen terminalde main.py'ın çalıştığından emin ol.");
    }
  }

  const selectClasses = "p-4 rounded-2xl bg-white/[0.03] text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 appearance-none cursor-pointer w-full transition-all hover:bg-white/[0.06]"
  const inputClasses = "p-4 rounded-2xl bg-white/[0.03] text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 w-full color-scheme-dark transition-all hover:bg-white/[0.06] placeholder:text-white/20"
  const optionClasses = "bg-[#0b1120] text-white" 
  const labelClasses = "text-white/40 text-[10px] uppercase font-black tracking-[0.2em] ml-2 mb-1"

  const fieldLabels = {
    passport: "Pasaport No",
    firstName: "Ad",
    lastName: "Soyad",
    tcNo: "TC Kimlik No",
    birthDate: "Doğum Tarihi",
    gender: "Cinsiyet",
    phone: "Telefon (5xx...)",
    email: "E-Posta Adresi"
  };

  return (
    <div className="w-full max-w-4xl bg-[#0b1120]/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 md:p-12 mx-auto relative overflow-hidden group">
      
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-700"></div>

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tighter italic">
          Hızlı Randevu Bul
        </h2>
        <p className="text-white/40 mb-10 text-sm font-medium leading-relaxed max-w-lg">
          Kriterlerinizi belirleyin, <span className="text-emerald-400">Visa Pass</span> otomasyonu saniyeler içinde tüm vize merkezlerini sizin için tarasın.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label className={labelClasses}>Hedef Ülke</label>
              <div className="relative">
                <select name="country" value={form.country} onChange={handleChange} className={selectClasses}>
                  <option value="" disabled className={optionClasses}>Ülke Seçiniz</option>
                  <optgroup label="Ana Ülkeler" className="bg-gray-900 text-emerald-400">
                    <option value="germany" className={optionClasses}>Almanya</option>
                    <option value="france" className={optionClasses}>Fransa</option>
                    <option value="italy" className={optionClasses}>İtalya</option>
                    <option value="netherlands" className={optionClasses}>Hollanda</option>
                  </optgroup>
                  <optgroup label="Test & Antrenman Ülkeleri" className="bg-gray-900 text-yellow-500">
                    <option value="lithuania" className={optionClasses}>Litvanya</option>
                    <option value="estonia" className={optionClasses}>Estonya</option>
                    <option value="croatia" className={optionClasses}>Hırvatistan</option>
                    {/* 🎯 BURAYA EKLENDİ: Bulgaristan seçeneği */}
                    <option value="bulgaristan" className={optionClasses}>Bulgaristan</option>
                  </optgroup>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label className={labelClasses}>Başvuru Tipi</label>
              <select name="type" value={form.type} onChange={handleChange} className={selectClasses}>
                <option value="" disabled className={optionClasses}>Kategori Seçiniz</option>
                <option value="tourism" className={optionClasses}>Turistik</option>
                <option value="business" className={optionClasses}>Ticari</option>
                <option value="student" className={optionClasses}>Öğrenci</option>
              </select>
            </div>
          </div>

          {form.country && countryRequirements[form.country] && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 animate-in slide-in-from-top-4 duration-500">
              
              <div className="flex flex-col">
                <label className={labelClasses}>Hizmet Merkezi / Ofis</label>
                <select name="office" value={form.office} onChange={handleChange} className={selectClasses}>
                  <option value="">Ofis Seçiniz</option>
                  {countryRequirements[form.country].offices.map(off => (
                    <option key={off} value={off} className={optionClasses}>{off}</option>
                  ))}
                </select>
              </div>

              {countryRequirements[form.country].fields.map(field => {
                if (field === 'office') return null;
                
                if (field === 'gender') {
                  return (
                    <div key={field} className="flex flex-col">
                      <label className={labelClasses}>Cinsiyet</label>
                      <select name="gender" value={form.gender} onChange={handleChange} className={selectClasses}>
                        <option value="" className={optionClasses}>Seçiniz</option>
                        <option value="male" className={optionClasses}>Erkek</option>
                        <option value="female" className={optionClasses}>Kadın</option>
                      </select>
                    </div>
                  );
                }

                return (
                  <div key={field} className="flex flex-col">
                    <label className={labelClasses}>{fieldLabels[field] || field}</label>
                    <input
                      type={field === 'birthDate' ? "date" : "text"}
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      placeholder={`${fieldLabels[field] || field} giriniz`}
                      className={inputClasses}
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label className={labelClasses}>En Erken Tarih</label>
              <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className={inputClasses} />
            </div>
            <div className="flex flex-col">
              <label className={labelClasses}>En Geç Tarih</label>
              <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className={inputClasses} />
            </div>
          </div>

          <button 
            type="submit"
            className="md:col-span-2 mt-4 group relative bg-emerald-500 hover:bg-emerald-400 text-[#0b1120] py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all hover:scale-[1.01] active:scale-95 shadow-[0_15px_30px_rgba(16,185,129,0.2)]"
          >
            <span className="relative z-10">Tarama Başlat</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-2xl opacity-0 group-hover:opacity-10"></div>
          </button>
        </form>
      </div>
    </div>
  )
}