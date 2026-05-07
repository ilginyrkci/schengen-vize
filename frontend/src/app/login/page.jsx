"use client"; // Bu bileşenin doğrudan tarayıcıda (client-side) çalışacağını belirtir.
import React, { useState } from 'react'; // Durum (state) yönetimi için useState hook'unu dahil ediyoruz.
import { useRouter } from 'next/navigation'; // Giriş/Kayıt sonrası sayfalar arası geçiş yapmak için useRouter hook'u.
import Link from 'next/link'; // Sayfayı yenilemeden diğer sayfalara geçiş sağlamak için Link bileşeni.
import { toast } from 'react-hot-toast'; // Ekrana şık hata/başarı bildirimleri çıkarmak için kullandığımız kütüphane.

// Giriş ve Kayıt İşlemlerinin Yapıldığı Ana Sayfa Bileşeni
export default function LoginPage() {
  const router = useRouter(); // Yönlendirme motorunu başlatıyoruz.
  
  // Yüklenme durumunu takip etmek için state (Butona basıldığında butonu pasif yapmak için)
  const [loading, setLoading] = useState(false);
  
  // Ekranın "Giriş Yap" mı yoksa "Kayıt Ol" formunu mu göstereceğini belirleyen state
  const [isLogin, setIsLogin] = useState(true);

  // Form elemanlarının (Email, Şifre, Ad Soyad) anlık değerlerini tutan obje state'i
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });

  // İnput kutularına yazı yazıldıkça formData state'ini güncelleyen fonksiyon
  const handleChange = (e) => {
    // Önceki formData verilerini kopyala, sonra sadece değişen input'u (e.target.name) yeni değerle (e.target.value) güncelle.
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Forma tıklandığında (Giriş veya Kayıt) çalışacak olan asıl fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault(); // Formun varsayılan davranışını (sayfayı yenilemeyi) engeller.
    setLoading(true); // Yüklenme (loading) animasyonunu başlatır.

    // Kullanıcı giriş mi yapıyor yoksa kayıt mı oluyor? Ona göre backend adresini seçiyoruz.
    const endpoint = isLogin ? "/api/login" : "/api/register";
    
    try {
      // Backend sunucusuna (FastAPI) verileri POST metodu ile gönderiyoruz.
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Verinin JSON formatında olduğunu belirtiriz.
        body: JSON.stringify(formData), // State'teki objeyi JSON string'ine çevirip göndeririz.
      });

      const data = await response.json(); // Sunucudan dönen cevabı JSON olarak okuruz.

      // Eğer sunucudan "200 OK" gibi başarılı bir yanıt dönerse:
      if (response.ok) {
        if (isLogin) {
          // Giriş işlemi başarılı olduysa:
          // Kullanıcının ID, Email ve İsim bilgilerini tarayıcının hafızasına (localStorage) yazarız.
          // Böylece sayfa yenilense bile kullanıcının giriş yaptığını hatırlayabiliriz.
          localStorage.setItem("userId", data.user_id);
          localStorage.setItem("userEmail", data.email);
          localStorage.setItem("fullName", data.full_name || data.fullName);
          
          toast.success("Giriş başarılı!"); // Ekrana başarılı mesajı çıkartıyoruz.
          router.push('/dashboard'); // Kullanıcıyı kendi paneline (Dashboard) yönlendiriyoruz.
        } else {
          // Kayıt işlemi başarılı olduysa:
          toast.success("Kayıt başarılı! Şimdi giriş yapabilirsin.");
          setIsLogin(true); // Formu tekrar "Giriş Yap" görünümüne çeviriyoruz.
          setLoading(false); // Yükleniyor durumunu kapatıyoruz.
        }
      } else {
        // Sunucu hata fırlattıysa (Örneğin: "Bu email zaten kayıtlı" veya "Yanlış şifre")
        toast.error(data.detail || "Bir hata oluştu!");
        setLoading(false); // Yükleniyor durumunu kapat.
      }
    } catch (error) {
      // Eğer sunucuya hiç bağlanılamazsa (Örneğin backend kapalıysa)
      console.error("Bağlantı hatası:", error);
      toast.error("Backend çalışmıyor olabilir, main.py'ı kontrol et!");
      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col relative overflow-hidden selection:bg-emerald-500/30">
      
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full" />
      </div>

      <nav className="relative z-[100] w-full border-b border-white/5 bg-transparent px-6 md:px-12 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-xs font-black text-[#0b1120] shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-transform">
              VP
            </div>
            <span className="text-2xl font-black tracking-tighter italic uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Visa Pass
            </span>
          </Link>

          <Link href="/" className="flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Ana Sayfa
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#0b1120]/40 border border-white/10 backdrop-blur-3xl p-10 rounded-[3rem] shadow-2xl relative">
          
          <div className="flex flex-col items-center mb-10 text-center">
            <h1 className="text-3xl font-black tracking-tighter italic uppercase mb-2">
              {isLogin ? "Giriş Yap" : "Kayıt Ol"}
            </h1>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] italic">
              {isLogin ? "Hesabınıza Erişin" : "Hemen Takibe Başlayın"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black ml-2 leading-none italic">Ad Soyad</label>
                <input 
                  type="text" 
                  name="fullName"
                  required 
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Ahmet Erdoğan" 
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-emerald-500/50 transition-all text-sm placeholder:text-white/10" 
                />
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black ml-2 leading-none italic">E-Posta</label>
              <input 
                type="email" 
                name="email"
                required 
                value={formData.email}
                onChange={handleChange}
                placeholder="isim@mail.com" 
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-emerald-500/50 transition-all text-sm placeholder:text-white/10" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black ml-2 leading-none italic">Şifre</label>
              <input 
                type="password" 
                name="password"
                required 
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••" 
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-emerald-500/50 transition-all text-sm placeholder:text-white/10" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 ${
                loading 
                ? 'bg-emerald-500/50 text-[#0b1120] cursor-not-allowed' 
                : 'bg-emerald-500 hover:bg-emerald-400 text-[#0b1120] shadow-emerald-500/20'
              }`}
            >
              {loading && <div className="w-4 h-4 border-2 border-[#0b1120] border-t-transparent rounded-full animate-spin"></div>}
              {loading ? "İşleniyor..." : (isLogin ? "Sisteme Giriş Yap" : "Hesabı Oluştur")}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-white/30 text-[10px] font-black uppercase tracking-widest hover:text-emerald-400 transition-colors"
            >
              {isLogin ? (
                <>Hesabınız yok mu? <span className="text-emerald-500 underline underline-offset-4 ml-1">Kayıt Olun</span></>
              ) : (
                <>Zaten üye misiniz? <span className="text-emerald-500 underline underline-offset-4 ml-1">Giriş Yapın</span></>
              )}
            </button>
          </div>

          <p className="mt-8 text-center text-white/5 text-[9px] font-black uppercase tracking-[0.4em] leading-relaxed">
            VISA PASS SECURE PROTOCOL <br /> v2.4.0 ENCRYPTED
          </p>
        </div>
      </div>
    </div>
  );
}