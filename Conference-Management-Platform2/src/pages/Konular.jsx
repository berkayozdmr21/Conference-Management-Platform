import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

function Konular() {
  const [yeniKonu, setYeniKonu] = useState(false);
  const [konuAdi, setKonuAdi] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [hata, setHata] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [duzenleKonu, setDuzenleKonu] = useState(null);
  const [duzenleKonuAdi, setDuzenleKonuAdi] = useState("");
  const [duzenleAciklama, setDuzenleAciklama] = useState("");

  const [konular, setKonular] = useState([]);

 
  useEffect(() => {
    fetch("https://localhost:53662/api/konular") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("API'den veri çekilemedi!");
        }
        return response.json();
      })
      .then((data) => {
        setKonular(data); 
      })
      .catch((error) => {
        console.error("Bağlantı hatası:", error);
      });
  }, []); 

  // 2. POST İŞLEMİ (Yeni Kayıt Ekleme)
  const handleKaydet = () => {
    setHata("");
    setMesaj("");

    if (!konuAdi.trim() || !aciklama.trim()) {
      setHata("Lütfen tüm alanları doldurunuz.");
      return;
    }

    const yeniKonuVerisi = {
      konuAdi: konuAdi.trim(),
      aciklama: aciklama.trim()
    };

    fetch("https://localhost:XXXX/api/konular", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(yeniKonuVerisi)
    })
    .then((response) => {
      if (!response.ok) throw new Error("Ekleme başarısız oldu");
      return response.json(); 
    })
    .then((data) => {
      // Backend'den id'si ile dönen yeni kaydı listeye ekliyoruz
      setKonular([...konular, data]);
      setKonuAdi("");
      setAciklama("");
      setYeniKonu(false);
    })
    .catch((error) => {
      setHata("Konu eklenirken hata oluştu.");
      console.error(error);
    });
  };

  // 3. DELETE İŞLEMİ (Kayıt Silme)
  const handleSil = (id) => {
    fetch(`https://localhost:XXXX/api/konular/${id}`, {
      method: "DELETE"
    })
    .then((response) => {
      if (!response.ok) throw new Error("Silme başarısız oldu");
      // Silme başarılıysa ekrandaki listeden de çıkarıyoruz
      setKonular(konular.filter((konu) => konu.id !== id));
    })
    .catch((error) => {
      console.error("Silme hatası:", error);
    });
  }

  const handleDuzenle = (konu) => {
    setDuzenleKonu(konu);
    setDuzenleKonuAdi(konu.konuAdi);
    setDuzenleAciklama(konu.aciklama);
    setHata("");
  }
  
  // 4. PUT İŞLEMİ (Kayıt Güncelleme)
  const handleGuncelle = () => {
    setHata("");

    if(!duzenleKonuAdi.trim() || !duzenleAciklama.trim()){
      setHata("Lütfen tüm alanları doldurunuz.");
      return;
    }

    const guncelVeri = {
      id: duzenleKonu.id,
      konuAdi: duzenleKonuAdi.trim(),
      aciklama: duzenleAciklama.trim()
    };

    fetch(`https://localhost:XXXX/api/konular/${duzenleKonu.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(guncelVeri)
    })
    .then((response) => {
      if (!response.ok) throw new Error("Güncelleme başarısız oldu");
      
      // Başarılıysa ekrandaki listeyi güncelliyoruz
      setKonular(
        konular.map((item) =>
          item.id === duzenleKonu.id ? guncelVeri : item
        )
      );
      setDuzenleKonu(null);
      setDuzenleKonuAdi("");
      setDuzenleAciklama("");
    })
    .catch((error) => {
      setHata("Konu güncellenirken hata oluştu.");
      console.error(error);
    });
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
                <h2>Konular</h2>
                <button
                  className="btn btn-primary"
                  onClick={() => setYeniKonu(true)}
                >
                  + Yeni Konu
                </button>
              </div>

              {yeniKonu && (
                <div className="modal d-block" tabIndex="-1">
                  <div className="modal-dialog">
                    <div className="modal-content">
                          <div className="modal-header">
                                 <h5 className="modal-title">Yeni Konu</h5>
                                 <button type='button' className="close" onClick={() =>setYeniKonu(false)}>
                                 <span>&times;</span>
                                 </button>
                          </div>
                         <div className="modal-body">
                          {hata && (
                            <div className='alert alert-danger'>{hata}</div>
                          )}
                          <div className="form-group">
                         <label>Konu Adı</label>
                        <input type="text" className='form-control' placeholder='Konu Adını Giriniz' value={konuAdi} onChange={(e)=>setKonuAdi(e.target.value)} />
                            </div>
                            <div className="form-group">
                              <label>Açıklama</label>
                              <textarea className='form-control' rows='4' placeholder='Konu Açıklamasını Giriniz'
                               value={aciklama} onChange={(e)=>setAciklama(e.target.value)}></textarea>
                            </div>
                          </div> 
                      <div className="modal-footer">
                        <button type='button' className='btn btn-secondary' onClick={()=>setYeniKonu(false)}>
                          İptal
                          </button>
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
                        <h5 className="modal-title">
                          Konu Düzenle
                        </h5>
                        <button
                          type="button"
                          className="close"
                          onClick={() => setDuzenleKonu(null)}
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
                          <label>Konu Adı</label>
                          <input
                            type="text"
                            className="form-control"
                            value={duzenleKonuAdi}
                            onChange={(e) => setDuzenleKonuAdi(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Açıklama</label>
                          <textarea
                            className="form-control"
                            rows="4"
                            value={duzenleAciklama}
                            onChange={(e) => setDuzenleAciklama(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setDuzenleKonu(null)}
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

              <div className="table-responsive mt-5">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Konu Adı</th>
                      <th scope="col">Açıklama</th>
                      <th scope="col">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {konular.map((konu) => (
                      <tr key={konu.id}>
                        <td>{konu.konuAdi}</td>
                        <td>{konu.aciklama}</td>
                        <td>
                          <button className="btn btn-sm btn-warning mr-2" onClick={()=>handleDuzenle(konu)}>
                            Düzenle
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={()=>handleSil(konu.id)}>
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

export default Konular