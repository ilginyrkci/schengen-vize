import React from 'react';

const PricingCard = ({ title, price, features, isPopular, buttonText }) => (
  <div className={`relative flex flex-col p-8 rounded-[2.5rem] border ${isPopular ? 'border-emerald-500 bg-emerald-500/[0.03] shadow-2xl shadow-emerald-500/10' : 'border-white/5 bg-[#0b1120]/40'} backdrop-blur-xl transition-all duration-500 hover:scale-[1.02]`}>
    {isPopular && (
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
        En Çok Tercih Edilen
      </span>
    )}
    
    <div className="mb-8">
      <h4 className="text-gray-400 text-xs uppercase tracking-[0.3em] font-bold mb-4">{title}</h4>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-black text-white">₺{price}</span>
        <span className="text-gray-500 text-sm">/aylık</span>
      </div>
    </div>

    <ul className="space-y-5 mb-10 flex-1">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-3 text-sm text-gray-400">
          <svg className="w-5 h-5 text-emerald-500 flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {feature}
        </li>
      ))}
    </ul>

    <button className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${isPopular ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}>
      {buttonText}
    </button>
  </div>
);

export default function Pricing() {
  return (
    <section className="py-32 max-w-6xl mx-auto px-6">
      <div className="text-center mb-20">
        <h2 className="text-emerald-500 font-mono text-xs tracking-[0.5em] uppercase mb-4">Planlar</h2>
        <h3 className="text-4xl md:text-5xl font-black text-white mb-6">Size Uygun Paketi Seçin</h3>
        <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
          İhtiyacınıza göre özelleştirilmiş takip seçenekleriyle vize randevunuzu şansa bırakmayın.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard 
          title="Başlangıç"
          price="0"
          buttonText="Ücretsiz Başla"
          features={[
            "1 Ülke Takibi",
            "Günde 12 Tarama",
            "Sadece E-posta Bildirimi",
            "Standart Destek"
          ]}
        />
        
        <PricingCard 
          title="Profesyonel"
          price="299"
          isPopular={true}
          buttonText="Hemen Satın Al"
          features={[
            "3 Ülke Eş Zamanlı Takip",
            "Saniyelik Tarama Hızı",
            "Telegram & SMS Bildirimi",
            "7/24 Öncelikli Destek",
            "Yapay Zeka Tahmin Modülü"
          ]}
        />

        <PricingCard 
          title="Premium"
          price="599"
          buttonText="Hemen Satın Al"
          features={[
            "Sınırsız Ülke Takibi",
            "Çoklu Şehir Filtreleme",
            "Özel Asistan Desteği",
            "Gelişmiş API Erişimi",
            "Randevu Formu Doldurma"
          ]}
        />
      </div>
    </section>
  );
}