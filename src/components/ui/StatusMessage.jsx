import "./StatusMessage.css";

/**
 * Form sonrası geri bildirim kutusu — Gözde / Hafta 2
 *
 * tone: "success" | "error" | "info"
 *
 * role="status" ekran okuyucuya "bu metin sonradan belirdi, kullanıcıya
 * duyur" der. Başvuru gönderildiğinde ekranın altında beliren mesajı
 * kullanıcının fark etmesi buna bağlı.
 */
export default function StatusMessage({ tone = "info", title, children }) {
  return (
    <div className={`status-message status-message--${tone}`} role="status">
      {title && <strong className="status-message__title">{title}</strong>}
      {children && <div className="status-message__body">{children}</div>}
    </div>
  );
}
