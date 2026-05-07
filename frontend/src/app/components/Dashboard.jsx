const VisaCard = ({ name, country, time, status, code }) => {
  const statusColors = {
    'Bekliyor': 'border-orange-500/30 text-orange-400 bg-orange-500/5',
    'Kontrol': 'border-blue-500/30 text-blue-400 bg-blue-500/5',
    'Bulundu': 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5'
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.06] transition-all group">
      <div className="flex items-center gap-4 text-left">
        {/* Ülke Kodu Logosu */}
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs shadow-inner">
          {code}
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold flex items-center gap-2">
            {name} 
            <span className="text-white/30 font-normal text-xs">• {country}</span>
          </h4>
          <p className="flex items-center gap-1.5 text-[10px] text-emerald-500/70 uppercase tracking-wider font-bold mt-0.5">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
            Bildirim Aktif
          </p>
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-1.5">
        <span className={`px-3 py-1 rounded-lg text-[10px] font-bold border ${statusColors[status]}`}>
          {status}
        </span>
        <span className="text-[10px] text-white/20 font-medium group-hover:text-white/40 transition-colors">
          {time}
        </span>
      </div>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-28 max-w-6xl mx-auto px-6">
      
      {/* Sol Kolon: Canlı Akış */}
      <div className="lg:col-span-2 bg-[#0b1120]/40 border border-white/10 p-6 md:p-8 rounded-[2.5rem] backdrop-blur-2xl text-left shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-white font-bold flex items-center gap-3 text-lg">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-20"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            Canlı Talep Akışı
          </h3>
          <span className="text-white/30 text-[10px] uppercase font-bold tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">
            Real-time
          </span>
        </div>

        <div className="space-y-3">
          <VisaCard name="Pınar H." country="Avusturya" time="Az önce" status="Bekliyor" code="AT" />
          <VisaCard name="Oğuz F." country="Fransa" time="2 dk önce" status="Kontrol" code="FR" />
          <VisaCard name="Ayşe D." country="Fransa" time="5 dk önce" status="Bekliyor" code="FR" />
          <VisaCard name="Merve K." country="Norveç" time="8 dk önce" status="Bulundu" code="NO" />
        </div>
      </div>

      {/* Sağ Kolon: İstatistik ve Notlar */}
      <div className="flex flex-col gap-6 text-left">
        
        {/* Sistem Notu */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 p-6 rounded-[2rem] backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <span className="text-4xl">⚡</span>
          </div>
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <span className="text-emerald-400">ⓘ</span> Sistem Notu
          </h3>
          <p className="text-white/60 text-sm leading-relaxed font-medium">
            VFS Global sistemleri şu an stabil. <span className="text-emerald-400">Fransa ve Hollanda</span> kotaları saniyeler içinde güncellenmektedir.
          </p>
        </div>

        {/* Anlık Analiz */}
        <div className="bg-[#0b1120]/60 border border-white/10 p-6 rounded-[2rem] backdrop-blur-xl shadow-xl">
          <h3 className="text-[11px] uppercase tracking-[0.2em] font-black text-white/40 mb-8">
            Verimlilik Analizi
          </h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold mb-3">
                <span className="text-white/50 uppercase tracking-tighter">Tarama Hızı</span>
                <span className="text-emerald-400 tracking-widest">142/dk</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-[1px] border border-white/5">
                <div 
                  className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]" 
                  style={{ width: '65%' }}
                ></div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-white/30 uppercase font-bold">Aktif Bot</p>
                <p className="text-xl font-black text-white">24 <span className="text-emerald-500 text-xs">▲</span></p>
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase font-bold">Başarı</p>
                <p className="text-xl font-black text-white">%94</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}