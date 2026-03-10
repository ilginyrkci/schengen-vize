"use client";
import React from 'react';
import Dashboard from '@/app/components/Dashboard'; 
import SearchForm from '@/app/components/SearchForm';
import Link from 'next/link';

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-emerald-500/30">
      
      {/* Panel Navigasyonu */}
      <nav className="border-b border-white/5 bg-[#0b1120]/20 backdrop-blur-xl sticky top-0 z-50 px-8 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center text-[10px] font-black text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]">VP</div>
            <span className="text-sm font-black uppercase tracking-widest italic">Ilgın Habibe Yürekçi</span>
          </div>
          <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-red-500 transition-colors">
            Oturumu Kapat
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        
        {/* Karşılama Alanı */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">Hoş Geldin, Ilgın</h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Sistem Tarama Durumu: Aktif
            </p>
          </div>
          <div className="bg-emerald-500/5 border border-emerald-500/20 px-6 py-3 rounded-2xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Takip Hakkı: Sınırsız</span>
          </div>
        </div>

        {/* Ana Aksiyon: Yeni Takip Başlat */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-2xl opacity-50"></div>
          <div className="relative bg-[#0b1120]/40 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-2xl">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-8 ml-2 italic">Yeni Takip Filtresi Oluştur</h2>
            <SearchForm />
          </div>
        </div>

        {/* Mevcut Akış Listesi */}
        <div className="space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white/30 ml-2 italic">Aktif Takiplerin & Canlı Akış</h2>
          <Dashboard />
        </div>

      </main>
    </div>
  );
}