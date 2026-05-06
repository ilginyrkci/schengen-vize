import asyncio
import random
import os
import shutil
import winsound
from playwright.async_api import async_playwright
# Çakışmayı önlemek için modülü direkt alıyoruz
import playwright_stealth 

# Verilerini buraya gir 
USER_DATA = {
    "office": "Istanbul-Gayrettepe", 
    "person_count": "1",
    "passport": "U12345678", 
    "name": "AHMET",
    "surname": "YILMAZ",
    "phone": "5551234567",
    "email": "ahmet@email.com"
}

async def apply_stealth(page):
    # 'module object is not callable' hatasını kesin çözen güvenli çağırma
    try:
        if hasattr(playwright_stealth, 'stealth_async'):
            await playwright_stealth.stealth_async(page)
        else:
            await playwright_stealth.stealth(page)
    except Exception as e:
        print(f"⚠️ Stealth uyarısı: {e}")

    await page.add_init_script("""
        Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
        window.navigator.chrome = { runtime: {} };
        Object.defineProperty(navigator, 'languages', {get: () => ['tr-TR', 'tr', 'en-US', 'en']});
        Object.defineProperty(navigator, 'plugins', {get: () => [1, 2, 3, 4, 5]});
        const getParameter = WebGLRenderingContext.prototype.getParameter;
        WebGLRenderingContext.prototype.getParameter = function(parameter) {
            if (parameter === 37445) return 'Intel Open Source Technology Center';
            if (parameter === 37446) return 'Mesa DRI Intel(R) UHD Graphics 630 (CML GT2)';
            return getParameter(parameter);
        };
        Object.defineProperty(navigator, 'deviceMemory', {get: () => 8});
        Object.defineProperty(navigator, 'hardwareConcurrency', {get: () => 8});
    """)

async def human_move(page):
    """Gelişmiş insan hareketi simülasyonu"""
    for i in range(random.randint(3, 6)):
        x, y = random.randint(100, 900), random.randint(100, 900)
        await page.mouse.move(x, y, steps=random.randint(15, 30))
        await asyncio.sleep(random.uniform(0.1, 0.4))
    # Arada bir sayfayı scroll yapalım (insan gibi)
    await page.mouse.wheel(0, random.randint(100, 300))

async def type_like_human(page, selector, text):
    """Harf harf yazarak bot korumasını kandırır"""
    await page.focus(selector)
    for char in text:
        await page.type(selector, char, delay=random.randint(70, 180))
        await asyncio.sleep(random.uniform(0.05, 0.1))

async def run_visa_bot(country: str, category: str, start: str, end: str):
    raw_country = country.lower().strip()
    print(f"📡 [BACKEND-RADAR] iData {raw_country.upper()} için yüksek güvenlikli mod aktif ...")
    
    user_data_dir = os.path.join(os.getcwd(), "idata_automation_profile")
    if os.path.exists(user_data_dir):
        try: shutil.rmtree(user_data_dir)
        except: pass
    os.makedirs(user_data_dir, exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch_persistent_context(
            user_data_dir,
            headless=False,
            channel="chrome",
            viewport={'width': 1920, 'height': 1080},
            slow_mo=random.randint(300, 600), # Biraz daha yavaşlattık ki ban yemesin
            args=[
                '--disable-blink-features=AutomationControlled',
                '--no-sandbox',
                '--start-maximized',
                '--disable-infobars',
                '--use-gl=desktop',
                '--disable-web-security',
                '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
            ]
        )

        page = browser.pages[0] if browser.pages else await browser.new_page()
        await apply_stealth(page)

        target_url = "https://idata.com.tr/de/tr/p/randevu-nvi"
        if "ita" in raw_country:
            target_url = "https://idata.com.tr/ita/tr/p/randevu-it"

        try:
            success = False
            attempt = 0
            backoff_multiplier = 1 # Ban riskinde bekleme süresini katlar
            
            while not success:
                attempt += 1
                print(f"🔄 [DENEME {attempt}] Hattı zorluyoruz...")
                
                try:
                    # Isınma turu ve çerez toplama
                    await page.goto("https://idata.com.tr", wait_until="domcontentloaded", timeout=60000)
                    await asyncio.sleep(random.randint(4, 7))
                    
                    await page.goto(target_url, wait_until="commit", timeout=120000)
                    
                    start_time = asyncio.get_event_loop().time()
                    while True:
                        content = await page.content()
                        
                        # Form yakalandı mı?
                        if await page.locator("#office").count() > 0:
                            print("🎯  Form yakalandı! Bilgiler giriliyor...")
                            success = True
                            break
                        
                        # Cloudflare Check
                        cf_detected = await page.evaluate("""() => {
                            return !!document.querySelector('#challenge-form') || 
                                   !!document.querySelector('#challenge-stage') || 
                                   document.title.includes('Cloudflare') ||
                                   document.body.innerText.includes('Verify you are human');
                        }""")
                        
                        if cf_detected:
                            print("🚨 [UYARI] Cloudflare engeli! oradaki kutucuğa tıklaman gerekebilir...")
                            await human_move(page)
                            await asyncio.sleep(10)
                            continue 
                        
                        # Ban Kontrolü
                        if "404" in page.url or "Access Denied" in content or "blocked" in page.url:
                            wait_time = 120 * backoff_multiplier
                            print(f"⚠️ [IP BAN RİSKİ] Erişim kısıtlı. {wait_time} saniye mola veriyoruz...")
                            await asyncio.sleep(wait_time)
                            backoff_multiplier += 1 # Her ban yediğinde mola süresini artır
                            break 
                        
                        if asyncio.get_event_loop().time() - start_time > 60: 
                            print("⏱️ [ZAMAN AŞIMI] Sayfa tepkisiz, tazeleniyor...")
                            break
                            
                        await asyncio.sleep(3) 
                    
                    if success: break 
                    
                    # Normal bekleme (İnsan gibi davranmak için)
                    bekle = random.randint(60, 120)
                    print(f"😴 [MOLA] Ban koruması için bekliyoruz: {bekle} saniye...")
                    await asyncio.sleep(bekle)

                except Exception as e:
                    print(f"⚠️ Bağlantı hatası: {e}. 15 sn sonra tekrar...")
                    await asyncio.sleep(15)

            # --- GÜÇLENDİRİLMİŞ FORM DOLDURMA ---
            print("📝 [İŞLEM] Form doldurma aşaması başladı...")
            await page.wait_for_selector("#office", state="visible", timeout=30000)
            
            # Ofis Seçimi (Rastgele beklemelerle)
            await page.select_option("#office", label=USER_DATA['office'])
            await asyncio.sleep(random.uniform(2.5, 4.5))
            
            await page.select_option("#personCount", value=USER_DATA['person_count'])
            await asyncio.sleep(random.uniform(2.0, 3.5))
            
            await page.click("#btnAppCountNext")

            print("🆔 [PASAPORT] Bilgiler tarzında (harf harf) giriliyor...")
            await page.wait_for_selector("#passportNumber", state="visible", timeout=60000)
            
            # Formu harf harf doldurarak bot korumasını geçiyoruz
            await type_like_human(page, "#passportNumber", USER_DATA['passport'])
            await asyncio.sleep(random.uniform(1.0, 2.0))
            await type_like_human(page, "#name", USER_DATA['name'])
            await asyncio.sleep(random.uniform(0.8, 1.5))
            await type_like_human(page, "#surname", USER_DATA['surname'])
            
            print("🚀 [BAŞARI] takvim açıldı! Zil çalıyor!")
            winsound.Beep(1000, 4000) # 4 saniye boyunca çal
            
            # Sayfayı açık tut ki tarihi seçebilesin
            await asyncio.sleep(3600)

        except Exception as e:
            print(f"❌ [KRİTİK HATA] iData Bot Hatası: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    # Tarih aralıklarını iData direkt input olarak almayabilir
    asyncio.run(run_visa_bot("germany", "shun", "2026-03-13", "2026-04-13"))