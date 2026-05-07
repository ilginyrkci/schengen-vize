"use client";
import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
      
      {/* 1. ARKA PLAN IŞIKLARI - En arkaya itildi (-z-20) */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full -z-20 animate-pulse pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full -z-20 pointer-events-none" />

      {/* 2. BADGE */}
      <div className="relative z-10 inline-flex items-center gap-3 bg-white/[0.03] border border-white/10 backdrop-blur-xl px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-10 shadow-2xl">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        Live: 1,200+ Active Users
      </div>

      {/* 3. BAŞLIK VE AÇIKLAMA */}
      <div className="relative z-10 mb-8">
        <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black tracking-tighter leading-none italic select-none">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/10">
            Visa Pass
          </span>
        </h1>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-emerald-500/20 blur-3xl -z-10 opacity-50 pointer-events-none"></div>
      </div>

      <p className="relative z-10 text-lg md:text-xl text-white/40 leading-relaxed max-w-2xl mx-auto mb-14 font-medium px-4">
        Vize randevusu aramakla vakit kaybetmeyin.{" "}
        <span className="text-white font-bold px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-emerald-400">
          Yapay zeka
        </span>{" "}
        destekli botumuzla randevuları saniyesinde yakalayın.
      </p>

      {/* 4. BUTONLAR - En üst katmana çıkarıldı (z-[100]) */}
      <div className="relative z-[100] flex flex-col sm:flex-row items-center justify-center gap-5">
        
        {/* Link içine 'prefetch' eklendi: Sayfayı önden yükler */}
        <Link href="/login" prefetch={true} className="w-full sm:w-auto block">
          <button 
            type="button"
            className="group relative w-full px-10 py-5 bg-emerald-500 text-[#0b1120] font-black uppercase tracking-widest text-xs rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_15px_30px_rgba(16,185,129,0.3)] overflow-hidden cursor-pointer"
          >
            <span className="relative z-10">Hemen Başla</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"></div>
          </button>
        </Link>
        
        <button className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all backdrop-blur-md w-full sm:w-auto cursor-pointer">
          Nasıl Çalışır?
        </button>
      </div>

      {/* 5. ALT SİMGELER */}
      <div className="mt-24 pt-10 border-t border-white/5 max-w-3xl mx-auto relative z-10">
        <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.5em] mb-10">Kapsamlı Vize Takibi</p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          {["Schengen", "USA Visa", "UK Standard", "Canada"].map((item) => (
            <span key={item} className="text-white font-black text-xs tracking-tighter italic hover:text-emerald-400 cursor-default transition-colors">
              {item}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}