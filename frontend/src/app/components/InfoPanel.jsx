import React from 'react';

export default function InfoPanel() {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Visa Pass Notu - Daha Dikkat Çekici Gradyan Border */}
      <div className="group relative bg-[#0b1120]/60 border border-emerald-500/20 p-6 rounded-[2.5rem] backdrop-blur-xl hover:border-emerald-500/40 transition-all duration-500">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-black text-white text-sm uppercase tracking-tighter italic">Visa Pass Notu</h3>
            <p className="text-[10px] text-emerald-500/50 font-bold uppercase tracking-widest">Sistem Durumu: Stabil</p>
          </div>
        </div>
        <p className="text-white/50 text-xs leading-relaxed font-medium">
          VFS Global ve TLSContact sistemleri şu anda <span className="text-white">optimize</span> çalışıyor. Fransa ve Hollanda kotaları genellikle <span className="text-emerald-400">09:00 - 11:00</span> saatleri arasında sisteme düşmektedir.
        </p>
      </div>

      {/* Anlık İstatistikler - Data Grid Tasarımı */}
      <div className="bg-[#0b1120]/60 border border-white/5 p-7 rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30">Anlık Analiz</h3>
          <div className="flex items-center gap-2 bg-emerald-500/10 px-2 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-tighter">Live Data</span>
          </div>
        </div>
        
        <div className="space-y-5">
          <div className="flex justify-between items-center group/item">
            <span className="text-white/40 text-[11px] font-bold uppercase tracking-tight">Dakikadaki Tarama</span>
            <span className="text-emerald-400 font-mono font-black text-lg group-hover:scale-110 transition-transform tracking-tighter">142</span>
          </div>
          
          <div className="h-px bg-white/5 w-full"></div>

          <div className="flex justify-between items-center">
            <span className="text-white/40 text-[11px] font-bold uppercase tracking-tight">En Yoğun Ülke</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-white/5 px-2 py-1 rounded-md text-white/80 font-mono">FR</span>
              <span className="text-white text-[11px] font-black italic uppercase">Fransa</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-white/40 text-[11px] font-bold uppercase tracking-tight">Sistem Yükü</span>
            <span className="text-emerald-500 text-[11px] font-black tracking-widest">%42</span>
          </div>
          
          {/* Gelişmiş Progress Bar */}
          <div className="relative pt-2">
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5 p-[1px]">
              <div 
                className="bg-gradient-to-r from-emerald-600 via-emerald-400 to-cyan-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                style={{ width: '42%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Dekoratif Arka Plan Yazısı */}
        <div className="absolute -bottom-4 -right-4 text-[6rem] font-black text-white/[0.02] italic pointer-events-none select-none">
          VP
        </div>
      </div>
    </div>
  );
}