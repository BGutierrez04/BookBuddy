import { useEffect, useState } from "react";
import { getBooks } from "../api/api";
import BookList from "../components/BookList";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const searchText = search.toLowerCase();

    return (
      book.title.toLowerCase().includes(searchText) ||
      book.author.toLowerCase().includes(searchText)
    );
  });

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">YOUR DIGITAL LIBRARY</p>

          <h1>
            Find your next
            <span> great read.</span>
          </h1>

          <p className="hero-text">
            Browse the library, discover something new, and reserve your next
            book with Book Buddy.
          </p>

          <a href="#catalog" className="primary-button hero-button">
            Browse the Collection
          </a>
        </div>

        <div className="hero-image-container">
          <img src="/books.png" alt="Stack of books" className="hero-image" />
        </div>
      </section>

      <section id="catalog" className="catalog-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2>Library Catalog</h2>
          </div>

          <input
            type="search"
            placeholder="Search title or author..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="search-input"
          />
        </div>

        {loading && <p className="status-message">Loading books...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <>
            <p className="book-count">Showing {filteredBooks.length} books</p>

            <BookList books={filteredBooks} />
          </>
        )}
      </section>
    </>
  );
}
