import { useRef, useState } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import FormField from "../components/ui/FormField";
import StatusMessage from "../components/ui/StatusMessage";
import useApiData from "../hooks/useApiData";
import topicsService from "../services/topicsService";
import submissionsService from "../services/submissionsService";
import { mockTopics } from "../data/mockData";
import {
  validateSubmission,
  isValid,
  ALLOWED_FILE_EXTENSIONS,
  MAX_FILE_SIZE_MB,
} from "../utils/validation";
import "./Submission.css";

/**
 * Bildiri / Proceedings Gönderimi — Gözde / Hafta 2
 *
 * Cemre'nin bıraktığı ComingSoon placeholder'ının yerine geçer.
 * Akış: form doldurulur -> tarayıcıda doğrulanır -> FormData olarak
 * POST /api/submissions'a gider -> backend Pending durumuyla kaydeder.
 */

// Formun boş hâli. Hem ilk açılışta hem başarılı gönderimden sonra
// sıfırlamak için tek kaynaktan kullanılır — iki yerde ayrı ayrı
// yazsaydık biri güncellenip diğeri unutulabilirdi.
const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  studyTitle: "",
  session: "",
  participationType: "",
  description: "",
};

const PARTICIPATION_TYPES = [
  { value: "Online", label: "Online" },
  { value: "Fiziksel Katılım", label: "Fiziksel Katılım" },
];

/**
 * Hata nesnesini kullanıcının anlayacağı tek cümleye çevirir.
 * Bileşenin içinde değil dışında duruyor çünkü React state'ine
 * dokunmuyor — saf bir dönüşüm fonksiyonu.
 */
function resolveErrorMessage(error) {
  // error.response yoksa istek sunucuya hiç ulaşamamıştır
  // (backend kapalı, yanlış port, CORS engeli).
  if (!error.response) {
    return "Sunucuya ulaşılamadı. Backend servisinin çalıştığından emin olun ve tekrar deneyin.";
  }

  const { status, data } = error.response;

  if (status === 400) {
    return data?.message || "Gönderdiğiniz bilgilerde eksik veya hatalı alanlar var.";
  }
  if (status === 413) {
    return `Dosya sunucu tarafından çok büyük bulundu (sınır: ${MAX_FILE_SIZE_MB} MB).`;
  }
  if (status >= 500) {
    return "Sunucu tarafında bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
  }

  return `Beklenmeyen bir hata oluştu (HTTP ${status}).`;
}

export default function Submission() {
  // Oturum listesi konular API'sinden gelir; backend kapalıysa
  // Cemre'nin useApiData hook'u otomatik olarak mock veriye düşer.
  const { data: topics } = useApiData(topicsService.getAll, mockTopics);

  const [values, setValues] = useState(EMPTY_FORM);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  // Tek bir "status" değişkeni tutmak, ayrı ayrı isLoading/isSuccess/isError
  // bayrakları tutmaktan daha güvenli: aynı anda ikisinin birden true olması
  // gibi imkânsız durumlar oluşamaz.
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState("");

  // Dosya input'u "kontrolsüz" bir elemandır: value'sunu React ile
  // yönetemeyiz (güvenlik nedeniyle tarayıcı izin vermez). Başarılı
  // gönderimden sonra temizlemek için doğrudan DOM referansı gerekir.
  const fileInputRef = useRef(null);

  function handleChange(event) {
    const { name, value } = event.target;

    // Fonksiyonel güncelleme: React state güncellemelerini toplu işleyebildiği
    // için "önceki değere göre hesapla" biçimi her zaman doğru sonucu verir.
    setValues((previous) => ({ ...previous, [name]: value }));

    // Kullanıcı hatalı alanı düzeltmeye başlar başlamaz hata mesajını kaldır.
    // Yazarken kırmızı uyarının ekranda durması rahatsız edicidir.
    setErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });
  }

  function handleFileChange(event) {
    setFile(event.target.files[0] ?? null);
    setErrors((previous) => {
      if (!previous.file) return previous;
      const next = { ...previous };
      delete next.file;
      return next;
    });
  }

  async function handleSubmit(event) {
    // Tarayıcının varsayılan davranışı formu gönderip sayfayı yenilemektir.
    // Tek sayfa uygulamada bu tüm state'i sıfırlar, o yüzden engelliyoruz.
    event.preventDefault();

    const nextErrors = validateSubmission(values, file);
    setErrors(nextErrors);

    if (!isValid(nextErrors)) {
      setStatus("idle");
      setServerMessage("");

      // Kullanıcıyı ilk hatalı alana götür: form uzun olduğu için
      // hata ekranın dışında kalmış olabilir.
      const firstErrorField = Object.keys(nextErrors)[0];
      document.getElementById(`field-${firstErrorField}`)?.focus();
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      // Dosya içeren istekler JSON ile gönderilemez; FormData kullanılır.
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value.trim());
      });
      formData.append("file", file);

      await submissionsService.create(formData);

      setStatus("success");
      setValues(EMPTY_FORM);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setStatus("error");
      setServerMessage(resolveErrorMessage(error));
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <section className="page-section">
      <div className="container submission">
        <SectionHeading
          eyebrow="Başvuru"
          title="Bildiri / Proceedings Gönderimi"
          description="Çalışmanızı konferans oturumlarından biriyle ilişkilendirerek gönderin. Başvurunuz değerlendirme sonrası e-posta ile bildirilecektir."
        />

        {status === "success" && (
          <StatusMessage tone="success" title="Başvurunuz başarıyla alınmıştır.">
            <p>
              Başvurunuz <strong>Pending (Değerlendirme Bekliyor)</strong> durumunda kaydedildi.
              Sonuç, belirttiğiniz e-posta adresine bildirilecektir.
            </p>
          </StatusMessage>
        )}

        {status === "error" && (
          <StatusMessage tone="error" title="Başvuru gönderilemedi">
            <p>{serverMessage}</p>
          </StatusMessage>
        )}

        <form className="submission__form" onSubmit={handleSubmit} noValidate>
          {/*
            noValidate: tarayıcının kendi doğrulama balonlarını kapatır.
            Kendi mesajlarımız Türkçe, tutarlı ve tasarıma uygun olduğu için
            iki doğrulama sisteminin çakışmasını istemiyoruz.
          */}

          <div className="submission__grid">
            <FormField
              label="Ad"
              name="firstName"
              required
              value={values.firstName}
              onChange={handleChange}
              error={errors.firstName}
              disabled={isSubmitting}
              autoComplete="given-name"
            />

            <FormField
              label="Soyad"
              name="lastName"
              required
              value={values.lastName}
              onChange={handleChange}
              error={errors.lastName}
              disabled={isSubmitting}
              autoComplete="family-name"
            />

            <FormField
              label="E-posta"
              name="email"
              type="email"
              required
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              disabled={isSubmitting}
              autoComplete="email"
              hint="Değerlendirme sonucu bu adrese gönderilecektir."
            />

            <FormField
              label="Ülke"
              name="country"
              required
              value={values.country}
              onChange={handleChange}
              error={errors.country}
              disabled={isSubmitting}
              autoComplete="country-name"
            />
          </div>

          <FormField
            label="Çalışmanın Başlığı"
            name="studyTitle"
            required
            value={values.studyTitle}
            onChange={handleChange}
            error={errors.studyTitle}
            disabled={isSubmitting}
          />

          <FormField
            as="select"
            label="Konferans Oturumu"
            name="session"
            required
            value={values.session}
            onChange={handleChange}
            error={errors.session}
            disabled={isSubmitting}
          >
            <option value="">Oturum seçiniz…</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.name}>
                {topic.name}
              </option>
            ))}
          </FormField>

          {/*
            Radio grubu FormField ile yapılmadı: radio'da tek bir input değil,
            ortak bir "name" paylaşan birden fazla input vardır ve etiketleme
            biçimi farklıdır. Zorlamak yerine kendi yapısıyla yazmak daha okunur.
          */}
          <fieldset
            className={`submission__fieldset ${
              errors.participationType ? "submission__fieldset--error" : ""
            }`}
          >
            <legend className="submission__legend">
              Katılım Şekli<span className="submission__required"> *</span>
            </legend>

            <div className="submission__radios">
              {PARTICIPATION_TYPES.map((type) => (
                <label key={type.value} className="submission__radio">
                  <input
                    type="radio"
                    name="participationType"
                    value={type.value}
                    checked={values.participationType === type.value}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <span>{type.label}</span>
                </label>
              ))}
            </div>

            {errors.participationType && (
              <p className="form-field__error" role="alert">
                {errors.participationType}
              </p>
            )}
          </fieldset>

          <FormField
            as="textarea"
            label="Açıklama / Ek Bilgi"
            name="description"
            value={values.description}
            onChange={handleChange}
            error={errors.description}
            disabled={isSubmitting}
            hint="Özet, anahtar kelimeler veya iletmek istediğiniz notlar (isteğe bağlı)."
          />

          <div className="submission__file">
            <label className="form-field__label" htmlFor="field-file">
              Çalışma Dosyası<span className="form-field__required" aria-hidden="true"> *</span>
            </label>

            <input
              id="field-file"
              ref={fileInputRef}
              type="file"
              name="file"
              accept={ALLOWED_FILE_EXTENSIONS.join(",")}
              onChange={handleFileChange}
              disabled={isSubmitting}
              aria-invalid={errors.file ? true : undefined}
              className={`submission__file-input ${errors.file ? "submission__file-input--error" : ""}`}
            />

            {file && !errors.file && (
              <p className="form-field__hint">
                Seçilen dosya: <strong>{file.name}</strong> ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}

            {!file && !errors.file && (
              <p className="form-field__hint">
                Kabul edilen biçimler: {ALLOWED_FILE_EXTENSIONS.join(", ")} · En fazla {MAX_FILE_SIZE_MB} MB
              </p>
            )}

            {errors.file && (
              <p className="form-field__error" role="alert">
                {errors.file}
              </p>
            )}
          </div>

          <div className="submission__actions">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Gönderiliyor…" : "Başvuruyu Gönder"}
            </button>
            <p className="submission__note">
              <span aria-hidden="true">*</span> işaretli alanlar zorunludur.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
