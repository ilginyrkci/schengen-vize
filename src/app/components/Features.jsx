import React from 'react';

export default function Features() {
  return (
    <section className="py-32 max-w-6xl mx-auto px-6 relative">
      {/* Arka plan süslemesi */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/5 blur-[120px] rounded-full -z-10"></div>

      <div className="text-left mb-16">
        <h2 className="text-emerald-500 font-mono text-sm tracking-[0.3em] uppercase mb-4">Arel Pass Farkı</h2>
        <h3 className="text-4xl md:text-6xl font-black text-white leading-tight">
          Sıradan Takibi <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
            Profesyonel Güce Dönüştürün
          </span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* BÜYÜK KART: Akıllı Algoritma */}
        <div className="md:col-span-8 group relative bg-[#0b1120]/60 border border-white/5 p-10 rounded-[2.5rem] overflow-hidden hover:border-emerald-500/30 transition-all duration-500">
          <div className="relative z-10">
            <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-3xl font-bold text-white mb-4">Işık Hızında Tarama</h4>
            <p className="text-gray-400 max-w-md text-lg leading-relaxed">
              Sistemimiz sadece beklemekle kalmaz; her saniye binlerce veri noktasını kontrol ederek <span className="text-white font-bold">VFS Global</span> kotalarını herkesten önce yakalar.
            </p>
          </div>
          {/* Arka plan dekoru */}
          <div className="absolute right-[-10%] bottom-[-10%] opacity-10 group-hover:opacity-20 transition-opacity duration-500">
             <div className="w-64 h-64 bg-emerald-500 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* KÜÇÜK KART: Telegram/SMS */}
        <div className="md:col-span-4 bg-gradient-to-b from-emerald-500 to-emerald-700 p-10 rounded-[2.5rem] flex flex-col justify-between text-black group hover:scale-[1.02] transition-transform duration-500">
          <div className="font-black text-5xl opacity-20 uppercase tracking-tighter italic">Instant</div>
          <div>
            <h4 className="text-2xl font-black mb-2 leading-tight">Anında Bildirim</h4>
            <p className="text-black/70 text-sm font-medium">
              Randevu açıldığı an telefonunuz titrer. Dakikalar değil, saniyeler içinde haberiniz olur.
            </p>
          </div>
        </div>

        {/* KÜÇÜK KART: Güvenlik */}
        <div className="md:col-span-4 bg-[#0b1120]/60 border border-white/5 p-8 rounded-[2.5rem] hover:bg-white/[0.02] transition-all">
          <div className="text-emerald-500 mb-6 font-mono text-xl tracking-tighter underline underline-offset-8 decoration-emerald-500/30">03. Secure</div>
          <h4 className="text-xl font-bold text-white mb-2">Veri Güvenliği</h4>
          <p className="text-gray-500 text-sm">Tüm aramalar şifrelenmiş tüneller üzerinden yapılır, bilgileriniz sadece size özel kalır.</p>
        </div>

        {/* ORTA KART: Destek */}
        <div className="md:col-span-8 bg-[#0b1120]/60 border border-white/5 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 group">
          <div className="flex-1">
            <h4 className="text-2xl font-bold text-white mb-3 tracking-tight">Kusursuz Destek</h4>
            <p className="text-gray-500 text-sm">Bir sorunla mı karşılaştınız? Uzman ekibimiz vize sürecinizin her adımında yanınızda.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
             <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">✓</div>
             <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform delay-75">✓</div>
          </div>
        </div>

      </div>
    </section>
  );
}