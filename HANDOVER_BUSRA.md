HANDOVER — Hafta 2: API, MSSQL Uyarlaması, Auth & Test

Büşra | 2. Hafta | 17–23 Ağustos 2026

---

1. Ne Yaptım?

Bu hafta projenin backend yapısı üzerinde çalışarak mevcut database, authentication ve API yapılarını kontrol ettim ve geliştirdim.

Projenin başlangıç yapısında MySQL kullanılıyordu. Proje MSSQL kullanılacak şekilde uyarlandı. Veritabanı bağlantısı, Entity Framework Core yapılandırması ve migration yapısı MSSQL'e göre düzenlendi ve bağlantı test edildi.

JWT authentication yapısı kontrol edildi. Admin login işlemi Swagger üzerinden test edildi ve başarılı girişte JWT token döndüğü doğrulandı. Token olmadan ve geçersiz token ile korumalı endpointlere erişim test edildi ve her iki durumda da 401 Unauthorized sonucu alındı.

Submission API'leri Hafta 2'de Cemre'nin görevi olduğu için, Submission tarafında oluşturulan yapı takılabilir/çıkarılabilir (modüler) şekilde hazırlandı. Swagger üzerinde Submission endpointleri oluşturuldu ve test edildi.

Submission oluşturma sırasında PDF dosyası yüklenebilmesi için fiziksel dosya yükleme altyapısı oluşturuldu. PDF dosyaları "wwwroot/uploads/submissions" klasörüne kaydediliyor ve dosya yolu "FilePath" alanına yazılıyor.

---

2. Kullanılan Teknolojiler

- C# — Backend programlama dili
- ASP.NET Core Web API — REST API geliştirme
- Entity Framework Core — ORM ve veritabanı işlemleri
- Microsoft SQL Server (MSSQL) — Veritabanı
- Code First / EF Core Migrations — Veritabanı şemasının oluşturulması ve güncellenmesi
- JWT (JSON Web Token) — Authentication ve yetkilendirme
- BCrypt.Net-Next — Şifre hashleme ve doğrulama
- Swagger / Swashbuckle — API endpointlerinin görüntülenmesi ve test edilmesi
- CORS — Frontend/API erişim izinleri
- IFormFile — Dosya yükleme işlemleri
- Git / GitHub — Versiyon kontrolü ve proje paylaşımı

---

3. MSSQL'e Uyarlama

Projenin ilk yapısında MySQL kullanılıyordu. Proje MSSQL kullanılacak şekilde uyarlandı.

Bu kapsamda:

- MSSQL connection string kullanıldı.
- "AppDbContext" MSSQL bağlantısına göre düzenlendi.
- Entity Framework Core provider yapısı MSSQL'e göre düzenlendi.
- MySQL'e bağlı yapılandırmalar kaldırıldı/değiştirildi.
- Migrationlar MSSQL yapısına uygun şekilde yeniden oluşturuldu.
- "Program.cs" ve "appsettings.json" bağlantıları kontrol edildi.
- Veritabanı bağlantısı ve tablolar test edildi.

Sonuç olarak proje MSSQL üzerinde çalışır hale getirildi ve geliştirmelere MSSQL üzerinden devam edilebilir duruma getirildi.

---

4. Submission API

Submission API'si Hafta 2'de Cemre'nin görevi olduğu için, oluşturulan Submission yapısı takılabilir ve çıkarılabilir şekilde hazırlandı.

Oluşturulan endpointler:

- "POST /api/Submissions"
- "GET /api/Submissions"
- "GET /api/Submissions/{id}"
- "PUT /api/Submissions/{id}/status"

Endpointler Swagger üzerinden test edildi.

Başarılı Submission oluşturma işleminde 201 Created, listeleme ve detay işlemlerinde 200 OK, status güncelleme işleminde 200 OK alındı.

Cemre'nin kendi Submission API'si hazır olduğunda oluşturulan yapı gerektiğinde kolayca çıkarılabilir veya mevcut yapıya uyarlanabilir.

---

5. Fiziksel PDF Dosya Yükleme

Submission oluşturma sırasında PDF dosyası yüklenebilmesi için fiziksel dosya yükleme altyapısı oluşturuldu.

Dosya yükleme işlemi "FileUploadService" üzerinden ayrı tutuldu.

Akış:

Swagger → CreateSubmissionRequest → FileUploadService → wwwroot/uploads/submissions → FilePath

Yüklenen PDF dosyası fiziksel olarak "wwwroot/uploads/submissions" klasörüne kaydediliyor.

Dosyanın yolu Submission kaydındaki "FilePath" alanına yazılıyor.

Word dosyası ile yapılan testte dosya kabul edilmedi ve:

«“Sadece PDF dosyaları yüklenebilir.”»

hatası alındı.

Daha sonra gerçek bir PDF dosyası ile test yapıldı ve işlem başarıyla 201 Created sonucunu verdi.

---

6. Authentication ve Güvenlik Testleri

Admin login işlemi Swagger üzerinden test edildi.

Test bilgileri:

{
  "email": "admin@icomath.com",
  "password": "Admin123!"
}

Başarılı login sonucunda 200 OK ve JWT token döndü.

Tokensız Erişim

Korunan "Auth/me" endpointine token olmadan istek gönderildi.

Sonuç:

401 Unauthorized

Geçersiz Token

Geçersiz token ile "Auth/me" endpointine istek gönderildi.

Sonuç:

401 Unauthorized

Bu testlerle JWT authentication yapısının çalıştığı doğrulandı.

---

7. Hatalı Veri Testi

Submission oluşturma sırasında eksik/hatalı veri ile test yapıldı.

Geçersiz e-posta bilgisi kullanılarak ve dosya gönderilmeden istek gönderildi.

API isteği kabul etmedi ve:

400 Bad Request

sonucunu verdi.

---

8. Oluşturulan / Düzenlenen Dosyalar

Controllers

"SubmissionsController.cs"

Submission işlemleri için endpointler oluşturuldu.

Helpers

"FileUploadService.cs"

PDF dosyalarının kontrol edilmesi ve fiziksel olarak kaydedilmesi için kullanılıyor.

"TokenService.cs"

JWT token üretimi için kullanılıyor.

Models

"CreateSubmissionRequest.cs"

Submission verilerinin ve yüklenen dosyanın API'ye alınması için oluşturuldu.

wwwroot

"wwwroot/uploads/submissions" klasörü oluşturuldu.

PDF dosyalarının fiziksel olarak kaydedildiği klasördür.

Program.cs

MSSQL bağlantısı, servis kayıtları, CORS ve JWT authentication yapılandırmaları kontrol edildi/düzenlendi.

Migrations

MSSQL yapısına uygun migrationlar yeniden oluşturuldu.

---

9. Test Sonuçları

İşlem| Sonuç
MSSQL bağlantısı| Başarılı
Admin Login| 200 OK
Tokensız erişim| 401 Unauthorized
Geçersiz token| 401 Unauthorized
Submission oluşturma| 201 Created
Submission listeleme| 200 OK
Submission detay| 200 OK
Submission status güncelleme| 200 OK
Hatalı Submission isteği| 400 Bad Request
PDF yükleme| Başarılı
Word dosyası yükleme| Reddedildi

---

10. Eksik Kalanlar

- Submission API'si Hafta 2 kapsamında geçici ve modüler olarak hazırlanmıştır. Cemre'nin kendi Submission API'si tamamlandığında mevcut yapı ile karşılaştırılması gerekmektedir.
- Submission tarafındaki modeller, endpointler ve dosya yükleme yapısı Cemre'nin API'si ile uyumlu olacak şekilde gerekirse güncellenmelidir.
- PDF dosyalarının kaydedildiği "wwwroot/uploads/submissions" klasörü ve "FilePath" yapısı sonraki geliştirmelerde korunmalıdır.
- Projede yeni veritabanı değişiklikleri yapılması durumunda MSSQL'e uygun yeni migration oluşturulmalıdır.
- Swagger üzerinden yapılan authentication ve Submission testleri sonraki değişikliklerden sonra tekrar çalıştırılmalıdır.
- GitHub'a gönderilmeden önce ".gitignore" dosyası kontrol edilmelidir.
- ".vs", "bin" ve "obj" klasörlerinin GitHub'a gönderilmediğinden emin olunmalıdır.
- "appsettings.json" içerisinde bulunan veritabanı bağlantı bilgileri ve JWT secret gibi hassas bilgiler GitHub'a gönderilmeden önce kontrol edilmelidir.

---

11. Projeyi Devralan Kişi Nereden Devam Etmeli?

Projeyi devralan kişinin aşağıdaki sırayı takip etmesi önerilir:

1. Projeyi çalıştır ve MSSQL bağlantısını kontrol et

Projeyi Visual Studio üzerinden açarak çalıştır.

MSSQL veritabanı bağlantısının doğru olduğunu ve tabloların mevcut olduğunu kontrol et.

MySQL bağlantısı kullanılmamalıdır. Proje geliştirme ortamında MSSQL üzerinden çalışmaktadır.

2. Migrationları kontrol et

"Migrations" klasöründeki migrationların mevcut veritabanı yapısıyla uyumlu olduğunu kontrol et.

Yeni bir model veya tablo değişikliği yapılırsa MSSQL için yeni migration oluşturulmalıdır.

3. Swagger'ı aç

API çalıştırıldıktan sonra Swagger arayüzünü aç.

Endpointlerin listelendiğini ve API'nin hata vermeden başladığını kontrol et.

4. Authentication'ı test et

Admin login endpointini Swagger üzerinden test et.

Başarılı login sonucunda JWT token alınması gerekmektedir.

Daha sonra token ile korumalı endpointlere erişim test edilmelidir.

5. Submission API'sini kontrol et

Aşağıdaki endpointlerin çalıştığını kontrol et:

POST /api/Submissions
GET /api/Submissions
GET /api/Submissions/{id}
PUT /api/Submissions/{id}/status

6. Cemre'nin Submission API'si hazırsa karşılaştır

Cemre'nin kendi Submission API'si hazır olduğunda mevcut Submission yapısı ile karşılaştırılmalıdır.

Gerekli olan yapı belirlenerek mevcut "SubmissionsController", model ve servis yapıları:

- kullanılabilir,
- güncellenebilir,
- veya tamamen çıkarılabilir.

Amaç aynı işlevin iki farklı API tarafından tekrar edilmesini önlemektir.

7. PDF yükleme işlemini tekrar test et

Swagger üzerinden gerçek bir PDF dosyası gönder.

Dosyanın:

wwwroot/uploads/submissions

klasörüne kaydedildiğini kontrol et.

Ayrıca Submission kaydındaki "FilePath" alanının doğru dosya yolunu tuttuğunu kontrol et.

PDF dışındaki dosyaların reddedildiğini de test et.

8. Değişikliklerden sonra testleri tekrarla

Submission ve authentication tarafında değişiklik yapıldıysa:

- Başarılı login
- Tokensız erişim
- Geçersiz token
- Submission oluşturma
- Submission listeleme
- Submission detay
- Status güncelleme
- PDF yükleme
- Hatalı veri gönderimi

testleri tekrar yapılmalıdır.

9. GitHub'a göndermeden önce kontrol yap

Son olarak ".gitignore" dosyası kontrol edilmelidir.

Özellikle:

.vs/
bin/
obj/

gibi geliştirme ortamına ait klasörlerin repoya eklenmediğinden emin olunmalıdır.

Ayrıca "appsettings.json" içerisindeki bağlantı bilgileri ve JWT secret gibi hassas bilgilerin güvenli şekilde tutulduğu kontrol edilmelidir.

Kontroller tamamlandıktan sonra değişiklikler commit edilip GitHub'a push edilebilir.

---

12. Önemli Bilgiler

Admin Test Kullanıcısı

Swagger üzerinden authentication testi için kullanılan admin hesabı:

{
  "email": "admin@icomath.com",
  "password": "Admin123!"
}

Bu bilgiler geliştirme ve test amacıyla kullanılmıştır. Gerçek/üretim ortamında güvenli bir parola kullanılmalıdır.

Dosya Yükleme Konumu

Submission sırasında yüklenen PDF dosyaları:

wwwroot/uploads/submissions

klasörüne kaydedilir.

Submission kaydında dosyanın yolu:

FilePath

alanında tutulur.

Submission Endpointleri

POST /api/Submissions
GET /api/Submissions
GET /api/Submissions/{id}
PUT /api/Submissions/{id}/status

Bu endpointler Swagger üzerinden test edilmiştir.

Veritabanı

Proje geliştirme ortamında:

Microsoft SQL Server (MSSQL)

kullanılmaktadır.

MySQL'e ait eski bağlantı ve yapılandırmalar kaldırılmış/değiştirilmiştir.