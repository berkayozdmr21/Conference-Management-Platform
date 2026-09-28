import "./StatsStrip.css";

// İleride API'den (Dashboard endpoint'i) beslenecek; şimdilik prop olarak veriliyor.
export default function StatsStrip({ stats }) {
  return (
    <section className="stats-strip">
      <div className="container stats-strip__grid">
        {stats.map((s) => (
          <div className="stats-strip__item" key={s.label}>
            <span className="stats-strip__value">{s.value}</span>
            <span className="stats-strip__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}