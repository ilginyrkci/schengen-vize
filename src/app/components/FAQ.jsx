"use client";
import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-emerald-400 transition-colors"
      >
        <span className="text-lg font-medium text-white/90">{question}</span>
        <span className={`text-2xl transition-transform duration-300 ${isOpen ? 'rotate-45 text-emerald-500' : 'text-gray-500'}`}>
          +
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-6' : 'max-h-0'}`}>
        <p className="text-gray-500 text-sm leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default function FAQ() {
  const faqs = [
    {
      question: "Arel Pass tam olarak nasıl çalışıyor?",
      answer: "Arel Pass, belirlediğiniz kriterlere göre vize randevu sistemlerini saniyeler içinde tarayan bir otomasyondur. Randevu açıldığı an size Telegram üzerinden direkt randevu linkini gönderir."
    },
     {
      question: "Premium üyeliğin avantajlaı nelerdi?",
      answer: "Premium üyeler sınırsız sayıda ülke için anlık bildirimler alır, daha sık arama yapabilir ve randevu bulma şanslarını en üst düzeye çıkarır. Ayrıca gelişmiş filtreleme ve öncelikli destek gibi ek özelliklere de erişirler."
    },
    {
      question: "Randevu almayı garanti ediyor musunuz?",
      answer: "Sistemimiz randevu bulma şansınızı %90'ın üzerine çıkarır, ancak randevu alımı konsolosluk kotalarına bağlıdır. Biz, açılan kontenjanı herkesten önce görmenizi sağlıyoruz."
    },
    {
      question: "Hangi ülkeler için destek veriyorsunuz?",
      answer: "Başta Fransa, Hollanda, İtalya, Almanya ve Avusturya olmak üzere tüm Schengen bölgesi ve ABD vize randevuları için aktif takip yapmaktayız."
    },
    {
      question: "Aynı anda birden fazla şehir için takip yapabilir miyim?",
      answer: "Evet, gelişmiş panelimiz üzerinden farklı şehirler ve tarih aralıkları için eş zamanlı bildirimler kurabilirsiniz."
    }
  ];

  return (
    <section className="py-32 max-w-3xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-emerald-500 font-mono text-xs tracking-[0.4em] uppercase mb-4">Destek</h2>
        <h3 className="text-4xl font-black text-white">Merak Edilenler</h3>
      </div>
      <div className="bg-[#0b1120]/20 rounded-[2.5rem] p-8 border border-white/5 backdrop-blur-sm">
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>
    </section>
  );
}