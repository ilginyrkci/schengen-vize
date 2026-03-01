const VisaCard = ({ name, country, time, status, code }) => {
  const statusColors = {
    'Bekliyor': 'border-orange-500/50 text-orange-500 bg-orange-500/10',
    'Kontrol': 'border-blue-500/50 text-blue-500 bg-blue-500/10',
    'Bulundu': 'border-emerald-500/50 text-emerald-500 bg-emerald-500/10'
  };
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all">
      <div className="flex items-center gap-4 text-left">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-xs">{code}</div>
        <div>
          <h4 className="text-white text-sm font-bold">{name} <span className="text-gray-600 font-normal ml-1">{country}</span></h4>
          <p className="text-[10px] text-gray-500 uppercase font-medium">🔔 bildirim kuruldu</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[10px] text-gray-600 font-medium">{time}</span>
        <span className={`px-3 py-1 rounded-full text-[9px] font-bold border ${statusColors[status]}`}>{status}</span>
      </div>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-28 max-w-6xl mx-auto px-6">
      <div className="lg:col-span-2 bg-[#0b1120]/40 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl text-left">
        <h3 className="text-white font-bold flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Canlı Talep Akışı
        </h3>
        <div className="space-y-3">
          <VisaCard name="Pınar H." country="Avusturya" time="Az önce" status="Bekliyor" code="AT" />
          <VisaCard name="Oğuz F." country="Fransa" time="2 dk önce" status="Kontrol" code="FR" />
          <VisaCard name="Ayşe D." country="Fransa" time="5 dk önce" status="Bekliyor" code="FR" />
          <VisaCard name="Merve K." country="Norveç" time="8 dk önce" status="Bulundu" code="NO" />
        </div>
      </div>
      <div className="flex flex-col gap-6 text-left text-white">
        <div className="bg-[#0b1120]/60 border border-emerald-500/20 p-6 rounded-[2rem] backdrop-blur-xl">
          <h3 className="font-bold mb-2 flex items-center gap-2"><span className="text-emerald-400 text-lg">ⓘ</span> Sistem Notu</h3>
          <p className="text-gray-400 text-sm leading-relaxed font-light">VFS Global sistemleri şu an stabil. Fransa ve Hollanda kotaları saniyeler içinde güncellenmektedir.</p>
        </div>
        <div className="bg-[#0b1120]/60 border border-white/5 p-6 rounded-[2rem] backdrop-blur-xl">
          <h3 className="text-xs uppercase tracking-widest font-black text-emerald-500 mb-6 font-bold">Anlık Analiz</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-xs font-medium"><span className="text-gray-500">Dakikadaki Tarama</span><span className="text-emerald-400 font-bold">142</span></div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden"><div className="bg-emerald-500 h-full w-[65%]"></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}