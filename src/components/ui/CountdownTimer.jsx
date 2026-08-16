import { useEffect, useState } from "react";
import "./CountdownTimer.css";

function getTimeLeft(targetDate) {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

export default function CountdownTimer({ targetDate, label = "Son Başvuruya Kalan Süre" }) {
  const [time, setTime] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (time.expired) {
    return (
      <div className="countdown countdown--expired">
        <span className="eyebrow">Başvuru Süresi</span>
        <strong>Son başvuru tarihi geçti</strong>
      </div>
    );
  }

  const units = [
    { value: time.days, label: "Gün" },
    { value: time.hours, label: "Saat" },
    { value: time.minutes, label: "Dk" },
    { value: time.seconds, label: "Sn" },
  ];

  return (
    <div className="countdown">
      <span className="eyebrow">{label}</span>
      <div className="countdown__units">
        {units.map((u) => (
          <div className="countdown__unit" key={u.label}>
            <span className="countdown__value">{String(u.value).padStart(2, "0")}</span>
            <span className="countdown__label">{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}