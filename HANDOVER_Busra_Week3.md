HANDOVER.md — Hafta 3 / Büşra (Frontend)

«Gözde'nin 2. hafta "HANDOVER.md" dosyası korunmuştur. Bu dosya, 3. hafta
frontend çalışmalarının ve devralınan yapılar üzerinde yapılan geliştirmelerin
takibi amacıyla ayrı olarak hazırlanmıştır.

Not: Bu hafta frontend geliştirmeleri tamamlanmıştır. Bundan sonraki aşama
ekip üyelerinin branch'lerinde bulunan değişikliklerin birleştirilmesi (merge)
ve backend–MSSQL–frontend sisteminin birlikte entegrasyonunun kontrol edilmesidir.»

---

Ne yaptım?

3. haftada frontend tarafında ziyaretçi bölümünde eksik kalan ve geliştirilmesi
   gereken sayfaları tamamladım. Gözde'nin 2. haftada hazırladığı frontend yapısı
   devralınarak mevcut mimari korunmuş ve yeni sayfalar aynı yapı ile geliştirilmiştir.

Bu hafta özellikle;

- Sayfaların son görsel ve işlevsel düzenlemeleri yapıldı.
- Mobil ve tablet ekranlar için responsive düzenlemeler yapıldı.
- Loading, error, empty ve fallback durumları kontrol edilerek sayfaların
  beklenmeyen veri durumlarında çökmesi engellendi.
- Program sayfası tamamlandı.
- Konferans Kitapları sayfası tamamlandı.
- Kayıt & Ücretler sayfası düzenlendi.
- Katılımcılar ve İletişim sayfalarının mevcut yapıları kontrol edildi.
- Program verileri için "programService.js" oluşturularak servis katmanı yapısına
  uygun hale getirildi.
- Konferans kitapları için "booksService.js" kullanıldı.
- Frontend tarafındaki mock veriler backend bağlantısı bulunmadığı durumlarda
  kullanılabilecek şekilde korunmuştur.
- Program verilerinin tarihe göre gruplanması için yardımcı fonksiyon yapısı
  oluşturuldu ve test edildi.
- Sayfalarda kullanılan reusable component yapıları incelenerek mevcut tasarım
  sistemine uygun şekilde kullanıldı.
- Backend bağlantısı bulunmayan bölümlerde gerçek backend varmış gibi bir
  entegrasyon yapılmamış, bunun yerine frontend tarafında entegrasyona hazır
  servis yapısı oluşturulmuştur.

---

Tamamlanan sayfalar

1. Katılımcılar

Katılımcılar sayfasının mevcut yapısı devralınarak son kontrolleri yapıldı.

Sayfada:

- Katılımcı verilerinin listelenmesi
- Arama işlemi
- Loading durumu
- Empty durum
- Error durumu
- Backend ulaşılamadığında fallback/mock veri kullanımı
- Responsive tasarım

kontrol edildi.

"useApiData" hook'u kullanılarak API'den veri alınamadığında sayfanın
çalışmaya devam etmesi sağlandı.

---

2. Konferans Kitapları

"ConferenceBooks.jsx" ve "ConferenceBooks.css" oluşturularak konferans
kitaplarının ziyaretçiye listelenebileceği yapı hazırlandı.

Kullanılan servis:

src/services/booksService.js

Servis yapısı:

GET /api/books

Frontend tarafında "mockBooks" kullanılarak örnek kitaplar gösterilmektedir.

Sayfada;

- Loading durumu
- Error durumu
- Empty durum
- Fallback veri kullanımı
- Kitapların kart yapısında listelenmesi
- Kitabı görüntüleme bağlantısı
- Mobil / tablet / masaüstü responsive düzen

kontrol edilmiştir.

Backend notu

"GET /api/books" endpoint'i frontend tarafında proje mimarisine uygun olarak
tanımlanmıştır. Ancak 3. hafta frontend çalışmaları sırasında backend tarafı
aktif olarak geliştirilmediği için endpoint'in gerçek backend karşılığı ve
response modeli tarafımızca doğrulanmamıştır.

Backend entegrasyonu sırasında endpoint adı ve dönen veri alanları backend
tarafıyla karşılaştırılmalıdır.

---

3. Program

Program sayfası bu hafta tamamlanan önemli bölümlerden biridir.

Kullanılan dosyalar:

src/pages/Program.jsx
src/pages/Program.css
src/services/programService.js
src/data/mockData.js

Program sayfasında;

- Program verilerinin API'den alınabilecek şekilde servis katmanına ayrılması
- Backend bağlantısı bulunmadığında mock verilerin kullanılması
- Loading mesajı
- Fallback bilgilendirmesi
- Error mesajı
- Empty durum
- Programların tarihe göre gruplanması
- Oturumların saat, tür, başlık ve konum bilgilerinin gösterilmesi
- Responsive tasarım

uygulanmıştır.

Program verilerinin gruplanması sırasında "Array.isArray()" kontrolü kullanılarak
beklenmeyen veri geldiğinde ".reduce()" / ".map()" işlemlerinin sayfayı
çökertmesinin önüne geçilmiştir.

Program servisinde kullanılan yapı:

GET /api/program

Backend notu

"programService.js" içerisindeki endpoint frontend entegrasyonuna hazır olacak
şekilde oluşturulmuştur.

Ancak "/api/program" endpoint'i 3. hafta frontend çalışmaları sırasında
backend tarafında doğrulanmamıştır. Bu nedenle endpoint'in backend'deki gerçek
controller/action karşılığı, HTTP response yapısı ve alan isimleri entegrasyon
aşamasında kontrol edilmelidir.

Frontend tarafında mevcut proje mimarisi korunmuştur.

---

4. Kayıt & Ücretler

"Registration.jsx" ve "Registration.css" üzerinde çalışılarak ziyaretçinin
konferans kayıt seçeneklerini görebileceği yapı hazırlanmıştır.

Sayfada;

- Fiziksel Katılım
- Online Katılım

olmak üzere iki kayıt seçeneği gösterilmektedir.

Backend tarafında kayıt ücretlerini sağlayan doğrulanmış bir endpoint
bulunmadığından frontend tarafında gerçek backend verisi uydurulmamıştır.

Ücret bilgilerinin mevcut aşamada örnek / geçici bilgi olduğu açıkça
belirtilmiştir.

Bu yaklaşım özellikle backend tarafındaki MSSQL veri yapısı ve ilgili
endpointler henüz frontend tarafından doğrulanmadığı için tercih edilmiştir.

---

5. İletişim

İletişim sayfasının mevcut yapısı kontrol edilerek responsive ve durum
kontrolleri açısından incelenmiştir.

İletişim formu ve konferans iletişim bilgilerinin mevcut servis / mock veri
yapısıyla çalışması korunmuştur.

Backend bağlantısı olmayan durumda frontend'in tamamen çökmesini engellemek
amacıyla mevcut fallback yaklaşımı korunmuştur.

---

Oluşturulan / kullanılan dosyalar

Dosya| Görevi
"src/pages/Program.jsx"| Konferans programının ziyaretçiye gösterilmesi
"src/pages/Program.css"| Program sayfasının responsive tasarımı
"src/services/programService.js"| Program API isteğinin servis katmanı
"src/pages/ConferenceBooks.jsx"| Konferans kitaplarının listelenmesi
"src/pages/ConferenceBooks.css"| Konferans kitapları responsive tasarımı
"src/services/booksService.js"| Konferans kitapları API isteği
"src/pages/Registration.jsx"| Kayıt ve ücretler sayfası
"src/pages/Registration.css"| Kayıt ve ücretler sayfasının tasarımı
"src/data/mockData.js"| Backend bulunmadığında kullanılan örnek veriler
"src/utils/programUtils.js"| Program verilerinin işlenmesi / gruplanması
"src/utils/programUtils.test.js"| Program yardımcı fonksiyonlarının testleri

---

Kullanılan mevcut yapılar

3. hafta boyunca yeni sayfalar hazırlanırken mevcut frontend mimarisinin
   bozulmamasına dikkat edilmiştir.

"useApiData"

API'den veri alan sayfalarda ortak veri çekme yapısı olarak kullanılmıştır.

Hook;

- "data"
- "loading"
- "error"
- "usingFallback"

değerlerini sağlar.

Backend ulaşılamadığında ilgili sayfanın mock verilerle çalışmaya devam
etmesini sağlar.

Bu yapı sayesinde backend henüz hazır değilken ziyaretçi sayfaları tamamen
boş veya kırık durumda kalmamaktadır.

---

"Reveal" ve "useScrollReveal"

Mevcut animasyon yapısı incelenmiş ve çalışma mantığı anlaşılmıştır.

"useScrollReveal" içerisinde "IntersectionObserver" kullanılarak elementlerin
ekrana geldiğinde görünür hale gelmesi sağlanmaktadır.

Ayrıca:

prefers-reduced-motion

kontrolü bulunduğundan hareket azaltma tercihi olan kullanıcılar için
animasyon davranışı uygun şekilde ele alınmıştır.

"Reveal" bileşeni bu hook'u reusable bir React bileşeni haline getirmektedir.

---

"SectionHeading"

Sayfa başlıklarının ortak bir yapıda tutulmasını sağlar.

Kullanılan alanlar:

- eyebrow
- title
- description

Yeni oluşturulan sayfalarda mevcut tasarım sistemine uyum sağlamak amacıyla
kullanılmıştır.

---

"SessionTag"

Program / oturum gibi bölümlerde kod ve etiket bilgisini göstermek için
kullanılan reusable bileşendir.

"brass" ve "maroon" gibi ton seçenekleri bulunmaktadır.

---

"StatsStrip"

İstatistik bilgilerinin dört kolonlu yapıda gösterilmesini sağlayan reusable
bileşendir.

Bileşenin ileride Dashboard/API verileriyle beslenebileceği düşünülerek
stat verileri prop üzerinden alınmaktadır.

---

"StatusMessage"

Form işlemleri sonrasında;

- success
- error
- info

durumlarını göstermek için kullanılan reusable bileşendir.

"role="status"" kullanılması sayesinde dinamik olarak oluşan durum
mesajlarının erişilebilirliği desteklenmiştir.

---

Program verilerinde ".map()" / veri kontrolü

Program sayfasında backend'den beklenmeyen bir veri gelmesi durumunda doğrudan
".map()" veya ".reduce()" çalıştırılması sayfanın çökmesine neden olabilirdi.

Bu nedenle önce verinin gerçekten dizi olup olmadığı kontrol edilmiştir:

if (!Array.isArray(programData)) {
return {};
}

Benzer şekilde listelerde kullanılacak veriler için dizi kontrolü yapılmıştır.

Bu yaklaşımın amacı backend'den;

- "null"
- "undefined"
- object
- hatalı response

gibi beklenmeyen bir veri geldiğinde React sayfasının tamamen çökmesini
engellemektir.

---

Program testleri

Program verilerinin tarihe göre gruplanması için:

src/utils/programUtils.js
src/utils/programUtils.test.js

dosyaları oluşturulmuştur.

Testlerde;

- Programların tarihe göre gruplanması
- Boş dizi gönderilmesi
- Beklenmeyen / dizi olmayan veri
- Aynı tarihte birden fazla etkinliğin korunması

kontrol edilmiştir.

Testler Vitest kullanılarak çalıştırılmıştır.

Mevcut test yapısında program yardımcı fonksiyonları için 4 test başarılı
olmuştur.

---

Responsive düzenlemeler

3. hafta görevleri kapsamında sayfaların farklı ekran boyutlarında
   kullanılabilir olması kontrol edilmiştir.

Özellikle:

- Masaüstü
- Tablet
- Mobil

ekranlar için CSS media query'leri kullanılmıştır.

Program sayfasında masaüstünde iki kolonlu zaman/içerik yapısı kullanılırken,
mobilde içerik tek kolona düşürülmüştür.

Konferans kitaplarında kart yapısı;

Desktop → 3 kolon
Tablet → 2 kolon
Mobil → 1 kolon

şeklinde düzenlenmiştir.

Kayıt & Ücretler sayfasında da kartlar mobil ekranlarda tek kolona
düşmektedir.

---

Backend / MSSQL / Frontend entegrasyon notu

Bu hafta Büşra'nın sorumluluğu frontend geliştirmesidir.

Backend ve MSSQL tarafında yeni bir geliştirme yapılmamıştır.

Bu nedenle oluşturulan veya kullanılan servislerdeki endpointler frontend
tarafında backend–MSSQL–frontend mimarisi dikkate alınarak hazırlanmıştır;
ancak backend tarafında gerçek controller, action, response modeli ve
MSSQL bağlantısı tarafımızca tek tek doğrulanmamıştır.

Özellikle aşağıdaki endpointler için bu durum geçerlidir:

Metot| Endpoint| Frontend durumu
"GET"| "/api/program"| Servis oluşturuldu, backend karşılığı doğrulanmadı
"GET"| "/api/books"| Servis kullanıldı, backend karşılığı doğrulanmadı
"GET"| "/api/participants"| Mevcut servis yapısı kullanıldı
"POST"| "/api/contact-messages"| Mevcut servis yapısı kullanıldı
"POST"| "/api/submissions"| Mevcut servis yapısı kullanıldı

Bu endpointlerin frontend tarafında bulunması, backend tarafında kesin olarak
aynı endpointlerin mevcut olduğu anlamına gelmemektedir.

Entegrasyon sırasında backend controller/action isimleri, HTTP metotları,
request alanları ve response modelleri frontend servisleriyle
karşılaştırılmalıdır.

Backend'de endpoint isimleri farklıysa yalnızca ilgili servis katmanının
güncellenmesi tercih edilmelidir. Sayfa içerisindeki tüm API mantığının
yeniden yazılmasına gerek yoktur.

---

Mock data kullanımının amacı

Backend bağlantısı henüz doğrulanmadığı için frontend sayfalarının boş veya
kullanılamaz durumda kalmaması amacıyla "mockData.js" içerisindeki örnek
veriler korunmuştur.

Bu veriler gerçek backend verisi değildir.

Örneğin:

mockProgram
mockBooks
mockParticipants
mockContactInfo

frontend geliştirme ve görsel kontrol amacıyla kullanılmaktadır.

Backend bağlantısı sağlandığında "useApiData" üzerinden gerçek API verisi
kullanılacak şekilde yapı hazırlanmıştır.

---

Devraldığım kodda karşılaştığım durumlar

Gözde'nin 2. hafta frontend çalışmalarından devralınan yapıda genel olarak
servis katmanının ayrılmış olması, reusable component kullanımı ve
"useApiData" fallback yaklaşımı korunmuştur.

Olumlu noktalar

- API çağrılarının sayfalardan ayrılarak servis katmanında tutulması
- "useApiData" ile ortak veri çekme yapısı
- Mock verilerin ayrı dosyada tutulması
- Form doğrulama yardımcılarının ayrı "utils" klasöründe bulunması
- Reusable "FormField" ve "StatusMessage" bileşenleri
- Tasarım tokenlarının "tokens.css" içerisinde tutulması
- Responsive CSS yapısının mevcut olması
- Test altyapısının Vitest ile kurulmuş olması

Dikkat edilen noktalar

- Backend bağlantısı olmayan sayfalarda gerçek API verisi varmış gibi
  davranılmaması
- API response'unun dizi olması gereken yerlerde "Array.isArray()" kontrolü
  yapılması
- ".map()" / ".reduce()" işlemlerinden önce verinin kontrol edilmesi
- Loading, error, empty ve fallback durumlarının kullanıcıya anlaşılır
  mesajlarla gösterilmesi
- Mevcut reusable componentlerin mümkün olduğunca tekrar kullanılması
- Tasarımda mevcut "tokens.css" değişkenlerinin korunması

---

Endpoint ve servis yaklaşımı

Frontend tarafında servis katmanı özellikle korunmuştur.

Örneğin Program için:

const programService = {
getAll: () => api.get("/program"),
};

Konferans kitapları için:

const booksService = {
getAll: () => api.get("/books"),
};

Bu yapı sayesinde backend entegrasyonu sırasında endpoint değişikliği
gerektiğinde sayfa dosyasının tamamının değiştirilmesi yerine ilgili servis
dosyasının değiştirilmesi yeterli olacaktır.

Ancak bu servisler backend endpointlerinin doğrulandığı anlamına
gelmez. Endpointlerin gerçek backend ile entegrasyon sırasında kontrol
edilmesi gerekmektedir.

---

Bilinen / entegrasyon sırasında kontrol edilmesi gereken durumlar

1. Backend endpointleri

Frontend servislerinde kullanılan endpointlerin gerçek backend controller
ve action'larıyla eşleşip eşleşmediği kontrol edilmelidir.

2. Response modelleri

Backend'in döndürdüğü property isimleri ile frontend'in kullandığı alan
isimleri karşılaştırılmalıdır.

Örneğin Program için:

id
date
time
type
title
location

alanlarının backend response'unda aynı isimlerle gelip gelmediği kontrol
edilmelidir.

3. Bildiri gönderimi

Bildiri gönderiminde dosya bulunduğu için "multipart/form-data" yapısı
kullanılmaktadır.

Backend tarafındaki action'ın dosya kabul edecek şekilde tasarlanıp
tasarlanmadığı gerçek entegrasyonda kontrol edilmelidir.

4. Favicon 404

Tarayıcı konsolunda:

GET /favicon.ico 404

şeklinde bir kayıt görülebilir.

Bu durum uygulamanın React sayfalarının çalışmasını engelleyen bir hata
değildir; tarayıcının favicon dosyasını aramasından kaynaklanan ayrı bir
kaynak isteğidir.

5. Bildiri gönderiminde HTTP 404

Bildiri gönderimi sırasında backend endpoint'i aktif değilse veya frontend'deki
endpoint ile backend'deki gerçek endpoint eşleşmiyorsa:

HTTP 404

alınabilir.

Bu durumda frontend formunun çalışmadığı anlamına gelmez; gerçek backend
endpointinin bulunamadığı veya endpoint yolunun eşleşmediği anlamına gelir.

---

Merge / Son entegrasyon aşaması

3. hafta frontend geliştirmeleri tamamlanmıştır.

Bundan sonraki aşamada ekip branch'lerindeki çalışmalar birleştirilirken
özellikle aşağıdaki kontroller yapılmalıdır:

1. Büşra'nın 3. hafta frontend branch'i merge edilmelidir.
2. Gözde, Nilay ve Cemre'nin backend / frontend değişiklikleriyle dosya
   çakışmaları kontrol edilmelidir.
3. Aynı dosyada farklı kişilerin yaptığı değişiklikler varsa mevcut
   mimari korunarak birleştirilmelidir.
4. Servis dosyalarındaki endpointler gerçek backend controller'larıyla
   karşılaştırılmalıdır.
5. Backend'in MSSQL bağlantısı çalıştırılarak gerçek veri ile frontend
   sayfaları test edilmelidir.
6. Mock fallback'in gerçek API başarılı olduğunda devre dışı kalıp gerçek
   verinin gösterildiği kontrol edilmelidir.
7. Loading / error / empty durumları tekrar test edilmelidir.
8. Bildiri gönderimi ve iletişim formları gerçek backend ile denenmelidir.
9. Konferans kitapları ve program endpointlerinin gerçek response yapıları
   kontrol edilmelidir.
10. Tüm route'lar tek tek açılarak kırık link veya React runtime error
    bulunmadığı kontrol edilmelidir.
11. Mobil, tablet ve masaüstü ekranlarda son genel kontrol yapılmalıdır.
12. Son olarak testler ve production build çalıştırılmalıdır.

---

Sonuç

Hafta 3 sonunda Büşra'nın frontend sorumluluğundaki ziyaretçi sayfalarının
geliştirilmesi ve son düzenlemeleri tamamlanmıştır.

Frontend tarafında backend bağlantısına uygun servis katmanı korunmuş,
backend'in henüz doğrulanmadığı yerlerde mock veriler kullanılmış ve
entegrasyon sırasında değiştirilebilecek noktalar servis katmanında
tutulmuştur.

Bu nedenle mevcut kodun amacı backend'i taklit etmek değil; backend–MSSQL
veri yapısı hazır olduğunda gerçek API ile birleştirilebilecek, çalışır ve
dayanıklı bir frontend yapı sağlamaktır.

Kodlama aşamasının ardından temel ihtiyaç branch'lerin merge edilmesi,
endpointlerin gerçek backend ile doğrulanması ve MSSQL'den gelen gerçek
verilerle uçtan uca sistem testinin yapılmasıdır.
