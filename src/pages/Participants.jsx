import { useMemo, useState } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import SessionTag from "../components/ui/SessionTag";
import useApiData from "../hooks/useApiData";
import participantsService from "../services/participantsService";
import { mockParticipants } from "../data/mockData";
import "./Participants.css";

/**
 * Katılımcılar — Gözde / Hafta 2
 *
 * Bu sayfa yalnızca OKUR. Listede görünen kişiler, admin tarafından
 * "Approved" yapılmış başvurulardır; onay akışı admin panelinin işidir.
 *
 * Arama tamamen tarayıcıda çalışır (client-side filtering). Katılımcı sayısı
 * birkaç yüzü aşarsa bu yaklaşım yavaşlar; o noktada arama backend'e
 * taşınmalıdır (GET /api/participants?search=...). Şu anki veri hacmi için
 * her tuşta sunucuya istek atmak gereksiz yük olurdu.
 */
export default function Participants() {
  const { data, loading, usingFallback } = useApiData(participantsService.getAll, mockParticipants);
  const [query, setQuery] = useState("");

  // Savunmacı kontrol: backend beklenmedik bir biçim döndürürse
  // (örn. { items: [...] }) .map çağrısı uygulamayı çökertir.
  // Dizi değilse boş listeye düşerek sayfayı ayakta tutuyoruz.
  const participants = Array.isArray(data) ? data : [];

  /**
   * useMemo: filtreleme sonucunu önbelleğe alır ve yalnızca liste ya da
   * arama metni değiştiğinde yeniden hesaplar. Bu olmasaydı her yeniden
   * çizimde (render) tüm liste baştan taranırdı.
   *
   * Filtreleme algoritması: aranan metni küçük harfe çevir, her katılımcının
   * aranabilir alanlarını tek bir metinde birleştir, "içeriyor mu?" diye bak.
   * Tek geçişte O(n) — liste uzunluğuyla doğru orantılı.
   */
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("tr");
    if (!normalized) return participants;

    return participants.filter((person) => {
      const haystack = [person.name, person.country, person.studyTitle, person.session]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("tr");

      return haystack.includes(normalized);
    });
  }, [participants, query]);

  return (
    <section className="page-section">
      <div className="container">
        <SectionHeading
          eyebrow="Konferans"
          title="Katılımcılar"
          description="Başvurusu kabul edilen katılımcılar ve sunacakları çalışmalar."
        />

        {usingFallback && (
          <p className="participants__notice">
            Bu liste şu an örnek verilerle gösteriliyor — backend API'ye bağlandığında güncellenecek.
          </p>
        )}

        <div className="participants__toolbar">
          <label className="participants__search">
            <span className="participants__search-label">Katılımcı ara</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="İsim, ülke, çalışma veya oturum…"
              className="participants__search-input"
            />
          </label>

          <p className="participants__count">
            {loading
              ? "Yükleniyor…"
              : `${filtered.length} katılımcı${query ? ` (toplam ${participants.length})` : ""}`}
          </p>
        </div>

        {/* Durum sıralaması önemli: önce yükleniyor, sonra boş, sonra veri.
            Aksi hâlde veri gelmeden "katılımcı bulunamadı" yazısı görünür
            ve kullanıcı listenin boş olduğunu sanır. */}
        {loading && <p className="participants__state">Katılımcı listesi yükleniyor…</p>}

        {!loading && filtered.length === 0 && (
          <p className="participants__state">
            {query
              ? `"${query}" aramasıyla eşleşen katılımcı bulunamadı.`
              : "Henüz onaylanmış katılımcı bulunmuyor."}
          </p>
        )}

        {!loading && filtered.length > 0 && (
          <div className="participants__table-wrap">
            <table className="participants__table">
              <thead>
                <tr>
                  <th scope="col">Katılımcı</th>
                  <th scope="col">Ülke</th>
                  <th scope="col">Çalışma</th>
                  <th scope="col">Katılım</th>
                  <th scope="col">Oturum</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((person) => (
                  <tr key={person.id}>
                    <td data-label="Katılımcı" className="participants__name">
                      {person.name}
                    </td>
                    <td data-label="Ülke">{person.country}</td>
                    <td data-label="Çalışma">{person.studyTitle}</td>
                    <td data-label="Katılım">
                      <span
                        className={`participants__badge participants__badge--${
                          person.participationType === "Online" ? "online" : "physical"
                        }`}
                      >
                        {person.participationType}
                      </span>
                    </td>
                    <td data-label="Oturum">
                      {/* sessionCode backend'den gelmeyebilir; yoksa etiketi
                          hiç çizmeyip yalnızca oturum adını göstermek,
                          boş bir kutu göstermekten daha temiz. */}
                      {person.sessionCode && <SessionTag code={person.sessionCode} tone="maroon" />}
                      <span className="participants__session-name">{person.session}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
