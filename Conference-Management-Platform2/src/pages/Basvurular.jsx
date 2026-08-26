import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

function Basvurular() {
  const [basvurular, setBasvurular] = useState([]);
  const [seciliBasvuru, setSeciliBasvuru] = useState(null);
  const [aramaMetni, setAramaMetni] = useState("");
  const [secilenDurum, setSecilenDurum] = useState("Tümü");

  // 1. GET: Başvuru Listesini Çekme 
  useEffect(() => {
    fetch("https://localhost:53662/api/basvurular") 
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

  // 2. PUT: Durum Güncelleme 
  const handleDurumGuncelle = (yeniDurum) => {
    const guncelBasvuru = { ...seciliBasvuru, durum: yeniDurum };

    fetch(`https://localhost:53662/api/basvurular/${seciliBasvuru.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(guncelBasvuru)
    })
    .then((response) => {
      if (!response.ok) throw new Error("Durum güncellenemedi!");
      setBasvurular(
        basvurular.map((item) => 
          item.id === seciliBasvuru.id ? guncelBasvuru : item
        )
      );
      setSeciliBasvuru(guncelBasvuru);
    })
    .catch((error) => console.error("Güncelleme hatası:", error));
  };

  // 3. DELETE: Başvuru Silme
  const handleSil = () => {
    fetch(`https://localhost:53662/api/basvurular/${seciliBasvuru.id}`, {
      method: "DELETE"
    })
    .then((response) => {
      if (!response.ok) throw new Error("Silme işlemi başarısız!");
      setBasvurular(basvurular.filter((item) => item.id !== seciliBasvuru.id));
      closeModal();
    })
    .catch((error) => console.error("Silme hatası:", error));
  };

  // 4. Arama ve Filtreleme 
  const filtrelenmisBasvurular = basvurular.filter((basvuru) => {
    const arama = aramaMetni.trim().toLowerCase();
    const adSoyad = basvuru.adSoyad ? basvuru.adSoyad.toLowerCase() : "";
    const kurum = basvuru.kurum ? basvuru.kurum.toLowerCase() : "";

    const aramaUyumu = adSoyad.includes(arama) || kurum.includes(arama);

    const durumUyumu = 
      secilenDurum === "Tümü" || 
      (secilenDurum === "Bekliyor" && (!basvuru.durum || basvuru.durum === "Bekliyor")) ||
      basvuru.durum === secilenDurum;

    return aramaUyumu && durumUyumu;
  });

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

              {/* Arama ve Filtreleme Alanı */}
              <div className="row mb-3">
                <div className="col-md-6 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ad soyad veya kuruma göre ara"
                    value={aramaMetni}
                    onChange={(e) => setAramaMetni(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mb-2 text-md-right">
                  <select 
                    className="form-control d-inline-block w-auto"
                    value={secilenDurum}
                    onChange={(e) => setSecilenDurum(e.target.value)}
                  >
                    <option value="Tümü">Tüm Durumlar</option>
                    <option value="Bekliyor">Bekliyor</option>
                    <option value="Onaylandı">Onaylandı</option>
                    <option value="Reddedildi">Reddedildi</option>
                  </select>
                </div>
              </div>

              <div className="table-responsive mt-4">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Ad Soyad</th>
                      <th>Kurum</th>
                      <th>Başvuru Durumu</th>
                      <th>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtrelenmisBasvurular.length > 0 ? (
                      filtrelenmisBasvurular.map((basvuru) => (
                        <tr key={basvuru.id}>
                          <td>{basvuru.adSoyad}</td>
                          <td>{basvuru.kurum}</td>
                          <td>
                            <span className={`badge ${basvuru.durum === 'Onaylandı' ? 'badge-success' : basvuru.durum === 'Reddedildi' ? 'badge-danger' : 'badge-warning'}`}>
                              {basvuru.durum || 'Bekliyor'}
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
                        <td colSpan="4" className="text-center text-muted">Kayıt bulunamadı.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Başvuru Detay Modalı ve Aksiyon Butonları */}
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
                        <p><strong>Ad Soyad:</strong> {seciliBasvuru.adSoyad}</p>
                        <p><strong>E-posta:</strong> {seciliBasvuru.email}</p>
                        <p><strong>Kurum:</strong> {seciliBasvuru.kurum}</p>
                        <p><strong>Sunum Konusu:</strong> {seciliBasvuru.sunumKonusu}</p>
                        <p><strong>Durum:</strong> {seciliBasvuru.durum || 'Bekliyor'}</p>
                      </div>
                      <div className="modal-footer d-flex justify-content-between">
                        <button type="button" className="btn btn-danger" onClick={handleSil}>
                          Delete (Sil)
                        </button>
                        <div>
                          <button 
                            type="button" 
                            className="btn btn-warning mr-2" 
                            onClick={() => handleDurumGuncelle("Reddedildi")}
                          >
                            Reject (Reddet)
                          </button>
                          <button 
                            type="button" 
                            className="btn btn-success" 
                            onClick={() => handleDurumGuncelle("Onaylandı")}
                          >
                            Approve (Onayla)
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