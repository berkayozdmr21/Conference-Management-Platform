import "./SessionTag.css";

export default function SessionTag({ code, label, tone = "brass" }) {
  return (
    <span className={`session-tag session-tag--${tone}`}>
      <span className="session-tag__code">{code}</span>
      {label && <span className="session-tag__label">{label}</span>}
    </span>
  );
}
