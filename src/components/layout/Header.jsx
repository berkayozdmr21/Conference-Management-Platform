import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

// Ziyaretçi tarafı navigasyon - proje dokümanındaki bölümlere göre.
// Bazı sayfalar (Program, Sosyal Program, Kayıt, Kitaplar, İletişim)
// sonraki haftalarda eklenecek; şimdilik Week 1 kapsamındaki rotalara bağlı.
const NAV_ITEMS = [
  { to: "/", label: "Ana Sayfa", end: true },
  { to: "/hakkinda", label: "Hakkında" },
  { to: "/konular", label: "Konular" },
  { to: "/onemli-tarihler", label: "Önemli Tarihler" },
  { to: "/konusmacilar", label: "Konuşmacılar" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth > 860) setMenuOpen(false);
    };
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <NavLink to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand__mark">KYS</span>
          <span className="brand__name">
            Konferans Yönetim Sistemi
            <span className="brand__sub">ICOMATH-Style Academic Conference</span>
          </span>
        </NavLink>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label="Menüyü aç/kapat"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="menu-toggle__bar" />
          <span className="menu-toggle__bar" />
          <span className="menu-toggle__bar" />
        </button>

        <nav
          id="primary-navigation"
          className={`primary-nav ${menuOpen ? "primary-nav--open" : ""}`}
        >
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) => (isActive ? "is-active" : "")}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink to="/bildiri-gonder" className="btn btn-primary primary-nav__cta">
            Bildiri Gönder
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
