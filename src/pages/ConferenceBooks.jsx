import SectionHeading from "../components/ui/SectionHeading";
import useApiData from "../hooks/useApiData";
import booksService from "../services/booksService";
import { mockBooks } from "../data/mockData";
import "./ConferenceBooks.css";

export default function ConferenceBooks() {
  const { data, loading, error, usingFallback } = useApiData(
    booksService.getAll,
    mockBooks
  );

  const books = Array.isArray(data) ? data : [];

  return (
    <section className="page-section">
      <div className="container">
        <SectionHeading
          eyebrow="Yayınlar"
          title="Konferans Kitapları"
          description="Konferanslara ait bildiri kitaplarına buradan ulaşabilirsiniz."
        />

        {usingFallback && !loading  && (
          <p className="books__notice">
            Kitaplar şu anda örnek verilerle gösteriliyor.
            Backend bağlantısı sağlandığında gerçek veriler görüntülenecektir.
          </p>
        )}

        {loading && (
          <p className="books__state">
            Kitaplar yükleniyor...
          </p>
        )}

        {!loading && error && (
          <p className="books__state books__state--error">
            Kitaplar yüklenirken bir hata oluştu.
            Lütfen daha sonra tekrar deneyin.
          </p>
        )}

        {!loading && !error && books.length === 0 && (
          <p className="books__state">
            Henüz konferans kitabı bulunmuyor.
          </p>
        )}

        {!loading && books.length > 0 && (
          <div className="books-grid">
            {books.map((book) => (
              <article className="book-card" key={book.id}>
                <div className="book-card__year">
                  {book.year}
                </div>

                <div className="book-card__content">
                  <h3>{book.title}</h3>

                  <p>{book.description}</p>

                  <a
                    href={book.fileUrl}
                    className="btn btn-outline"
                  >
                    Kitabı Görüntüle
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}