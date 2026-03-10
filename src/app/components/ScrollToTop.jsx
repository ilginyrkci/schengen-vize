"use client";
import React, { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Kaydırma takibi
  useEffect(() => {
    const toggleVisibility = () => {
      // window.scrollY modern tarayıcılar için daha standarttır
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`fixed bottom-10 right-10 z-[70] transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
      isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-20 pointer-events-none'
    }`}>
      <button
        onClick={scrollToTop}
        className="group relative p-4 bg-[#0b1120]/80 border border-white/10 rounded-2xl backdrop-blur-2xl hover:border-emerald-500/50 transition-all duration-500 shadow-2xl hover:shadow-emerald-500/20"
        aria-label="Visa Pass: Başa Dön"
      >
        {/* Arka Plan Işığı (Hovarda Parlayan) */}
        <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
        
        {/* İkon Konteyneri */}
        <div className="relative overflow-hidden h-6 w-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-emerald-400 group-hover:-translate-y-12 transition-transform duration-500 ease-in-out" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
          </svg>
          
          {/* Hoverda Alttan Gelen İkon (Loop Efekti) */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-emerald-400 absolute top-12 left-0 group-hover:top-0 transition-all duration-500 ease-in-out" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
          </svg>
        </div>

        {/* Kenar Süslemesi (Küçük Teknik Detay) */}
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500/50"></span>
        </span>
      </button>
    </div>
  );
}