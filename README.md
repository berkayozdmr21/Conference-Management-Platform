# KYS Frontend — Hafta 1 (Cemre)

Konferans Yönetim Sistemi ziyaretçi tarafı frontend'i. React (Vite) + React Router ile kuruldu.

## Kurulum

```bash
npm install
npm run dev
```

Vite dev server `http://localhost:5173` üzerinde açılır. `/api` istekleri `vite.config.js`
içindeki proxy ile backend'e (varsayılan `https://localhost:5001`) yönlendirilir.

## Tasarım kimliği

"Akademik dergi / proceedings" temalı özgün bir tasarım: lacivert–bronz palet, Fraunces (başlık) +
Inter (gövde) + IBM Plex Mono (tarih/kod) tipografi üçlüsü, ve matematik sınıflandırma kodlarını
andıran tekrarlayan "session tag" rozetleri (`src/components/ui/SessionTag.jsx`).

## Klasör yapısı

```
src/
  components/
    layout/     Header, Footer, Layout (Outlet)
    ui/         SessionTag, SectionHeading — tekrar kullanılabilir küçük parçalar
  pages/        Home, About, Topics, ImportantDates, Speakers, ComingSoon
  services/     api.js (axios instance) + her kaynak için ayrı servis dosyası
  hooks/        useApiData — API çağrısı + mock veriye düşme mantığı
  data/         mockData.js — backend hazır olana kadar geçici veri
  styles/       tokens.css (tasarım değişkenleri), global.css
```

## API servis yapısı

Her modül kendi servis dosyasına sahip (`conferenceService`, `topicsService`,
`importantDatesService`, `speakersService`), hepsi ortak `api.js` axios instance'ını kullanıyor.
Backend endpoint'i henüz ayakta değilse `useApiData` hook'u otomatik olarak `data/mockData.js`
içindeki verilere düşer, böylece sayfalar backend beklemeden geliştirilip incelenebilir.

Nilay backend API'sini bağladığında yapılması gereken tek şey: endpoint path'lerinin
`services/*.js` dosyalarındaki path'lerle (`/conferences/current`, `/topics`,
`/important-dates`, `/speakers`) eşleştiğinden emin olmak.

## Henüz yapılmayanlar (Hafta 2/3 kapsamı)

- Bildiri gönderim formu (`/bildiri-gonder`) — şu an `ComingSoon` placeholder
- Kayıt/Ücretler, Katılımcılar, İletişim sayfaları — placeholder
- Admin paneli — Büşra'nın kapsamı
