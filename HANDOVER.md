# HANDOVER.md — Hafta 1 / Cemre (Frontend)

## Ne yaptım?
Ziyaretçi tarafının temel frontend yapısını kurdum: React + Vite projesi, genel layout
(Header/Menü/Footer), responsive nav, ve şu sayfalar: Ana Sayfa, Konferans Hakkında,
Konferans Konuları, Önemli Tarihler, Davetli Konuşmacılar. Ayrıca API servis katmanını
(axios + her kaynak için ayrı servis dosyası) ve mock veriye otomatik düşen bir veri
çekme hook'u kurdum, böylece backend henüz ayakta değilken sayfalar çalışır durumda.

## Hangi dosyaları oluşturdum?
- `src/App.jsx`, `src/main.jsx` — routing ve giriş noktası
- `src/components/layout/*` — Header, Footer, Layout (Outlet)
- `src/components/ui/*` — SessionTag (imza bileşen), SectionHeading
- `src/pages/*` — Home, About, Topics, ImportantDates, Speakers, ComingSoon
- `src/services/*` — api.js + conferenceService, topicsService, importantDatesService, speakersService
- `src/hooks/useApiData.js` — API çağrısı + fallback mantığı
- `src/data/mockData.js` — geçici veri
- `src/styles/tokens.css`, `global.css` — tasarım sistemi

## Sistem nasıl çalışıyor?
`npm run dev` ile Vite dev server ayağa kalkar (port 5173). Her sayfa kendi servis
fonksiyonunu `useApiData` ile çağırır; istek başarısız olursa (backend henüz yoksa)
otomatik olarak `data/mockData.js`'teki veriyle render edilir ve `usingFallback: true`
döner (Topics sayfasında bunun görsel bir uyarısı var).

## Hangi API'leri kullandım?
- `GET /api/conferences/current`
- `GET /api/topics`
- `GET /api/important-dates`
- `GET /api/speakers`

(Nilay'ın 1. hafta hazırlayacağı endpoint'lerle path olarak eşleşecek şekilde yazıldı —
henüz backend'e gerçek bağlantı test edilmedi çünkü backend henüz hazır değil.)

## Eksik kalan yerler neler?
- Bildiri gönderim formu, Kayıt, Katılımcılar, İletişim sayfaları henüz `ComingSoon`
  placeholder'ı gösteriyor (bunlar proje planına göre 2./3. hafta kapsamında).
- Backend'e gerçek bağlantı henüz doğrulanmadı (mock veriyle geliştirildi).
- Admin paneli bu kapsamda değil (Büşra'nın görevi).

## Bilinen hatalar?
Şu an bilinen bir hata yok; `npm run build` temiz geçiyor.

## Sonraki kişi (Hafta 2: Cemre → Backend'e geçecek, devralan kişi frontend'i devralacak) nereden devam etmeli?
- `src/services/*.js` içindeki path'leri gerçek backend endpoint'leriyle karşılaştır.
- `useApiData` hook'unu değiştirmeden bırakabilirsin; backend hazır olduğunda mock'a
  düşme otomatik olarak devre dışı kalacak.
- Bildiri gönderim formunu `src/pages/ComingSoon.jsx`'in yerine yeni bir `Submission.jsx`
  sayfası olarak ekle; `src/App.jsx`'teki `/bildiri-gonder` route'unu güncelle.
- Tasarım tokenları `src/styles/tokens.css`'te — yeni sayfalarda aynı renk/tipografi
  değişkenlerini kullan ki görsel bütünlük bozulmasın.
