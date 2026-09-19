# HANDOVER — Hafta 1: Database, Auth & Test

Gözde | 1. Hafta | 10–16 Ağustos 2026
Branch: gozde/week1-database

---

## 1. Ne Yaptım?

Bu hafta projenin veri katmanını ve güvenlik altyapısını kurdum.

Veritabanı şemasını tasarladım, ER diagramı hazırladım ve MySQL üzerinde conference_db veritabanını oluşturdum. Dokümanda istenen 9 tablo ve aralarındaki ilişkiler kuruldu.

Backend projesinde Entity Framework Core yapılandırmasını yaptım. Code First yaklaşımıyla migration yapısını kurdum, tablolar C# sınıflarından üretiliyor. Sütun tipleri ve uzunlukları Fluent API ile tanımlandı.

Güvenlik tarafında BCrypt ile password hashing, JWT ile authentication ve rol tabanlı authorization kuruldu. Frontend'in API'ye erişebilmesi için CORS ayarlandı.

Ekibin boş veritabanıyla çalışmaması için başlangıç verileri eklendi.

---

## 2. Oluşturduğum Dosyalar

Data klasörü altında AppDbContext.cs dosyası oluşturuldu. DbSet tanımları, sütun kuralları ve seed data bu dosyada.

Helpers klasörü altında iki dosya var. PasswordHasher.cs şifre hashleme ve doğrulama işlemlerini yapıyor. TokenService.cs JWT token üretiyor.

Controllers klasörü altında AuthController.cs oluşturuldu. Login endpoint'i ve token doğrulama testi burada.

Migrations klasörü EF Core tarafından üretildi. İçinde dört migration var. InitialCreate tabloları oluşturuyor, AddColumnLengths sütun uzunluklarını uyguluyor, SeedInitialData konferans ve konuşmacı verilerini ekliyor, SeedAdminData admin kaydını ekliyor.

Kök dizinde appsettings.json dosyası oluşturuldu. Connection string ve JWT ayarları burada tutuluyor.

Ayrıca Program.cs dosyasına DbContext kaydı, CORS ve JWT authentication yapılandırması eklendi. Entities klasöründeki sınıflar veritabanı şemasıyla hizalandı.

---

## 3. Sistem Nasıl Çalışıyor?

### Veritabanı bağlantısı

appsettings.json içindeki ConnectionStrings bölümü MySQL'e nasıl bağlanılacağını tutuyor. Program.cs bu değeri okuyup AppDbContext'e veriyor. Kod içinde veritabanına erişmek isteyen her sınıf AppDbContext üzerinden çalışıyor.

### Tablo oluşturma

Tablolar elle kurulmuyor. Entity sınıfı yazılıyor, Add-Migration komutu ile değişiklik planı çıkarılıyor, Update-Database komutu ile veritabanına uygulanıyor. Şemada bir değişiklik gerektiğinde entity sınıfı düzenlenip yeni migration alınmalı.

### Admin girişi

Kullanıcı e-posta ve şifresini login endpoint'ine gönderiyor. Sistem e-postaya göre admin kaydını buluyor. Girilen şifre BCrypt ile doğrulanıyor, çünkü veritabanında şifrenin düz hali tutulmuyor. Doğruysa JWT token üretilip döndürülüyor. Token içinde admin id, e-posta, ad ve rol bilgisi var. Süresi 60 dakika.

### Korumalı endpoint'ler

Authorize etiketi eklenen metotlara token olmadan erişilemiyor. Token geçersizse veya süresi dolmuşsa 401 dönüyor.

---

## 4. Kullandığım Paketler

Microsoft.EntityFrameworkCore 9.0.0 — ORM

Pomelo.EntityFrameworkCore.MySql 9.0.0 — MySQL sağlayıcısı

Microsoft.EntityFrameworkCore.Design 9.0.0 — Migration altyapısı

Microsoft.EntityFrameworkCore.Tools 9.0.0 — Migration komutları

BCrypt.Net-Next — Password hashing

Microsoft.AspNetCore.Authentication.JwtBearer 8.0.11 — JWT doğrulama

NuGet varsayılan olarak en son sürümü kurmaya çalışıyor. EF Core paketlerinin 10.x sürümleri .NET 8 ile uyumlu değil. Kurulum yaparken sürüm belirtilmeli.

---

## 5. Şemadan Sapmalar ve Gerekçeleri

### Eklenen sütunlar

Speakers, ImportantDates ve Books tablolarına ConferenceId eklendi. Bu tablolar hiçbir konferansa bağlı değildi. İkinci bir konferans eklendiğinde eski kayıtlar yeni konferansın sayfasında da görünürdü. ConferenceTopics tablosunda bu sütun zaten vardı, tutarlılık için diğerlerine de eklendi.

### İlişki tipi

1-N tercih edildi, N-N kurulmadı. Aynı konuşmacı birden fazla konferansta yer alırsa kaydı tekrar eder. ConferenceSpeakers ara tablosuyla bu önlenebilirdi, ancak proje kapsamında tek konferans yayınlanacağı için gerek görülmedi. İhtiyaç doğarsa sonradan geçilebilir.

### Sütun tipleri

Dokümanda tip ve uzunluk bilgisi yoktu. created_at alanları timestamp yapıldı, varchar seçilseydi tarih aralığı sorguları yazılamazdı. published alanı boolean yapıldı. photo ve file_path alanları dosyanın kendisini değil sunucudaki yolunu tutuyor.

### Sütun uzunlukları

Gerçekçi en uzun değerlere göre belirlendi. university, email ve study_title 100 karakter, kısa alanlar 50 karakter, dosya yolları 255 karakter. status alanı 20 karakter, çünkü sadece pending, approved ve rejected değerleri tutulacak.

### password_hash uzunluğu

100 karakter olarak ayarlandı. BCrypt sabit 60 karakter üretiyor, ancak ileride Argon2 gibi daha uzun çıktı veren bir algoritmaya geçilirse sütun genişletmeye gerek kalmasın diye pay bırakıldı.

### İsim alanları

Speakers tablosunda tek name alanı, Submissions tablosunda first_name ve last_name ayrı tutuluyor. Bu bilinçli bir tercih. Konuşmacılar kart olarak gösteriliyor, sıralama gerekmiyor. Katılımcılar listesinde soyada göre sıralama gerekebilir.

### Entity sınıfları

Entity sınıfları veritabanı şemasıyla hizalandı. Book içinde Year ve FilePath alanları kullanıldı, çünkü doküman PDF yükleme istiyor. Submission başvuru formundaki alanları içerecek şekilde düzenlendi. Participant yalnızca SubmissionId ve Published tutuyor, diğer bilgiler Submissions tablosunda zaten var. Admin içinde Name alanı kullanıldı, giriş e-posta ile yapılacak.

### Kurulum yöntemi

İlk gün tablolar elle SQL ile kurulmuştu. Code First kararından sonra silinip migration ile yeniden oluşturuldu. Şema tasarımı aynı kaldı, sadece kurulum yöntemi değişti.

### Yapılandırma yöntemi

Sütun uzunlukları için Data Annotation yerine Fluent API kullanıldı. Böylece şema kuralları AppDbContext içinde tek yerde toplandı ve entity sınıflarına dokunulmadı. Bu tercih ekip içindeki iş bölümüne de uygun.

### Sütun isimlendirmesi

EF Core tabloları C# sınıflarından ürettiği için sütun isimleri PascalCase oldu. İlk şemada snake_case planlanmıştı. Tutarlı olduğu için değiştirilmedi, ancak veritabanına doğrudan SQL yazacak kişilerin bunu bilmesi gerekiyor.

---

## 6. Eksik Kalan Yerler

appsettings.json dosyası içinde MySQL şifresi ve JWT anahtarı düz metin olarak duruyor. Repoya push edilmeden önce appsettings.Development.json ayrılmalı ve gitignore dosyasına eklenmeli. Şu an geliştirme ortamında olduğumuz için sorun yaratmıyor.

JWT anahtarı üretim ortamında environment variable üzerinden okunmalı, dosyada tutulmamalı.

Refresh token mekanizması kurulmadı. Token süresi dolduğunda kullanıcı tekrar giriş yapmak zorunda. Bu haftanın kapsamında değildi.

Seed data içinde başvuru ve katılımcı verisi yok. Bunlar Submission API üzerinden üretilecek.

Photo ve FilePath alanları hazır ancak fiziksel dosya yükleme altyapısı kurulmadı. Seed data'daki yollar örnek amaçlı.

---

## 7. Bilinen Hatalar

### Derleme uyarıları

Entity sınıflarındaki string property'ler için null uyarıları var, yaklaşık 40 adet. Derlemeyi engellemiyor, sistem çalışıyor. Çözmek için property'ler nullable yapılabilir veya required eklenebilir. Karar backend tarafında verilmeli, entity sınıfları o kapsamda.

### Cascade delete davranışı

EF Core foreign key ilişkilerini cascade delete olarak kurdu. Bir konferans silinirse ona bağlı tüm konuşmacılar, konular, önemli tarihler ve kitaplar da silinir. Bu şu an istenen davranış olabilir ancak admin panelinde silme işlemi yazılırken dikkat edilmeli.

### Test kapsamı

Login endpoint'i ve authorization kontrolü Swagger üzerinden manuel test edildi. Otomatik test yazılmadı.

---

## 8. Sonraki Kişi Nereden Devam Etmeli?

### Projeyi çalıştırmak için

Repoyu clone'la. MySQL'de conference_db veritabanını boş olarak oluştur. appsettings.json içindeki connection string'de kendi MySQL şifreni yaz. Paket Yöneticisi Konsolu'nda Update-Database komutunu çalıştır, tablolar ve seed data oluşacak. Projeyi çalıştırdığında Swagger açılır.

### Admin giriş bilgileri

E-posta admin@icomath.com, şifre Admin123! olarak ayarlandı. Bu bilgiler geliştirme amaçlı, üretime geçilirse değiştirilmeli.

### Şemada değişiklik gerekirse

Doğrudan MySQL üzerinden ALTER TABLE yazılmamalı. Entity sınıfı düzenlenip Add-Migration ve Update-Database çalıştırılmalı. Aksi halde EF Core'un model kaydı ile gerçek veritabanı arasında uyumsuzluk oluşur ve sonraki migration'lar hata verir.

### Yeni korumalı endpoint yazarken

Metodun üstüne Authorize etiketi eklemek yeterli. Token doğrulama altyapısı Program.cs içinde kurulu.

### Şifre işlemleri için

PasswordHasher sınıfındaki Hash ve Verify metotları kullanılmalı. Şifre hiçbir yerde düz metin olarak saklanmamalı.

### Frontend bağlantısı için

CORS localhost:3000 ve localhost:5173 portlarına izin veriyor. Frontend farklı bir portta çalışacaksa Program.cs içindeki CORS politikasına eklenmeli.
