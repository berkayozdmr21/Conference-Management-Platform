import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">

      <Link className="navbar-brand" to="/dashboard">
        SEMPOZYUM YÖNETİM PANELİ
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Menüyü aç"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">

        <ul className="navbar-nav ml-auto">

          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Ana Sayfa
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/konferanslar">
              Konferanslar
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/konular">
              Konular
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/onemli-tarihler">
              Önemli Tarihler
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/konusmacilar">
              Konuşmacılar
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/basvurular">
              Başvurular
            </Link>
          </li>

        </ul>

      </div>

    </nav>
  )
}

export default Navbar