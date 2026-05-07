"use client"; // Bu dosyanın sunucuda değil, doğrudan kullanıcının tarayıcısında (client-side) çalışacağını belirtir.
import React, { useEffect, useState } from 'react'; // React kütüphanesinden yaşam döngüsü (useEffect) ve durum yönetimi (useState) özelliklerini içe aktarıyoruz.
import { useRouter } from 'next/navigation'; // Sayfalar arası yönlendirme (redirect) yapabilmek için Next.js'in router hook'unu alıyoruz.
import Dashboard from '@/app/components/Dashboard'; // Canlı logların aktığı Dashboard bileşenini içe aktarıyoruz.
import SearchForm from '@/app/components/SearchForm'; // Vize arama formunu içe aktarıyoruz.
import Link from 'next/link'; // Next.js'in sayfa değiştirmeden hızlı geçiş sağlayan Link bileşenini alıyoruz.

// Sayfanın ana bileşeni (Dashboard sayfası)
export default function UserDashboard() {
  const router = useRouter(); // Yönlendirme fonksiyonlarını kullanabilmek için router'ı başlatıyoruz.
  const [userName, setUserName] = useState(""); // Kullanıcının adını tutacak olan durum (state) değişkeni. Başlangıçta boş string.
  const [isMounted, setIsMounted] = useState(false); // Sayfanın tarayıcıda tamamen yüklenip yüklenmediğini kontrol eden değişken.

  // Sayfa ilk açıldığında veya router değiştiğinde bir kere çalışacak olan fonksiyon bloğu
  useEffect(() => {
    // eslint-disable-next-line
    setIsMounted(true); // Sayfa yüklendi, artık tarayıcı özelliklerini (localStorage vb.) güvenle kullanabiliriz.
    
    const userId = localStorage.getItem("userId"); // Tarayıcı hafızasından kullanıcının ID'sini çekmeye çalışıyoruz.
    
    // Eğer ID yoksa, demek ki kullanıcı giriş yapmamış. Onu zorla login sayfasına gönderiyoruz.
    if (!userId) {
      router.push('/login');
      return; // Alt satırlara inmeden işlemi bitiriyoruz.
    }

    // Tarayıcı hafızasında hangi isimle kaydedildiyse o ismi bulmaya çalışıyoruz.
    const foundName = localStorage.getItem("fullName") || localStorage.getItem("full_name") || localStorage.getItem("name") || localStorage.getItem("ad_soyad");

    // İsim bulunduysa ve undefined/null gibi geçersiz bir metin değilse:
    if (foundName && foundName !== "undefined" && foundName !== "null") {
      setUserName(foundName); // Kullanıcının adını state'e atıyoruz.
    } else {
      // Hiçbir isim bulunamadıysa varsayılan olarak "MİSAFİR KULLANICI" yazıyoruz.
      setUserName("MİSAFİR KULLANICI");
    }
  }, [router]); // Router değişirse bu kontrolü tekrarla diyoruz.

  // İsim veya soyisim ayrımı yapmak için oluşturduğumuz küçük bir yardımcı fonksiyon.
  const getFirstName = () => {
    // Eğer isim yoksa veya hala yükleniyorsa sadece "Misafir" döndür.
    if (typeof userName !== 'string' || !userName || userName === "MİSAFİR KULLANICI" || userName === "YÜKLENİYOR...") {
      return "Misafir";
    }
    // İsmi boşluklardan böl ve sadece ilk kelimeyi (yani ilk adı) al.
    return userName.split(' ')[0];
  };

  const firstName = getFirstName(); // Ekranda göstermek üzere ilk adı hazırlıyoruz.

  // Eğer sayfa henüz tarayıcıda hazır değilse (SSR engellemesi) siyah bir yükleniyor ekranı gösteriyoruz.
  if (!isMounted) {
    return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white/50 text-sm tracking-widest uppercase">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 relative overflow-hidden font-sans">
      
      {/* Ultra-Modern Arka Plan: Animated Grid & Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Hareketli Izgara (Grid) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        {/* Dinamik Renk Küreleri */}
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[800px] bg-emerald-600/10 blur-[180px] rounded-full mix-blend-screen opacity-50 animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen opacity-30" />
      </div>

      {/* Cam Görünümlü Navbar (Sabit değil) */}
      <nav className="relative z-50 border-b border-white/[0.08] bg-[#0a0a0a]/60 backdrop-blur-3xl px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center text-sm font-black text-[#050505] shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              VP
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Hoş Geldin</span>
              <span className="text-sm font-black uppercase tracking-[0.1em] text-white/90">
                {userName || "YÜKLENİYOR..."}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="group flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs font-bold uppercase tracking-widest text-white/70 hover:bg-white/[0.08] hover:text-white transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Ana Sayfa
            </Link>
            <Link 
              href="/" 
              onClick={() => localStorage.clear()} 
              className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-bold uppercase tracking-widest text-red-400 hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all"
            >
              Çıkış
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10 space-y-8">
        
        {/* BENTO BOX BÖLÜM 1: Profil ve Statlar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Karşılama Kartı */}
          <div className="col-span-1 lg:col-span-2 relative bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/10 p-10 rounded-[2.5rem] overflow-hidden group">
            {/* Kart İçi Işık */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative z-10 flex flex-col h-full justify-center">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                Merhaba, <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">{firstName}</span>
              </h1>
              <p className="text-white/50 text-sm font-medium tracking-wide mb-8 max-w-md">
                Visa Pass yapay zeka motoru devrede. Randevularını anlık olarak tarıyor ve boşluk yakaladığında seni bilgilendiriyor.
              </p>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 px-5 py-3 rounded-2xl">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Sistem Aktif</span>
                </div>
                <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 px-5 py-3 rounded-2xl">
                  <span className="text-xl">🚀</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/80">Sınırsız VIP</span>
                </div>
              </div>
            </div>
          </div>

          {/* İstatistik / Hızlı Bilgi Kartı */}
          <div className="col-span-1 bg-[#111] border border-white/10 p-8 rounded-[2.5rem] flex flex-col justify-between">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-6">Canlı Tarama Hızı</h3>
              <div className="text-6xl font-black tracking-tighter text-white">
                142<span className="text-2xl text-emerald-500">ms</span>
              </div>
            </div>
            <div className="mt-8">
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-3 text-right">Performans İndeksi</p>
            </div>
          </div>
        </div>

        {/* BENTO BOX BÖLÜM 2: Arama ve Liste */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Sol: Yeni Arama Formu */}
          <div className="xl:col-span-5 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[3rem]"></div>
            <div className="relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-[2.5rem] h-full shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-white/[0.05] flex items-center justify-center border border-white/10 text-emerald-400">🎯</span>
                  Yeni Takip
                </h2>
              </div>
              <SearchForm />
            </div>
          </div>

          {/* Sağ: Aktif Takipler Listesi */}
          <div className="xl:col-span-7 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-white/[0.05] flex items-center justify-center border border-white/10 text-cyan-400">⚡</span>
                Aktif Takipler & Bot Akışı
              </h2>
              <div className="px-3 py-1 bg-white/[0.05] border border-white/10 rounded-lg text-[10px] font-bold text-white/50 tracking-widest uppercase">
                Canlı
              </div>
            </div>
            <Dashboard />
          </div>

        </div>

      </main>
    </div>
  );
}