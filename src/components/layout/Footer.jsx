import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
    
      <div className="footer-cta">
        <div className="container footer-cta__inner">
          <div>
            <span className="eyebrow">Son Başvuru Tarihi Yaklaşıyor</span>
            <h3>Bildirinizi göndermeye hazır mısınız?</h3>
          </div>
          <Link to="/bildiri-gonder" className="btn btn-primary">Bildiri Gönder</Link>
        </div>
      </div>

      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <span className="brand__mark">KYS</span>
          <p>
            Akademik Konferans Yönetim Sistemi — bildiri gönderimi, katılımcı
            yönetimi ve içerik yönetiminin tek bir platformda toplandığı web
            uygulaması.
          </p>
          <div className="site-footer__social">
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="X / Twitter">X</a>
            <a href="#" aria-label="YouTube">▶</a>
          </div>
        </div>

        <div className="site-footer__col">
          <h4>Konferans</h4>
          <ul>
            <li><Link to="/hakkinda">Hakkında</Link></li>
            <li><Link to="/konular">Konferans Konuları</Link></li>
            <li><Link to="/onemli-tarihler">Önemli Tarihler</Link></li>
            <li><Link to="/konusmacilar">Davetli Konuşmacılar</Link></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>Katılım</h4>
          <ul>
            <li><Link to="/bildiri-gonder">Bildiri Gönder</Link></li>
            <li><Link to="/kayit">Kayıt &amp; Ücretler</Link></li>
            <li><Link to="/katilimcilar">Katılımcılar</Link></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>İletişim</h4>
          <ul>
            <li><a href="mailto:info@icomath-style.org">info@icomath-style.org</a></li>
            <li><Link to="/iletisim">İletişim Formu</Link></li>
            <li>İstanbul, Türkiye</li>
          </ul>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <span>© {year} Konferans Yönetim Sistemi. Tüm hakları saklıdır.</span>
        <span className="site-footer__team">Ekip: Cemre · Nilay · Büşra · Gözde</span>
      </div>
    </footer>
  );
}