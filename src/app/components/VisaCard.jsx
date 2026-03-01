import React from 'react';

export default function VisaCard({ name, country, time, status, code }) {
  const statusColors = {
    'Bekliyor': 'border-orange-500/50 text-orange-500 bg-orange-500/10',
    'Kontrol': 'border-blue-500/50 text-blue-500 bg-blue-500/10',
    'Bulundu': 'border-emerald-500/50 text-emerald-500 bg-emerald-500/10'
  };

  return (
    <div className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold text-xs">
          {code}
        </div>
        <div>
          <h4 className="text-white text-sm font-bold">{name} <span className="text-gray-600 font-normal ml-1">{country}</span></h4>
          <p className="text-[10px] text-gray-500 uppercase tracking-tighter">🔔 bildirim kuruldu</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-[10px] text-gray-600 font-medium">{time}</span>
        <span className={`px-3 py-1 rounded-full text-[9px] font-bold border ${statusColors[status] || statusColors['Bekliyor']}`}>
          {status}
        </span>
      </div>
    </div>
  );
}