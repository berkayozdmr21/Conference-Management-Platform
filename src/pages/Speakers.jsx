import Reveal from "../components/ui/Reveal";
import useApiData from "../hooks/useApiData";
import speakersService from "../services/speakersService";
import { mockSpeakers } from "../data/mockData";
import SectionHeading from "../components/ui/SectionHeading";
import "./Speakers.css";

function SpeakerAvatar({ speaker }) {
  if (speaker.photo) {
    return (
      <img
        className="speaker-full-card__photo"
        src={speaker.photo}
        alt={speaker.name}
      />
    );
  }

  const name = speaker.name || "Konuşmacı";
  const lastName = name.trim().split(" ").slice(-1)[0];

  return (
    <div className="speaker-full-card__avatar" aria-hidden="true">
      {lastName.charAt(0).toUpperCase()}
    </div>
  );
}

export default function Speakers() {
  const {
    data,
    loading,
    error,
    usingFallback,
  } = useApiData(
    speakersService.getAll,
    mockSpeakers
  );

  const speakers = Array.isArray(data) ? data : [];

  return (
    <section className="page-section">
      <div className="container">
        <SectionHeading
          eyebrow="Program"
          title="Davetli Konuşmacılar"
          description="Konferansımıza katılım sağlayacak akademisyenler."
        />

        {usingFallback && !loading && (
          <p className="speakers__notice">
            Bu içerik şu an örnek verilerle gösteriliyor —
            backend API'ye bağlandığında güncellenecek.
          </p>
        )}

        {loading && (
          <p className="speakers__state">
            Konuşmacılar yükleniyor... / Speakers are loading...
          </p>
        )}

        {!loading && error && (
          <p className="speakers__state speakers__state--error">
            Konuşmacılar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar
            deneyin. / An error occurred while loading the speakers. Please
            try again later.
          </p>
        )}

        {!loading && !error && speakers.length === 0 && (
          <p className="speakers__state">
            Henüz konuşmacı bulunmuyor. / No speakers are currently available.
          </p>
        )}

        {!loading && speakers.length > 0 && (
          <div className="speaker-full-grid">
            {speakers.map((s, i) => (
              <Reveal
                key={s.id}
                as="article"
                delay={i * 70}
                className="speaker-full-card"
              >
                <SpeakerAvatar speaker={s} />

                <div>
                  <h3>{s.name}</h3>
                  <p className="speaker-full-card__title">
                    {s.title}
                  </p>
                  <p className="speaker-full-card__meta">
                    {s.university} · {s.country}
                  </p>
                  <p>{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}