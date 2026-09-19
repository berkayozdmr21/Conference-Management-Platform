# HANDOVER.md — Hafta 3 / Gözde (Backend)

> Cemre'nin `HANDOVER1.md` ve `HANDOVER2.md` dosyaları silinmedi; proje geçmişi
> takip edilebilsin diye bu dosya ayrı isimle eklendi.

**Branch:** `gozde/week3-backend` (kaynak: `origin/cemre/week2`)

---

## Ne yaptım?

Cemre'nin 2. haftada kurduğu ASP.NET Core Web API'yi devraldım ve proje dokümanının
3. hafta listesindeki eksikleri tamamladım. Mevcut katmanlı yapıyı (Entity → DTO →
Service → Controller) bozmadan, aynı deseni takip ederek yeni modülleri ekledim.

Tamamlananlar:

- **Katılımcı (Participant) modülü** — onaylanan başvurunun otomatik olarak katılımcı
  listesine aktarılması dahil
- **Konferans Kitapları (Books) modülü** — PDF yükleme / listeleme / yıla göre filtreleme
- **İletişim (ContactMessages) modülü** — ziyaretçi mesaj gönderir, admin okur/işaretler/siler
- **Dashboard istatistik endpoint'i** — başvuru sayaçları, katılım şekli dağılımı,
  ülkeye ve oturuma göre gruplama
- **Sayfalama + filtreleme + arama** — başvuru ve katılımcı listelerinde
- **JWT kimlik doğrulama ve yetkilendirme** — admin girişi, korumalı endpoint'ler
- **Logging** — servis katmanında bilgi/uyarı logları
- **Validation** — yeni DTO'larda Türkçe hata mesajlı doğrulama kuralları
- **Veritabanı index'leri** — sık filtrelenen kolonlar için

---

## Hangi dosyaları oluşturdum?

| Dosya | Görevi |
|---|---|
| `Controllers/AuthController.cs` | Admin girişi, token doğrulama |
| `Controllers/ParticipantsController.cs` | Katılımcı listesi ve yönetimi |
| `Controllers/BooksController.cs` | Konferans kitapları + PDF yükleme |
| `Controllers/ContactMessagesController.cs` | İletişim mesajları |
| `Controllers/DashboardController.cs` | Admin panel istatistikleri |
| `Services/IParticipantService.cs` + `ParticipantService.cs` | Katılımcı iş mantığı |
| `Services/IBookService.cs` + `BookService.cs` | Kitap iş mantığı |
| `Services/IContactMessageService.cs` + `ContactMessageService.cs` | Mesaj iş mantığı |
| `Services/IDashboardService.cs` + `DashboardService.cs` | İstatistik hesaplama |
| `Helpers/TokenService.cs` | JWT üretimi |
| `DTOs/PagedResult.cs` | Sayfalanmış liste sonucu (generic) |
| `DTOs/SubmissionQueryParameters.cs` | Sayfalama/filtre/arama parametreleri |
| `DTOs/ParticipantDto.cs`, `BookDto.cs`, `ContactMessageDto.cs`, `DashboardStatsDto.cs`, `AuthDtos.cs` | Veri şekilleri |
| `Migrations/..._Week3Backend.cs` | Yeni alanlar, index'ler, admin seed |

## Hangi dosyaları değiştirdim? (ve neden)

| Dosya | Değişiklik | Gerekçe |
|---|---|---|
| `Program.cs` | JWT authentication, `UseAuthentication()`, static files, Swagger'a Authorize butonu, yeni servis kayıtları | Devraldığımda `UseAuthorization()` vardı ama kimlik doğrulama katmanı hiç yoktu |
| `ConferenceApi.csproj` | `Microsoft.AspNetCore.Authentication.JwtBearer` ve `EntityFrameworkCore.Tools` paketleri | JWT için gerekli; Tools olmadan `Add-Migration`/`Update-Database` komutları çalışmıyordu |
| `Data/ConferenceDbContext.cs` | `OnModelCreating` eklendi (index'ler + seeder çağrısı) | `DbSeeder` yazılmış ama hiçbir yerden çağrılmıyordu, başlangıç verisi hiç oluşmuyordu |
| `Data/DbSeeder.cs` | Başlangıç admin hesabı eklendi | Admin tablosu boştu, giriş yapılabilecek hesap yoktu |
| `Helpers/PasswordHasher.cs` | `Verify` metodu eklendi | Hash üretiliyordu ama karşılaştırma metodu yoktu |
| `Entities/Participant.cs` | `SubmissionId`, `Country`, `StudyTitle`, `ParticipationType`, `Session`, `Published` | Katılımcılar sayfası bu alanları gösteriyor; başvuru ile bağ kurulması gerekiyordu |
| `Entities/Book.cs` | `Year`, `FilePath`; `Isbn` opsiyonel yapıldı | Doküman "yıla göre konferans kitapları + dosya" istiyor |
| `Entities/ContactMessage.cs` | `IsRead` | Admin okundu/okunmadı ayrımı yapabilsin |
| `Services/SubmissionService.cs` | `GetPagedAsync` eklendi; onaylanınca katılımcı oluşturma | 3. hafta görevleri |
| `Controllers/SubmissionsController.cs` | Query parametreleri, `[Authorize]` | Başvuru listesi herkese açıktı |
| `Controllers/Topics/Speakers/Conferences/ImportantDates` | GET → `[AllowAnonymous]`, POST/PUT/DELETE → `[Authorize(Roles="Admin")]` | Herkes konuşmacı silebiliyordu |
| `.gitignore` | `bin/`, `obj/`, `.vs/` eklendi | Derleme çıktıları repoda tutuluyordu (aşağıda açıkladım) |

**Silinen dosya yoktur.** Mevcut hiçbir metodun davranışı bozulmadı;
`GetAllAsync` gibi eski metotlar geriye dönük uyumluluk için bırakıldı.

---

## Sistem nasıl çalışıyor?

```
Ziyaretçi bildiri formunu doldurur
        ↓
POST /api/submissions   (multipart/form-data, dosya opsiyonel)
        ↓
Dosya wwwroot/uploads/submissions altına GUID adıyla kaydedilir
        ↓
MySQL'e kaydedilir, Status = "Pending"
        ↓
Admin POST /api/auth/login ile JWT alır
        ↓
GET /api/submissions?status=Pending&page=1  (token zorunlu)
        ↓
PUT /api/submissions/{id}/status  →  "Approved"
        ↓
SubmissionService onayı görür, ParticipantService'i çağırır
        ↓
Participant kaydı oluşur (aynı başvurudan ikinci kez oluşmaz)
        ↓
GET /api/participants  →  ziyaretçi katılımcılar sayfasında görür
```

**Yetki modeli:** Okuma (GET) endpoint'leri ziyaretçiye açık. Yazma (POST/PUT/DELETE)
endpoint'leri `[Authorize(Roles = "Admin")]` ile korumalı. İki istisna:
bildiri gönderimi ve iletişim formu — bunları ziyaretçinin yapabilmesi gerekiyor.

**Sayfalama:** Liste endpoint'leri `PagedResult<T>` döner:
`items`, `page`, `pageSize`, `totalCount`, `totalPages`, `hasNext`, `hasPrevious`.
Frontend sayfa çubuğunu bu alanlarla çizebilir.

---

## Hangi API'leri yazdım?

| Metot | Endpoint | Yetki |
|---|---|---|
| POST | `/api/auth/login` | Herkes |
| GET | `/api/auth/me` | Admin |
| GET | `/api/participants` | Herkes (yayınlanmış olanlar) |
| POST / PUT / DELETE | `/api/participants` | Admin |
| POST | `/api/participants/from-submission/{id}` | Admin |
| GET | `/api/books`, `/api/books/{id}` | Herkes |
| POST / PUT / DELETE | `/api/books` | Admin |
| POST | `/api/contact-messages` | Herkes |
| GET / PUT / DELETE | `/api/contact-messages` | Admin |
| GET | `/api/dashboard/stats` | Admin |
| GET | `/api/submissions?page&pageSize&status&country&session&participationType&search&sortBy&desc` | Admin |

**Başlangıç admin hesabı:** `admin@conference.com` / `Admin123!`
(şifre SHA256 hash olarak seed edilmiştir, düz metin tutulmuyor).

---

## Eksik kalan yerler neler?

- **Şifre hash'i SHA256** — devraldığım halde de öyleydi, dokunmadım. Üretim için
  BCrypt veya PBKDF2 gibi salt'lı bir algoritma kullanılmalı. SHA256 hızlı olduğu için
  kaba kuvvet saldırısına açık.
- **Refresh token yok** — token 120 dakika sonra ölüyor, kullanıcı yeniden giriş yapmalı.
- **Dosya silinince fiziksel dosya kalıyor** — `DELETE /api/books/{id}` kaydı siliyor
  ama diskteki PDF duruyor.
- **Admin yönetimi endpoint'i yok** — yeni admin ekleme/şifre değiştirme seed dışında yok.
- **`Conferences` endpoint'inde `current` yok** — frontend `/api/conferences/current`
  bekliyor (Cemre'nin 1. hafta servisinde vardı), şu an `/api/conferences` tüm listeyi dönüyor.
  Frontend tarafında düzeltilmesi veya burada bir `current` endpoint'i eklenmesi gerekiyor.
- **Otomatik test yok** — testler Swagger üzerinden elle yapıldı (aşağıda senaryolar var).

## Bilinen hatalar?

Bilinen bir hata yok. `Add-Migration` sırasında "veri kaybı olabilir" uyarısı çıkıyor;
sebebi `Book.Isbn` alanının zorunlu olmaktan çıkarılması. Tablolar boş olduğu için
gerçek bir kayıp yaşanmadı, ama dolu bir veritabanında dikkat edilmeli.

## Test senaryoları (Swagger üzerinden çalıştırıldı)

1. `POST /api/auth/login` yanlış şifreyle → **401**, mesaj "E-posta veya şifre hatalı"
2. `POST /api/auth/login` doğru bilgiyle → **200**, token döndü
3. `POST /api/submissions` → **201**, kayıt `Pending` durumunda oluştu
4. `PUT /api/submissions/1/status` token olmadan → **401** (yetkilendirme çalışıyor)
5. `PUT /api/submissions/1/status` token ile, `"Approved"` → **200**
6. `GET /api/participants` → onaylanan başvuru katılımcı olarak listede
7. `GET /api/dashboard/stats` → sayaçlar ve ülke/oturum dağılımı doğru
8. `PUT /api/submissions/1/status` geçersiz değerle (`"Onayla"`) → **400**, izin verilen değerler mesajda

---

# Devraldığım kodda karşılaştığım sorunlar

*(Proje dokümanı Madde 11 gereği — Cemre'nin 2. hafta kodu üzerine)*

## İyi uygulamalar

- **Katmanlı yapı tutarlı kurulmuş.** Her kaynak için `I...Service` arayüzü + uygulama +
  DTO + Controller var. Yeni dört modülü eklerken tek bir mimari karar vermem gerekmedi,
  var olan deseni tekrarladım. Bu, devir teslimin en çok işime yarayan tarafıydı.
- **DTO ayrımı doğru yapılmış.** Entity'ler doğrudan dışarı açılmıyor. Sayesinde
  `PasswordHash` gibi alanların yanlışlıkla API'den sızma riski yok.
- **`ExceptionHandlingMiddleware` önceden yazılmış.** Global hata yakalama 3. hafta
  görevimdi ama zaten hazırdı; sadece servis loglarını ekledim.
- **Dosya yükleme mantığı sağlam.** Uzantı kontrolü, boyut sınırı ve GUID ile yeniden
  adlandırma var. Kitap yükleme kısmını yazarken bu deseni birebir örnek aldım —
  kullanıcının gönderdiği dosya adını kullanmamak, klasör dışına çıkma saldırısını da engelliyor.
- **`SubmissionService` içindeki `AllowedStatuses` dizisi.** Durum değerlerini tek yerde
  tutup doğrulaması iyi bir tercih; sihirli metin dağılmamış.

## Tamamladığım kısımlar

Aşağıdakiler devraldığımda henüz yapılmamış konulardı. Zaten Cemre'nin devir notunda
"JWT eklenmesi gereken bir şey, ben yetişemedim" diye belirtilmişti — yani bilinçli
olarak sonraki haftaya bırakılmışlardı. Ben de 3. hafta görev listem gereği bunları
tamamladım.

- **Kimlik doğrulama katmanı.** `Program.cs` içinde `app.UseAuthorization()` vardı ama
  `AddAuthentication` / `UseAuthentication` henüz eklenmemişti. İkisi birlikte çalışıyor:
  biri "kimsin", diğeri "yetkin var mı" sorusunu cevaplıyor. Sadece ikincisi varken
  `[Authorize]` etiketi işlevsiz kalıyor. JWT altyapısını kurup ikisini de devreye aldım.
- **`DbSeeder` bağlantısı.** Seeder dosyası hazır yazılmıştı ama `ConferenceDbContext`
  içinde `OnModelCreating` olmadığı için çağrılmıyordu. Metodu ekleyip seeder'ı bağladım,
  ayrıca başlangıç admin hesabını da oraya ekledim.
- **`EntityFrameworkCore.Tools` paketi.** `Update-Database` komutunun çalışması için
  gerekiyordu, `csproj`'a ekledim.
- **`.gitignore`.** `bin/` ve `obj/` klasörleri repoda takip ediliyordu. Bu klasörler her
  derlemede değiştiği için merge sırasında gereksiz çakışma üretiyorlar. `.gitignore`
  ekleyip takipten çıkardım — dosyalar herkesin diskinde duruyor, sadece repoya gitmiyor.
- **Veritabanı index'leri.** `Status`, `Email`, `Country` gibi sürekli filtrelenen
  kolonlara index ekledim. Kayıt sayısı azken fark edilmiyor ama liste büyüdükçe her
  sorgu tüm tabloyu taramaya başlıyor.

**Ekibe bir not:** `appsettings.json` içindeki bağlantı dizesi veritabanı şifresini düz
metin olarak taşıyor ve repoda duruyor. Herkes kendi şifresiyle çalıştığı için bu dosya
sürekli çakışma da üretiyor. İleride bu dosyanın `.gitignore`'a alınıp şifrenin ortam
değişkeninden okunması iyi olur — bu haftalık kapsamın dışında olduğu için dokunmadım,
sadece kendi ortamıma göre güncelledim.

## Anlamakta zorlandığım yapılar

- **Dependency Injection.** `Program.cs`'teki `AddScoped<ITopicService, TopicService>()`
  satırının ne yaptığını çözmek zaman aldı. Anladığım kadarıyla: controller "bana bir
  `ITopicService` lazım" diyor, hangi sınıfın geleceğini bilmiyor; o eşleştirme burada
  yapılıyor. `Scoped` da "her HTTP isteği için yeni bir tane üret, istek bitince at" demek.
  Servisi yazıp buraya kaydetmeyi unutunca uygulama çalışma anında hata veriyor —
  bunu iki kere yaşadım.
- **`IQueryable` ile `IEnumerable` farkı.** Sayfalama yazarken önemli oldu:
  `AsQueryable()` üzerine eklenen `Where`/`OrderBy`/`Skip`/`Take` çağrıları hemen
  çalışmıyor, tek bir SQL cümlesine dönüşüyor ve ancak `ToListAsync()` denince
  veritabanına gidiyor. Eğer önce `ToList()` deseydim tüm tabloyu belleğe çekip
  sonra filtrelemiş olurdum — 10.000 kayıtta felaket olurdu.
- **`ToDto()` metodunun sorgu içinde çağrılması.** `.Select(s => ToDto(s))` satırını
  ilk gördüğümde "Entity Framework bunu SQL'e çeviremez, hata verir" diye düşündüm
  ve test ettim. Vermedi — çünkü EF Core, sorgunun **en dıştaki** `Select` kısmında
  C# metodu çağrılmasına izin veriyor (veriyi çekip dönüşümü bellekte yapıyor).
  Yanlış tahmindi ama test etmeden değiştirmediğim için kodu bozmadım.

## Eklediğim küçük parçalar

- `Program.cs`'e JWT kimlik doğrulama eklendi; `UseAuthentication()` `UseAuthorization()`
  öncesine konuldu (sıra önemli, tersi olursa yetkilendirme sessizce devre dışı kalıyor).
- `ConferenceDbContext.OnModelCreating` eklenerek `DbSeeder` devreye alındı.
- `PasswordHasher`'a `Verify` metodu eklendi — hash üretimi vardı, karşılaştırma kısmı
  giriş ekranıyla birlikte gerekli oldu.
- `.gitignore` eklendi, `bin/`, `obj/`, `.vs/` takipten çıkarıldı.
- `app.UseStaticFiles()` eklendi — yüklenen dosyalar kaydediliyordu ama URL üzerinden
  indirilemiyordu, bu satır olmadan `wwwroot` dışarı açılmıyor.

---

## Sonraki kişi nereden devam etmeli?

1. **`develop` branch'i boş.** Üç haftadır kimse merge etmemiş, tüm iş kişisel
   branch'lerde duruyor. Önce `develop`'a birleştirme yapılmalı, yoksa final teslimde
   parçalar bir araya gelmez. Bu ekip olarak alınması gereken bir karar.
2. **İki ayrı backend var.** `cemre/week2` (katmanlı, benim devam ettiğim) ve
   `busra/week2` (benim 1. hafta kodumun üstüne kurulmuş, farklı `DbContext` adı,
   farklı migration seti). İkisi hiç birleşmemiş. Hangisinin ana hat olacağına
   ekipçe karar verilmeli — ben proje dokümanındaki rotasyona uyarak Cemre'ninkini devraldım.
3. **Frontend entegrasyonu test edilmedi.** Endpoint'lerin hepsi Swagger'da çalışıyor
   ama gerçek frontend ile uçtan uca denenmedi. Özellikle `/api/conferences/current`
   uyuşmazlığına dikkat.
4. **Yeni endpoint eklerken deseni takip et:** `Entity → DTO → I...Service → ...Service →
   Controller → Program.cs'e AddScoped`. Son adımı unutma, uygulama açılışta patlar.
5. **Yetki eklemeyi unutma:** yeni bir yazma endpoint'i eklerken `[Authorize(Roles = "Admin")]`
   koy. Varsayılan açık kalıyor.
