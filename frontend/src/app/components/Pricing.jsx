import React from 'react';

const PricingCard = ({ title, price, features, isPopular, buttonText }) => (
  <div className={`relative flex flex-col p-10 rounded-[3rem] border transition-all duration-500 hover:scale-[1.03] ${
    isPopular 
    ? 'border-emerald-500 bg-emerald-500/[0.03] shadow-[0_20px_50px_rgba(16,185,129,0.1)] z-10' 
    : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
  } backdrop-blur-3xl`}>
    
    {isPopular && (
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-[#0b1120] text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20">
        En Çok Tercih Edilen
      </div>
    )}
    
    <div className="mb-10">
      <h4 className={`text-xs uppercase tracking-[0.4em] font-black mb-6 ${isPopular ? 'text-emerald-400' : 'text-white/40'}`}>
        {title}
      </h4>
      <div className="flex items-baseline gap-2">
        <span className="text-5xl font-black text-white tracking-tighter">₺{price}</span>
        <span className="text-white/30 text-xs font-bold uppercase tracking-widest">/aylık</span>
      </div>
    </div>

    <div className="h-px bg-white/5 w-full mb-10"></div>

    <ul className="space-y-6 mb-12 flex-1">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-4 text-sm font-medium text-white/60 group">
          <div className={`mt-1 flex-none w-5 h-5 rounded-full flex items-center justify-center ${isPopular ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
            <svg className={`w-3 h-3 ${isPopular ? 'text-emerald-400' : 'text-white/40'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="group-hover:text-white transition-colors">{feature}</span>
        </li>
      ))}
    </ul>

    <button className={`w-full py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 ${
      isPopular 
      ? 'bg-emerald-500 text-[#0b1120] hover:bg-emerald-400 shadow-[0_10px_25px_rgba(16,185,129,0.3)]' 
      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
    }`}>
      {buttonText}
    </button>
  </div>
);

export default function Pricing() {
  return (
    <section className="py-32 max-w-7xl mx-auto px-6 relative">
      {/* Arka plan ışık oyunları */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/[0.02] blur-[150px] rounded-full -z-10"></div>

      <div className="text-center mb-24">
        <h2 className="text-emerald-500 font-mono text-xs tracking-[0.6em] uppercase mb-6 font-black">
          Yatırım Planları
        </h2>
        <h3 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter">
          Visa Pass ile <br />
          <span className="text-white/20 italic">Zamanınızı Geri Kazanın</span>
        </h3>
        <p className="text-white/40 max-w-xl mx-auto text-lg font-medium leading-relaxed">
          Vize randevularınızı şansa değil, <span className="text-emerald-400/80">Visa Pass</span> otomasyonuna emanet edin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
        <PricingCard 
          title="Starter"
          price="0"
          buttonText="Ücretsiz Dene"
          features={[
            "1 Ülke Aktif Takibi",
            "Sistem Yoğunluk Analizi",
            "Standart E-posta Bildirimi",
            "Topluluk Desteği"
          ]}
        />
        
        <PricingCard 
          title="Professional"
          price="299"
          isPopular={true}
          buttonText="Hemen Pro'ya Geç"
          features={[
            "3 Ülke Eş Zamanlı Takip",
            "Işık Hızında Tarama (1s)",
            "Telegram & SMS Bildirimi",
            "7/24 Öncelikli Teknik Destek",
            "Gelişmiş AI Analiz Modülü"
          ]}
        />

        <PricingCard 
          title="Enterprise"
          price="599"
          buttonText="Elite Erişimi Al"
          features={[
            "Sınırsız Ülke & Şehir Takibi",
            "Çoklu Filtreleme (Örn: Sadece Cuma)",
            "Kişisel Vize Danışmanı",
            "Öncelikli Bildirim Kuyruğu",
            "Otomatik Form Doldurma Desteği"
          ]}
        />
      </div>

      <p className="mt-16 text-center text-white/20 text-xs font-bold uppercase tracking-widest">
        Tüm planlarda KVKK güvencesi ve güvenli ödeme altyapısı mevcuttur.
      </p>
    </section>
  );
}