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

// İstatistik Kartı
const StatCard = ({ value, label, colorClass }) => (
  <div className="group bg-[#0b1120]/40 border border-white/5 p-8 rounded-[2.5rem] text-center backdrop-blur-xl hover:border-emerald-500/30 transition-all duration-500 relative overflow-hidden">
    <div className={`absolute -inset-1 opacity-0 group-hover:opacity-10 transition-opacity blur-2xl rounded-full ${colorClass.replace('text', 'bg')}`} />
    <h3 className={`text-5xl font-black mb-2 tracking-tighter transition-transform group-hover:scale-110 duration-500 ${colorClass}`}>
      {value}
    </h3>
    <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-black italic">
      {label}
    </p>
  </div>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">

      {/* DİNAMİK ARKA PLAN IŞIKLARI */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-emerald-500/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full" />
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

          {/* CTA Butonu - ARTIK ÇALIŞIYOR */}
          <Link href="/login">
            <button className="bg-emerald-500 text-[#0b1120] px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 cursor-pointer">
              Giriş Yap
            </button>
          </Link>
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

        <section className="py-10 mb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
            <StatCard value="764+" label="Aktif Kullanıcı" colorClass="text-white" />
            <StatCard value="1.530" label="Onaylı Randevu" colorClass="text-emerald-400" />
            <StatCard value="%99" label="Başarı Oranı" colorClass="text-white" />
            <StatCard value="142ms" label="Tarama Hızı" colorClass="text-emerald-500" />
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