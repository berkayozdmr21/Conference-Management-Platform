import Reveal from "../components/ui/Reveal";
import useApiData from "../hooks/useApiData";
import importantDatesService from "../services/importantDatesService";
import { mockImportantDates } from "../data/mockData";
import SectionHeading from "../components/ui/SectionHeading";
import "./ImportantDates.css";

function formatDate(value) {
  return new Date(value).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function ImportantDates() {
  const { data: dates } = useApiData(importantDatesService.getAll, mockImportantDates);

  return (
    <section className="page-section">
      <div className="container">
        <SectionHeading eyebrow="Takvim" title="Önemli Tarihler" />
<ol className="timeline">
  {dates.map((d, i) => (
    <Reveal key={d.id} as="li" direction="left" delay={i * 100} className="timeline__item">
      <span className="timeline__index">{String(i + 1).padStart(2, "0")}</span>
      <div className="timeline__content">
        <span className="timeline__date">{formatDate(d.date)}</span>
        <h3>{d.title}</h3>
        {d.description && <p>{d.description}</p>}
      </div>
    </Reveal>
  ))}
</ol>
        
      </div>
    </section>
  );
}
