import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import { API_BASE_URL } from '../api/config';

const SAYFA_BOYUTU = 5;

function Basvurular() {
  const [basvurular, setBasvurular] = useState([]);
  const [seciliBasvuru, setSeciliBasvuru] = useState(null);
  const [aramaMetni, setAramaMetni] = useState("");
  const [secilenDurum, setSecilenDurum] = useState("Tümü");
  const [sayfa, setSayfa] = useState(1);

  useEffect(() => {
    fetch(`${API_BASE_URL}/submissions`)
      .then((response) => {
        if (!response.ok) throw new Error("Başvurular çekilemedi!");
        return response.json();
      })
      .then((data) => setBasvurular(data))
      .catch((error) => console.error("Hata:", error));
  }, []);

  const handleDetay = (basvuru) => {
    setSeciliBasvuru(basvuru);
  };

  const closeModal = () => {
    setSeciliBasvuru(null);
  };

  const handleDurumGuncelle = (yeniDurum) => {
    fetch(`${API_BASE_URL}/submissions/${seciliBasvuru.id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: yeniDurum })
    })
    .then((response) => {
      if (!response.ok) throw new Error("Durum güncellenemedi!");
      return response.json();
    })
    .then((guncelBasvuru) => {
      setBasvurular(
        basvurular.map((item) =>
          item.id === seciliBasvuru.id ? guncelBasvuru : item
        )
      );
      setSeciliBasvuru(guncelBasvuru);
    })
    .catch((error) => console.error("Güncelleme hatası:", error));
  };

  const handleSil = () => {
    fetch(`${API_BASE_URL}/submissions/${seciliBasvuru.id}`, {
      method: "DELETE"
    })
    .then((response) => {
      if (!response.ok) throw new Error("Silme işlemi başarısız!");
      setBasvurular(basvurular.filter((item) => item.id !== seciliBasvuru.id));
      closeModal();
    })
    .catch((error) => console.error("Silme hatası:", error));
  };

  const filtrelenmisBasvurular = basvurular.filter((basvuru) => {
    const arama = aramaMetni.trim().toLowerCase();
    const adSoyad = `${basvuru.firstName ?? ""} ${basvuru.lastName ?? ""}`.toLowerCase();
    const ulke = basvuru.country ? basvuru.country.toLowerCase() : "";
    const baslik = basvuru.title ? basvuru.title.toLowerCase() : "";

    const aramaUyumu = adSoyad.includes(arama) || ulke.includes(arama) || baslik.includes(arama);

    const durumUyumu =
      secilenDurum === "Tümü" ||
      (secilenDurum === "Pending" && (!basvuru.status || basvuru.status === "Pending")) ||
      basvuru.status === secilenDurum;

    return aramaUyumu && durumUyumu;
  });

  const toplamSayfa = Math.ceil(filtrelenmisBasvurular.length / SAYFA_BOYUTU) || 1;
  const gosterilecekler = filtrelenmisBasvurular.slice((sayfa - 1) * SAYFA_BOYUTU, sayfa * SAYFA_BOYUTU);

  const durumBadge = (durum) => {
    if (durum === "Approved") return "badge-success";
    if (durum === "Rejected") return "badge-danger";
    return "badge-warning";
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-3 col-lg-2">
            <Sidebar />
          </div>

          <div className="col-12 col-md-9 col-lg-10">
            <div className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Başvuru Listesi</h2>
              </div>

              <div className="row mb-3">
                <div className="col-md-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ad soyad, ülke veya başlığa göre ara"
                    value={aramaMetni}
                    onChange={(e) => { setAramaMetni(e.target.value); setSayfa(1); }}
                  />
                </div>
                <div className="col-md-6 mb-2 text-md-right">
                  <select
                    className="form-control d-inline-block w-auto"
                    value={secilenDurum}
                    onChange={(e) => { setSecilenDurum(e.target.value); setSayfa(1); }}
                  >
                    <option value="Tümü">Tüm Durumlar</option>
                    <option value="Pending">Bekliyor</option>
                    <option value="Approved">Onaylandı</option>
                    <option value="Rejected">Reddedildi</option>
                  </select>
                </div>
              </div>

              <div className="table-responsive mt-4">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Ad Soyad</th>
                      <th>Ülke</th>
                      <th>Başlık</th>
                      <th>Oturum</th>
                      <th>Durum</th>
                      <th>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gosterilecekler.length > 0 ? (
                      gosterilecekler.map((basvuru) => (
                        <tr key={basvuru.id}>
                          <td>{basvuru.firstName} {basvuru.lastName}</td>
                          <td>{basvuru.country}</td>
                          <td>{basvuru.title}</td>
                          <td>{basvuru.session}</td>
                          <td>
                            <span className={`badge ${durumBadge(basvuru.status)}`}>
                              {basvuru.status || 'Pending'}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-info"
                              onClick={() => handleDetay(basvuru)}
                            >
                              Detay Gör
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-muted">Kayıt bulunamadı.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <Pagination sayfa={sayfa} toplamSayfa={toplamSayfa} setSayfa={setSayfa} />

              {seciliBasvuru && (
                <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Başvuru Detayı</h5>
                        <button type="button" className="close" onClick={closeModal}>
                          <span>&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <p><strong>Ad Soyad:</strong> {seciliBasvuru.firstName} {seciliBasvuru.lastName}</p>
                        <p><strong>E-posta:</strong> {seciliBasvuru.email}</p>
                        <p><strong>Ülke:</strong> {seciliBasvuru.country}</p>
                        <p><strong>Başlık:</strong> {seciliBasvuru.title}</p>
                        <p><strong>Oturum:</strong> {seciliBasvuru.session}</p>
                        <p><strong>Katılım Şekli:</strong> {seciliBasvuru.participationType}</p>
                        {seciliBasvuru.abstract && <p><strong>Açıklama:</strong> {seciliBasvuru.abstract}</p>}
                        {seciliBasvuru.filePath && (
                          <p>
                            <strong>Dosya:</strong>{" "}
                            <a href={`https://localhost:53661${seciliBasvuru.filePath}`} target="_blank" rel="noreferrer">
                              İndir
                            </a>
                          </p>
                        )}
                        <p><strong>Durum:</strong> {seciliBasvuru.status || 'Pending'}</p>
                      </div>
                      <div className="modal-footer d-flex justify-content-between">
                        <button type="button" className="btn btn-danger" onClick={handleSil}>
                          Sil
                        </button>
                        <div>
                          <button
                            type="button"
                            className="btn btn-warning mr-2"
                            onClick={() => handleDurumGuncelle("Rejected")}
                          >
                            Reddet
                          </button>
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => handleDurumGuncelle("Approved")}
                          >
                            Onayla
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Basvurular;