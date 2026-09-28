import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import Pagination from '../components/Pagination'
import { API_BASE_URL } from '../api/config'

const SAYFA_BOYUTU = 5;

function Konusmacilar() {
  const [yeniKonusmaci, setYeniKonusmaci] = useState(false);

  const [adSoyad, setAdSoyad] = useState("");
  const [unvan, setUnvan] = useState("");
  const [universite, setUniversite] = useState("");
  const [ulke, setUlke] = useState("");
  const [aciklama, setAciklama] = useState("");

  const [hata, setHata] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [baglantiHatasi, setBaglantiHatasi] = useState("");

  const [duzenleKonusmaci, setDuzenleKonusmaci] = useState(null);
  const [duzenleAdSoyad, setDuzenleAdSoyad] = useState("");
  const [duzenleUnvan, setDuzenleUnvan] = useState("");
  const [duzenleUniversite, setDuzenleUniversite] = useState("");
  const [duzenleUlke, setDuzenleUlke] = useState("");
  const [duzenleAciklama, setDuzenleAciklama] = useState("");

  const [konusmacilar, setKonusmacilar] = useState([]);

  const [arama, setArama] = useState("");
  const [sayfa, setSayfa] = useState(1);

  useEffect(() => {
    fetch(`${API_BASE_URL}/speakers`)
      .then((res) => {
        if (!res.ok) throw new Error("Konuşmacılar çekilemedi!");
        return res.json();
      })
      .then((data) => setKonusmacilar(data))
      .catch((err) => {
        console.error("Hata:", err);
        setBaglantiHatasi("Konuşmacılar yüklenemedi. Backend çalışıyor mu kontrol edin.");
      });
  }, []);

  const handleKaydet = () => {
    setHata(""); setMesaj("");

    if (!adSoyad.trim() || !unvan.trim() || !universite.trim() || !ulke.trim()) {
      setHata("Lütfen zorunlu alanları doldurunuz.");
      return;
    }

    const yeni = {
      name: adSoyad.trim(), title: unvan.trim(), university: universite.trim(),
      country: ulke.trim(), photo: null, description: aciklama.trim() || null
    };

    fetch(`${API_BASE_URL}/speakers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(yeni)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Ekleme başarısız oldu");
        return res.json();
      })
      .then((data) => {
        setKonusmacilar([...konusmacilar, data]);
        setAdSoyad(""); setUnvan(""); setUniversite(""); setUlke(""); setAciklama("");
        setMesaj("Konuşmacı başarıyla eklendi.");
        setYeniKonusmaci(false);
      })
      .catch((err) => {
        setHata("Konuşmacı eklenirken hata oluştu.");
        console.error(err);
      });
  };

  const handleSil = (id) => {
    fetch(`${API_BASE_URL}/speakers/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Silme başarısız oldu");
        setKonusmacilar(konusmacilar.filter((k) => k.id !== id));
      })
      .catch((err) => console.error("Silme hatası:", err));
  };

  const handleDuzenle = (konusmaci) => {
    setDuzenleKonusmaci(konusmaci);
    setDuzenleAdSoyad(konusmaci.name);
    setDuzenleUnvan(konusmaci.title);
    setDuzenleUniversite(konusmaci.university);
    setDuzenleUlke(konusmaci.country);
    setDuzenleAciklama(konusmaci.description || "");
    setHata("");
  };

  const handleGuncelle = () => {
    setHata("");

    if (!duzenleAdSoyad.trim() || !duzenleUnvan.trim() || !duzenleUniversite.trim() || !duzenleUlke.trim()) {
      setHata("Lütfen zorunlu alanları doldurunuz.");
      return;
    }

    const guncel = {
      name: duzenleAdSoyad.trim(), title: duzenleUnvan.trim(), university: duzenleUniversite.trim(),
      country: duzenleUlke.trim(), photo: null, description: duzenleAciklama.trim() || null
    };

    fetch(`${API_BASE_URL}/speakers/${duzenleKonusmaci.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(guncel)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Güncelleme başarısız oldu");
        return res.json();
      })
      .then((data) => {
        setKonusmacilar(konusmacilar.map((item) => (item.id === duzenleKonusmaci.id ? data : item)));
        setDuzenleKonusmaci(null);
        setDuzenleAdSoyad(""); setDuzenleUnvan(""); setDuzenleUniversite(""); setDuzenleUlke(""); setDuzenleAciklama("");
        setMesaj("Konuşmacı başarıyla güncellendi.");
      })
      .catch((err) => {
        setHata("Güncellenirken hata oluştu.");
        console.error(err);
      });
  };

  const filtrelenmis = konusmacilar.filter((k) =>
    (k.name + " " + k.university + " " + k.country).toLowerCase().includes(arama.trim().toLowerCase())
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
                <h2>Konuşmacılar</h2>
                <button className="btn btn-primary" onClick={() => { setHata(""); setMesaj(""); setYeniKonusmaci(true); }}>
                  + Yeni Konuşmacı
                </button>
              </div>

              {baglantiHatasi && <div className="alert alert-danger">{baglantiHatasi}</div>}
              {mesaj && <div className="alert alert-success">{mesaj}</div>}

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ad, üniversite veya ülkeye göre ara"
                  value={arama}
                  onChange={(e) => { setArama(e.target.value); setSayfa(1); }}
                />
              </div>

              {yeniKonusmaci && (
                <div className="modal d-block" tabIndex="-1">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Yeni Konuşmacı</h5>
                        <button type="button" className="close" onClick={() => setYeniKonusmaci(false)}>
                          <span>&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        {hata && <div className="alert alert-danger">{hata}</div>}
                        <div className="form-group">
                          <label>Ad Soyad</label>
                          <input type="text" className="form-control" placeholder="Ad Soyad giriniz"
                            value={adSoyad} onChange={(e) => setAdSoyad(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Ünvan</label>
                          <input type="text" className="form-control" placeholder="Ünvan giriniz"
                            value={unvan} onChange={(e) => setUnvan(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Üniversite / Kurum</label>
                          <input type="text" className="form-control" placeholder="Üniversite / Kurum giriniz"
                            value={universite} onChange={(e) => setUniversite(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Ülke</label>
                          <input type="text" className="form-control" placeholder="Ülke giriniz"
                            value={ulke} onChange={(e) => setUlke(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Açıklama (opsiyonel)</label>
                          <textarea className="form-control" rows="3" placeholder="Kısa açıklama giriniz"
                            value={aciklama} onChange={(e) => setAciklama(e.target.value)}></textarea>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setYeniKonusmaci(false)}>İptal</button>
                        <button type="button" className="btn btn-primary" onClick={handleKaydet}>Kaydet</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {duzenleKonusmaci && (
                <div className="modal d-block" tabIndex="-1">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Konuşmacı Düzenle</h5>
                        <button type="button" className="close" onClick={() => setDuzenleKonusmaci(null)}>
                          <span>&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        {hata && <div className="alert alert-danger">{hata}</div>}
                        <div className="form-group">
                          <label>Ad Soyad</label>
                          <input type="text" className="form-control" value={duzenleAdSoyad} onChange={(e) => setDuzenleAdSoyad(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Ünvan</label>
                          <input type="text" className="form-control" value={duzenleUnvan} onChange={(e) => setDuzenleUnvan(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Üniversite / Kurum</label>
                          <input type="text" className="form-control" value={duzenleUniversite} onChange={(e) => setDuzenleUniversite(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Ülke</label>
                          <input type="text" className="form-control" value={duzenleUlke} onChange={(e) => setDuzenleUlke(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Açıklama (opsiyonel)</label>
                          <textarea className="form-control" rows="3" value={duzenleAciklama} onChange={(e) => setDuzenleAciklama(e.target.value)}></textarea>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setDuzenleKonusmaci(null)}>İptal</button>
                        <button type="button" className="btn btn-primary" onClick={handleGuncelle}>Güncelle</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Ad Soyad</th>
                      <th>Ünvan</th>
                      <th>Üniversite</th>
                      <th>Ülke</th>
                      <th>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gosterilecekler.map((konusmaci) => (
                      <tr key={konusmaci.id}>
                        <td>{konusmaci.name}</td>
                        <td>{konusmaci.title}</td>
                        <td>{konusmaci.university}</td>
                        <td>{konusmaci.country}</td>
                        <td>
                          <button className="btn btn-sm btn-warning mr-2" onClick={() => handleDuzenle(konusmaci)}>Düzenle</button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleSil(konusmaci.id)}>Sil</button>
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

export default Konusmacilar