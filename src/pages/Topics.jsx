import useApiData from "../hooks/useApiData";
import topicsService from "../services/topicsService";
import { mockTopics } from "../data/mockData";
import SectionHeading from "../components/ui/SectionHeading";
import SessionTag from "../components/ui/SessionTag";
import "./Topics.css";

export default function Topics() {
  const { data: topics, usingFallback } = useApiData(topicsService.getAll, mockTopics);

  return (
    <section className="page-section">
      <div className="container">
        <SectionHeading
          eyebrow="Kapsam"
          title="Konferans Konuları"
          description="Bildiri gönderimi sırasında çalışmanızı aşağıdaki oturumlardan biriyle ilişkilendirmeniz gerekmektedir."
        />

        {usingFallback && (
          <p className="topics__notice">
            Bu içerik şu an örnek verilerle gösteriliyor — backend API'ye bağlandığında güncellenecek.
          </p>
        )}

        <ul className="topics-list">
          {topics.map((t) => (
            <li key={t.id} className="topics-list__item">
              <SessionTag code={t.code} tone="maroon" />
              <span>{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
