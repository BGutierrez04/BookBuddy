import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <article className="book-card">
      <div className="book-image-wrapper">
        <img
          src={book.coverimage}
          alt={`Cover of ${book.title}`}
          className="book-image"
        />

        <span
          className={
            book.available
              ? "availability available"
              : "availability unavailable"
          }
        >
          {book.available ? "Available" : "Reserved"}
        </span>
      </div>

      <div className="book-card-content">
        <h2>{book.title}</h2>

        <p className="book-author">by {book.author}</p>

        <Link to={`/books/${book.id}`} className="primary-button">
          View Book
        </Link>
      </div>
    </article>
  );
}
