"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchForm() {
  const router = useRouter()

  const [form, setForm] = useState({
    country: "",
    startDate: "",
    endDate: "",
    type: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Boş alan kontrolü
    if (!form.country || !form.type) {
      alert("Lütfen ülke ve vize türünü seçiniz.");
      return;
    }

    const query = new URLSearchParams({
      country: form.country,
      start: form.startDate,
      end: form.endDate,
      type: form.type
    }).toString();

    router.push(`/results?${query}`)
  }

  // Ortak stil sınıfları
  const selectClasses = "p-4 rounded-2xl bg-white/[0.03] text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 appearance-none cursor-pointer w-full transition-all hover:bg-white/[0.06]"
  const optionClasses = "bg-[#0b1120] text-white" // Açılır menü okunabilirlik sorunu çözümü
  const labelClasses = "text-white/40 text-[10px] uppercase font-black tracking-[0.2em] ml-2 mb-1"

  return (
    <div className="w-full max-w-4xl bg-[#0b1120]/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 md:p-12 mx-auto relative overflow-hidden group">
      
      {/* Dekoratif Arka Plan Işığı */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-700"></div>

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tighter italic">
          Hızlı Randevu Bul
        </h2>
        <p className="text-white/40 mb-10 text-sm font-medium leading-relaxed max-w-lg">
          Kriterlerinizi belirleyin, <span className="text-emerald-400">Visa Pass</span> otomasyonu saniyeler içinde tüm vize merkezlerini sizin için tarasın.
        </p>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          {/* Ülke Seçimi */}
          <div className="flex flex-col">
            <label className={labelClasses}>Hedef Ülke</label>
            <div className="relative">
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className={selectClasses}
              >
                <option value="" disabled className={optionClasses}>Ülke Seçiniz</option>
                <option value="germany" className={optionClasses}>Almanya</option>
                <option value="france" className={optionClasses}>Fransa</option>
                <option value="italy" className={optionClasses}>İtalya</option>
                <option value="netherlands" className={optionClasses}>Hollanda</option>
              </select>
              {/* Özel ok işareti ikonunu buraya ekleyebilirsin */}
            </div>
          </div>

          {/* Vize Türü */}
          <div className="flex flex-col">
            <label className={labelClasses}>Başvuru Tipi</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className={selectClasses}
            >
              <option value="" disabled className={optionClasses}>Kategori Seçiniz</option>
              <option value="tourism" className={optionClasses}>Turistik</option>
              <option value="business" className={optionClasses}>Ticari</option>
              <option value="student" className={optionClasses}>Öğrenci</option>
            </select>
          </div>

          {/* Başlangıç Tarihi */}
          <div className="flex flex-col">
            <label className={labelClasses}>En Erken Tarih</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="p-4 rounded-2xl bg-white/[0.03] text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 w-full color-scheme-dark transition-all hover:bg-white/[0.06]"
            />
          </div>

          {/* Bitiş Tarihi */}
          <div className="flex flex-col">
            <label className={labelClasses}>En Geç Tarih</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="p-4 rounded-2xl bg-white/[0.03] text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 w-full color-scheme-dark transition-all hover:bg-white/[0.06]"
            />
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