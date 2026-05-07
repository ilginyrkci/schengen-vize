"use client"

import React from "react";
import Link from "next/link";
import "./globals.css";

// Bileşenlerin Importu
import Hero from "@/app/components/Hero";
import SearchForm from "@/app/components/SearchForm";
import Dashboard from "@/app/components/Dashboard";
import Features from "@/app/components/Features";
import HowItWorks from "@/app/components/HowItWorks";
import FAQ from "@/app/components/FAQ";
import Pricing from "@/app/components/Pricing";
import Testimonials from "@/app/components/Testimonials";
import ScrollToTop from "@/app/components/ScrollToTop";
import Footer from "@/app/components/Footer";

// İstatistik Kartı (Bento Style)
const StatCard = ({ value, label, colorClass, icon }) => (
  <div className="group relative bg-gradient-to-br from-[#0f0f0f] to-[#050505] border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] hover:border-white/10">
    <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-bl from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl`} />
    <div className="flex items-start justify-between mb-8 relative z-10">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl bg-white/[0.03] border border-white/5 shadow-inner ${colorClass}`}>
        {icon}
      </div>
      <span className="flex h-2 w-2 relative mt-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorClass.replace('text-', 'bg-')}`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${colorClass.replace('text-', 'bg-')}`}></span>
      </span>
    </div>
    <div className="relative z-10">
      <h3 className={`text-4xl lg:text-5xl font-black mb-2 tracking-tighter ${colorClass}`}>
        {value}
      </h3>
      <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">
        {label}
      </p>
    </div>
  </div>
);

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("userId")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">

      {/* Ultra-Modern Arka Plan: Animated Grid & Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Hareketli Izgara (Grid) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        {/* Dinamik Renk Küreleri */}
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[800px] bg-emerald-600/10 blur-[180px] rounded-full mix-blend-screen opacity-50 animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen opacity-30" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="relative z-[100] w-full border-b border-white/5 bg-transparent px-6 md:px-12 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-xs font-black text-[#0b1120] shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-transform">
              VP
            </div>
            <span className="text-2xl font-black tracking-tighter italic uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Visa Pass
            </span>
          </Link>

          {/* Menü Linkleri */}
          <div className="hidden lg:flex items-center gap-12 text-white/40 text-[11px] font-black uppercase tracking-[0.3em]">
            <a href="#features" className="hover:text-emerald-400 transition-all hover:tracking-[0.4em]">Özellikler</a>
            <a href="#system" className="hover:text-emerald-400 transition-all hover:tracking-[0.4em]">Sistem</a>
            <a href="#pricing" className="hover:text-emerald-400 transition-all hover:tracking-[0.4em]">Planlar</a>
            <a href="#support" className="hover:text-emerald-400 transition-all hover:tracking-[0.4em]">Destek</a>
          </div>

          {/* CTA Butonu */}
          <div className="flex items-center gap-4">
            {isLoggedIn && (
              <button 
                onClick={() => {
                  localStorage.clear();
                  setIsLoggedIn(false);
                }} 
                className="hidden md:block px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-500 hover:text-[#020617] transition-all"
              >
                Çıkış Yap
              </button>
            )}
            <Link href={isLoggedIn ? "/dashboard" : "/login"}>
              <button className="bg-emerald-500 text-[#0b1120] px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer">
                {isLoggedIn ? "Dashboard'a Dön" : "Giriş Yap"}
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- ANA İÇERİK --- */}
      <main className="relative z-10">
        <section className="relative">
          <Hero />
        </section>

        <section className="relative z-20 -mt-20 mb-32 max-w-5xl mx-auto px-6 group">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative">
            <SearchForm />
          </div>
        </section>

        <section className="py-10 mb-32 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-6">
            <StatCard value="764+" label="Aktif Kullanıcı" colorClass="text-white" icon="🌍" />
            <StatCard value="1.530" label="Onaylı Randevu" colorClass="text-emerald-400" icon="✈️" />
            <StatCard value="%99" label="Başarı Oranı" colorClass="text-white" icon="🎯" />
            <StatCard value="142ms" label="Tarama Hızı" colorClass="text-cyan-400" icon="⚡" />
          </div>
        </section>

        <section id="system" className="mb-40 scroll-mt-32">
          <Dashboard />
        </section>

        <section id="features" className="scroll-mt-32 mb-40">
          <HowItWorks />
          <div className="mt-20">
            <Features />
          </div>
        </section>

        <section className="mb-40">
          <Testimonials />
        </section>

        <section id="pricing" className="scroll-mt-32 mb-40">
          <Pricing />
        </section>

        <section id="support" className="scroll-mt-32 mb-40">
          <FAQ />
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}