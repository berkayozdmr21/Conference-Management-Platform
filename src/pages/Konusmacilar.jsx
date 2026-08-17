import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

function Konusmacilar() {

  const [yeniKonusmaci, setYeniKonusmaci] = useState(false);

  const [adSoyad, setAdSoyad] = useState("");
  const [unvan, setUnvan] = useState("");
  const [kurum, setKurum] = useState("");
  const [sunumKonusu, setSunumKonusu] = useState("");

  const [hata, setHata] = useState("");
  const [mesaj, setMesaj] = useState("");

  const [duzenleKonusmaci, setDuzenleKonusmaci] = useState(null);

  const [duzenleAdSoyad, setDuzenleAdSoyad] = useState("");
  const [duzenleUnvan, setDuzenleUnvan] = useState("");
  const [duzenleKurum, setDuzenleKurum] = useState("");
  const [duzenleSunumKonusu, setDuzenleSunumKonusu] = useState("");

  const [konusmacilar, setKonusmacilar] = useState([
    {
      id: 1,
      adSoyad: "Ahmet Yeşil",
      unvan: "Prof.Dr.",
      kurum: "İskenderun Üniversitesi",
      sunumKonusu: "Yapay Zeka"
    },
    {
      id: 2,
      adSoyad: "Mine Tombul",
      unvan: "Prof.Dr.",
      kurum: "MKÜ Üniversitesi",
      sunumKonusu: "Siber Güvenlik"
    },
    {
      id: 3,
      adSoyad: "Azize Nur",
      unvan: "Doç.Dr.",
      kurum: "İstanbul Üniversitesi",
      sunumKonusu: "Yapay Zeka"
    }
  ]);


  const handleKaydet = () => {

    setHata("");
    setMesaj("");

    if (
      !adSoyad.trim() ||
      !unvan.trim() ||
      !kurum.trim() ||
      !sunumKonusu.trim()
    ) {
      setHata("Lütfen tüm alanları doldurunuz.");
      return;
    }

    const yeni = {
      id: konusmacilar.length + 1,
      adSoyad: adSoyad.trim(),
      unvan: unvan.trim(),
      kurum: kurum.trim(),
      sunumKonusu: sunumKonusu.trim()
    };

    setKonusmacilar([...konusmacilar, yeni]);

    setAdSoyad("");
    setUnvan("");
    setKurum("");
    setSunumKonusu("");

    setMesaj("Konuşmacı başarıyla eklendi.");
    setYeniKonusmaci(false);
  };


 
  const handleSil = (id) => {

    setKonusmacilar(
      konusmacilar.filter(
        (konusmaci) => konusmaci.id !== id
      )
    );

  };



  const handleDuzenle = (konusmaci) => {

    setDuzenleKonusmaci(konusmaci);

    setDuzenleAdSoyad(konusmaci.adSoyad);
    setDuzenleUnvan(konusmaci.unvan);
    setDuzenleKurum(konusmaci.kurum);
    setDuzenleSunumKonusu(konusmaci.sunumKonusu);

    setHata("");
  };



  const handleGuncelle = () => {

    setHata("");

    if (
      !duzenleAdSoyad.trim() ||
      !duzenleUnvan.trim() ||
      !duzenleKurum.trim() ||
      !duzenleSunumKonusu.trim()
    ) {
      setHata("Lütfen tüm alanları doldurunuz.");
      return;
    }

    setKonusmacilar(
      konusmacilar.map((item) =>
        item.id === duzenleKonusmaci.id
          ? {
              ...item,
              adSoyad: duzenleAdSoyad.trim(),
              unvan: duzenleUnvan.trim(),
              kurum: duzenleKurum.trim(),
              sunumKonusu: duzenleSunumKonusu.trim()
            }
          : item
      )
    );

    setDuzenleKonusmaci(null);

    setDuzenleAdSoyad("");
    setDuzenleUnvan("");
    setDuzenleKurum("");
    setDuzenleSunumKonusu("");

    setMesaj("Konuşmacı başarıyla güncellendi.");
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

                <h2>Konuşmacılar</h2>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setHata("");
                    setMesaj("");
                    setYeniKonusmaci(true);
                  }}
                >
                  + Yeni Konuşmacı
                </button>

              </div>


              {/* MESAJ */}
              {mesaj && (
                <div className="alert alert-success">
                  {mesaj}
                </div>
              )}



              {yeniKonusmaci && (

                <div className="modal d-block" tabIndex="-1">

                  <div className="modal-dialog">

                    <div className="modal-content">

                      <div className="modal-header">

                        <h5 className="modal-title">
                          Yeni Konuşmacı
                        </h5>

                        <button
                          type="button"
                          className="close"
                          onClick={() => setYeniKonusmaci(false)}
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

                          <label>Ad Soyad</label>

                          <input
                            type="text"
                            className="form-control"
                            placeholder="Ad Soyad giriniz"
                            value={adSoyad}
                            onChange={(e) =>
                              setAdSoyad(e.target.value)
                            }
                          />

                        </div>


                        <div className="form-group">

                          <label>Ünvan</label>

                          <input
                            type="text"
                            className="form-control"
                            placeholder="Ünvan giriniz"
                            value={unvan}
                            onChange={(e) =>
                              setUnvan(e.target.value)
                            }
                          />

                        </div>


                        <div className="form-group">

                          <label>Kurum</label>

                          <input
                            type="text"
                            className="form-control"
                            placeholder="Kurum giriniz"
                            value={kurum}
                            onChange={(e) =>
                              setKurum(e.target.value)
                            }
                          />

                        </div>


                        <div className="form-group">

                          <label>Sunum Konusu</label>

                          <input
                            type="text"
                            className="form-control"
                            placeholder="Sunum konusu giriniz"
                            value={sunumKonusu}
                            onChange={(e) =>
                              setSunumKonusu(e.target.value)
                            }
                          />

                        </div>

                      </div>


                      <div className="modal-footer">

                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() =>
                            setYeniKonusmaci(false)
                          }
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



              {duzenleKonusmaci && (

                <div className="modal d-block" tabIndex="-1">

                  <div className="modal-dialog">

                    <div className="modal-content">

                      <div className="modal-header">

                        <h5 className="modal-title">
                          Konuşmacı Düzenle
                        </h5>

                        <button
                          type="button"
                          className="close"
                          onClick={() =>
                            setDuzenleKonusmaci(null)
                          }
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

                          <label>Ad Soyad</label>

                          <input
                            type="text"
                            className="form-control"
                            value={duzenleAdSoyad}
                            onChange={(e) =>
                              setDuzenleAdSoyad(e.target.value)
                            }
                          />

                        </div>


                        <div className="form-group">

                          <label>Ünvan</label>

                          <input
                            type="text"
                            className="form-control"
                            value={duzenleUnvan}
                            onChange={(e) =>
                              setDuzenleUnvan(e.target.value)
                            }
                          />

                        </div>


                        <div className="form-group">

                          <label>Kurum</label>

                          <input
                            type="text"
                            className="form-control"
                            value={duzenleKurum}
                            onChange={(e) =>
                              setDuzenleKurum(e.target.value)
                            }
                          />

                        </div>


                        <div className="form-group">

                          <label>Sunum Konusu</label>

                          <input
                            type="text"
                            className="form-control"
                            value={duzenleSunumKonusu}
                            onChange={(e) =>
                              setDuzenleSunumKonusu(e.target.value)
                            }
                          />

                        </div>

                      </div>


                      <div className="modal-footer">

                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() =>
                            setDuzenleKonusmaci(null)
                          }
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

                  <thead>

                    <tr>

                      <th>Ad Soyad</th>
                      <th>Ünvan</th>
                      <th>Kurum</th>
                      <th>Sunum Konusu</th>
                      <th>İşlemler</th>

                    </tr>

                  </thead>


                  <tbody>

                    {konusmacilar.map((konusmaci) => (

                      <tr key={konusmaci.id}>

                        <td>{konusmaci.adSoyad}</td>

                        <td>{konusmaci.unvan}</td>

                        <td>{konusmaci.kurum}</td>

                        <td>{konusmaci.sunumKonusu}</td>

                        <td>

                          <button
                            className="btn btn-sm btn-warning mr-2"
                            onClick={() =>
                              handleDuzenle(konusmaci)
                            }
                          >
                            Düzenle
                          </button>


                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              handleSil(konusmaci.id)
                            }
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

export default Konusmacilar