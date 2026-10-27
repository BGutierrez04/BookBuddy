import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBook, reserveBook } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function BookDetailsPage() {
  const { id } = useParams();

  const { token, loadUser } = useAuth();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadBook() {
    try {
      const data = await getBook(id);
      setBook(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBook();
  }, [id]);

  async function handleReserve() {
    try {
      setError("");
      setMessage("");

      await reserveBook(book.id, token);

      setMessage("Book reserved successfully!");

      await loadBook();
      await loadUser(token);
    } catch (error) {
      setError(error.message);
    }
  }

  if (loading) {
    return <p className="status-message">Loading book...</p>;
  }

  if (error && !book) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <section className="details-page">
      <Link to="/books" className="back-link">
        ← Back to library
      </Link>

      <div className="book-details">
        <div className="details-image-wrapper">
          <img
            src={book.coverimage}
            alt={`Cover of ${book.title}`}
            className="details-image"
          />
        </div>

        <div className="details-content">
          <span
            className={
              book.available
                ? "availability available"
                : "availability unavailable"
            }
          >
            {book.available ? "Available" : "Currently Reserved"}
          </span>

          <h1>{book.title}</h1>

          <p className="details-author">by {book.author}</p>

          <p className="book-description">{book.description}</p>

          {message && <p className="success-message">{message}</p>}

          {error && <p className="error-message">{error}</p>}

          {!token ? (
            <div className="login-callout">
              <p>You need an account to reserve books.</p>

              <Link to="/login" className="primary-button">
                Login to Reserve
              </Link>
            </div>
          ) : (
            <button
              className="primary-button"
              disabled={!book.available}
              onClick={handleReserve}
            >
              {book.available ? "Reserve This Book" : "Book Unavailable"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
