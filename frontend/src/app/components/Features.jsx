import React from 'react';

export default function Features() {
  return (
    <section className="py-32 max-w-6xl mx-auto px-6 relative overflow-hidden">
      {/* Arka plan süslemesi - Daha geniş bir yayılım */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/[0.03] blur-[150px] rounded-full -z-10"></div>

      <div className="text-left mb-20">
        <h2 className="text-emerald-500 font-mono text-xs tracking-[0.5em] uppercase mb-4">
         Visa Pass Teknolojisi
        </h2>
        <h3 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
          Sıradan Takibi <br /> 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-emerald-200 to-cyan-400">
            Profesyonel Güce Dönüştürün
          </span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* BÜYÜK KART: Akıllı Algoritma */}
        <div className="md:col-span-8 group relative bg-white/[0.03] border border-white/10 p-10 rounded-[3rem] overflow-hidden hover:border-emerald-500/40 transition-all duration-500 shadow-2xl">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-10 shadow-[0_10px_40px_rgba(16,185,129,0.4)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-[#0b1120]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">Işık Hızında Tarama</h4>
            <p className="text-white/50 max-w-md text-lg leading-relaxed">
              Sistemimiz sadece beklemekle kalmaz; her saniye binlerce veri noktasını kontrol ederek <span className="text-emerald-400 font-semibold italic">VFS Global</span> kotalarını herkesten önce yakalar.
            </p>
          </div>
          {/* Animasyonlu Gradyan Arka Plan */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>

        {/* KÜÇÜK KART: Telegram/SMS */}
        <div className="md:col-span-4 relative bg-gradient-to-b from-emerald-400 to-emerald-600 p-10 rounded-[3rem] flex flex-col justify-between overflow-hidden group hover:shadow-[0_20px_50px_rgba(16,185,129,0.3)] transition-all duration-500 cursor-default">
          <div className="font-black text-6xl text-[#0b1120]/10 uppercase tracking-tighter italic leading-none absolute -right-2 top-4 select-none">
            Fast
          </div>
          <div className="relative z-10 pt-12">
            <h4 className="text-2xl font-black text-[#0b1120] mb-3 leading-tight uppercase tracking-tight">Anında <br/>Bildirim</h4>
            <p className="text-[#0b1120]/80 text-sm font-semibold leading-relaxed">
              Randevu açıldığı an telefonunuz titrer. Dakikalar değil, saniyeler içinde haberiniz olur.
            </p>
          </div>
          {/* İkon veya görsel bir detay eklenebilir */}
          <div className="mt-6 flex items-center gap-2">
             <div className="h-1 w-12 bg-[#0b1120]/20 rounded-full"></div>
             <div className="h-1 w-4 bg-[#0b1120]/20 rounded-full"></div>
          </div>
        </div>

        {/* KÜÇÜK KART: Güvenlik */}
        <div className="md:col-span-4 bg-white/[0.03] border border-white/10 p-8 rounded-[3rem] hover:bg-white/[0.06] transition-all group shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <div className="text-emerald-500 font-mono text-sm tracking-widest font-bold">03. SECURE</div>
            <div className="text-emerald-500/20 group-hover:text-emerald-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h4 className="text-xl font-bold text-white mb-3">Veri Güvenliği</h4>
          <p className="text-white/40 text-sm leading-relaxed font-medium italic">Tüm aramalar şifrelenmiş tüneller üzerinden yapılır, bilgileriniz sadece size özel kalır.</p>
        </div>

        {/* ORTA KART: Destek */}
        <div className="md:col-span-8 bg-white/[0.03] border border-white/10 p-8 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 group hover:border-emerald-500/20 transition-all shadow-xl">
          <div className="flex-1">
            <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">Kusursuz Destek</h4>
            <p className="text-white/40 text-sm leading-relaxed font-medium">Bir sorunla mı karşılaştınız? Uzman ekibimiz vize sürecinizin her adımında yanınızda.</p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
             <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-[#0b1120] flex items-center justify-center text-[10px] text-emerald-400 font-bold">U{i}</div>
                ))}
             </div>
             <div className="text-[11px] text-white/60 font-bold uppercase tracking-widest ml-2">7/24 Aktif</div>
          </div>
        </div>

      </div>
    </section>
  );
}