/**
 * Form doğrulama kuralları — Gözde / Hafta 2
 *
 * TASARIM KARARI (neden ayrı dosya?):
 * Doğrulama mantığı bileşenlerin (Submission.jsx, Contact.jsx) içine
 * gömülseydi iki sorun doğardı:
 *   1. Aynı kural (e-posta kontrolü) iki yerde tekrar yazılırdı.
 *   2. Kuralları test etmek için ekranı açmak gerekirdi.
 *
 * Buradaki fonksiyonların hepsi "saf fonksiyon" (pure function):
 * aynı girdiye her zaman aynı çıktıyı verir, dışarıda hiçbir şeyi değiştirmez.
 * Saf fonksiyonlar test edilmesi en kolay kod türüdür — bu yüzden
 * validation.test.js dosyası yalnızca bu dosyayı hedefliyor.
 *
 * ORTAK SÖZLEŞME:
 * Her validate* fonksiyonu bir "hata nesnesi" döndürür:
 *   {}                                  -> form geçerli
 *   { email: "Geçerli bir e-posta..." } -> email alanı hatalı
 * Boş nesne = hata yok. Bileşen tarafında `Object.keys(errors).length === 0`
 * kontrolü ile "gönderilebilir mi?" sorusu tek satırda cevaplanır.
 */

export const REQUIRED_MESSAGE = "Bu alan zorunludur.";

/** Değer boş mu? null, undefined ve yalnızca boşluktan oluşan metin de boş sayılır. */
export function isBlank(value) {
  return value === null || value === undefined || String(value).trim() === "";
}

/**
 * E-posta deseni.
 * Kasıtlı olarak sade tutuldu: "boşluk ve @ olmayan karakterler" + "@" +
 * "boşluk ve @ olmayan karakterler" + "." + "en az 2 karakter".
 * RFC'ye tam uyan bir regex yüzlerce karakterdir ve pratikte fayda sağlamaz;
 * asıl doğrulama zaten backend'de ve e-posta doğrulama adımında yapılır.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(String(value).trim());
}

export const ALLOWED_FILE_EXTENSIONS = [".pdf", ".doc", ".docx"];
export const MAX_FILE_SIZE_MB = 10;

/**
 * Dosya kontrolü. Hata varsa mesajı, yoksa null döner.
 *
 * Not: Buradaki kontrol yalnızca kullanıcıya hızlı geri bildirim içindir.
 * Tarayıcıdaki hiçbir kontrol güvenlik sağlamaz — kullanıcı isterse isteği
 * doğrudan gönderebilir. Bu yüzden aynı kontrolün backend'de de olması şart.
 */
export function validateFile(file) {
  if (!file) {
    return "Lütfen çalışmanıza ait dosyayı yükleyin.";
  }

  const name = file.name.toLowerCase();
  const hasAllowedExtension = ALLOWED_FILE_EXTENSIONS.some((ext) => name.endsWith(ext));

  if (!hasAllowedExtension) {
    return `Yalnızca ${ALLOWED_FILE_EXTENSIONS.join(", ")} uzantılı dosyalar kabul edilmektedir.`;
  }

  // file.size byte cinsindendir. 1 MB = 1024 * 1024 byte.
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return `Dosya boyutu en fazla ${MAX_FILE_SIZE_MB} MB olabilir.`;
  }

  return null;
}

/**
 * Bildiri gönderim formunun tüm kuralları.
 * values: formdaki metin alanları
 * file:   seçilen dosya (File nesnesi) veya null
 */
export function validateSubmission(values, file) {
  const errors = {};

  if (isBlank(values.firstName)) errors.firstName = REQUIRED_MESSAGE;
  if (isBlank(values.lastName)) errors.lastName = REQUIRED_MESSAGE;

  if (isBlank(values.email)) {
    errors.email = REQUIRED_MESSAGE;
  } else if (!isValidEmail(values.email)) {
    errors.email = "Geçerli bir e-posta adresi giriniz (örn. ad@kurum.edu.tr).";
  }

  if (isBlank(values.country)) errors.country = REQUIRED_MESSAGE;

  if (isBlank(values.studyTitle)) {
    errors.studyTitle = REQUIRED_MESSAGE;
  } else if (values.studyTitle.trim().length < 5) {
    errors.studyTitle = "Çalışma başlığı en az 5 karakter olmalıdır.";
  }

  if (isBlank(values.session)) errors.session = "Lütfen bir oturum seçiniz.";
  if (isBlank(values.participationType)) errors.participationType = "Lütfen katılım şeklini seçiniz.";

  const fileError = validateFile(file);
  if (fileError) errors.file = fileError;

  return errors;
}

/** İletişim formunun kuralları. */
export function validateContact(values) {
  const errors = {};

  if (isBlank(values.name)) errors.name = REQUIRED_MESSAGE;

  if (isBlank(values.email)) {
    errors.email = REQUIRED_MESSAGE;
  } else if (!isValidEmail(values.email)) {
    errors.email = "Geçerli bir e-posta adresi giriniz.";
  }

  if (isBlank(values.subject)) errors.subject = REQUIRED_MESSAGE;

  if (isBlank(values.message)) {
    errors.message = REQUIRED_MESSAGE;
  } else if (values.message.trim().length < 10) {
    errors.message = "Mesajınız en az 10 karakter olmalıdır.";
  }

  return errors;
}

/** Hata nesnesi boşsa form geçerlidir. */
export function isValid(errors) {
  return Object.keys(errors).length === 0;
}
