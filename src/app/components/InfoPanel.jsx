import React from 'react';

export default function InfoPanel() {
  return (
    <div className="flex flex-col gap-6">
      {/* Hızlı Destek / Bilgi Kartı */}
      <div className="bg-[#0b1120]/60 border border-emerald-500/20 p-6 rounded-[2rem] backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-white">Sistem Notu</h3>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          VFS Global ve TLSContact sistemleri şu an stabil. Fransa ve Hollanda için kota açılışları genellikle sabah 09:00 - 11:00 saatleri arasındadır.
        </p>
      </div>

      {/* Anlık İstatistikler (Görseldeki alt kısım) */}
      <div className="bg-[#0b1120]/60 border border-white/5 p-6 rounded-[2rem] backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs uppercase tracking-widest font-black text-emerald-500">Anlık Analiz</h3>
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-xs">Dakikadaki Tarama</span>
            <span className="text-emerald-400 font-mono font-bold">142</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-xs">En Yoğun Ülke</span>
            <span className="text-white text-xs font-bold uppercase">FR Fransa</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-xs">Sistem Yoğunluğu</span>
            <span className="text-emerald-500 text-xs font-bold">%42</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full w-[42%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}