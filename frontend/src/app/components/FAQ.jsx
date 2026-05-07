"use client";
import React, { useState } from 'react';

// Tek bir FAQ öğesi
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`border-b border-white/5 last:border-0 transition-all duration-300 ${isOpen ? 'bg-white/[0.02]' : ''}`}>
      <button
        onClick={onClick}
        className="w-full py-6 px-4 flex items-center justify-between text-left group transition-all"
      >
        <span className={`text-lg font-medium transition-colors duration-300 ${
          isOpen ? 'text-emerald-400' : 'text-white/90 group-hover:text-emerald-400'
        }`}>
          {question}
        </span>
        <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500 ${
          isOpen ? 'border-emerald-500 bg-emerald-500/10 rotate-180' : 'border-white/10 group-hover:border-emerald-500/50'
        }`}>
          <span className={`text-xl font-light transition-colors ${isOpen ? 'text-emerald-500' : 'text-gray-500'}`}>
            {isOpen ? '−' : '+'}
          </span>
        </div>
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-6">
          <p className="text-white/60 text-base leading-relaxed max-w-2xl">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

// FAQ listesi
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Visa Pass tam olarak nasıl çalışıyor?",
      answer:
        "Visa Pass, belirlediğiniz kriterlere göre vize randevu sistemlerini saniyeler içinde tarayan bir otomasyondur. Uygun randevu bulunduğu an size bildirim göndererek vakit kaybetmeden başvuru yapmanızı sağlar."
    },
    {
      question: "Premium üyeliğin avantajları nelerdir?",
      answer:
        "Premium üyeler sınırsız sayıda ülke için anlık bildirimler alır, saniyelerle yarışan randevu sisteminde öncelikli tarama sırasına sahip olurlar. Ayrıca Telegram botu üzerinden anlık veri akışına erişirler."
    },
    {
      question: "Randevu almayı garanti ediyor musunuz?",
      answer:
        "Sistemimiz randevu bulma şansınızı %90'ın üzerine çıkarır. Biz, konsolosluklar tarafından açılan gizli veya anlık kontenjanları herkesten önce yakalayıp size haber veriyoruz."
    },
    {
      question: "Hangi ülkeler için destek veriyorsunuz?",
      answer:
        "Başta Almanya, Fransa, Hollanda, İtalya ve Yunanistan olmak üzere tüm Schengen bölgesi ülkeleri ve ABD/İngiltere randevuları için aktif takip yapmaktayız."
    },
    {
      question: "Birden fazla şehir için takip yapabilir miyim?",
      answer:
        "Kesinlikle. Gelişmiş panelimiz üzerinden örneğin hem İstanbul hem Ankara hem de İzmir'deki uygunlukları aynı anda tek bir alarm ile takip edebilirsiniz."
    }
  ];

  return (
    <section className="py-24 max-w-4xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-emerald-500 font-mono text-sm tracking-[0.3em] uppercase mb-3">
          Sıkça Sorulan Sorular
        </h2>
        <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Aklınıza Takılanlar
        </h3>
      </div>
      
      <div className="bg-[#0b1120]/40 rounded-[2rem] border border-white/10 backdrop-blur-md overflow-hidden shadow-2xl">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            {...faq}
            isOpen={openIndex === index}
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          />
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-white/40 text-sm">
          Başka bir sorunuz mu var? <a href="#" className="text-emerald-500 hover:underline">Destek ekibimizle iletişime geçin.</a>
        </p>
      </div>
    </section>
  );
}