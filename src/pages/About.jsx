import useApiData from "../hooks/useApiData";
import conferenceService from "../services/conferenceService";
import { mockConference } from "../data/mockData";
import SectionHeading from "../components/ui/SectionHeading";
import "./About.css";

export default function About() {
  const { data: conference, loading } = useApiData(
    conferenceService.getCurrent,
    mockConference
  );

  return (
    <section className="page-section">
      <div className="container about">
        <SectionHeading eyebrow="Genel Bakış" title="Konferans Hakkında" />

        {loading && (
          <p className="about__state">
            Konferans bilgileri yükleniyor... / Conference information is loading...
          </p>
        )}

        <div className="about__grid">
          <div className="about__body">
            <p>{conference.description}</p>

            <p>
              Konferans, uygulamalı matematik, analiz, olasılık ve istatistik,
              geometri, yapay zeka, yazılım mühendisliği, veri bilimi, siber
              güvenlik ve bilgisayar mühendisliği alanlarında özgün
              araştırmaları bir araya getirmeyi amaçlamaktadır. Katılımcılar
              çalışmalarını hem çevrimiçi hem de fiziksel olarak sunabilir.
            </p>

            <p>
              Kabul edilen bildiriler, konferans sonrası yayımlanan proceedings
              kitabında yer alacak ve önceki yılların konferans kitaplarına
              site üzerinden erişilebilecektir.
            </p>
          </div>

          <div className="about__facts">
            <dl>
              <div>
                <dt>Konum</dt>
                <dd>{conference.location}</dd>
              </div>

              <div>
                <dt>Format</dt>
                <dd>Online &amp; Fiziksel Katılım</dd>
              </div>

              <div>
                <dt>Bildiri Türü</dt>
                <dd>Özgün araştırma / uygulama çalışmaları</dd>
              </div>

              <div>
                <dt>Yayın</dt>
                <dd>Conference Proceedings</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}