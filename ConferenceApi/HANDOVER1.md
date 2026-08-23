# Konferans Yönetim Sistemi Projesi - Devir Teslim (Hafta 1)

**Ne yaptım?**
Backend altyapısını, katmanlı klasör mimarisini ve Swagger üzerinden test edilebilir temel bir API iskeletini kurdum. Veritabanı entegrasyonu yapılana kadar sistemin hata vermeden çalışabilmesi için geçici (mock) verilerle projeyi ayağa kaldırdım.

**Hangi dosyaları oluşturdum?**
* **Entities:** `Conference`, `ConferenceTopic`, `ImportantDate`, `Speaker`, `Submission`, `Participant`, `Book`, `ContactMessage`, `Admin`
* **DTOs:** Dışarıya açılacak veriler için temel DTO modelleri.
* **Controllers & Services:** 4 temel API için arayüzler (Interface), kontrolcüler ve mock servis dosyaları.
* **Data:** `ConferenceDbContext` ve başlangıç verileri için `DbSeeder`.
* **Diğer:** Global hata yönetimi için `ExceptionHandlingMiddleware`, şifreleme için `PasswordHasher` ve temel ayarları barındıran `appsettings.json`.

**Sistem nasıl çalışıyor?**
Projeyi başlatmak için indirdiğin dosyayı açıyosun bir sürü klasör karşılıyor seni yukarıdaki dosya yolu yeri var ya orayı siliyorsun cmd yazıyorsun cmd açılıyor. Cmd içine `dotnet run` komutunu yazıyorsun.Now listening on: http://localhost:XXXX lşi bir şey çıkıyor onu kopyala x ler sayı olucak http://localhost:5000XXXX/swagger bunu kopyala ve google arama yukardaki html yerine yapıştır   açılan Swagger arayüzü (`/swagger`) üzerinden atılan istekler, Controller üzerinden Service katmanına ulaşıyorsun.

**Hangi API'leri kullandım?**
Şu an için sisteme entegre edilen kendi oluşturduğumuz 4 temel GET uç noktasını (endpoint) kullandım:
* `GET /api/conferences`
* `GET /api/topics`
* `GET /api/important-dates`
* `GET /api/speakers`

**Eksik kalan yerler neler?**
* Gerçek fiziksel veritabanı (MySQL/SQL Server) bağlantısı henüz yapılmadı.
* JWT tabanlı kimlik doğrulama (Token) işlemleri eklenmedi.
* API'ler için veri ekleme (POST), güncelleme (PUT) ve silme (DELETE) işlemleri henüz yazılmadı (Sadece GET çalışıyor).

**Bilinen hatalar neler?**
Kodu bozan bilinen bir hata (bug) yoktur. Yalnızca tarayıcıdaki lokal testlerde ortaya çıkan HTTPS/CORS güvenlik uyarısını aşmak adına `Program.cs` içerisindeki `app.UseHttpsRedirection();` satırı geçici olarak yorum satırına (`//`) alındı. Bunu sildim şimdilik gerek yok diye ama gerekli haber edityim dedim. `appsettings.json`  dosyası silindi bende gözde ile konusutum haber edicem dedi bilgin olsun.

**EXTRA BİLGİLER**
Dosyaları debug ettikten sorna extra iki isimde dosya oluştu. Bin ve obj isimleri bilgin olsun. ConferenceApi.csproj açılmazsa sağ tık metin belgesi ile aç de açılıyor.

**Sonraki kişi nereden devam etmeli?**
1. Entity Framework CLI veya Package Manager Console üzerinden Migration komutlarını çalıştırıp tabloları veritabanında fiziksel olarak oluşturmalı.
2. `Services` klasöründeki dosyaların içinde manuel olarak döndürülen listeleri (mock verileri) silip, yerlerine `ConferenceDbContext` üzerinden çalışan gerçek asenkron sorguları yazmalı.