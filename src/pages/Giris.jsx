import React,{useState} from 'react'

function Giris() {

  const [eposta,setEposta]=useState("");
  const [sifre,setSifre]=useState("");
  const [hata,setHata]=useState("");
  const handleGiris = () => {
  setHata("");

  if (!eposta.trim() || !sifre.trim()) {
    setHata("Lütfen tüm alanları doldurunuz.");
    return;
  }

  if (!eposta.trim().includes("@")) {
    setHata("Geçerli bir e-posta adresi giriniz.");
    return;
  }

  if (sifre.trim().length < 6) {
    setHata("Şifre en az 6 karakter olmalıdır.");
    return;
  }
};


  return (
    <div className="container mt-5">

      
      <div className="row justify-content-center">
        
        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          
          <h2 className="text-center text-dark mb-4">
            Giriş Yap
          </h2>

          <form>
            {hata && (
  <div className="alert alert-danger">
    {hata}
  </div>
)}
            <div className="form-group">
              <label htmlFor="email">
                E-posta Adresi
              </label>

              <input
                type="email"
                className="form-control"
                id="email"
                value={eposta}
                onChange={(e)=>setEposta(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Şifre
              </label>

              <input
                type="password"
                className="form-control"
                id="password"
                value={sifre}
                onChange={(e)=>setSifre(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={handleGiris}
            >
              Giriş Yap
            </button>
          </form>

        </div>

      </div>

    </div>
  )
}

export default Giris