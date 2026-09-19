import "./ComingSoon.css";

// Bildiri gönderimi, kayıt, katılımcılar, iletişim gibi bölümler
// proje planına göre 2. ve 3. haftada geliştirilecek. Bu sayfa
// Week 1'de sadece nav linklerinin kırılmamasını sağlar.
export default function ComingSoon({ title }) {
  return (
    <section className="page-section coming-soon">
      <div className="container">
        <span className="eyebrow">Yapım Aşamasında</span>
        <h1>{title}</h1>
        <p>Bu bölüm proje takvimine göre önümüzdeki haftalarda geliştirilecektir.</p>
      </div>
    </section>
  );
}
