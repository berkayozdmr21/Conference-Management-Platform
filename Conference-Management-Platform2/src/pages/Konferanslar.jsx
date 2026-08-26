import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

function Konferanslar() {

  const [yeniKonferans, setYeniKonferans] = useState(false)

  const [baslik, setBaslik] = useState("")
  const [aciklama, setAciklama] = useState("")
  const [baslangic, setBaslangic] = useState("")
  const [bitis, setBitis] = useState("")
  const [konum, setKonum] = useState("")

  const [hata, setHata] = useState("")

  const [duzenleKonferans, setDuzenleKonferans] = useState(null)

  const [duzenleBaslik, setDuzenleBaslik] = useState("")
  const [duzenleAciklama, setDuzenleAciklama] = useState("")
  const [duzenleBaslangic, setDuzenleBaslangic] = useState("")
  const [duzenleBitis, setDuzenleBitis] = useState("")
  const [duzenleKonum, setDuzenleKonum] = useState("")

  const [konferanslar, setKonferanslar] = useState([
    {
      id: 1,
      baslik: "Uluslararası Sempozyum 2026",
      aciklama: "Yazılım ve teknoloji sempozyumu",
      baslangic: "10.10.2026",
      bitis: "19.10.2026",
      konum: "Hatay"
    }
  ])


  // YENİ KONFERANS KAYDET
  const handleKaydet = () => {

    setHata("")

    if (
      !baslik.trim() ||
      !aciklama.trim() ||
      !baslangic ||
      !bitis ||
      !konum.trim()
    ) {
      setHata("Lütfen tüm alanları doldurunuz.")
      return
    }

    const yeni = {
      id: konferanslar.length + 1,
      baslik: baslik.trim(),
      aciklama: aciklama.trim(),
      baslangic: baslangic,
      bitis: bitis,
      konum: konum.trim()
    }

    setKonferanslar([...konferanslar, yeni])

    setBaslik("")
    setAciklama("")
    setBaslangic("")
    setBitis("")
    setKonum("")

    setYeniKonferans(false)
  }


  // SİL
  const handleSil = (id) => {

    setKonferanslar(
      konferanslar.filter(
        (konferans) => konferans.id !== id
      )
    )
  }


  // DÜZENLE MODALINI AÇ
  const handleDuzenle = (konferans) => {

    setDuzenleKonferans(konferans)

    setDuzenleBaslik(konferans.baslik)
    setDuzenleAciklama(konferans.aciklama)
    setDuzenleBaslangic(konferans.baslangic)
    setDuzenleBitis(konferans.bitis)
    setDuzenleKonum(konferans.konum)

    setHata("")
  }


  // GÜNCELLE
  const handleGuncelle = () => {

    setHata("")

    if (
      !duzenleBaslik.trim() ||
      !duzenleAciklama.trim() ||
      !duzenleBaslangic ||
      !duzenleBitis ||
      !duzenleKonum.trim()
    ) {
      setHata("Lütfen tüm alanları doldurunuz.")
      return
    }

    setKonferanslar(
      konferanslar.map((item) =>
        item.id === duzenleKonferans.id
          ? {
              ...item,
              baslik: duzenleBaslik.trim(),
              aciklama: duzenleAciklama.trim(),
              baslangic: duzenleBaslangic,
              bitis: duzenleBitis,
              konum: duzenleKonum.trim()
            }
          : item
      )
    )

    setDuzenleKonferans(null)

    setDuzenleBaslik("")
    setDuzenleAciklama("")
    setDuzenleBaslangic("")
    setDuzenleBitis("")
    setDuzenleKonum("")
  }


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

                <h2>
                  Konferanslar
                </h2>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setHata("")
                    setYeniKonferans(true)
                  }}
                >
                  + Yeni Konferans
                </button>

              </div>


              {/* YENİ KONFERANS MODALI */}

              {yeniKonferans && (

                <div className="modal d-block" tabIndex="-1">

                  <div className="modal-dialog modal-dialog-scrollable">

                    <div className="modal-content">

                      <div className="modal-header">

                        <h5 className="modal-title">
                          Yeni Konferans
                        </h5>

                        <button
                          type="button"
                          className="close"
                          onClick={() => setYeniKonferans(false)}
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

                          <label>Başlık</label>

                          <input
                            type="text"
                            className="form-control"
                            placeholder="Konferans başlığı giriniz"
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
                            placeholder="Konferans açıklaması giriniz"
                            value={aciklama}
                            onChange={(e) =>
                              setAciklama(e.target.value)
                            }
                          ></textarea>

                        </div>


                        <div className="form-group">

                          <label>Başlangıç Tarihi</label>

                          <input
                            type="date"
                            className="form-control"
                            value={baslangic}
                            onChange={(e) =>
                              setBaslangic(e.target.value)
                            }
                          />

                        </div>


                        <div className="form-group">

                          <label>Bitiş Tarihi</label>

                          <input
                            type="date"
                            className="form-control"
                            value={bitis}
                            onChange={(e) =>
                              setBitis(e.target.value)
                            }
                          />

                        </div>


                        <div className="form-group">

                          <label>Konum</label>

                          <input
                            type="text"
                            className="form-control"
                            placeholder="Konum giriniz"
                            value={konum}
                            onChange={(e) =>
                              setKonum(e.target.value)
                            }
                          />

                        </div>

                      </div>


                      <div className="modal-footer">

                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setYeniKonferans(false)}
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


              {/* DÜZENLE MODALI */}

              {duzenleKonferans && (

                <div className="modal d-block" tabIndex="-1">

                  <div className="modal-dialog modal-dialog-scrollable">

                    <div className="modal-content">

                      <div className="modal-header">

                        <h5 className="modal-title">
                          Konferans Düzenle
                        </h5>

                        <button
                          type="button"
                          className="close"
                          onClick={() =>
                            setDuzenleKonferans(null)
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


                        <div className="form-group">

                          <label>Başlangıç Tarihi</label>

                          <input
                            type="date"
                            className="form-control"
                            value={duzenleBaslangic}
                            onChange={(e) =>
                              setDuzenleBaslangic(e.target.value)
                            }
                          />

                        </div>


                        <div className="form-group">

                          <label>Bitiş Tarihi</label>

                          <input
                            type="date"
                            className="form-control"
                            value={duzenleBitis}
                            onChange={(e) =>
                              setDuzenleBitis(e.target.value)
                            }
                          />

                        </div>


                        <div className="form-group">

                          <label>Konum</label>

                          <input
                            type="text"
                            className="form-control"
                            value={duzenleKonum}
                            onChange={(e) =>
                              setDuzenleKonum(e.target.value)
                            }
                          />

                        </div>

                      </div>


                      <div className="modal-footer">

                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() =>
                            setDuzenleKonferans(null)
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


              {/* TABLO */}

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

                    {konferanslar.map((konferans) => (

                      <tr key={konferans.id}>

                        <td>
                          {konferans.baslik}
                        </td>

                        <td>
                          {konferans.aciklama}
                        </td>

                        <td>
                          {konferans.baslangic}
                        </td>

                        <td>
                          {konferans.bitis}
                        </td>

                        <td>
                          {konferans.konum}
                        </td>

                        <td>

                          <button
                            className="btn btn-sm btn-warning mr-2"
                            onClick={() =>
                              handleDuzenle(konferans)
                            }
                          >
                            Düzenle
                          </button>

                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              handleSil(konferans.id)
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

export default Konferanslar