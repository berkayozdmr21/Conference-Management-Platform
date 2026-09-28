import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import Pagination from '../components/Pagination'
import { API_BASE_URL } from '../api/config'

const SAYFA_BOYUTU = 5;

function Konferanslar() {
  const [yeniKonferans, setYeniKonferans] = useState(false)

  const [baslik, setBaslik] = useState("")
  const [aciklama, setAciklama] = useState("")
  const [baslangic, setBaslangic] = useState("")
  const [bitis, setBitis] = useState("")
  const [konum, setKonum] = useState("")

  const [hata, setHata] = useState("")
  const [baglantiHatasi, setBaglantiHatasi] = useState("");

  const [duzenleKonferans, setDuzenleKonferans] = useState(null)
  const [duzenleBaslik, setDuzenleBaslik] = useState("")
  const [duzenleAciklama, setDuzenleAciklama] = useState("")
  const [duzenleBaslangic, setDuzenleBaslangic] = useState("")
  const [duzenleBitis, setDuzenleBitis] = useState("")
  const [duzenleKonum, setDuzenleKonum] = useState("")

  const [konferanslar, setKonferanslar] = useState([])

  const [arama, setArama] = useState("");
  const [sayfa, setSayfa] = useState(1);

  useEffect(() => {
    fetch(`${API_BASE_URL}/conferences`)
      .then((res) => {
        if (!res.ok) throw new Error("Konferanslar çekilemedi!");
        return res.json();
      })
      .then((data) => setKonferanslar(data))
      .catch((err) => {
        console.error("Hata:", err);
        setBaglantiHatasi("Konferanslar yüklenemedi. Backend çalışıyor mu kontrol edin.");
      });
  }, []);

  const toIso = (t) => t ? new Date(t).toISOString() : null;
  const toInputDate = (iso) => iso ? iso.substring(0, 10) : "";

  const handleKaydet = () => {
    setHata("")

    if (!baslik.trim() || !aciklama.trim() || !baslangic || !bitis || !konum.trim()) {
      setHata("Lütfen tüm alanları doldurunuz.")
      return
    }

    const yeni = {
      title: baslik.trim(), description: aciklama.trim(),
      startDate: toIso(baslangic), endDate: toIso(bitis), location: konum.trim()
    }

    fetch(`${API_BASE_URL}/conferences`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(yeni)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Ekleme başarısız oldu");
        return res.json();
      })
      .then((data) => {
        setKonferanslar([...konferanslar, data]);
        setBaslik(""); setAciklama(""); setBaslangic(""); setBitis(""); setKonum("");
        setYeniKonferans(false);
      })
      .catch((err) => {
        setHata("Konferans eklenirken hata oluştu.");
        console.error(err);
      });
  }

  const handleSil = (id) => {
    fetch(`${API_BASE_URL}/conferences/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Silme başarısız oldu");
        setKonferanslar(konferanslar.filter((k) => k.id !== id));
      })
      .catch((err) => console.error("Silme hatası:", err));
  }

  const handleDuzenle = (konferans) => {
    setDuzenleKonferans(konferans)
    setDuzenleBaslik(konferans.title)
    setDuzenleAciklama(konferans.description)
    setDuzenleBaslangic(toInputDate(konferans.startDate))
    setDuzenleBitis(toInputDate(konferans.endDate))
    setDuzenleKonum(konferans.location)
    setHata("")
  }

  const handleGuncelle = () => {
    setHata("")

    if (!duzenleBaslik.trim() || !duzenleAciklama.trim() || !duzenleBaslangic || !duzenleBitis || !duzenleKonum.trim()) {
      setHata("Lütfen tüm alanları doldurunuz.")
      return
    }

    const guncel = {
      title: duzenleBaslik.trim(), description: duzenleAciklama.trim(),
      startDate: toIso(duzenleBaslangic), endDate: toIso(duzenleBitis), location: duzenleKonum.trim()
    }

    fetch(`${API_BASE_URL}/conferences/${duzenleKonferans.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(guncel)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Güncelleme başarısız oldu");
        return res.json();
      })
      .then((data) => {
        setKonferanslar(konferanslar.map((item) => (item.id === duzenleKonferans.id ? data : item)));
        setDuzenleKonferans(null);
        setDuzenleBaslik(""); setDuzenleAciklama(""); setDuzenleBaslangic(""); setDuzenleBitis(""); setDuzenleKonum("");
      })
      .catch((err) => {
        setHata("Güncellenirken hata oluştu.");
        console.error(err);
      });
  }

  const filtrelenmis = konferanslar.filter((k) =>
    (k.title + " " + k.location).toLowerCase().includes(arama.trim().toLowerCase())
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
                <h2>Konferanslar</h2>
                <button className="btn btn-primary" onClick={() => { setHata(""); setYeniKonferans(true) }}>
                  + Yeni Konferans
                </button>
              </div>

              {baglantiHatasi && <div className="alert alert-danger">{baglantiHatasi}</div>}

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Başlık veya konuma göre ara"
                  value={arama}
                  onChange={(e) => { setArama(e.target.value); setSayfa(1); }}
                />
              </div>

              {yeniKonferans && (
                <div className="modal d-block" tabIndex="-1">
                  <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Yeni Konferans</h5>
                        <button type="button" className="close" onClick={() => setYeniKonferans(false)}>
                          <span>&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        {hata && <div className="alert alert-danger">{hata}</div>}
                        <div className="form-group">
                          <label>Başlık</label>
                          <input type="text" className="form-control" placeholder="Konferans başlığı giriniz"
                            value={baslik} onChange={(e) => setBaslik(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Açıklama</label>
                          <textarea className="form-control" rows="4" placeholder="Konferans açıklaması giriniz"
                            value={aciklama} onChange={(e) => setAciklama(e.target.value)}></textarea>
                        </div>
                        <div className="form-group">
                          <label>Başlangıç Tarihi</label>
                          <input type="date" className="form-control" value={baslangic} onChange={(e) => setBaslangic(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Bitiş Tarihi</label>
                          <input type="date" className="form-control" value={bitis} onChange={(e) => setBitis(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Konum</label>
                          <input type="text" className="form-control" placeholder="Konum giriniz"
                            value={konum} onChange={(e) => setKonum(e.target.value)} />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setYeniKonferans(false)}>İptal</button>
                        <button type="button" className="btn btn-primary" onClick={handleKaydet}>Kaydet</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {duzenleKonferans && (
                <div className="modal d-block" tabIndex="-1">
                  <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Konferans Düzenle</h5>
                        <button type="button" className="close" onClick={() => setDuzenleKonferans(null)}>
                          <span>&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        {hata && <div className="alert alert-danger">{hata}</div>}
                        <div className="form-group">
                          <label>Başlık</label>
                          <input type="text" className="form-control" value={duzenleBaslik} onChange={(e) => setDuzenleBaslik(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Açıklama</label>
                          <textarea className="form-control" rows="4" value={duzenleAciklama} onChange={(e) => setDuzenleAciklama(e.target.value)}></textarea>
                        </div>
                        <div className="form-group">
                          <label>Başlangıç Tarihi</label>
                          <input type="date" className="form-control" value={duzenleBaslangic} onChange={(e) => setDuzenleBaslangic(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Bitiş Tarihi</label>
                          <input type="date" className="form-control" value={duzenleBitis} onChange={(e) => setDuzenleBitis(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Konum</label>
                          <input type="text" className="form-control" value={duzenleKonum} onChange={(e) => setDuzenleKonum(e.target.value)} />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setDuzenleKonferans(null)}>İptal</button>
                        <button type="button" className="btn btn-primary" onClick={handleGuncelle}>Güncelle</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>Başlık</th>
                      <th>Açıklama</th>
                      <th>Başlangıç</th>
                      <th>Bitiş</th>
                      <th>Konum</th>
                      <th>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gosterilecekler.map((konferans) => (
                      <tr key={konferans.id}>
                        <td>{konferans.title}</td>
                        <td>{konferans.description}</td>
                        <td>{toInputDate(konferans.startDate)}</td>
                        <td>{toInputDate(konferans.endDate)}</td>
                        <td>{konferans.location}</td>
                        <td>
                          <button className="btn btn-sm btn-warning mr-2" onClick={() => handleDuzenle(konferans)}>Düzenle</button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleSil(konferans.id)}>Sil</button>
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

export default Konferanslar