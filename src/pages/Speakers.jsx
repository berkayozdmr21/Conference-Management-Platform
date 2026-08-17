import Reveal from "../components/ui/Reveal";
import useApiData from "../hooks/useApiData";
import speakersService from "../services/speakersService";
import { mockSpeakers } from "../data/mockData";
import SectionHeading from "../components/ui/SectionHeading";
import "./Speakers.css";

function SpeakerAvatar({ speaker }) {
  if (speaker.photo) {
    return <img className="speaker-full-card__photo" src={speaker.photo} alt={speaker.name} />;
  }
  return (
    <div className="speaker-full-card__avatar" aria-hidden="true">
      {speaker.name.split(" ").slice(-1)[0][0]}
    </div>
  );
}

export default function Speakers() {
  const { data: speakers } = useApiData(speakersService.getAll, mockSpeakers);

  return (
    <section className="page-section">
      <div className="container">
        <SectionHeading
          eyebrow="Program"
          title="Davetli Konuşmacılar"
          description="Konferansımıza katılım sağlayacak akademisyenler."
        />

        <div className="speaker-full-grid">
  {speakers.map((s, i) => (
    <Reveal key={s.id} as="article" delay={i * 70} className="speaker-full-card">
      <SpeakerAvatar speaker={s} />
      <div>
        <h3>{s.name}</h3>
        <p className="speaker-full-card__title">{s.title}</p>
        <p className="speaker-full-card__meta">{s.university} · {s.country}</p>
        <p>{s.description}</p>
      </div>
    </Reveal>
  ))}
</div>
      </div>
    </section>
  );
}