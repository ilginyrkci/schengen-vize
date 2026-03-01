import React from 'react';

const WorkStep = ({ number, title, desc }) => (
  <div className="flex gap-6 group">
    <div className="flex-none w-12 h-12 rounded-full border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center text-emerald-400 font-black group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
      {number}
    </div>
    <div className="text-left">
      <h4 className="text-white font-bold text-lg mb-2">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function HowItWorks() {
  return (
    <section className="py-32 max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* SOL TARAF: Hareketli Bot Simülasyonu */}
        <div className="relative">
          <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full"></div>
          <div className="relative bg-[#0b1120] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden">
            {/* Sahte Tarama Satırları */}
            <div className="space-y-4 font-mono text-[10px]">
              <div className="flex gap-2 text-emerald-500 animate-pulse">
                <span>[SCANNING]</span> <span>VFS_GLOBAL_FR_PARIS...</span>
              </div>
              <div className="text-gray-600">Checking slot availability for June 2026...</div>
              <div className="flex gap-2 text-blue-400 italic">
                <span>[CHECK]</span> <span>No slots found. Retrying in 2s...</span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-1/3 animate-progress"></div>
              </div>
              <div className="flex gap-2 text-emerald-500">
                <span>[SUCCESS]</span> <span className="bg-emerald-500 text-black px-1 font-bold">SLOT FOUND: 14.06.2026</span>
              </div>
              <div className="text-gray-400 border-l border-emerald-500 pl-4 py-2 mt-4">
                Bot ID: AP-764 <br />
                Response Time: 142ms <br />
                Status: Notification Sent
              </div>
            </div>

            {/* Simülasyon İkonu */}
            <div className="absolute bottom-6 right-6 opacity-20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
          </div>
        </div>

        {/* SAĞ TARAF: Adım Adım Açıklama */}
        <div className="flex flex-col gap-12">
          <div>
            <h2 className="text-emerald-500 font-mono text-sm tracking-[0.3em] uppercase mb-4">Teknoloji</h2>
            <h3 className="text-4xl font-black text-white mb-6">Arel Pass Arka Planda Nasıl Çalışır?</h3>
          </div>

          <div className="space-y-10">
            <WorkStep 
              number="01" 
              title="Kesintisiz Veri İzleme" 
              desc="Botlarımız, belirlediğiniz kriterlere göre (ülke, şehir, tarih aralığı) ilgili konsolosluk sistemlerini saniyeler içinde binlerce kez tarar."
            />
            <WorkStep 
              number="02" 
              title="Anlık Kota Yakalama" 
              desc="Vize merkezleri yeni bir randevu slotu açtığı anda, sistemimiz bunu herkesten önce fark eder ve veriyi doğrular."
            />
            <WorkStep 
              number="03" 
              title="Saniyeler İçinde Bildirim" 
              desc="Randevu bulunduğunda sistem durmaz; Telegram, SMS veya e-posta yoluyla size direkt link içeren bir bildirim gönderir."
            />
          </div>
        </div>

      </div>
    </section>
  );
}