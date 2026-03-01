export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
      <div className="inline-flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/20 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400 mb-10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        Sistem Aktif: 1,200+ Kullanıcı
      </div>
      <h1 className="text-7xl md:text-9xl font-black mb-10 tracking-tight text-white">Arel Pass</h1>
      <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-16 font-light">
        Vize randevusu aramakla vakit kaybetmeyin. <span className="text-emerald-400 font-semibold italic">Yapay zeka destekli</span> botumuzla randevuları saniyesinde yakalayın.
      </p>
    </section>
  );
}