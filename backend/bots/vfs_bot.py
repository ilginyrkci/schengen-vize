import asyncio
import os
import random
import winsound
import shutil
import re
from playwright.async_api import async_playwright
import playwright_stealth
from camoufox.async_api import AsyncCamoufox
import aiohttp

# --- TELEGRAM AYARLARI ---
TELEGRAM_BOT_TOKEN = "8704306876:AAHBg4tCCBolHjCcSqeduFSxsrRHE5TLDJA"
LAST_UPDATE_ID = 0

# --- AYARLAR (4 İŞÇİ İÇİN HAZIR ALTYAPI) ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

ACCOUNTS = [
    # 🟢 AKTİF OLAN 1. HESAP (Şu an sadece bu çalışacak)
    {
        "email": "ferdiiguler@gmail.com",
        "password": "241197Fg!",
        "first_name": "Umut",
        "last_name": "Güler",
        "passport": "U12345678",
        "phone": "5356562981"
    },
    # 🔴 İLERİDE EKLENECEK DİĞER HESAPLAR (Test başarılı olunca başlarındaki '#' işaretini silin)
    # { "email": "hesap2@gmail.com", "password": "Sifre2!", "first_name": "İsim2", "last_name": "Soyad2", "passport": "A12345678", "phone": "5551112233" },
    # { "email": "hesap3@gmail.com", "password": "Sifre3!", "first_name": "İsim3", "last_name": "Soyad3", "passport": "B12345678", "phone": "5552223344" },
    # { "email": "hesap4@gmail.com", "password": "Sifre4!", "first_name": "İsim4", "last_name": "Soyad4", "passport": "C12345678", "phone": "5553334455" }
]

# --- OTURUM TAKİP SÜRECİ ---
session_counters = {}

# --- SIFIR KOTA İÇİN DİSK ÖNBELLEĞİ (LOCAL CACHE) ---
CACHE_DIR = os.path.join(BASE_DIR, "vfs_cache_data")
os.makedirs(CACHE_DIR, exist_ok=True)
harcanan_bayt = 0
kurtarilan_bayt = 0


async def get_vfs_code_from_telegram(timeout_sec=180):
    """Telegram botunu dinler ve SMS/E-posta ile gelen VFS şifresini yakalar"""
    global LAST_UPDATE_ID
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getUpdates"
    
    start_time = asyncio.get_event_loop().time()
    print(f"📡 [TELEGRAM] {timeout_sec} saniye boyunca telefondan gelecek kod bekleniyor...")

    async with aiohttp.ClientSession() as session:
        while (asyncio.get_event_loop().time() - start_time) < timeout_sec:
            try:
                params = {"offset": LAST_UPDATE_ID + 1, "timeout": 5}
                async with session.get(url, params=params) as response:
                    if response.status == 200:
                        data = await response.json()
                        if data.get("ok") and data.get("result"):
                            for item in data["result"]:
                                LAST_UPDATE_ID = item["update_id"]
                                message_text = item.get("message", {}).get("text", "")

                                if "VFS" in message_text.upper():
                                    match = re.search(r'\b\d{6}\b', message_text)
                                    if match:
                                        vfs_kodu = match.group(0)
                                        winsound.Beep(800, 500)
                                        return vfs_kodu
            except Exception:
                pass 
            await asyncio.sleep(2)

    return None

async def intercept_and_cache(route):
    """Resim, font ve CSS'leri diske yazar, proxy kotasını korur."""
    global harcanan_bayt, kurtarilan_bayt 
    
    request = route.request
    url = request.url
    resource_type = request.resource_type

    if "cloudflare" in url.lower() or "turnstile" in url.lower() or "captcha" in url.lower():
        await route.continue_()
        return

    cacheable_types = ["image", "font", "stylesheet", "media"]

    if resource_type in cacheable_types:
        base_url = url.split("?")[0]
        
        # 🎯 YENİ EKLENEN KISIM: Tarayıcıya dosyanın kimliğini (MIME Type) bildiriyoruz
        content_type = "application/octet-stream"
        if resource_type == "stylesheet":
            content_type = "text/css"
        elif resource_type == "image":
            if ".svg" in base_url.lower(): content_type = "image/svg+xml"
            elif ".jpg" in base_url.lower() or ".jpeg" in base_url.lower(): content_type = "image/jpeg"
            elif ".webp" in base_url.lower(): content_type = "image/webp"
            elif ".gif" in base_url.lower(): content_type = "image/gif"
            else: content_type = "image/png" # Varsayılan
        elif resource_type == "font":
            if ".woff2" in base_url.lower(): content_type = "font/woff2"
            elif ".woff" in base_url.lower(): content_type = "font/woff"
            elif ".ttf" in base_url.lower(): content_type = "font/ttf"
            else: content_type = "application/font-woff"
        # -------------------------------------------------------------------------

        safe_filename = re.sub(r'[^a-zA-Z0-9]', '_', base_url) + ".cached"
        filepath = os.path.join(CACHE_DIR, safe_filename)

        if os.path.exists(filepath):
            dosya_boyutu = os.path.getsize(filepath)
            kurtarilan_bayt += dosya_boyutu
            
            # 🎯 KRİTİK BAN ÖNLEMİ: "Sıfır Milisaniye" tuzağına düşmemek için
            await asyncio.sleep(random.uniform(0.01, 0.06))
            
            # 🎯 GÜNCELLEME: Diskten okuduğumuz veriyi, kimliğiyle (content_type) birlikte tarayıcıya veriyoruz
            await route.fulfill(path=filepath, content_type=content_type)
        else:
            try:
                print(f"📥 [CACHE İNDİRİLİYOR] Yeni {resource_type.upper()} bulundu: {safe_filename[:30]}...")
                response = await route.fetch()
                body = await response.body()
                
                harcanan_bayt += len(body)
                
                with open(filepath, "wb") as f:
                    f.write(body)
                
                await route.fulfill(response=response, body=body)
            except Exception:
                await route.continue_()
    else:
        await route.continue_()

async def diger_verileri_olc(response):
    global harcanan_bayt
    try:
        if response.request.resource_type not in ["image", "font", "stylesheet", "media"]:
            uzunluk = response.headers.get("content-length")
            if uzunluk:
                harcanan_bayt += int(uzunluk)
    except:
        pass

def clear_session_data(folder_path, country_name=""):
    """Sıkılaştırılmış temizlik"""
    global session_counters
    if country_name not in session_counters:
        session_counters[country_name] = 0
    
    if session_counters[country_name] >= 5:
        if os.path.exists(folder_path):
            try:
                shutil.rmtree(folder_path)
                session_counters[country_name] = 0
                print(f"♻️ [TEMİZLİK] {country_name.upper()} için 5 döngü doldu, oturum sıfırlandı.")
            except Exception as e:
                print(f"⚠️ [TEMİZLİK HATASI] {e}")
    else:
        session_counters[country_name] += 1
        print(f"📦 [OTURUM] {country_name.upper()} Mevcut çerezler korunuyor (Döngü: {session_counters[country_name]}/5)")

async def human_click(page, selector):
    """İnsansı Tıklama (Alan içine rastgele)"""
    try:
        element = await page.wait_for_selector(selector, timeout=15000)
        box = await element.bounding_box()
        if box:
            offset_x = random.uniform(box['width'] * 0.2, box['width'] * 0.8)
            offset_y = random.uniform(box['height'] * 0.2, box['height'] * 0.8)
            await page.mouse.move(box['x'] + offset_x, box['y'] + offset_y, steps=random.randint(20, 45))
            await asyncio.sleep(random.uniform(0.1, 0.4))
            await page.mouse.click(box['x'] + offset_x, box['y'] + offset_y)
            return True
    except Exception:
        try:
            await page.click(selector, timeout=5000)
            return True
        except:
            return False

async def human_actions(page):
    """İnsansı kaydırma ve hareketler"""
    try:
        await asyncio.sleep(random.uniform(2.1, 4.8))
        if random.random() > 0.3:
            scroll_amount = random.randint(200, 500)
            await page.mouse.wheel(0, scroll_amount)
            await asyncio.sleep(random.uniform(1.1, 2.3))
            await page.mouse.wheel(0, -scroll_amount + random.randint(-50, 50))

        for _ in range(random.randint(3, 5)):
            target_x = random.randint(200, 800)
            target_y = random.randint(200, 600)
            steps = random.randint(40, 90)
            await page.mouse.move(target_x, target_y, steps=steps)
            await asyncio.sleep(random.uniform(0.3, 0.9))
    except Exception:
        pass

async def check_ban(page, country_name):
    """Erişim engeli kontrolü"""
    try:
        content = await page.content()
        current_url = page.url
        ban_terms = ["access denied", "403 forbidden", "blocked", "page-not-found", "expired"]
        if any(term in content.lower() or term in current_url.lower() for term in ban_terms):
            print(f"🛑 [KRİTİK] {country_name.upper()} İÇİN ERİŞİM ENGELİ! IP Ban veya Limit aşımı.")
            winsound.Beep(440, 1000)
            return True
        return False
    except Exception:
        return False

# ----------------------------------------------------------------------
# 🏗️ USTA/İŞÇİ (MOLA) YÖNETİM MERKEZİ
# ----------------------------------------------------------------------

async def run_vfs_bot(country, vize_type, start, end):
    """FastAPI (main.py) üzerinden tetiklenen ana fonksiyon"""
    print(f"\n📡 [SİSTEM] Başlatıldı: {country.upper()} için operasyon başlıyor...")
    
    tasks = []
    # Listedeki aktif hesapları (ACCOUNTS) sırayla 1'er saat arayla çalıştırır
    for index, account in enumerate(ACCOUNTS):
        worker_id = index + 1
        delay = index * 3600  # 1 Saat (3600 saniye) gecikme (offset)
        tasks.append(worker_task(worker_id, account, delay, country))
    
    if tasks:
        await asyncio.gather(*tasks)
    else:
        print("❌ Aktif hesap bulunamadı!")

async def worker_task(worker_id, account_data, initial_delay_sec, target_country):
    """Her bir işçinin uyanıp çalışıp sonra 4 saat uyuduğu döngü"""
    if initial_delay_sec > 0:
        print(f"👷 [İŞÇİ {worker_id}] Hazır. İlk girişini {initial_delay_sec/60:.0f} dakika sonra yapacak...")
        await asyncio.sleep(initial_delay_sec)

    while True:
        print(f"\n🚀 [İŞÇİ {worker_id}] {target_country.upper()} için mesai başladı! (Giriş: {account_data['email']})")
        
        # Botu 1 tur çalıştırır ve geri döner
        await start_vfs_filling(target_country, account_data, worker_id)

        # 🎯 4 Saat (240 dk) Mola + 15 ile 35 dk arası rastgele Jitter
        mola_dakika = 240 + random.uniform(15, 35)
        print(f"😴 [İŞÇİ {worker_id}] Turu bitirdi. {mola_dakika:.1f} dakika uykuya geçiyor...")
        await asyncio.sleep(mola_dakika * 60)

# ----------------------------------------------------------------------
# 🤖 BOTUN ASIL İŞ YAPAN KISMI
# ----------------------------------------------------------------------

async def start_vfs_filling(current_country, user_data, worker_id):
    # 🎯 BULGARİSTAN VE DİĞERLERİ HARİTALANDI
    country_map = {
        "france": "fra", "fransa": "fra",
        "lithuania": "ltu", "litvanya": "ltu",
        "netherlands": "nld", "hollanda": "nld",
        "estonia": "est", "estonya": "est",
        "bulgaria": "bgr", "bulgaristan": "bgr"
    }

    viewports = [{"width": 1920, "height": 1080}, {"width": 1366, "height": 768}, {"width": 1536, "height": 864}]

    try:
        async with async_playwright() as p:
            print(f"🛠️ [İŞÇİ {worker_id}] İleri düzey maskeleme aktif...")
            
            try:
                # Çerez klasörünü her işçi ve ülke için ayırdık
                session_name = f"{current_country}_w{worker_id}"
                SPECIFIC_DATA_PATH = os.path.join(BASE_DIR, f"vfs_session_{session_name}")
                clear_session_data(SPECIFIC_DATA_PATH, session_name)
                
                chosen_vp = random.choice(viewports)
                print(f"🌍 [KİMLİK] {current_country.upper()} için izole tarayıcı ({chosen_vp['width']}x{chosen_vp['height']}) açılıyor...")
                
                # 🌐 PROXY AYARLARI BURADA HAZIR (İleride başındaki '#' işaretlerini sileceksin)
                # proxy_settings = {
                #     "server": "http://198.51.100.25:8080", # Buraya kendi proxy IP:Port bilgilerini yazacaksın
                #     "username": "kullanici_adi",
                #     "password": "sifre"
                # }

                try:
                    async with AsyncCamoufox(
                        headless=False,
                        humanize=True
                        # proxy=proxy_settings  # Proxy'yi aktif etmek için baştaki '#' işaretini silin
                    ) as browser:
                        
                        os.makedirs(SPECIFIC_DATA_PATH, exist_ok=True)
                        state_file = os.path.join(SPECIFIC_DATA_PATH, "state.json")
                        
                        if os.path.exists(state_file):
                            context = await browser.new_context(
                                viewport={"width": chosen_vp['width'], "height": chosen_vp['height']},
                                storage_state=state_file
                            )
                        else:
                            context = await browser.new_context(
                                viewport={"width": chosen_vp['width'], "height": chosen_vp['height']}
                            )
                            
                        page = await context.new_page()
                        
                        # 🚀 KOTA KORUMA KALKANI AKTİF
                        await page.route("**/*", intercept_and_cache)
                        page.on("response", diger_verileri_olc)
                        
                        try:
                            slug = country_map.get(current_country.lower(), "fra")
                            base_url = f"https://visa.vfsglobal.com/tur/tr/{slug}/"
                            login_url = f"{base_url}login"
                            
                            await asyncio.sleep(random.uniform(4.5, 8.2)) 
                            await page.goto(base_url, wait_until="domcontentloaded", timeout=40000)
                            await asyncio.sleep(random.uniform(3.2, 6.5))
                            await page.goto(login_url, wait_until="domcontentloaded", timeout=50000)
                            
                            try:
                                await page.click("#onetrust-accept-btn-handler", timeout=15000)
                                await context.storage_state(path=state_file)
                            except:
                                pass

                            if await check_ban(page, session_name):
                                session_counters[session_name] = 5
                                return # Ban varsa döngüden çık, uykuya geç

                            print(f"🔍 [KONTROL] Oturum kontrol ediliyor...")
                            await asyncio.sleep(random.uniform(1.0, 2.0)) 
                            if "page-not-found" in page.url or "expired" in page.url:
                                print(f"⚠️ [UYARI] Oturumu düşmüş, tazeleniyor...")
                                await page.goto(login_url)

                            # --- GİRİŞ AŞAMASI ---
                            try:
                                email_field = 'input#email:visible, input[formcontrolname="username"]:visible'
                                password_field = 'input#password:visible, input[formcontrolname="password"]:visible'
                                
                                await page.wait_for_selector(email_field, timeout=10000)
                                
                                if await human_click(page, email_field):
                                    await asyncio.sleep(random.uniform(0.3, 0.7))
                                    for char in user_data["email"]:
                                        await page.keyboard.press(char)
                                        await asyncio.sleep(random.uniform(0.3, 0.7))

                                if await human_click(page, password_field):
                                    await asyncio.sleep(random.uniform(0.3, 0.7))
                                    for char in user_data["password"]:
                                        await page.keyboard.press(char)
                                        await asyncio.sleep(random.uniform(0.05, 0.1))

                                print(f"⚠️ [DİKKAT] Bilgiler yazıldı, Cloudflare bekleniyor...")
                                print(f"📊 [KOTA] Harcanan İnternet: {harcanan_bayt / (1024 * 1024):.2f} MB | Kurtarılan (Bedava): {kurtarilan_bayt / (1024 * 1024):.2f} MB")
                                
                                captcha_selector = 'iframe[title*="Cloudflare"], iframe[src*="cloudflare"], .cf-turnstile-wrapper, iframe'
                                
                                try:
                                    print("🔍 [CAPTCHA] Ana kapsayıcı aranıyor...")
                                    captcha_container = page.locator('app-cloudflare-captcha-container').first
                                    await captcha_container.wait_for(state="visible", timeout=10000)
                                    box = await captcha_container.bounding_box()
                                    
                                    if box:
                                        target_x = box['x'] + random.uniform(25, 35)
                                        target_y = box['y'] + (box['height'] / 2) + random.uniform(-2, 2)
                                        print(f"🎯 [HEDEF] Kutu bulundu. Oraya gidiliyor...")
                                        
                                        await page.mouse.move(target_x, target_y, steps=random.randint(20, 40))
                                        await asyncio.sleep(random.uniform(0.6, 1.2))
                                        await page.mouse.down() 
                                        await asyncio.sleep(random.uniform(0.05, 0.15)) 
                                        await page.mouse.up() 
                                        print("🤖 [CAPTCHA] Doğrulama kutucuğuna tıklandı!")
                                    else:
                                        print("⚠️ [CAPTCHA] Kapsayıcı bulundu ama alanı hesaplanamadı.")
                                except Exception as e:
                                    print(f"🛑 [CAPTCHA ÇÖKTÜ/ATLANDI] Hata detayı: {e}")
                                    pass
                                
                                login_button = 'button.mat-btn-lg:visible, button:has-text("Oturum Aç"):visible'
                                if await human_click(page, login_button):
                                    print("✅ Giriş butonuna basıldı. OTP sistemi devrede...")
                                    
                                    # 🎯 MUHTEŞEM ZEKALI OTP KONTROLÜ
                                    otp_selector = 'input[formcontrolname="otp"], input[autocomplete="one-time-code"], input[maxlength="6"]'
                                    try:
                                        await page.wait_for_selector(otp_selector, timeout=12000)
                                        is_otp_required = True
                                    except:
                                        is_otp_required = False
                                        print("ℹ️ OTP sorulmadı, doğrudan panele alınmış olabilir.")

                                    if is_otp_required:
                                        alinan_kod = await get_vfs_code_from_telegram(timeout_sec=180)
                                        
                                        if alinan_kod:
                                            print(f"🔑 [OTP] Telegram'dan kod yakalandı: {alinan_kod}. Forma işleniyor...")
                                            await page.focus(otp_selector)
                                            
                                            for char in alinan_kod:
                                                await page.keyboard.press(char)
                                                await asyncio.sleep(random.uniform(0.1, 0.3))
                                            
                                            print("✅ [OTP] Kod yazıldı!")
                                            await asyncio.sleep(1.5)
                                            
                                            # İkinci Cloudflare (OTP'den Sonra Çıkarsa Diye)
                                            print("🤖 [CAPTCHA] OTP sonrası ikinci insan doğrulaması aranıyor...")
                                            try:
                                                captcha_frame = page.frame_locator('iframe[src*="cloudflare"], iframe[title*="Cloudflare"]')
                                                cb_box = captcha_frame.locator('input[type="checkbox"], .cb-wrapper')
                                                
                                                if await cb_box.count() > 0:
                                                    await cb_box.first.click(timeout=5000)
                                                    print("✅ [CAPTCHA] İkinci kutu da işaretlendi!")
                                                    await asyncio.sleep(3)
                                            except Exception:
                                                pass

                                            print("🚀 [OTP] Doğrula butonuna basılıyor...")
                                            verify_button = 'button:has-text("Verify"), button:has-text("Doğrula"), button:has-text("Submit"), button.mat-primary'
                                            await human_click(page, verify_button)
                                            
                                            print("🎉 [BAŞARILI] OTP engeli aşıldı! Panelin yüklenmesi bekleniyor...")
                                            await asyncio.sleep(random.uniform(4.0, 7.0))
                                        else:
                                            raise Exception("Telegram'a 3 dakika içinde kod düşmedi! Hata.") 
                            except Exception as e:
                                print(f"ℹ️ [BİLGİ] Giriş aşamasında hata veya zaten geçilmiş: {e}")

                            # --- RANDEVU KONTROL AŞAMASI ---
                            try:
                                await page.wait_for_selector('button:has-text("Start New Booking")', timeout=400000)
                                await asyncio.sleep(random.uniform(0.5, 1.5))
                                await human_actions(page) 
                                await human_click(page, 'button:has-text("Start New Booking")')

                                print(f"🔄 [TETİKLEME] Kategori kutusu tetikleniyor...")
                                await page.wait_for_selector('mat-select[formcontrolname="visaCategory"]', timeout=30000)
                                
                                await asyncio.sleep(random.uniform(1.1, 2.2))
                                await human_click(page, 'mat-select[formcontrolname="visaCategory"]')
                                await asyncio.sleep(random.uniform(1.8, 2.1))
                                
                                await human_click(page, 'mat-option:nth-child(1)') 
                                await asyncio.sleep(random.uniform(1.2, 2.5))
                                await human_actions(page) 
                                
                                content = await page.content()
                                
                                if "no appointment slots available" in content.lower() or "şu an için uygun randevu bulunmamaktadır" in content.lower():
                                    print(f"😴 [YOK] {current_country.upper()} için randevu bulunamadı.")
                                else:
                                    print(f"🔥  {current_country.upper()} RANDEVU BULUNDU!")
                                    winsound.Beep(1000, 1500)
                                    await fill_personal_details(page, user_data)
                                    print("✅ Form dolduruldu!")
                                    await asyncio.sleep(3600)
                                    return 
                            except Exception:
                                print(f"⚠️ [UYARI] Randevu sayfasında akış hatası.")
                        except Exception as e:
                            print(f"❌ [HATA] Döngüsünde hata: {e}")
                except Exception as e:
                    print(f"❌ [TARAYICI HATASI] Camoufox başlatılamadı: {e}")
            except Exception as e:
                print(f"❌ [HATA] İzole tarayıcı hatası: {e}")
    except Exception as e:
        print(f"❌ [KRİTİK HATA] VFS Bot Genel Hatası: {e}")

async def fill_personal_details(page, user_data):
    try:
        await page.wait_for_selector('input[formcontrolname="firstName"]', timeout=20000)
        fields = [('firstName', 'first_name'), ('lastName', 'last_name'), ('passportNumber', 'passport')]
        random.shuffle(fields) 

        for field, key in fields:
            await asyncio.sleep(random.uniform(1.2, 2.8))
            if random.random() > 0.6: await human_actions(page)
            
            input_selector = f'input[formcontrolname="{field}"]:visible'
            await page.focus(input_selector)
            await page.click(input_selector)
            
            for char in user_data[key]:
                await page.keyboard.press(char)
                await asyncio.sleep(random.uniform(0.05, 0.09))
        print("✍️ Kişisel bilgiler forma işlendi!")
    except Exception as e:
        print(f"⚠️ Form doldurma hatası: {e}")

if __name__ == "__main__":
    asyncio.run(run_vfs_bot("bulgaristan", "visa_type", "start", "end"))