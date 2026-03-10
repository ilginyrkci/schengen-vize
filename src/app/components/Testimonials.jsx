"use client";
import React from "react";

const TestimonialCard = ({ name, role, content }) => (
  <div className="flex-none w-[350px] md:w-[420px] px-4 py-8">
    <div className="bg-white/[0.02] border border-white/10 p-8 rounded-[3rem] backdrop-blur-3xl hover:border-emerald-500/30 transition-all duration-700 h-full flex flex-col justify-between group relative overflow-hidden shadow-2xl">
      
      {/* Kart İçindeki Hafif Parlama */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/5 blur-[80px] rounded-full group-hover:bg-emerald-500/10 transition-all duration-700"></div>

      <div className="relative z-10">
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <p className="text-white/60 text-base leading-relaxed mb-8 font-medium italic whitespace-normal tracking-tight group-hover:text-white transition-colors duration-500">
          "{content}"
        </p>
      </div>

      <div className="flex items-center gap-4 border-t border-white/5 pt-6 relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-[#0b1120] font-black text-sm shadow-lg">
          {name.charAt(0)}
        </div>

        <div className="text-left">
          <h4 className="text-white font-black text-sm tracking-tight uppercase tracking-widest">{name}</h4>
          <p className="text-emerald-500/40 text-[10px] uppercase tracking-[0.3em] font-black">
            {role}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  const reviews = [
    { name: "Burak Yılmaz", role: "Yazılımcı", content: "Fransa vizesi için 2 aydır randevu arıyordum. Visa Pass bildirimi geldikten 10 saniye sonra randevuyu aldım." },
    { name: "Selin Demir", role: "Gezgin", content: "Sürekli sayfayı yenilemek zorunda kalmıyorum. Visa Pass sayesinde Telegram bildirimiyle randevumu yakaladım." },
    { name: "Mert Aydın", role: "İş İnsanı", content: "Acil Hollanda randevusuna ihtiyacım vardı. Visa Pass birkaç dakika içinde uygun slotu yakaladı." },
    { name: "Ece Kaya", role: "Öğrenci", content: "Polonya öğrenci vizesi için randevu bulamıyordum. Visa Pass sayesinde çok hızlı bir şekilde aldım." },
    { name: "Caner Öz", role: "Tasarımcı", content: "Arayüzü çok modern ve bildirim sistemi inanılmaz hızlı. Visa Pass gerçekten hayat kurtarıyor." }
  ];

  return (
    <section className="py-32 overflow-hidden relative" suppressHydrationWarning>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/[0.01] blur-[150px] rounded-full -z-10"></div>

      <div className="text-center mb-20 px-6">
        <h2 className="text-emerald-500 font-mono text-[10px] tracking-[0.6em] uppercase mb-6 font-black italic">
          Global Memnuniyet
        </h2>
        <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter italic">
          Visa Pass <span className="text-white/20 not-italic tracking-tight">Kullanıcı Deneyimleri</span>
        </h3>
      </div>

      <div className="relative flex overflow-hidden py-4">
        {/* Cam Efekti Veren Kenar Gradyanları */}
        <div className="absolute left-0 top-0 w-32 md:w-64 h-full bg-gradient-to-r from-[#020617] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-32 md:w-64 h-full bg-gradient-to-l from-[#020617] to-transparent z-20 pointer-events-none"></div>

        <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
          <div className="flex flex-none">
            {reviews.map((review, index) => (
              <TestimonialCard key={`first-${index}`} {...review} />
            ))}
          </div>
          <div className="flex flex-none">
            {reviews.map((review, index) => (
              <TestimonialCard key={`second-${index}`} {...review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}