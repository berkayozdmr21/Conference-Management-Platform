import Reveal from "../components/ui/Reveal";
import { Link } from "react-router-dom";
import SessionTag from "../components/ui/SessionTag";
import SectionHeading from "../components/ui/SectionHeading";
import CountdownTimer from "../components/ui/CountdownTimer";
import StatsStrip from "../components/ui/StatsStrip";
import StatusMessage from "../components/ui/StatusMessage";
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
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// İleride Admin Dashboard endpoint'inden gelecek.
const STATS = [
  { value: "42+", label: "Ülke" },
  { value: "310", label: "Bildiri" },
  { value: "9", label: "Oturum" },
  { value: "18", label: "Davetli Konuşmacı" },
];

export default function Home() {
  const {
    data: conference,
    loading: conferenceLoading,
    error: conferenceError,
  } = useApiData(conferenceService.getCurrent, mockConference);

  const {
    data: topics,
    loading: topicsLoading,
    error: topicsError,
  } = useApiData(topicsService.getAll, mockTopics);

  const {
    data: dates,
    loading: datesLoading,
    error: datesError,
  } = useApiData(
    importantDatesService.getAll,
    mockImportantDates
  );

  const {
    data: speakers,
    loading: speakersLoading,
    error: speakersError,
  } = useApiData(
    speakersService.getAll,
    mockSpeakers
  );

  const safeTopics = Array.isArray(topics) ? topics : [];
  const safeDates = Array.isArray(dates) ? dates : [];
  const safeSpeakers = Array.isArray(speakers) ? speakers : [];

  const anyLoading =
    conferenceLoading ||
    topicsLoading ||
    datesLoading ||
    speakersLoading;

  const hasError =
    conferenceError ||
    topicsError ||
    datesError ||
    speakersError;

  return (
    <>
      {/* GENEL DURUM MESAJI */}
      {anyLoading && (
        <div className="container">
          <StatusMessage
            tone="info"
            title="İçerikler yükleniyor..."
          >
            <p>
              Konferans bilgileri hazırlanıyor. Lütfen bekleyiniz.
            </p>
          </StatusMessage>
        </div>
      )}

      {hasError && (
        <div className="container">
          <StatusMessage
            tone="error"
            title="Bazı içerikler yüklenemedi"
          >
            <p>
              Sunucudan bazı bilgiler alınamadı. Mevcut içerikler
              gösterilmeye devam ediyor.
            </p>
          </StatusMessage>
        </div>
      )}

      {/* HERO */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__main">
            <span className="eyebrow">
              {formatDate(conference?.startDate)} –{" "}
              {formatDate(conference?.endDate)} ·{" "}
              {conference?.location || "-"}
            </span>

            <h1>
              {conference?.title || "Konferans Yönetim Sistemi"}
            </h1>

            <p className="hero__desc">
              {conference?.description ||
                "Konferans hakkında güncel bilgiler yakında paylaşılacaktır."}
            </p>

            <div className="hero__actions">
              <Link
                to="/bildiri-gonder"
                className="btn btn-primary"
              >
                Bildiri Gönder
              </Link>

              <Link
                to="/hakkinda"
                className="btn btn-outline"
              >
                Konferans Hakkında
              </Link>
            </div>

            {/* KONULAR */}
            {topicsLoading ? (
              <p className="hero__loading">
                Konular yükleniyor...
              </p>
            ) : safeTopics.length > 0 ? (
              <div className="hero__tags">
                {safeTopics.slice(0, 5).map((topic) => (
                  <SessionTag
                    key={topic.id}
                    code={topic.code}
                    label={topic.name}
                  />
                ))}
              </div>
            ) : (
              <p className="hero__empty">
                Henüz konferans konusu eklenmemiştir.
              </p>
            )}
          </div>

          <aside className="hero__side">
            <CountdownTimer
              targetDate={conference?.submissionDeadline}
            />

            <div
              className="hero__toc"
              aria-label="Önemli tarihler önizleme"
            >
              <span className="hero__toc-title">
                Önemli Tarihler
              </span>

              {datesLoading ? (
                <p>Önemli tarihler yükleniyor...</p>
              ) : safeDates.length > 0 ? (
                <>
                  <ol>
                    {safeDates.slice(0, 4).map((date) => (
                      <li key={date.id}>
                        <span className="hero__toc-date">
                          {formatDate(date.date)}
                        </span>

                        <span>
                          {date.title || "Tarih bilgisi"}
                        </span>
                      </li>
                    ))}
                  </ol>

                  <Link
                    to="/onemli-tarihler"
                    className="hero__toc-link"
                  >
                    Tüm tarihleri gör →
                  </Link>
                </>
              ) : (
                <p>
                  Henüz önemli tarih bilgisi bulunmamaktadır.
                </p>
              )}
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

          {topicsLoading ? (
            <StatusMessage
              tone="info"
              title="Konular yükleniyor..."
            >
              <p>
                Konferans konuları hazırlanıyor.
              </p>
            </StatusMessage>
          ) : safeTopics.length === 0 ? (
            <StatusMessage
              tone="info"
              title="Henüz konu bulunmuyor"
            >
              <p>
                Konferans konuları henüz sisteme eklenmemiştir.
              </p>
            </StatusMessage>
          ) : (
            <div className="topics-grid">
              {safeTopics.map((topic, index) => (
                <Reveal
                  key={topic.id}
                  delay={index * 130}
                >
                  <div className="topic-card">
                    <SessionTag
                      code={topic.code}
                      tone="maroon"
                    />

                    <h3>{topic.name}</h3>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
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

          {speakersLoading ? (
            <StatusMessage
              tone="info"
              title="Konuşmacılar yükleniyor..."
            >
              <p>
                Davetli konuşmacı bilgileri hazırlanıyor.
              </p>
            </StatusMessage>
          ) : safeSpeakers.length === 0 ? (
            <StatusMessage
              tone="info"
              title="Henüz konuşmacı bulunmuyor"
            >
              <p>
                Davetli konuşmacılar henüz sisteme eklenmemiştir.
              </p>
            </StatusMessage>
          ) : (
            <div className="speakers-grid">
              {safeSpeakers.map((speaker, index) => {
                const name =
                  typeof speaker.name === "string" &&
                  speaker.name.trim()
                    ? speaker.name.trim()
                    : "İsimsiz Konuşmacı";

                const nameParts = name.split(" ");
                const lastName =
                  nameParts[nameParts.length - 1] || "";

                const avatarLetter =
                  lastName.charAt(0).toUpperCase() || "?";

                return (
                  <Reveal
                    key={speaker.id}
                    delay={index * 130}
                  >
                    <div className="speaker-card">
                      {speaker.photo ? (
                        <img
                          className="speaker-card__photo"
                          src={speaker.photo}
                          alt={name}
                        />
                      ) : (
                        <div
                          className="speaker-card__avatar"
                          aria-hidden="true"
                        >
                          {avatarLetter}
                        </div>
                      )}

                      <h3>{name}</h3>

                      <p className="speaker-card__meta">
                        {speaker.university || "-"} ·{" "}
                        {speaker.country || "-"}
                      </p>

                      <p>
                        {speaker.description ||
                          "Konuşmacı hakkında açıklama bulunmamaktadır."}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}

          <div className="speakers-preview__cta">
            <Link
              to="/konusmacilar"
              className="btn btn-outline"
            >
              Tüm konuşmacıları gör
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}