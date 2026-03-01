import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#020617] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Logo ve Hakkında */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-600 rounded-lg flex items-center justify-center text-[10px] font-black text-black">AP</div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-300">
                Arel Pass
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Vize randevu süreçlerinizi yapay zeka ve otomasyon ile hızlandıran yeni nesil çözüm ortağınız.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest text-emerald-500/80">Ürün</h4>
            <ul className="space-y-4 text-gray-500 text-sm mt-6">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Nasıl Çalışır?</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Fiyatlandırma</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Başarı Oranları</a></li>
            </ul>
          </div>

          {/* Destek */}
          <div>
            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest text-emerald-500/80">Destek</h4>
            <ul className="space-y-4 text-gray-500 text-sm mt-6">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">S.S.S</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">İletişim</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Rehber</a></li>
            </ul>
          </div>

          {/* Yasal */}
          <div>
            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest text-emerald-500/80">Yasal</h4>
            <ul className="space-y-4 text-gray-500 text-sm mt-6">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">KVKK</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Kullanım Koşulları</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-[10px] uppercase tracking-widest">
            © 2026 AREL PASS. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center hover:border-emerald-500/30 transition-all cursor-pointer text-gray-500 hover:text-emerald-400">𝕏</div>
            <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center hover:border-emerald-500/30 transition-all cursor-pointer text-gray-500 hover:text-emerald-400">in</div>
          </div>
        </div>
      </div>
    </footer>
  );
}