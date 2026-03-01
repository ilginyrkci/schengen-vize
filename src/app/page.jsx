import React from 'react';
import './globals.css'; 

// Bileşenleri Import Et
import Hero from '@/app/components/Hero';
import SearchForm from '@/app/components/SearchForm';
import Dashboard from '@/app/components/Dashboard';
import Features from '@/app/components/Features';
import HowItWorks from '@/app/components/HowItWorks';
import FAQ from '@/app/components/FAQ';
import Pricing from '@/app/components/Pricing';
import Testimonials from '@/app/components/Testimonials';
import Footer from '@/app/components/Footer';

// StatCard - İstatistik parçası
const StatCard = ({ value, label, colorClass }) => (
  <div className="group bg-[#0b1120]/40 border border-emerald-900/30 p-8 rounded-3xl text-center backdrop-blur-md hover:border-emerald-500/50 transition-all shadow-lg hover:shadow-emerald-500/10">
    <h3 className={`text-4xl font-black mb-1 ${colorClass}`}>{value}</h3>
    <p className="text-gray-500 mt-2 text-[10px] uppercase tracking-[0.2em] font-bold">{label}</p>
  </div>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-emerald-500/30">
      
      {/* Arka Plan Glow Efektleri */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-emerald-900/15 blur-[140px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-blue-900/15 blur-[120px] rounded-full" />
      </div>

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-8 max-w-7xl mx-auto border-b border-white/5 backdrop-blur-sm sticky top-0 z-50">
        <div className="text-2xl font-bold flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-emerald-400 to-cyan-600 rounded-xl flex items-center justify-center text-sm font-black text-black shadow-lg shadow-emerald-500/20">AP</div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-300 font-extrabold tracking-tighter uppercase">Arel Pass</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-emerald-400 transition-colors">Özellikler</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Sistem</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Destek</a>
        </div>
        <button className="bg-emerald-500 text-black px-8 py-2.5 rounded-full text-xs font-black hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-500/20 uppercase tracking-widest">
          BAŞLA
        </button>
      </nav>

      <main className="pb-40">
        {/* Giriş Bölümü */}
        <Hero />

        {/* Form Bölümü */}
        <div className="mb-32 max-w-4xl mx-auto px-6 relative group">
          <div className="absolute -inset-1 bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative bg-[#0b1120]/80 p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl shadow-3xl">
              <h2 className="text-[10px] uppercase tracking-[0.5em] font-black mb-10 text-emerald-500/60 text-center">Randevu Arama Motoru</h2>
              <SearchForm />
          </div>
        </div>
        {/* Final İstatistikler */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
          <StatCard value="764+" label="Aktif Kullanıcı" colorClass="text-emerald-400" />
          <StatCard value="1.530" label="Onaylı Randevu" colorClass="text-cyan-400" />
          <StatCard value="%99" label="Başarı Oranı" colorClass="text-emerald-500" />
          <StatCard value="24/7" label="Hızlı Tarama" colorClass="text-cyan-500" />
        </div>

        {/* Dashboard: Canlı Akış */}
        <Dashboard />
        
        {/* Bento Grid Özellikler (Etkileyici Bölüm) */}
        <Features />

        {/* Bot Nasıl Çalışır? (Simülasyonlu Bölüm) */}
        <HowItWorks />
        <FAQ />
        <Pricing />
        <Testimonials />
      </main>

      {/* Modern Footer */}
      <Footer />
    </div>
  );
}