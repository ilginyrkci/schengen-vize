const StatCard = ({ value, label, colorClass }) => (
  <div className="bg-[#0b1120]/40 border border-emerald-900/30 p-8 rounded-3xl text-center backdrop-blur-md">
    <h3 className={`text-4xl font-black mb-1 ${colorClass}`}>{value}</h3>
    <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold">{label}</p>
  </div>
);

export default function Stats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
      <StatCard value="764+" label="Aktif Bot" colorClass="text-emerald-400" />
      <StatCard value="1.530" label="Randevu" colorClass="text-cyan-400" />
      <StatCard value="%99" label="Başarı" colorClass="text-emerald-500" />
      <StatCard value="24/7" label="Tarama" colorClass="text-cyan-500" />
    </div>
  );
}