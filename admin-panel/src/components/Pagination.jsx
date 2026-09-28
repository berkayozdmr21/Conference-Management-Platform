import React from 'react';

function Pagination({ sayfa, toplamSayfa, setSayfa }) {
  if (toplamSayfa <= 1) return null;

  return (
    <nav>
      <ul className="pagination justify-content-center mt-3">
        <li className={`page-item ${sayfa === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => setSayfa(sayfa - 1)}>Önceki</button>
        </li>
        {Array.from({ length: toplamSayfa }, (_, i) => i + 1).map((p) => (
          <li key={p} className={`page-item ${p === sayfa ? 'active' : ''}`}>
            <button className="page-link" onClick={() => setSayfa(p)}>{p}</button>
          </li>
        ))}
        <li className={`page-item ${sayfa === toplamSayfa ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => setSayfa(sayfa + 1)}>Sonraki</button>
        </li>
      </ul>
    </nav>-
  );
}

export default Pagination;