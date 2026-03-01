"use client";
import React from 'react';

const TestimonialCard = ({ name, role, content }) => (
  <div className="flex-none w-[350px] bg-[#0b1120]/40 border border-white/5 p-6 rounded-[2rem] backdrop-blur-xl mx-4 hover:border-emerald-500/30 transition-all duration-500 group">
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <p className="text-gray-400 text-xs leading-relaxed mb-6 font-light">"{content}"</p>
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-[10px]">{name.charAt(0)}</div>
      <div className="text-left">
        <h4 className="text-white font-bold text-xs">{name}</h4>
        <p className="text-gray-600 text-[9px] uppercase tracking-widest">{role}</p>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  const reviews = [
    { name: "Burak Yılmaz", role: "Yazılımcı", content: "Fransa vizesi için 2 aydır randevu kovalıyordum. Arel Pass ile bildirim geldikten 10 saniye sonra aldım." },
    { name: "Selin Demir", role: "Gezgin", content: "Manuel olarak sayfayı yenilemekten kurtuldum. Telegram bildirimiyle tatilimi kurtardım." },
    { name: "Mert Aydın", role: "İş İnsanı", content: "İş seyahati için acil Hollanda randevusu gerekiyordu. Sistem saniyeler içinde çözdü." },
    { name: "Ece Kaya", role: "Öğrenci", content: "Polonya randevusu bulmak imkansızdı, Arel Pass sayesinde vizemi aldım!" },
    { name: "Caner Öz", role: "Tasarımcı", content: "Arayüzü çok şık ve bildirim hızı muazzam. Herkese tavsiye ederim." }
  ];

  return (
    <section className="py-32 overflow-hidden relative">
      <div className="text-center mb-16 px-6">
        <h2 className="text-emerald-500 font-mono text-xs tracking-[0.5em] uppercase mb-4">Referanslar</h2>
        <h3 className="text-3xl font-black text-white italic">Kullanıcı Deneyimleri</h3>
      </div>

      {/* Kayan Şerit Konteynırı */}
      <div className="flex relative items-center">
        {/* Sol ve Sağ Blur Maskesi (Yorumların kenardan silinerek gelmesi için) */}
        <div className="absolute left-0 w-32 h-full bg-gradient-to-r from-[#020617] to-transparent z-10"></div>
        <div className="absolute right-0 w-32 h-full bg-gradient-to-l from-[#020617] to-transparent z-10"></div>

        {/* Hareketli Kısım */}
        <div className="flex animate-marquee whitespace-nowrap py-4">
          {/* Listeyi iki kez yan yana koyuyoruz ki döngü sonsuz görünsün */}
          {[...reviews, ...reviews].map((review, index) => (
            <TestimonialCard key={index} {...review} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}