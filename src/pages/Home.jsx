import Reveal from "../components/ui/Reveal";
import { Link } from "react-router-dom";
import SessionTag from "../components/ui/SessionTag";
import SectionHeading from "../components/ui/SectionHeading";
import CountdownTimer from "../components/ui/CountdownTimer";
import StatsStrip from "../components/ui/StatsStrip";
import useApiData from "../hooks/useApiData";
import conferenceService from "../services/conferenceService";
import topicsService from "../services/topicsService";
import importantDatesService from "../services/importantDatesService";
import speakersService from "../services/speakersService";
import {
  mockConference,
  mockTopics,
  mockImportantDates,
  mockSpeakers,
} from "../data/mockData";
import "./Home.css";

function formatDate(value) {
  return new Date(value).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// İleride Admin Dashboard endpoint'inden (bkz. proje dokümanı madde 5) gelecek.
const STATS = [
  { value: "42+", label: "Ülke" },
  { value: "310", label: "Bildiri" },
  { value: "9", label: "Oturum" },
  { value: "18", label: "Davetli Konuşmacı" },
];

export default function Home() {
  const { data: conference } = useApiData(conferenceService.getCurrent, mockConference);
  const { data: topics } = useApiData(topicsService.getAll, mockTopics);
  const { data: dates } = useApiData(importantDatesService.getAll, mockImportantDates);
  const { data: speakers } = useApiData(speakersService.getAll, mockSpeakers);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__main">
            <span className="eyebrow">
              {formatDate(conference.startDate)} – {formatDate(conference.endDate)} · {conference.location}
            </span>
            <h1>{conference.title}</h1>
            <p className="hero__desc">{conference.description}</p>
            <div className="hero__actions">
              <Link to="/bildiri-gonder" className="btn btn-primary">Bildiri Gönder</Link>
              <Link to="/hakkinda" className="btn btn-outline">Konferans Hakkında</Link>
            </div>
            <div className="hero__tags">
              {topics.slice(0, 5).map((t) => (
                <SessionTag key={t.id} code={t.code} label={t.name} />
              ))}
            </div>
          </div>

          <aside className="hero__side">
            <CountdownTimer targetDate={conference.submissionDeadline} />

            <div className="hero__toc" aria-label="Önemli tarihler önizleme">
              <span className="hero__toc-title">Önemli Tarihler</span>
              <ol>
                {dates.slice(0, 4).map((d) => (
                  <li key={d.id}>
                    <span className="hero__toc-date">{formatDate(d.date)}</span>
                    <span>{d.title}</span>
                  </li>
                ))}
              </ol>
              <Link to="/onemli-tarihler" className="hero__toc-link">Tüm tarihleri gör →</Link>
            </div>
          </aside>
        </div>
      </section>

      {/* İSTATİSTİK ŞERİDİ */}
      <StatsStrip stats={STATS} />

      {/* KONULAR ÖNİZLEME */}
      <section className="page-section">
        <div className="container">
          <SectionHeading
            eyebrow="Kapsam"
            title="Konferans Konuları"
            description="Aşağıdaki oturum başlıklarında bildiri gönderimi kabul edilmektedir."
          />
        <div className="topics-grid">
  {topics.map((t, i) => (
   <Reveal key={t.id} delay={i * 130}>
      <div className="topic-card">
        <SessionTag code={t.code} tone="maroon" />
        <h3>{t.name}</h3>
      </div>
    </Reveal>
  ))}
</div>
        </div>
      </section>

      {/* KONUŞMACILAR ÖNİZLEME */}
      <section className="page-section speakers-preview">
        <div className="container">
          <SectionHeading
            eyebrow="Program"
            title="Davetli Konuşmacılar"
            description="Alanlarında öncü akademisyenler konferansımıza katılım sağlayacaktır."
          />
         <div className="speakers-grid">
  {speakers.map((s, i) => (
    <Reveal key={s.id} delay={i * 130}>
      <div className="speaker-card">
        {s.photo ? (
          <img className="speaker-card__photo" src={s.photo} alt={s.name} />
        ) : (
          <div className="speaker-card__avatar" aria-hidden="true">
            {s.name.split(" ").slice(-1)[0][0]}
          </div>
        )}
        <h3>{s.name}</h3>
        <p className="speaker-card__meta">{s.university} · {s.country}</p>
        <p>{s.description}</p>
      </div>
    </Reveal>
  ))}
</div>
          <div className="speakers-preview__cta">
            <Link to="/konusmacilar" className="btn btn-outline">Tüm konuşmacıları gör</Link>
          </div>
        </div>
      </section>
    </>
  );
}