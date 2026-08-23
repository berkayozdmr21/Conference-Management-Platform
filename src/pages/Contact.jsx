import { useState } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import FormField from "../components/ui/FormField";
import StatusMessage from "../components/ui/StatusMessage";
import useApiData from "../hooks/useApiData";
import conferenceService from "../services/conferenceService";
import contactService from "../services/contactService";
import { mockConference, mockContactInfo } from "../data/mockData";
import { validateContact, isValid } from "../utils/validation";
import "./Contact.css";

/**
 * İletişim — Gözde / Hafta 2
 *
 * Bildiri formuyla aynı iskelet: state -> doğrula -> gönder -> geri bildir.
 * Fark, dosya olmadığı için isteğin düz JSON gönderilebilmesi.
 * Aynı deseni ikinci kez uygulamak, deseni gerçekten öğrenip öğrenmediğinin
 * sınavıdır — bu yüzden kasıtlı olarak aynı sırayla yazıldı.
 */

const EMPTY_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function resolveErrorMessage(error) {
  if (!error.response) {
    return "Mesajınız gönderilemedi: sunucuya ulaşılamadı. Lütfen daha sonra tekrar deneyin.";
  }
  if (error.response.status === 400) {
    return error.response.data?.message || "Gönderdiğiniz bilgilerde hatalı alanlar var.";
  }
  if (error.response.status >= 500) {
    return "Sunucu tarafında bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
  }
  return `Beklenmeyen bir hata oluştu (HTTP ${error.response.status}).`;
}

export default function Contact() {
  const { data: conference } = useApiData(conferenceService.getCurrent, mockConference);

  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateContact(values);
    setErrors(nextErrors);

    if (!isValid(nextErrors)) {
      setStatus("idle");
      setServerMessage("");
      document.getElementById(`field-${Object.keys(nextErrors)[0]}`)?.focus();
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      // Metin alanlarındaki baştaki/sondaki boşlukları temizleyerek gönder:
      // veritabanına " Gözde " gibi kayıtlar düşmesin.
      await contactService.send({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      });

      setStatus("success");
      setValues(EMPTY_FORM);
    } catch (error) {
      setStatus("error");
      setServerMessage(resolveErrorMessage(error));
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <section className="page-section">
      <div className="container">
        <SectionHeading
          eyebrow="Bize Ulaşın"
          title="İletişim"
          description="Konferans, başvuru süreci veya kayıt hakkındaki sorularınızı iletebilirsiniz."
        />

        <div className="contact__layout">
          <div className="contact__form-col">
            {status === "success" && (
              <StatusMessage tone="success" title="Mesajınız iletildi.">
                <p>En kısa sürede belirttiğiniz e-posta adresi üzerinden dönüş yapılacaktır.</p>
              </StatusMessage>
            )}

            {status === "error" && (
              <StatusMessage tone="error" title="Mesaj gönderilemedi">
                <p>{serverMessage}</p>
              </StatusMessage>
            )}

            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <FormField
                label="Ad Soyad"
                name="name"
                required
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                disabled={isSubmitting}
                autoComplete="name"
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
              />

              <FormField
                label="Konu"
                name="subject"
                required
                value={values.subject}
                onChange={handleChange}
                error={errors.subject}
                disabled={isSubmitting}
              />

              <FormField
                as="textarea"
                label="Mesajınız"
                name="message"
                required
                value={values.message}
                onChange={handleChange}
                error={errors.message}
                disabled={isSubmitting}
                hint="En az 10 karakter."
              />

              <div className="contact__actions">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Gönderiliyor…" : "Mesajı Gönder"}
                </button>
              </div>
            </form>
          </div>

          <aside className="contact__info">
            <h3 className="contact__info-title">Konferans Sekreteryası</h3>

            <dl className="contact__info-list">
              <div>
                <dt>Konferans</dt>
                <dd>{conference?.shortTitle || conference?.title}</dd>
              </div>
              <div>
                <dt>Yer</dt>
                <dd>{conference?.location}</dd>
              </div>
              <div>
                <dt>E-posta</dt>
                <dd>
                  <a href={`mailto:${mockContactInfo.email}`}>{mockContactInfo.email}</a>
                </dd>
              </div>
              <div>
                <dt>Telefon</dt>
                <dd>{mockContactInfo.phone}</dd>
              </div>
              <div>
                <dt>Adres</dt>
                <dd>{mockContactInfo.address}</dd>
              </div>
            </dl>

            <p className="contact__info-note">
              İletişim bilgileri, admin paneli üzerinden yönetilecek içerik kapsamındadır;
              ilgili endpoint hazır olduğunda bu bölüm de API'den beslenecektir.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
