Konferans Yönetim Sistemi Projesi - Devir Teslim (Hafta 2)

Devreden: Cemre (Frontend'den Backend'e geçtim)

 Ne yaptım?

Bu hafta Nilay'ın backend kısmını devraldım. İlk başta biraz zaman geçirdim kodu
anlamaya çalışarak, klasörlere baktım (Entities, DTOs, Services, Controllers diye
ayırmış, gayet mantıklı bir yapı kurmuş açıkçası). Ondan sonra benim görevim olan
bildiri gönderme (Submission) kısmına geçtim.

Bu arada bir şey fark ettim: API'ler çalışıyor gibi görünüyordu ama aslında
veritabanına falan bağlı değilmiş, sabit veri dönüyordu direkt koddan. appsettings.json
diye bir dosya bile yokmuş. Nilay da kendi devir dosyasında zaten "bunu ben yapamadım,
sonraki kişi tamamlasın" demiş, o da bendim herhalde bu sefer. Neyse, ben de gerçek
bağlantıyı kurdum, epey uğraştırdı ama sonunda oldu.

Neler yaptım (dosya bazında)

Yeni oluşturduklarım:
* appsettings.json (yoktu, ekledim, MySQL bilgileri içinde)
* Submission.cs entity'sini formda istenen alanlarla güncelledim (ad, soyad, mail, ülke, oturum vs.)
* Submission ile ilgili DTO dosyaları
* Submission servisi (create, listele, tekil getir, status güncelle)
* SubmissionsController.cs

Değiştirdiklerim:
* Program.cs - veritabanı bağlantısını gerçekten kaydettim
* csproj dosyası - MySQL paketi ve bir iki ek paket ekledim

 Nasıl çalışıyor kabaca

dotnet run ile ayağa kalkıyor, swagger sayfasından test edebiliyorsun her şeyi.
Bildiri formu dolduruluyor, dosya da yükleniyor (pdf/word), backend'e gidiyor,
oradan da gerçekten MySQL'e kaydoluyor artık. İlk başta "pending" durumunda
başlıyor, admin onaylayınca/reddedince durumu değişiyor.

 Kullandığım endpointler

* POST /api/submissions - yeni başvuru (dosya da gönderiliyor buradan)
* GET /api/submissions - hepsini listele
* GET /api/submissions/{id} - tek tanesini getir
* PUT /api/submissions/{id}/status - onayla/reddet

Hepsini swagger üzerinden tek tek denedim, çalıştı. Dosya yüklemeyi de test ettim,
word dosyası gönderdim, sorunsuz kaydetti.

 Eksik kalanlar

* Admin tarafında onaylama ekranı yok henüz, o Büşra'ya kalıyor sanırım
* Yüklenen dosyayı admin panelden indirme diye bir şey henüz yok
* Login/yetkilendirme (JWT) submission tarafına hiç eklenmedi, şu an herkes
  başvuru gönderebiliyor kontrolsüz, ileride eklenmesi lazım

 Bilinen hatalar

Ciddi bir hata yok gibi görünüyor, en azından denediğim kadarıyla. Nullable
ayarını açtığım için bazı eski dosyalarda sarı uyarılar çıkıyor ama onlar
hata değil, göz ardı edilebilir.

 Devraldığım kodda gördüklerim

Nilay'ın kurduğu klasör düzeni gerçekten işime yaradı, üzerine eklemek kolay oldu,
bu yüzden bir şeyi silip sıfırdan yazmadım. Tek değiştirdiğim şey Submission
entity'sindeki SpeakerId alanıydı, zorunlu değildi olmasına gerek yoktu (herkes
başvurabilmeli, önceden kayıtlı konuşmacı olması şart değil mantığında), o yüzden
onu opsiyonel yaptım sadece, silmedim.

En çok zaman kaybettiğim yer aslında veritabanı bağlantısıydı - şifre, izinler falan
derken epey uğraştım ama sonunda MySQL Workbench'ten kullanıcıya izin verip çözdüm.

 Sonraki kişiye not (Gözde, Hafta 3)

appsettings.json'daki bağlantı bilgisi benim bilgisayarıma göre, sende çalışmazsa
kendi MySQL bilgilerinle değiştirmen lazım muhtemelen. Admin tarafındaki diğer
endpoint'ler (katılımcılar, kitaplar vs.) henüz yok, Submission'daki mantığı
kopyalayarak hızlıca eklenebilir bence. JWT de eklenmesi gereken bir şey, ben
yetişemedim.