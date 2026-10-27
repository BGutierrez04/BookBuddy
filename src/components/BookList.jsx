import BookCard from "./BookCard";

export default function BookList({ books }) {
  return (
    <section className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </section>
  );
}
