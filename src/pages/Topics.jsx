import Reveal from "../components/ui/Reveal";
import useApiData from "../hooks/useApiData";
import topicsService from "../services/topicsService";
import { mockTopics } from "../data/mockData";
import SectionHeading from "../components/ui/SectionHeading";
import SessionTag from "../components/ui/SessionTag";
import "./Topics.css";

export default function Topics() {
  const {
    data,
    loading,
    error,
    usingFallback,
  } = useApiData(topicsService.getAll, mockTopics);

  const topics = Array.isArray(data) ? data : [];

  return (
    <section className="page-section">
      <div className="container">
        <SectionHeading
          eyebrow="Kapsam"
          title="Konferans Konuları"
          description="Bildiri gönderimi sırasında çalışmanızı aşağıdaki oturumlardan biriyle ilişkilendirmeniz gerekmektedir."
        />

        {usingFallback && !loading && (
          <p className="topics__notice">
            Bu içerik şu an örnek verilerle gösteriliyor — backend API'ye
            bağlandığında güncellenecek.
          </p>
        )}

        {loading && (
          <p className="topics__state">
            Konferans konuları yükleniyor... / Conference topics are loading...
          </p>
        )}

        {!loading && error && (
          <p className="topics__state topics__state--error">
            Konferans konuları yüklenirken bir hata oluştu. Lütfen daha sonra
            tekrar deneyin. / An error occurred while loading the conference
            topics. Please try again later.
          </p>
        )}

        {!loading && !error && topics.length === 0 && (
          <p className="topics__state">
            Henüz konferans konusu bulunmuyor. / No conference topics are
            currently available.
          </p>
        )}

        {!loading && topics.length > 0 && (
          <ul className="topics-list">
            {topics.map((t, i) => (
              <Reveal
                key={t.id}
                as="li"
                delay={i * 100}
                className="topics-list__item"
              >
                <SessionTag code={t.code} tone="maroon" />
                <span>{t.name}</span>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}