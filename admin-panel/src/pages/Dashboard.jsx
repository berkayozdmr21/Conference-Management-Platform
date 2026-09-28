import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { API_BASE_URL } from '../api/config'

function Dashboard() {
  const [konferanslar, setKonferanslar] = useState([]);
  const [konular, setKonular] = useState([]);
  const [tarihler, setTarihler] = useState([]);
  const [konusmacilar, setKonusmacilar] = useState([]);
  const [basvurular, setBasvurular] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/conferences`)
      .then(res => res.json())
      .then(data => setKonferanslar(data))
      .catch(err => console.error("Konferanslar çekilemedi:", err));

    fetch(`${API_BASE_URL}/topics`)
      .then(res => res.json())
      .then(data => setKonular(data))
      .catch(err => console.error("Konular çekilemedi:", err));

    fetch(`${API_BASE_URL}/important-dates`)
      .then(res => res.json())
      .then(data => setTarihler(data))
      .catch(err => console.error("Tarihler çekilemedi:", err));

    fetch(`${API_BASE_URL}/speakers`)
      .then(res => res.json())
      .then(data => setKonusmacilar(data))
      .catch(err => console.error("Konuşmacılar çekilemedi:", err));

    fetch(`${API_BASE_URL}/submissions`)
      .then(res => res.json())
      .then(data => setBasvurular(data))
      .catch(err => console.error("Başvurular çekilemedi:", err));
  }, []);

  const bekleyen = basvurular.filter(b => !b.status || b.status === "Pending").length;
  const onaylanan = basvurular.filter(b => b.status === "Approved").length;
  const reddedilen = basvurular.filter(b => b.status === "Rejected").length;

  const toInputDate = (iso) => (iso ? iso.substring(0, 10) : "");

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
              <h2 className="mb-4">Yönetim Paneli</h2>

              {/* Ana istatistik kartları */}
              <div className="row">
                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                  <div className="card text-center text-danger">
                    <div className="card-body">
                      <h5 className="card-title">Konferanslar</h5>
                      <h3>{konferanslar.length}</h3>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                  <div className="card text-center text-primary">
                    <div className="card-body">
                      <h5 className="card-title">Konular</h5>
                      <h3>{konular.length}</h3>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                  <div className="card text-center text-success">
                    <div className="card-body">
                      <h5 className="card-title">Önemli Tarihler</h5>
                      <h3>{tarihler.length}</h3>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                  <div className="card text-center">
                    <div className="card-body">
                      <h5 className="card-title">Konuşmacılar</h5>
                      <h3>{konusmacilar.length}</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Başvuru istatistikleri */}
              <h5 className="mb-3 mt-2">Başvuru İstatistikleri</h5>
              <div className="row">
                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                  <div className="card text-center">
                    <div className="card-body">
                      <h5 className="card-title">Toplam Başvuru</h5>
                      <h3>{basvurular.length}</h3>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                  <div className="card text-center text-warning">
                    <div className="card-body">
                      <h5 className="card-title">Bekleyen</h5>
                      <h3>{bekleyen}</h3>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                  <div className="card text-center text-success">
                    <div className="card-body">
                      <h5 className="card-title">Onaylanan</h5>
                      <h3>{onaylanan}</h3>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                  <div className="card text-center text-danger">
                    <div className="card-body">
                      <h5 className="card-title">Reddedilen</h5>
                      <h3>{reddedilen}</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tablolar ve Listeler */}
              <div className="row">
                <div className="col-12 col-lg-7 mb-4">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Son Eklenen Konferanslar</h5>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead>
                            <tr>
                              <th>Konferans</th>
                              <th>Tarih</th>
                              <th>Konum</th>
                            </tr>
                          </thead>
                          <tbody>
                            {konferanslar.length > 0 ? (
                              konferanslar.map((konferans) => (
                                <tr key={konferans.id}>
                                  <td>{konferans.title}</td>
                                  <td>{toInputDate(konferans.startDate)}</td>
                                  <td>{konferans.location}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="3" className="text-center text-muted">Kayıt bulunamadı.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-5 mb-4">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Yaklaşan Önemli Tarihler</h5>
                    </div>
                    <div className="card-body">
                      {tarihler.length > 0 ? (
                        tarihler.map((t) => (
                          <div key={t.id} className="border-bottom pb-3 mb-3">
                            <h6>{t.title}</h6>
                            <small className="text-muted">{toInputDate(t.date)}</small>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-muted">Kayıt bulunamadı.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Dashboard