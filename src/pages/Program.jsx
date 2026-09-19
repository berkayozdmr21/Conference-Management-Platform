import { useMemo } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import useApiData from "../hooks/useApiData";
import programService from "../services/programService";
import { mockProgram } from "../data/mockData";
import "./Program.css";

function formatDate(value) {
  return new Date(value).toLocaleDateString("tr-TR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function Program() {
  const {
    data: programData,
    loading,
    error,
    usingFallback,
  } = useApiData(programService.getAll, mockProgram);

  const groupedProgram = useMemo(() => {
    if (!Array.isArray(programData)) {
      return {};
    }

    return programData.reduce((groups, item) => {
      if (!groups[item.date]) {
        groups[item.date] = [];
      }

      groups[item.date].push(item);
      return groups;
    }, {});
  }, [programData]);

  return (
    <section className="page-section">
      <div className="container">
        <SectionHeading
          eyebrow="Takvim"
          title="Konferans Programı"
          description="Konferans süresince gerçekleştirilecek oturum, konuşma ve etkinlikleri aşağıdan inceleyebilirsiniz."
        />

        {loading && (
          <div className="program-status">
            Program yükleniyor...
          </div>
        )}

        {!loading && usingFallback && (
          <div className="program-status">
            Program şu anda örnek verilerle gösteriliyor.
          </div>
        )}

        {!loading && error && !usingFallback && (
          <div className="program-status">
            Program bilgileri yüklenirken bir hata oluştu.
          </div>
        )}

        {!loading && Object.keys(groupedProgram).length === 0 && (
          <div className="program-status">
            Henüz program bilgisi bulunmuyor.
          </div>
        )}

        {!loading && Object.keys(groupedProgram).length > 0 && (
          <div className="program">
            {Object.entries(groupedProgram).map(([date, events]) => (
              <section className="program-day" key={date}>
                <div className="program-day__heading">
                  <span className="program-day__date">
                    {formatDate(date)}
                  </span>
                </div>

                <div className="program-day__events">
                  {events.map((event) => (
                    <article className="program-card" key={event.id}>
                      <div className="program-card__time">
                        {event.time}
                      </div>

                      <div className="program-card__content">
                        <span className="program-card__type">
                          {event.type}
                        </span>

                        <h3>{event.title}</h3>

                        <p>{event.location}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}