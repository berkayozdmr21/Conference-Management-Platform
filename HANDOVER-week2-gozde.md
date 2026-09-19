# HANDOVER.md — Hafta 2 / Gözde (Frontend)

> Cemre'nin 1. hafta `HANDOVER.md` dosyası bilinçli olarak silinmedi; proje geçmişinin
> takip edilebilmesi için bu dosya ayrı bir isimle eklendi.

## Ne yaptım?

Cemre'nin kurduğu frontend iskeleti üzerine ziyaretçi tarafının **veri üreten**
bölümlerini ekledim. 1. haftada tüm sayfalar yalnızca veri okuyordu; bu hafta sistem
ilk kez kullanıcıdan veri alıp backend'e gönderiyor.

Tamamlananlar:

- **Bildiri / Proceedings Gönderimi** sayfası — 8 alanlı form, dosya yükleme, doğrulama,
  API'ye gönderim, başarı/hata geri bildirimi
- **Katılımcılar** sayfası — API'den liste çekme, arama, loading / empty / fallback durumları,
  mobilde karta dönüşen responsive tablo
- **İletişim** sayfası — mesaj formu + konferans sekreterya bilgileri
- **Doğrulama katmanı** (`src/utils/validation.js`) — 20 birim testiyle birlikte
- Yeniden kullanılabilir **FormField** ve **StatusMessage** bileşenleri

## Hangi dosyaları oluşturdum?

| Dosya | Görevi |
|---|---|
| `src/pages/Submission.jsx` + `.css` | Bildiri gönderim ekranı |
| `src/pages/Participants.jsx` + `.css` | Katılımcı listesi + arama |
| `src/pages/Contact.jsx` + `.css` | İletişim formu |
| `src/components/ui/FormField.jsx` + `.css` | Etiket + input + hata mesajı üçlüsü |
| `src/components/ui/StatusMessage.jsx` + `.css` | Başarı / hata / bilgi kutusu |
| `src/utils/validation.js` | Tüm form doğrulama kuralları (saf fonksiyonlar) |
| `src/utils/validation.test.js` | 20 birim testi |
| `src/services/submissionsService.js` | `POST/GET /api/submissions` |
| `src/services/participantsService.js` | `GET /api/participants` |
| `src/services/contactService.js` | `POST /api/contact-messages` |

## Hangi dosyaları değiştirdim? (ve neden)

| Dosya | Değişiklik | Gerekçe |
|---|---|---|
| `src/App.jsx` | 3 `ComingSoon` placeholder'ı gerçek sayfalarla değiştirildi | Sayfalar geliştirildi; rota yolları Cemre'nin belirlediği hâliyle korundu, hiçbir link kırılmadı |
| `src/components/layout/Header.jsx` | `NAV_ITEMS` dizisine Katılımcılar ve İletişim eklendi | Yeni sayfalara menüden erişim gerekiyordu. Bileşenin mantığına dokunulmadı, yalnızca veri dizisi genişletildi |
| `src/data/mockData.js` | Dosyanın sonuna `mockParticipants` ve `mockContactInfo` eklendi | Mevcut mock veriler olduğu gibi korundu; yalnızca ekleme yapıldı |
| `package.json` | `vitest` devDependency + `test` / `test:watch` script'leri | Teslim şartındaki "test senaryoları" maddesi için |

Silinen dosya yoktur. Mevcut hiçbir fonksiyonun davranışı değiştirilmemiştir.

## Sistem nasıl çalışıyor?

```
Kullanıcı formu doldurur
        ↓
validation.js kuralları çalışır (tarayıcıda, anında)
        ↓  hata varsa: alan kırmızıya döner, ilk hatalı alana odaklanılır, istek gönderilmez
        ↓  hata yoksa:
FormData oluşturulur (dosya olduğu için JSON değil)
        ↓
submissionsService.create() → axios → POST /api/submissions
        ↓
Başarılı: "Başvurunuz başarıyla alınmıştır." + form sıfırlanır
Hatasız değil: HTTP koduna göre Türkçe hata mesajı gösterilir
```

Veri **okuyan** sayfalar (Katılımcılar) Cemre'nin `useApiData` hook'unu kullanır:
backend kapalıysa otomatik olarak `mockData.js`'e düşer ve sayfada bunu belirten
bir uyarı çıkar. Hook'a hiç dokunulmadı.

## Hangi API'leri kullandım?

| Metot | Endpoint | Durum |
|---|---|---|
| `POST` | `/api/submissions` | Backend'de karşılığı henüz doğrulanmadı — **Nilay/Cemre ile teyit edilmeli** |
| `GET` | `/api/participants` | Aynı |
| `POST` | `/api/contact-messages` | Aynı |
| `GET` | `/api/topics` | Cemre'nin 1. haftadan gelen servisi, oturum listesi için tekrar kullanıldı |
| `GET` | `/api/conferences/current` | Aynı, iletişim sayfası başlığı için |

`POST /api/submissions` isteği **multipart/form-data** olarak gider (dosya içerdiği için).
Backend tarafında bu endpoint'in `IFormFile` kabul edecek şekilde yazılması gerekiyor —
düz JSON bekleyen bir action bu isteği ayrıştıramaz.

Beklenen alan adları: `firstName`, `lastName`, `email`, `country`, `studyTitle`,
`session`, `participationType`, `description`, `file`.

## Eksik kalan yerler neler?

- **Backend'e gerçek bağlantı test edilmedi** — bu hafta boyunca API ayakta değildi.
  Endpoint isimleri proje dokümanına göre yazıldı, ilk entegrasyonda karşılaştırılmalı.
- `Kayıt & Ücretler` ve `Konferans Kitapları` sayfaları hâlâ `ComingSoon` (3. hafta kapsamı).
- Katılımcı listesinde sayfalama (pagination) yok — client-side arama var. Liste birkaç yüzü
  aşarsa arama ve sayfalama backend'e taşınmalı.
- Dosya yükleme sırasında yüzde göstergesi (progress bar) yok; yalnızca "Gönderiliyor…" durumu var.

## Bilinen hatalar?

Bilinen bir hata yok. `npm run build` ve `npm test` temiz geçiyor (20/20 test).

Dikkat edilmesi gereken tek nokta: `submissionsService.create` içinde `Content-Type`
başlığı bilinçli olarak `undefined` yapılmıştır. Bu satır silinirse tarayıcı multipart
sınırını (boundary) üretemez ve backend dosyayı okuyamaz.

## Sonraki kişi nereden devam etmeli?

3. haftada frontend'i **Büşra** devralacak. Önerilen sıra:

1. Backend ayağa kalktığında önce `POST /api/submissions`'ı gerçek veriyle dene;
   alan adları tutmuyorsa değişiklik `submissionsService.js` ve `Submission.jsx` içindeki
   `formData.append` satırlarında yapılmalı — sayfanın geri kalanına dokunmaya gerek yok.
2. Form doğrulama kuralları tek dosyada (`src/utils/validation.js`). Kural değiştireceksen
   önce `validation.test.js`'e beklediğin davranışı yaz, sonra kuralı değiştir.
3. Yeni form gerekiyorsa `FormField` ve `StatusMessage` bileşenlerini kullan; sıfırdan
   input yazma, görsel bütünlük bozulur.
4. Tasarım değişkenleri `src/styles/tokens.css`'te — sabit renk kodu yazma.

---

# Devraldığım kodda karşılaştığım sorunlar

*(Proje dokümanı Madde 11 gereği — Cemre'nin 1. hafta kodu üzerine)*

## İyi uygulamalar

- **Servis katmanı ayrılmış.** Sayfalar `axios`'u doğrudan çağırmıyor; her kaynak için
  ayrı servis dosyası var. Bu sayede üç yeni servis eklemek dakikalar sürdü ve
  hiçbir sayfaya dokunmam gerekmedi.
- **`useApiData` hook'undaki fallback fikri.** Backend hazır olmadan sayfaların çalışması
  bu hafta işimi doğrudan kurtardı — form sayfasındaki oturum listesini mock'tan çekebildim.
- **Tasarım token'ları (`tokens.css`).** Renk/boşluk/tipografi değişkenleri hazır olduğu için
  yeni sayfalar ilk denemede mevcut tasarımla uyumlu çıktı.
- **`ComingSoon` placeholder'ı.** Nav linklerinin kırılmaması için konulmuş; devralırken
  hangi sayfaların benim kapsamımda olduğunu görmemi kolaylaştırdı.
- **HANDOVER.md gerçekten doldurulmuş.** "Sonraki kişi nereden devam etmeli" bölümündeki
  `Submission.jsx` önerisi birebir uygulandı.

## Eksikler

- **`useApiData` yalnızca `usingFallback` döndürüyor, `error` döndürmüyor.** Bu yüzden
  "backend kapalı" ile "backend açık ama 500 döndü" durumları sayfada birbirinden
  ayırt edilemiyor. Katılımcılar sayfasında bunu şimdilik tek bir uyarıyla geçtim;
  hook'u değiştirmek 1. hafta koduna müdahale olacağı ve Cemre'nin notunda
  "hook'u değiştirmeden bırakabilirsin" dendiği için dokunmadım. **3. hafta için öneri:**
  hook `{ data, loading, error, usingFallback }` döndürecek şekilde genişletilsin.
- **`useApiData` içindeki `useEffect` bağımlılık dizisi boş (`[]`).** `fetchFn` değişse
  bile istek tekrarlanmaz. Şu anki kullanımda sorun çıkarmıyor çünkü servis fonksiyonları
  sabit; ama ileride parametreli bir çağrı (örn. sayfalama) eklenirse sessizce yanlış
  çalışır. Bilinçli bir tercih mi yoksa gözden mi kaçtı, Cemre'ye sormak gerekiyor.
- **`api.js`'te `Content-Type: application/json` global olarak sabitlenmiş.** Dosya yükleme
  bu ayarla çalışmıyor. Global başlığı değiştirmek diğer tüm istekleri etkileyeceği için
  ezme işlemini yalnızca ilgili istekte yaptım.
- **Form bileşeni yoktu** — 1. haftada hiç form olmadığı için doğaldı; bu katmanı ben ekledim.

## Anlamakta zorlandığım yapılar

- **`Reveal` bileşeni + `useScrollReveal` hook'u.** Kaydırma sırasında öğeleri sırayla
  görünür yapan yapı; `IntersectionObserver` kullanıyor. Mantığını çözene kadar zaman
  aldı. Kendi sayfalarımda form alanlarına uygulamadım — kullanıcı formu doldururken
  alanların animasyonla belirmesi rahatsız edici olurdu. Liste sayfalarında ise
  Cemre'nin kullandığı desene sadık kaldım.
- **`FormField` içindeki `...rest` deseni.** Bir bileşene gelen isimsiz tüm prop'ları
  alt elemana aktarmak; React'te yaygın ama ilk bakışta "bu değerler nereden geliyor"
  sorusunu doğuruyor. Bu yüzden dosyanın başına açıklama yazdım.

## Düzelttiğim hatalar

- **`Speakers.jsx` içindeki olası çökme riski:** `speaker.name.split(" ").slice(-1)[0][0]`
  ifadesi, `name` boş metin olarak gelirse `undefined[0]` hatası verip sayfayı komple
  çökertiyor. Backend'den eksik veri gelmesi ihtimaline karşı bunu not ettim; 1. hafta
  koduna müdahale etmemek için düzeltmeyi yapmadım, ancak **kendi yazdığım Katılımcılar
  sayfasında aynı riski `Array.isArray(data)` kontrolüyle baştan engelledim.**
  Bu maddenin 3. haftada Büşra tarafından ele alınması öneriliyor.
