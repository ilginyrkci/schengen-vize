import React from 'react';

// Tek bir adımı gösteren rafine bileşen
const WorkStep = ({ number, title, desc }) => (
  <div className="flex gap-6 group">
    <div className="flex-none w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-emerald-400 font-black text-lg transition-all duration-500 group-hover:bg-emerald-500 group-hover:text-[#0b1120] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
      {number}
    </div>
    <div className="text-left">
      <h4 className="text-white font-bold text-xl mb-2 tracking-tight group-hover:text-emerald-400 transition-colors">{title}</h4>
      <p className="text-white/40 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

export default function HowItWorks() {
  return (
    <section className="py-32 max-w-7xl mx-auto px-6 relative overflow-hidden">
      
      {/* Arka plan süslemesi */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-500/5 blur-[120px] rounded-full -z-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* SOL TARAF: Bot Simülasyonu (Live Terminal) */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-2xl rounded-[3rem] opacity-50 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative bg-[#0b1120]/80 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
            
            {/* Terminal Üst Bar */}
            <div className="flex gap-1.5 mb-8 border-b border-white/5 pb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20"></div>
              <span className="ml-4 text-[10px] text-white/20 font-mono tracking-widest uppercase">Visa_Pass_Engine_v2.0</span>
            </div>

            {/* Simülasyon Terminali */}
            <div className="space-y-4 font-mono text-[11px] md:text-xs">
              <div className="flex gap-3 text-emerald-500/80">
                <span className="opacity-50 tracking-tighter">14:02:11</span>
                <span className="animate-pulse">[SCANNING]</span>
                <span>VFS_GLOBAL_DE_IST...</span>
              </div>
              
              <div className="text-white/30 pl-16 italic">Checking slot availability for July 2026...</div>
              
              <div className="flex gap-3 text-blue-400/80">
                <span className="opacity-50 tracking-tighter">14:02:13</span>
                <span>[LOG]</span>
                <span>No slots found. Retrying in 1.5s...</span>
              </div>

              {/* Progress Bar - Dinamik Görünüm */}
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden my-6 border border-white/5">
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full w-1/3 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
              </div>

              <div className="flex gap-3 text-emerald-400">
                <span className="opacity-50 tracking-tighter">14:02:15</span>
                <span className="font-black bg-emerald-500/20 px-1.5 rounded text-[10px] flex items-center shadow-[0_0_10px_rgba(16,185,129,0.2)]">SUCCESS</span>
                <span className="font-bold underline decoration-emerald-500/30 underline-offset-4">SLOT_FOUND: 12.07.2026</span>
              </div>

              <div className="bg-emerald-500/[0.03] border-l-2 border-emerald-500/50 pl-4 py-4 mt-6 rounded-r-xl space-y-1">
                <div className="text-white/40 text-[10px] uppercase tracking-widest">Engine Status</div>
                <div className="text-white/80 font-bold">Bot ID: VP-TR-882</div>
                <div className="text-white/80 font-bold">Latency: 84ms</div>
                <div className="text-emerald-500 font-black animate-pulse text-[10px] mt-2">BUILDING TELEGRAM NOTIFICATION...</div>
              </div>
            </div>

            {/* Arka Plan İkonu (Dekoratif) */}
            <div className="absolute bottom-4 right-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
          </div>
        </div>

        {/* SAĞ TARAF: Adım Adım Açıklama */}
        <div className="flex flex-col gap-10">
          <div className="space-y-4">
            <h2 className="text-emerald-500 font-mono text-xs tracking-[0.4em] uppercase font-black">
              Nasıl Başarılı Oluyoruz?
            </h2>
            <h3 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight italic">
              Visa Pass <br />
              <span className="text-white/30 tracking-tight not-italic">Arka Planda Nasıl Çalışır?</span>
            </h3>
            <p className="text-white/40 text-lg font-medium leading-relaxed max-w-lg">
              Siz günlük işlerinize odaklanırken, otomasyon sistemimiz konsolosluk kapılarında sizin yerinize bekler.
            </p>
          </div>

          <div className="space-y-8">
            <WorkStep 
              number="01" 
              title="Kesintisiz Veri İzleme" 
              desc="Botlarımız, belirlediğiniz kriterlere göre ilgili konsolosluk sistemlerini saniyeler içinde binlerce kez tarar ve her değişikliği anında raporlar."
            />
            <WorkStep 
              number="02" 
              title="Anlık Kota Yakalama" 
              desc="Vize merkezleri yeni bir randevu slotu açtığı anda, sistemimiz bunu herkesten önce fark eder ve verinin doğruluğunu milisaniyeler içinde onaylar."
            />
            <WorkStep 
              number="03" 
              title="Saniyeler İçinde Bildirim" 
              desc="Randevu bulunduğunda sistem durmaz; Telegram veya e-posta yoluyla size direkt randevu linkini içeren kritik bir bildirim gönderir."
            />
          </div>
        </div>

      </div>
    </section>
  );
}