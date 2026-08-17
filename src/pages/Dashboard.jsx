import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

function Dashboard() {

  const konferanslar = [
    {
      id: 1,
      baslik: "Uluslararası Yapay Zeka Konferansı",
      tarih: "10.10.2026",
      konum: "İstanbul"
    },
    {
      id: 2,
      baslik: "Web Teknolojileri Zirvesi",
      tarih: "20.10.2026",
      konum: "Ankara"
    },
    {
      id: 3,
      baslik: "Siber Güvenlik Sempozyumu",
      tarih: "05.11.2026",
      konum: "İzmir"
    }
  ];

  const onemliTarihler = [
    {
      id: 1,
      baslik: "Bildiri Gönderim Son Tarihi",
      tarih: "15.09.2026"
    },
    {
      id: 2,
      baslik: "Konferans Kayıt Son Tarihi",
      tarih: "30.09.2026"
    },
    {
      id: 3,
      baslik: "Konferans Başlangıç Tarihi",
      tarih: "10.10.2026"
    }
  ];

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

              <h2 className="mb-4">
                Yönetim Paneli
              </h2>


              <div className="row">

                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                  <div className="card text-center text-danger">
                    <div className="card-body">
                      <h5 className="card-title">
                        Konferanslar
                      </h5>

                      <h3>
                        3
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                  <div className="card text-center text-primary">
                    <div className="card-body">
                      <h5 className="card-title">
                        Konular
                      </h5>

                      <h3>
                        3
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                  <div className="card text-center text-success">
                    <div className="card-body">
                      <h5 className="card-title">
                        Önemli Tarihler
                      </h5>

                      <h3>
                        3
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-lg-3 mb-4">
                  <div className="card text-center">
                    <div className="card-body">
                      <h5 className="card-title">
                        Konuşmacılar
                      </h5>

                      <h3>
                        5
                      </h3>
                    </div>
                  </div>
                </div>

              </div>

          

              <div className="row">

                <div className="col-12 col-lg-7 mb-4">

                  <div className="card">

                    <div className="card-header">
                      <h5 className="mb-0">
                        Son Eklenen Konferanslar
                      </h5>
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

                            {konferanslar.map((konferans) => (

                              <tr key={konferans.id}>

                                <td>
                                  {konferans.baslik}
                                </td>

                                <td>
                                  {konferans.tarih}
                                </td>

                                <td>
                                  {konferans.konum}
                                </td>

                              </tr>

                            ))}

                          </tbody>

                        </table>

                      </div>

                    </div>

                  </div>

                </div>

                

                <div className="col-12 col-lg-5 mb-4">

                  <div className="card">

                    <div className="card-header">
                      <h5 className="mb-0">
                        Yaklaşan Önemli Tarihler
                      </h5>
                    </div>

                    <div className="card-body">

                      {onemliTarihler.map((tarih) => (

                        <div
                          key={tarih.id}
                          className="border-bottom pb-3 mb-3"
                        >

                          <h6>
                            {tarih.baslik}
                          </h6>

                          <small className="text-muted">
                            {tarih.tarih}
                          </small>

                        </div>

                      ))}

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