import SectionHeading from "../components/ui/SectionHeading";
import useApiData from "../hooks/useApiData";
import registrationService from "../services/registrationService";
import { mockRegistrationFees } from "../data/mockData";
import "./Registration.css";

export default function Registration() {
  const {
    data,
    loading,
    error,
    usingFallback,
  } = useApiData(
    registrationService.getAll,
    mockRegistrationFees
  );

  const fees = Array.isArray(data) ? data : [];

  return (
    <section className="page-section">
      <div className="container">
        <SectionHeading
          eyebrow="Kayıt"
          title="Kayıt & Ücretler"
          description="Konferansa katılım seçenekleri ve kayıt ücretleri hakkında bilgiler."
        />

        {loading && (
          <p className="registration__state">
            Kayıt bilgileri yükleniyor...
          </p>
        )}

        {!loading && usingFallback && (
          <p className="registration__notice">
            Ücret bilgileri şu anda örnek veri yapısı üzerinden
            gösterilmektedir. Backend bağlantısı sağlandığında gerçek
            bilgiler görüntülenecektir.
          </p>
        )}

        {!loading && error && !usingFallback && (
          <p className="registration__state registration__state--error">
            Kayıt bilgileri yüklenirken bir hata oluştu.
          </p>
        )}

        {!loading && fees.length === 0 && (
          <p className="registration__state">
            Henüz kayıt ve ücret bilgisi bulunmuyor.
          </p>
        )}

        {!loading && fees.length > 0 && (
          <div className="registration-grid">
            {fees.map((item) => (
              <div className="registration-card" key={item.id}>
                <h3>{item.participationType}</h3>

                <p>{item.description}</p>

                {item.fee != null ? (
                  <strong>
                    {item.fee} {item.currency}
                  </strong>
                ) : (
                  <strong>
                    Ücret bilgisi yakında açıklanacaktır.
                  </strong>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}