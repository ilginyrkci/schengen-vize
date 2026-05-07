import React from 'react';

const StatCard = ({ value, label, colorClass, glowClass }) => (
  <div className="relative group bg-[#0b1120]/40 border border-white/5 p-8 rounded-[2.5rem] text-center backdrop-blur-2xl hover:border-emerald-500/30 transition-all duration-500 overflow-hidden shadow-2xl">
    {/* Arka Plan Parlaması (Hover ile belirir) */}
    <div className={`absolute -inset-2 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 -z-10 ${glowClass}`} />
    
    <h3 className={`text-5xl font-black mb-3 tracking-tighter ${colorClass} group-hover:scale-110 transition-transform duration-500`}>
      {value}
    </h3>
    <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-black group-hover:text-white/60 transition-colors">
      {label}
    </p>
    
    {/* Alt Süsleme Çizgisi */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
  </div>
);

export default function Stats() {
  return (
    <div className="relative py-20">
      {/* Sayılar Arka Plan Dekoru */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/[0.02] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6 relative z-10">
        <StatCard 
          value="764+" 
          label="Aktif Kullanıcı" 
          colorClass="text-white" 
          glowClass="bg-emerald-500/10" 
        />
        <StatCard 
          value="1.530" 
          label="Başarılı Randevu" 
          colorClass="text-emerald-400" 
          glowClass="bg-cyan-500/10" 
        />
        <StatCard 
          value="%99" 
          label="Yakalanma Oranı" 
          colorClass="text-white" 
          glowClass="bg-emerald-500/10" 
        />
        <StatCard 
          value="142ms" 
          label="Tarama Hızı" 
          colorClass="text-emerald-500" 
          glowClass="bg-cyan-500/10" 
        />
      </div>
    </div>
  );
}