import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import Pagination from '../components/Pagination'
import { API_BASE_URL } from '../api/config'

const SAYFA_BOYUTU = 5;

function Konular() {
  const [yeniKonu, setYeniKonu] = useState(false);
  const [konuAdi, setKonuAdi] = useState("");
  const [konferansId, setKonferansId] = useState("");
  const [hata, setHata] = useState("");
  const [baglantiHatasi, setBaglantiHatasi] = useState("");

  const [duzenleKonu, setDuzenleKonu] = useState(null);
  const [duzenleKonuAdi, setDuzenleKonuAdi] = useState("");
  const [duzenleKonferansId, setDuzenleKonferansId] = useState("");

  const [konular, setKonular] = useState([]);
  const [konferanslar, setKonferanslar] = useState([]);

  const [arama, setArama] = useState("");
  const [sayfa, setSayfa] = useState(1);

  useEffect(() => {
    fetch(`${API_BASE_URL}/topics`)
      .then((response) => {
        if (!response.ok) throw new Error("API'den veri çekilemedi!");
        return response.json();
      })
      .then((data) => setKonular(data))
      .catch((error) => {
        console.error("Bağlantı hatası:", error);
        setBaglantiHatasi("Konular yüklenemedi. Backend çalışıyor mu kontrol edin.");
      });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/conferences`)
      .then((res) => res.json())
      .then((data) => setKonferanslar(data))
      .catch((err) => console.error("Konferanslar çekilemedi:", err));
  }, []);

  const handleKaydet = () => {
    setHata("");

    if (!konuAdi.trim() || !konferansId) {
      setHata("Lütfen tüm alanları doldurunuz.");
      return;
    }

    const yeniKonuVerisi = { conferenceId: parseInt(konferansId), name: konuAdi.trim() };

    fetch(`${API_BASE_URL}/topics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(yeniKonuVerisi)
    })
      .then((response) => {
        if (!response.ok) throw new Error("Ekleme başarısız oldu");
        return response.json();
      })
      .then((data) => {
        setKonular([...konular, data]);
        setKonuAdi(""); setKonferansId(""); setYeniKonu(false);
      })
      .catch((error) => {
        setHata("Konu eklenirken hata oluştu.");
        console.error(error);
      });
  };

  const handleSil = (id) => {
    fetch(`${API_BASE_URL}/topics/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) throw new Error("Silme başarısız oldu");
        setKonular(konular.filter((konu) => konu.id !== id));
      })
      .catch((error) => console.error("Silme hatası:", error));
  };

  const handleDuzenle = (konu) => {
    setDuzenleKonu(konu);
    setDuzenleKonuAdi(konu.name);
    setDuzenleKonferansId(konu.conferenceId);
    setHata("");
  };

  const handleGuncelle = () => {
    setHata("");

    if (!duzenleKonuAdi.trim() || !duzenleKonferansId) {
      setHata("Lütfen tüm alanları doldurunuz.");
      return;
    }

    const guncelVeri = { conferenceId: parseInt(duzenleKonferansId), name: duzenleKonuAdi.trim() };

    fetch(`${API_BASE_URL}/topics/${duzenleKonu.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(guncelVeri)
    })
      .then((response) => {
        if (!response.ok) throw new Error("Güncelleme başarısız oldu");
        return response.json();
      })
      .then((data) => {
        setKonular(konular.map((item) => (item.id === duzenleKonu.id ? data : item)));
        setDuzenleKonu(null); setDuzenleKonuAdi(""); setDuzenleKonferansId("");
      })
      .catch((error) => {
        setHata("Konu güncellenirken hata oluştu.");
        console.error(error);
      });
  };

  const konferansAdi = (id) => {
    const k = konferanslar.find((c) => c.id === id);
    return k ? k.title : "—";
  };

  const filtrelenmis = konular.filter((k) =>
    k.name.toLowerCase().includes(arama.trim().toLowerCase())
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
                <h2>Konular</h2>
                <button className="btn btn-primary" onClick={() => setYeniKonu(true)}>
                  + Yeni Konu
                </button>
              </div>

              {baglantiHatasi && <div className="alert alert-danger">{baglantiHatasi}</div>}

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Konu adına göre ara"
                  value={arama}
                  onChange={(e) => { setArama(e.target.value); setSayfa(1); }}
                />
              </div>

              {yeniKonu && (
                <div className="modal d-block" tabIndex="-1">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Yeni Konu</h5>
                        <button type='button' className="close" onClick={() => setYeniKonu(false)}>
                          <span>&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        {hata && <div className='alert alert-danger'>{hata}</div>}
                        <div className="form-group">
                          <label>Konferans</label>
                          <select className="form-control" value={konferansId} onChange={(e) => setKonferansId(e.target.value)}>
                            <option value="">Seçiniz</option>
                            {konferanslar.map((k) => (
                              <option key={k.id} value={k.id}>{k.title}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Konu Adı</label>
                          <input type="text" className='form-control' placeholder='Konu Adını Giriniz'
                            value={konuAdi} onChange={(e) => setKonuAdi(e.target.value)} />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type='button' className='btn btn-secondary' onClick={() => setYeniKonu(false)}>İptal</button>
                        <button type='button' className='btn btn-primary' onClick={handleKaydet}>Kaydet</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {duzenleKonu && (
                <div className="modal d-block" tabIndex="-1">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Konu Düzenle</h5>
                        <button type="button" className="close" onClick={() => setDuzenleKonu(null)}>
                          <span>&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        {hata && <div className="alert alert-danger">{hata}</div>}
                        <div className="form-group">
                          <label>Konferans</label>
                          <select className="form-control" value={duzenleKonferansId} onChange={(e) => setDuzenleKonferansId(e.target.value)}>
                            <option value="">Seçiniz</option>
                            {konferanslar.map((k) => (
                              <option key={k.id} value={k.id}>{k.title}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Konu Adı</label>
                          <input type="text" className="form-control" value={duzenleKonuAdi}
                            onChange={(e) => setDuzenleKonuAdi(e.target.value)} />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setDuzenleKonu(null)}>İptal</button>
                        <button type="button" className="btn btn-primary" onClick={handleGuncelle}>Güncelle</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="table-responsive mt-3">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Konu Adı</th>
                      <th scope="col">Konferans</th>
                      <th scope="col">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gosterilecekler.map((konu) => (
                      <tr key={konu.id}>
                        <td>{konu.name}</td>
                        <td>{konferansAdi(konu.conferenceId)}</td>
                        <td>
                          <button className="btn btn-sm btn-warning mr-2" onClick={() => handleDuzenle(konu)}>Düzenle</button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleSil(konu.id)}>Sil</button>
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

export default Konular