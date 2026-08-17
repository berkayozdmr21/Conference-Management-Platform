import React,{ useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

function Konular() {
  const [yeniKonu,setYeniKonu]=useState(false);
  const [konuAdi,setKonuAdi]=useState("");
  const [aciklama,setAciklama]=useState("");
  const [hata,setHata]=useState("");
  const [mesaj,setMesaj]=useState("");
  const [duzenleKonu,setDuzenleKonu]=useState(null);
  const [duzenleKonuAdi,setDuzenleKonuAdi]=useState("");
  const [duzenleAciklama,setDuzenleAciklama]=useState("");

 const [konular, setKonular] = useState([
  {
    id: 1,
    konuAdi: "Yapay Zeka",
    aciklama: "Yapay zeka ve yeni teknolojiler"
  },
  {
    id: 2,
    konuAdi: "Web Teknolojileri",
    aciklama: "Modern web teknolojileri"
  },
  {
    id: 3,
    konuAdi: "Siber Güvenlik",
    aciklama: "Siber güvenlik ve veri güvenliği"
  }
]);

const handleKaydet = () => {
  setHata("");
  setMesaj("");

  if (!konuAdi.trim() || !aciklama.trim()) {
    setHata("Lütfen tüm alanları doldurunuz.");
    return;
  }

  const yeni = {
    id: konular.length + 1,
    konuAdi: konuAdi.trim(),
    aciklama: aciklama.trim()
  };

  setKonular([...konular, yeni]);

  setKonuAdi("");
  setAciklama("");
  setYeniKonu(false);
};

const handleSil =(id) =>{
  setKonular(
    konular.filter((konu)=>konu.id !==id)
  );
}

const handleDuzenle = (konu) =>{
  setDuzenleKonu(konu);
  setDuzenleKonuAdi(konu.konuAdi);
  setDuzenleAciklama(konu.aciklama);
  setHata("");
}
const handleGuncelle = () =>{
  setHata("");

  if(!duzenleKonuAdi.trim() || !duzenleAciklama.trim()){
    setHata("Lütfen tüm alanları doldurunuz.");
    return;
  }
  setKonular(
    konular.map((item) =>
      item.id === duzenleKonu.id ? {
        ...item,
        konuAdi:duzenleKonuAdi.trim(),
        aciklama:duzenleAciklama.trim()
      }
      :item
    )
  );
  setDuzenleKonu(null);
  setDuzenleKonuAdi("");
  setDuzenleAciklama("");
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
            )

            }
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