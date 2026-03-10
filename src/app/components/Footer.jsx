import React from 'react';

export default function Footer() {
  const menuItems = [
    { name: "Özellikler", href: "#features" },
    { name: "Sistem", href: "#system" },
    { name: "Fiyatlandırma", href: "#pricing" }
  ];

  return (
    <footer className="relative bg-[#020617] pt-32 pb-16 overflow-hidden">
      
      {/* --- ESTETİK ARKA PLAN DOKUNUŞLARI --- */}
      {/* Üst Ayırıcı İnce Işık Çizgisi */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
      
      {/* Arka Plan Yumuşak Parlamalar (Blobs) */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/[0.03] blur-[120px] rounded-full -z-0"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/[0.02] blur-[100px] rounded-full -z-0"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* ÜST KISIM: Logo ve Ana Mesaj */}
        <div className="flex flex-col items-center text-center mb-24">
          
          {/* Logo: Cam Efektli ve Hover Animasyonlu */}
          <div className="group relative cursor-pointer mb-10">
            <div className="absolute -inset-4 bg-emerald-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            <div className="relative w-16 h-16 bg-[#0b1120]/80 border border-white/10 rounded-[1.25rem] flex items-center justify-center backdrop-blur-xl transition-all duration-500 group-hover:border-emerald-500/50 group-hover:-translate-y-1 shadow-2xl">
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-br from-emerald-400 to-cyan-500">
                VP
              </span>
            </div>
          </div>

          <h3 className="text-3xl font-black text-white tracking-tighter italic uppercase mb-6 drop-shadow-2xl">
            Visa Pass
          </h3>
          
          <p className="text-white/40 text-base max-w-md leading-relaxed font-medium">
            Vize randevu süreçlerini <span className="text-emerald-400/60 font-bold">yapay zeka</span> ile saniyelere indiren, 
            <span className="text-white/60"> hıza odaklı</span> yeni nesil otomasyon sistemi.
          </p>

          {/* Minimalist ve Geniş Aralıklı Navigasyon */}
          <nav className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 mt-16">
            {menuItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                className="group relative py-2"
              >
                <span className="text-[11px] uppercase tracking-[0.4em] font-black text-white/30 group-hover:text-emerald-400 transition-all duration-300">
                  {item.name}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-emerald-500 group-hover:w-full transition-all duration-500 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
              </a>
            ))}
          </nav>
        </div>

        {/* ALT KISIM: Telif ve İmzalar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
          
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20">
              © 2026 VISA PASS — ALL RIGHTS RESERVED
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 group cursor-default">
               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,1)]"></span>
               <p className="text-[10px] uppercase tracking-widest text-emerald-500/40 font-black group-hover:text-emerald-500/60 transition-colors">
                 Designed & Coded by Ilgın Habibe Yürekçi
               </p>
            </div>
          </div>

          {/* Sosyal Medya: Modern Border-Box Style */}
          <div className="flex items-center gap-4">
            {['LinkedIn', 'Github'].map((social) => (
              <a 
                key={social}
                href="#"
                className="px-6 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-[10px] uppercase tracking-[0.2em] font-black text-white/30 hover:text-white hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-500"
              >
                {social}
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}