1. Ne Yaptın? (Yapılan İşlemler ve Testler)
Dosya Yükleme Güvenliği Testi: Swagger üzerinden .pdf uzantılı dosyaların başarılı bir şekilde yüklendiğini (201 Created),   .txt gibi farklı uzantıların ise sistem tarafından engellendiğini test ettim.

SQL İlişkileri ve CRUD Testleri: Veritabanındaki kayıtların listelenmesini (GET), tekil kayıt detaylarının çekilmesini ve durum güncellemelerini (PUT) doğruladım.

Tekrarlanan/Çift (Duplicate) Kontrolü: Aynı e-posta adresiyle tekrar başvuru yapılabilmesi sorununu fark edip, controller katmanına mükerrer kayıtları engelleyen kontrol mekanizmasını ekledin ve bunu Swagger üzerinden test ederek doğruladım.

Dokümantasyon: Projen için hazırladığımız kapsamlı Test Raporu ve Hata Senaryoları içeriklerini Word belgesi (.docx) olarak kaydettim.



2. Hangi Dosyaları Oluşturdun? 
Word Dokümanları:Test_Raporu.docx: API test sonuçlarını ve kapsamını içeren rapor dosyası.  
Hata_Senaryolari.docx: Sistemde karşılaşılabilecek tüm hata senaryolarını ve HTTP durum kodlarını (400, 401, 404, 500 vb.) barındıran doküman.  



3. Değiştirdiklerin (Kod ve Proje Üzerindeki Güncellemeler)
Controller Güncellemesi (SubmissionsController.cs):CreateSubmission metodunun en başına, gelen istekteki Email adresinin veritabanında (_context.Submissions) daha önce kaydedilip kaydedilmediğini kontrol eden LINQ sorgusunu ekledim.  Eğer aynı e-posta ile daha önce kayıt yapılmışsa, sistemin yeni bir satır açmak yerine 400 Bad Request ve "Bu e-posta adresi ile zaten bir başvuru yapılmıştır" mesajını dönmesini sağladım.

Jwt bloğunun içine "Key" parametresi eklendi. 
Neden Ekledik? İmzalama ve Doğrulama İçin: ASP.NET Core'un kullanıcıya bir JWT (token) üretebilmesi ve daha sonra gelen isteklerde bu token'ın gerçekten bizim sistemimiz tarafından verilip verilmediğini (güvenli olup olmadığını) anlayabilmesi için gizli bir imza anahtarına (Secret Key) ihtiyacı vardır.
