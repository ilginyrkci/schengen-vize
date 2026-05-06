import requests

def ip_kontrol():
    try:
        ip = requests.get('https://api.ipify.org').text
        print(f"Şu anki dış IP adresin: {ip}")
    except:
        print("Bağlantı hatası!")

ip_kontrol()