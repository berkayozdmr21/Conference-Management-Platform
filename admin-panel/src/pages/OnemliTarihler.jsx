import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import Pagination from '../components/Pagination'
import { API_BASE_URL } from '../api/config'

const SAYFA_BOYUTU = 5;

function OnemliTarihler() {
  const [yeniTarih, setYeniTarih] = useState(false);

  const [tarih, setTarih] = useState("");
  const [baslik, setBaslik] = useState("");
  const [aciklama, setAciklama] = useState("");

  const [hata, setHata] = useState("");
  const [baglantiHatasi, setBaglantiHatasi] = useState("");

  const [duzenleTarih, setDuzenleTarih] = useState(null);
  const [duzenleTarihDegeri, setDuzenleTarihDegeri] = useState("");
  const [duzenleBaslik, setDuzenleBaslik] = useState("");
  const [duzenleAciklama, setDuzenleAciklama] = useState("");

  const [tarihler, setTarihler] = useState([]);

  const [arama, setArama] = useState("");
  const [sayfa, setSayfa] = useState(1);

  useEffect(() => {
    fetch(`${API_BASE_URL}/important-dates`)
      .then((res) => {
        if (!res.ok) throw new Error("Tarihler çekilemedi!");
        return res.json();
      })
      .then((data) => setTarihler(data))
      .catch((err) => {
        console.error("Hata:", err);
        setBaglantiHatasi("Tarihler yüklenemedi. Backend çalışıyor mu kontrol edin.");
      });
  }, []);

  const toIso = (t) => (t ? new Date(t).toISOString() : null);
  const toInputDate = (iso) => (iso ? iso.substring(0, 10) : "");

  const handleKaydet = () => {
    setHata("");

    if (!tarih || !baslik.trim()) {
      setHata("Lütfen tarih ve başlık alanlarını doldurunuz.");
      return;
    }

    const yeni = { title: baslik.trim(), date: toIso(tarih), description: aciklama.trim() || null };

    fetch(`${API_BASE_URL}/important-dates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(yeni)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Ekleme başarısız oldu");
        return res.json();
      })
      .then((data) => {
        setTarihler([...tarihler, data]);
        setTarih(""); setBaslik(""); setAciklama("");
        setYeniTarih(false);
      })
      .catch((err) => {
        setHata("Eklenirken hata oluştu.");
        console.error(err);
      });
  };

  const handleSil = (id) => {
    fetch(`${API_BASE_URL}/important-dates/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Silme başarısız oldu");
        setTarihler(tarihler.filter((t) => t.id !== id));
      })
      .catch((err) => console.error("Silme hatası:", err));
  };

  const handleDuzenle = (t) => {
    setDuzenleTarih(t);
    setDuzenleTarihDegeri(toInputDate(t.date));
    setDuzenleBaslik(t.title);
    setDuzenleAciklama(t.description || "");
    setHata("");
  };

  const handleGuncelle = () => {
    setHata("");

    if (!duzenleTarihDegeri || !duzenleBaslik.trim()) {
      setHata("Lütfen tarih ve başlık alanlarını doldurunuz.");
      return;
    }

    const guncel = { title: duzenleBaslik.trim(), date: toIso(duzenleTarihDegeri), description: duzenleAciklama.trim() || null };

    fetch(`${API_BASE_URL}/important-dates/${duzenleTarih.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(guncel)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Güncelleme başarısız oldu");
        return res.json();
      })
      .then((data) => {
        setTarihler(tarihler.map((item) => (item.id === duzenleTarih.id ? data : item)));
        setDuzenleTarih(null);
        setDuzenleTarihDegeri(""); setDuzenleBaslik(""); setDuzenleAciklama("");
      })
      .catch((err) => {
        setHata("Güncellenirken hata oluştu.");
        console.error(err);
      });
  };

  const filtrelenmis = tarihler.filter((t) =>
    t.title.toLowerCase().includes(arama.trim().toLowerCase())
  );
  const toplamSayfa = Math.ceil(filtrelenmis.length / SAYFA_BOYUTU) || 1;
  const gosterilecekler = filtrelenmis.slice((sayfa - 1) * SAYFA_BOYUTU, sayfa * SAYFA_BOYUTU);

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
                <h2>Önemli Tarihler</h2>
                <button className="btn btn-primary" onClick={() => setYeniTarih(true)}>
                  + Yeni Önemli Tarih
                </button>
              </div>

              {baglantiHatasi && <div className="alert alert-danger">{baglantiHatasi}</div>}

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Başlığa göre ara"
                  value={arama}
                  onChange={(e) => { setArama(e.target.value); setSayfa(1); }}
                />
              </div>

              {yeniTarih && (
                <div className="modal d-block" tabIndex="-1">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Yeni Önemli Tarih</h5>
                        <button type="button" className="close" onClick={() => setYeniTarih(false)}>
                          <span>&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        {hata && <div className="alert alert-danger">{hata}</div>}
                        <div className="form-group">
                          <label>Tarih</label>
                          <input type="date" className="form-control" value={tarih} onChange={(e) => setTarih(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Başlık</label>
                          <input type="text" className="form-control" placeholder="Başlık giriniz"
                            value={baslik} onChange={(e) => setBaslik(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Açıklama (opsiyonel)</label>
                          <textarea className="form-control" rows="4" placeholder="Açıklama giriniz"
                            value={aciklama} onChange={(e) => setAciklama(e.target.value)}></textarea>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setYeniTarih(false)}>İptal</button>
                        <button type="button" className="btn btn-primary" onClick={handleKaydet}>Kaydet</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {duzenleTarih && (
                <div className="modal d-block" tabIndex="-1">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Tarih Düzenle</h5>
                        <button type="button" className="close" onClick={() => setDuzenleTarih(null)}>
                          <span>&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        {hata && <div className="alert alert-danger">{hata}</div>}
                        <div className="form-group">
                          <label>Tarih</label>
                          <input type="date" className="form-control" value={duzenleTarihDegeri} onChange={(e) => setDuzenleTarihDegeri(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Başlık</label>
                          <input type="text" className="form-control" value={duzenleBaslik} onChange={(e) => setDuzenleBaslik(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Açıklama (opsiyonel)</label>
                          <textarea className="form-control" rows="4" value={duzenleAciklama} onChange={(e) => setDuzenleAciklama(e.target.value)}></textarea>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setDuzenleTarih(null)}>İptal</button>
                        <button type="button" className="btn btn-primary" onClick={handleGuncelle}>Güncelle</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="table-responsive">
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Tarih</th>
                      <th scope="col">Başlık</th>
                      <th scope="col">Açıklama</th>
                      <th scope="col">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gosterilecekler.map((t) => (
                      <tr key={t.id}>
                        <td>{toInputDate(t.date)}</td>
                        <td>{t.title}</td>
                        <td>{t.description}</td>
                        <td>
                          <button className="btn btn-sm btn-warning mr-2" onClick={() => handleDuzenle(t)}>Düzenle</button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleSil(t.id)}>Sil</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination sayfa={sayfa} toplamSayfa={toplamSayfa} setSayfa={setSayfa} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default OnemliTarihler