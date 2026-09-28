# Admin Panel Projesi - Devir Teslim (Hafta 3)

**Devreden:** Cemre (Backend → Admin Panel)

## Ne yaptım?

Nilay'ın bıraktığı Admin Panel'i devraldım. Önce mevcut sayfaları inceledim:
Dashboard, Başvurular ve Konular kısmen gerçek API'ye bağlıydı; Konferanslar,
Konuşmacılar ve Önemli Tarihler ise tamamen sahte (local state) veriyle
çalışıyordu, backend'e hiç bağlı değildi. Ayrıca backend'deki Conference/
Topic/Speaker/ImportantDate servislerinin sabit (mock) veri döndürdüğünü,
gerçek veritabanına bağlı olmadığını fark ettim — bunu da tamamladım
(ayrıntı için backend HANDOVER2.md dosyasına bakabilirsin).

## Neler yaptım (sayfa bazında)

* **Konular.jsx** — port hatası (XXXX placeholder) düzeltildi, gerçek
  `/api/topics` endpoint'ine bağlandı, Konferans seçim alanı eklendi
  (backend'de her konu bir konferansa bağlı olmak zorunda)
* **Konferanslar.jsx** — tamamen sahte veriden gerçek `/api/conferences`
  CRUD'una çevrildi
* **Konusmacilar.jsx** — tamamen sahte veriden gerçek `/api/speakers`
  CRUD'una çevrildi, alan isimleri backend ile eşleştirildi (kurum→university,
  sunumKonusu alanı backend'de olmadığı için kaldırıldı, ülke eklendi)
* **OnemliTarihler.jsx** — tamamen sahte veriden gerçek `/api/important-dates`
  CRUD'una çevrildi
* **Basvurular.jsx** — zaten Cemre'nin Hafta 2 Submission API'sine bağlıydı,
  sadece pagination eklendi
* **Dashboard.jsx** — port hatası düzeltildi, Başvuru İstatistikleri bölümü
  (Toplam/Bekleyen/Onaylanan/Reddedilen) eklendi
* **src/api/config.js** — tüm sayfaların ortak kullandığı, tek yerden
  değiştirilebilen API adresi dosyası (yeni)
* **src/components/Pagination.jsx** — tüm liste sayfalarında kullanılan
  ortak sayfalama bileşeni (yeni)
* Beş sayfanın hepsine arama kutusu ve sayfalama (5 kayıt/sayfa) eklendi
* Her sayfaya bağlantı hatası durumunda görünür kırmızı uyarı eklendi

## Devraldığım kodda karşılaştığım sorunlar

**İyi uygulamalar:** Sayfa yapısı (Navbar/Sidebar/Footer + form + tablo
deseni) tutarlıydı, üzerine eklemek kolay oldu.

**Eksikler:** Konferanslar/Konuşmacılar/Önemli Tarihler sayfaları hiç
backend'e bağlı değildi (tamamen mock). Konular.jsx'te POST/PUT/DELETE
istekleri `https://localhost:XXXX` gibi doldurulmamış bir placeholder
kullanıyordu, hiç çalışmıyordu. Giriş (Giris.jsx) sayfası backend'e hiç
istek atmıyor, sadece ön yüzde basit kontrol yapıp yönlendiriyor — gerçek
kimlik doğrulama yok, bu önemli bir güvenlik açığı, ilerleyen haftada
JWT ile düzeltilmeli.

**Düzelttiğim hatalar:** Yukarıda sayılan tüm bağlantı/port sorunları.

## Eksik kalan yerler / bilinen sorunlar

* Katılımcı yönetimi, Konferans Kitapları CRUD, İletişim mesajları —
  backend'de bu üç modül için hiç endpoint yok, henüz eklenmedi
* Giriş ekranında gerçek kimlik doğrulama (JWT) yok
* CORS şu an tüm kaynaklara açık (`AllowAnyOrigin`) — üretime çıkmadan
  önce sadece admin panelin adresine kısıtlanmalı
* Backend'e rate limiting eklendi (dakikada 30 istek/IP sınırı) ama
  admin panel tarafında henüz bu sınıra özel bir kullanıcı mesajı yok
  (429 hatası şu an sadece konsola düşüyor)

## Sonraki kişiye not

Admin panelin çalışması için hem backend (`dotnet run`, ConferenceApi
klasöründe) hem frontend (`npm run dev`, bu klasörde) **aynı anda, ayrı
terminallerde** çalışıyor olmalı. `src/api/config.js` içindeki port
numarası backend'in gerçek portuyla eşleşmeli.