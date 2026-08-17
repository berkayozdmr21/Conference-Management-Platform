Hafta 1 - Handover Dokümanı

1. Hafta Genel Özeti

Hafta 1 kapsamında konferans/sempozyum yönetim panelinin frontend tarafı geliştirildi.

React ve Bootstrap kullanılarak yönetim panelindeki temel sayfaların arayüzleri oluşturuldu. API henüz verilmediği için bu hafta gerçek backend bağlantısı yapılmadı. Bunun yerine React "useState" kullanılarak mock data oluşturuldu ve frontend üzerinde ekleme, listeleme, güncelleme ve silme işlemleri gerçekleştirildi.

Bu nedenle yapılan CRUD işlemleri şu an için yalnızca frontend tarafında çalışmaktadır. Sayfa yenilendiğinde yapılan değişiklikler kalıcı olmaz.



2. Kullanılan Teknolojiler

- React
- Vite
- JavaScript / JSX
- React Hooks
- useState
- Bootstrap
- Bootstrap Modal
- React Router
- Mock Data


3. Oluşturulan Sayfalar

Dashboard.jsx

Yönetim panelinin ana sayfası oluşturuldu.

Dashboard üzerinde:

- Konferanslar
- Konular
- Önemli Tarihler
- Konuşmacılar

için bilgi kartları oluşturuldu.

Dashboard sayfasının daha dolu ve kullanışlı görünmesi için ana sayfa yapısı geliştirildi.

API olmadığı için gösterilen veriler şu aşamada mock/sabit verilerdir.


Konular.jsx

Konu yönetim sayfası oluşturuldu.

Kullanılan alanlar:

- Konu Adı
- Açıklama

Yapılan işlemler:

- Yeni konu ekleme
- Konuları listeleme
- Konu silme
- Konu düzenleme
- Konu güncelleme
- Boş alan kontrolü
- Hata mesajı gösterme
- Bootstrap düzenleme modalı

Test amacıyla örnek konular kullanıldı:

- Yapay Zeka
- Web Teknolojileri
- Siber Güvenlik


Konferanslar.jsx

Konferans yönetim sayfası oluşturuldu.

Kullanılan alanlar:

- Başlık
- Açıklama
- Başlangıç
- Bitiş
- Konum

Yapılan işlemler:

- Yeni konferans ekleme
- Konferansları listeleme
- Konferans silme
- Konferans düzenleme
- Konferans güncelleme
- Boş alan kontrolü
- Bootstrap modal kullanımı

Konferans kayıtları şu anda mock data ile tutulmaktadır.

---

Önemli Tarihler Sayfası

Önemli tarih yönetimi için frontend yapı oluşturuldu.

Kullanılan alanlar:

- Başlık
- Açıklama
- Tarih

Test amacıyla örnek kayıtlar eklenerek sayfanın çalışma mantığı kontrol edildi.

---

Konusmacilar.jsx

Konuşmacı yönetim sayfası oluşturuldu.

Kullanılan alanlar:

- Ad Soyad
- Ünvan
- Kurum
- Sunum Konusu

Yapılan işlemler:

- Yeni konuşmacı ekleme
- Konuşmacıları listeleme
- Konuşmacı silme
- Konuşmacı düzenleme
- Konuşmacı güncelleme
- Boş alan kontrolü
- Hata mesajı gösterme
- Başarı mesajı gösterme
- Düzenleme modalı

Test amacıyla örnek konuşmacılar kullanıldı.

---

4. Ortak Bileşenler

Sayfalarda ortak olarak aşağıdaki componentler kullanıldı:

- "Navbar"
- "Sidebar"
- "Footer"

Sayfa düzenlerinde Bootstrap grid sistemi kullanıldı.

Örneğin içerik ve sidebar yapısı Bootstrap kolonları ile oluşturuldu.

---

5. Sistem Nasıl Çalışıyor?

Bu hafta gerçek API bağlantısı olmadığı için veriler React state içerisinde tutulmaktadır.


Kullanıcı yeni kayıt eklediğinde formdaki bilgiler "useState" ile tutulur.

Kaydetme işleminde yeni kayıt oluşturularak state dizisine eklenir.

Listeleme işlemi "map()" kullanılarak yapılır.

Silme işleminde "filter()" kullanılarak seçilen kayıt listeden çıkarılır.

Düzenleme işleminde seçilen kayıt alınır ve düzenleme modalında gösterilir. Güncelleme sırasında "map()" kullanılarak ilgili kayıt değiştirilir.

---

6. CRUD Durumu

Frontend tarafında CRUD mantığı kurulmuştur.

Create

Yeni kayıt ekleme işlemi yapılmaktadır.

Read

State içerisinde bulunan kayıtlar tabloya aktarılmaktadır.

Update

Seçilen kayıt düzenleme modalı üzerinden güncellenmektedir.

Delete

Seçilen kayıt "filter()" kullanılarak silinmektedir.

Ancak bunlar henüz gerçek database CRUD işlemleri değildir.

Şu anda:

React State → Mock Data → Frontend

şeklinde çalışmaktadır.

İlerleyen aşamada:

React → API → Backend → Database

şeklinde çalışması planlanmaktadır.

---

7. Kullanılan API'ler

Hafta 1'de bu sayfalarda gerçek API kullanılmadı.

API henüz verilmediği için:

- Konular
- Konferanslar
- Önemli Tarihler
- Konuşmacılar
- Dashboard

sayfalarında gerçek backend endpointleri kullanılmadı.

Bu sayfalarda Axios ile API isteği yapılmamıştır.

Veriler mock data olarak React state içerisinde tutulmuştur.

Bu nedenle şu aşamada kullanılan gerçek API endpointi bulunmamaktadır.

---

8. Neden Mock Data Kullanıldı?

API henüz hazır/verilmiş olmadığı için frontend geliştirmesinin durmaması amacıyla mock data kullanıldı.

Böylece API beklenirken:

- Sayfa tasarımları hazırlanabildi.
- Formlar oluşturulabildi.
- Modal yapıları oluşturulabildi.
- CRUD işlemleri frontend üzerinde test edilebildi.
- Kullanıcı arayüzü tamamlanabildi.

Daha sonra gerçek API geldiğinde mock data kaldırılarak API bağlantısı yapılacaktır.

---
---

9. Eksik Kalanlar

Hafta 1 sonunda temel frontend yapısı hazırlanmış olsa da aşağıdaki işlemler sonraki aşamalarda yapılmalıdır:

1. Gerçek API endpointlerinin alınması.
2. Mock data yapılarını kaldırmak.
3. Konular sayfasını API'ye bağlamak.
4. Konferanslar sayfasını API'ye bağlamak.
5. Önemli Tarihler sayfasını API'ye bağlamak.
6. Konuşmacılar sayfasını API'ye bağlamak.
7. GET işlemleri ile database'deki kayıtları listelemek.
8. POST işlemleri ile yeni kayıt oluşturmak.
9. PUT/PATCH işlemleri ile kayıt güncellemek.
10. DELETE işlemleri ile kayıt silmek.
11. Dashboard'daki sayıların gerçek API verilerinden alınmasını sağlamak.
12. API'den gelen hata durumlarını frontend üzerinde göstermek.
13. Database üzerinde CRUD işlemlerini test etmek.

---

10. Sonraki Kişi Nereden Devam Etmeli?

Sonraki kişi frontend sayfalarını baştan oluşturmamalıdır.

İlk olarak backend tarafındaki API endpointleri incelenmelidir.

Önerilen çalışma sırası:

1. Konular.jsx

İlk olarak Konular sayfasına gerçek API bağlantısı yapılmalıdır.

Mock data kaldırılmalıdır.

Önce GET işlemi ile konular backend'den alınmalıdır.

Daha sonra:

- POST → konu ekleme
- PUT/PATCH → konu güncelleme
- DELETE → konu silme

işlemleri eklenmelidir.

2. Konferanslar.jsx

Aynı CRUD yapısı konferanslara uygulanmalıdır.

3. Önemli Tarihler

Mock data kaldırılıp API bağlantısı yapılmalıdır.

4. Konusmacilar.jsx

Konuşmacı CRUD işlemleri gerçek API'ye bağlanmalıdır.

5. Dashboard

Diğer sayfalardaki gerçek veriler API'den alındıktan sonra Dashboard'daki sayılar gerçek kayıt sayılarına bağlanmalıdır.

---

11. Hafta 1 Son Durumu

Frontend: Temel yönetim paneli sayfaları hazırlandı.

CRUD: Mock data üzerinde çalışır durumda.

API: Bu hafta gerçek API kullanılmadı.

Database: Bu sayfalarda henüz kullanılmadı.

Dashboard: Temel dashboard yapısı ve bilgi kartları oluşturuldu.

Responsive Tasarım: Bootstrap grid yapısı kullanıldı.

Formlar: Oluşturma ve düzenleme formları hazırlandı.

Modal: Yeni kayıt ve düzenleme işlemleri için Bootstrap modal yapıları kullanıldı.

Validasyon: Boş alan kontrolleri eklendi.

Test: Ekleme, düzenleme, silme ve modal işlemleri frontend üzerinde test edildi.

En önemli eksik: Gerçek API bağlantılarının yapılması ve mock data'nın kaldırılarak backend/database verilerinin kullanılmaya başlanmasıdır.

---

12. Devir Notu

Hafta 1'de frontend tarafındaki temel yönetim ekranları hazırlanmıştır. API verilmediği için backend bağlantısı yapılmamış ve işlemler mock data ile gerçekleştirilmiştir.

Bir sonraki aşamada mevcut sayfalar korunarak yalnızca veri kaynağı gerçek API'ye çevrilmelidir. Öncelikli başlangıç noktası "Konular.jsx" sayfasıdır. Buradaki API bağlantısı tamamlandıktan sonra aynı yapı diğer yönetim sayfalarına uygulanabilir.

