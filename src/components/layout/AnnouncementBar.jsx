import { useState } from "react";
import { Link } from "react-router-dom";
import "./AnnouncementBar.css";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(() => {
    // Kullanıcı kapattıysa bu oturumda tekrar gösterme
    return sessionStorage.getItem("kys_announcement_dismissed") !== "true";
  });

  if (!visible) return null;

  const dismiss = () => {
    sessionStorage.setItem("kys_announcement_dismissed", "true");
    setVisible(false);
  };

  return (
    <div className="announcement-bar">
      <div className="container announcement-bar__inner">
        <p>
          <strong>Son Başvuru Tarihi:</strong> Bildirinizi göndermek için son
          gün yaklaşıyor. <Link to="/bildiri-gonder">Şimdi başvur →</Link>
        </p>
        <button
          type="button"
          className="announcement-bar__close"
          onClick={dismiss}
          aria-label="Duyuruyu kapat"
        >
          ×
        </button>
      </div>
    </div>
  );
}