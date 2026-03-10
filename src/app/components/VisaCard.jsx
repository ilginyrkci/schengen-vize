import React from "react";

export default function VisaCard({ name, country, time, status, code }) {
  // Durum renklerini projenin ana paletiyle uyumlu hale getirdim
  const statusColors = {
    'Bekliyor': "border-orange-500/30 text-orange-400 bg-orange-500/5",
    'Kontrol': "border-blue-500/30 text-blue-400 bg-blue-500/5",
    'Bulundu': "border-emerald-500/30 text-emerald-400 bg-emerald-500/5"
  };

  return (
    <div className="flex items-center justify-between bg-white/[0.03] border border-white/5 p-4 md:p-5 rounded-[1.5rem] backdrop-blur-xl hover:bg-white/[0.06] hover:border-emerald-500/30 transition-all duration-500 group">
      
      {/* Sol Taraf: Kullanıcı ve Ülke Bilgisi */}
      <div className="flex items-center gap-4">
        {/* Ülke Kodu İkonu: code prop'u gelirse onu gösterir, gelmezse VP gösterir */}
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-[10px] shadow-lg group-hover:scale-110 transition-transform">
          {code || "VP"}
        </div>

        <div className="text-left">
          <h4 className="text-white text-sm font-bold flex items-center gap-2">
            {name}
            <span className="text-white/20 font-medium text-xs tracking-tighter italic">
              / {country}
            </span>
          </h4>

          <div className="flex items-center gap-1.5 mt-1">
             <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
             <p className="text-[9px] text-emerald-500/60 uppercase tracking-[0.1em] font-black">
               Visa Pass Takibi Aktif
             </p>
          </div>
        </div>
      </div>

      {/* Sağ Taraf: Zaman ve Durum Etiketi */}
      <div className="flex items-center gap-4">
        <span className="text-[10px] text-white/20 font-bold uppercase tracking-tighter">
          {time}
        </span>

        <span
          className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all duration-500 ${
            statusColors[status] || statusColors["Bekliyor"]
          }`}
        >
          {status}
        </span>
      </div>

    </div>
  );
}