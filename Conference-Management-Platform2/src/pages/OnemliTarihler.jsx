import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

function OnemliTarihler() {

  const [yeniTarih, setYeniTarih] = useState(false);

 
  const [tarih, setTarih] = useState("");
  const [baslik, setBaslik] = useState("");
  const [aciklama, setAciklama] = useState("");

  const [hata, setHata] = useState("");

 
  const [duzenleTarih, setDuzenleTarih] = useState(null);
  const [duzenleTarihDegeri, setDuzenleTarihDegeri] = useState("");
  const [duzenleBaslik, setDuzenleBaslik] = useState("");
  const [duzenleAciklama, setDuzenleAciklama] = useState("");

  const [tarihler, setTarihler] = useState([
    {
      id: 1,
      tarih: "01.09.2026",
      baslik: "Bildiri Gönderim Başlangıcı",
      aciklama: "Bildiri gönderimlerinin başlayacağı tarih"
    },
    {
      id: 2,
      tarih: "30.09.2026",
      baslik: "Bildiri Son Gönderim Tarihi",
      aciklama: "Bildiri gönderimi için son tarih"
    },
    {
      id: 3,
      tarih: "10.10.2026",
      baslik: "Konferans Başlangıcı",
      aciklama: "Konferansın başlayacağı tarih"
    }
  ]);


  const handleKaydet = () => {

    setHata("");

    if (!tarih || !baslik.trim() || !aciklama.trim()) {
      setHata("Lütfen tüm alanları doldurunuz.");
      return;
    }

    const yeni = {
      id: tarihler.length + 1,
      tarih: tarih,
      baslik: baslik,
      aciklama: aciklama
    };

    setTarihler([...tarihler, yeni]);

    setTarih("");
    setBaslik("");
    setAciklama("");
    setYeniTarih(false);
  };


  const handleSil = (id) => {

    setTarihler(
      tarihler.filter((tarih) => tarih.id !== id)
    );
  };

 
  const handleDuzenle = (tarih) => {

    setDuzenleTarih(tarih);

    setDuzenleTarihDegeri(tarih.tarih);
    setDuzenleBaslik(tarih.baslik);
    setDuzenleAciklama(tarih.aciklama);

    setHata("");
  };

 
  const handleGuncelle = () => {

    setHata("");

    if (
      !duzenleTarihDegeri ||
      !duzenleBaslik.trim() ||
      !duzenleAciklama.trim()
    ) {
      setHata("Lütfen tüm alanları doldurunuz.");
      return;
    }

    setTarihler(
      tarihler.map((item) =>
        item.id === duzenleTarih.id
          ? {
              ...item,
              tarih: duzenleTarihDegeri,
              baslik: duzenleBaslik,
              aciklama: duzenleAciklama
            }
          : item
      )
    );

    setDuzenleTarih(null);

    setDuzenleTarihDegeri("");
    setDuzenleBaslik("");
    setDuzenleAciklama("");
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

                <h2>Önemli Tarihler</h2>

                <button
                  className="btn btn-primary"
                  onClick={() => setYeniTarih(true)}
                >
                  + Yeni Önemli Tarih
                </button>

              </div>

            

              {yeniTarih && (

                <div className="modal d-block" tabIndex="-1">

                  <div className="modal-dialog">

                    <div className="modal-content">

                      <div className="modal-header">

                        <h5 className="modal-title">
                          Yeni Önemli Tarih
                        </h5>

                        <button
                          type="button"
                          className="close"
                          onClick={() => setYeniTarih(false)}
                        >
                          <span>&times;</span>
                        </button>

                      </div>

                      <div className="modal-body">

                        {hata && (
                          <div className="alert alert-danger">
                            {hata}
                          </div>
                        )}

                        <div className="form-group">

                          <label>Tarih</label>

                          <input
                            type="date"
                            className="form-control"
                            value={tarih}
                            onChange={(e) =>
                              setTarih(e.target.value)
                            }
                          />

                        </div>

                        <div className="form-group">

                          <label>Başlık</label>

                          <input
                            type="text"
                            className="form-control"
                            placeholder="Başlık giriniz"
                            value={baslik}
                            onChange={(e) =>
                              setBaslik(e.target.value)
                            }
                          />

                        </div>

                        <div className="form-group">

                          <label>Açıklama</label>

                          <textarea
                            className="form-control"
                            rows="4"
                            placeholder="Açıklama giriniz"
                            value={aciklama}
                            onChange={(e) =>
                              setAciklama(e.target.value)
                            }
                          ></textarea>

                        </div>

                      </div>

                      <div className="modal-footer">

                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setYeniTarih(false)}
                        >
                          İptal
                        </button>

                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleKaydet}
                        >
                          Kaydet
                        </button>

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

                        <h5 className="modal-title">
                          Tarih Düzenle
                        </h5>

                        <button
                          type="button"
                          className="close"
                          onClick={() => setDuzenleTarih(null)}
                        >
                          <span>&times;</span>
                        </button>

                      </div>

                      <div className="modal-body">

                        {hata && (
                          <div className="alert alert-danger">
                            {hata}
                          </div>
                        )}

                        <div className="form-group">

                          <label>Tarih</label>

                          <input
                            type="date"
                            className="form-control"
                            value={duzenleTarihDegeri}
                            onChange={(e) =>
                              setDuzenleTarihDegeri(e.target.value)
                            }
                          />

                        </div>

                        <div className="form-group">

                          <label>Başlık</label>

                          <input
                            type="text"
                            className="form-control"
                            value={duzenleBaslik}
                            onChange={(e) =>
                              setDuzenleBaslik(e.target.value)
                            }
                          />

                        </div>

                        <div className="form-group">

                          <label>Açıklama</label>

                          <textarea
                            className="form-control"
                            rows="4"
                            value={duzenleAciklama}
                            onChange={(e) =>
                              setDuzenleAciklama(e.target.value)
                            }
                          ></textarea>

                        </div>

                      </div>

                      <div className="modal-footer">

                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setDuzenleTarih(null)}
                        >
                          İptal
                        </button>

                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleGuncelle}
                        >
                          Güncelle
                        </button>

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

                    {tarihler.map((tarih) => (

                      <tr key={tarih.id}>

                        <td>
                          {tarih.tarih}
                        </td>

                        <td>
                          {tarih.baslik}
                        </td>

                        <td>
                          {tarih.aciklama}
                        </td>

                        <td>

                          <button
                            className="btn btn-sm btn-warning mr-2"
                            onClick={() => handleDuzenle(tarih)}
                          >
                            Düzenle
                          </button>

                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleSil(tarih.id)}
                          >
                            Sil
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </div>
  )
}

export default OnemliTarihler