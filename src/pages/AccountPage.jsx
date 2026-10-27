import { Link } from "react-router-dom";
import { returnBook } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function AccountPage() {
  const { token, user, loadingUser, loadUser } = useAuth();

  async function handleReturn(reservationId) {
    try {
      await returnBook(reservationId, token);

      await loadUser(token);
    } catch (error) {
      console.error(error);
    }
  }

  if (!token) {
    return (
      <section className="account-page">
        <div className="empty-state">
          <div className="empty-icon">📖</div>

          <h1>Your Book Buddy Account</h1>

          <p>
            Login or register to view your profile and manage your reservations.
          </p>

          <div className="button-row">
            <Link to="/login" className="primary-button">
              Login
            </Link>

            <Link to="/register" className="secondary-button">
              Register
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (loadingUser || !user) {
    return <p className="status-message">Loading account...</p>;
  }

  return (
    <section className="account-page">
      <div className="profile-card">
        <div className="profile-avatar">
          {user.firstname?.charAt(0)}
          {user.lastname?.charAt(0)}
        </div>

        <div>
          <p className="eyebrow">YOUR ACCOUNT</p>

          <h1>
            {user.firstname} {user.lastname}
          </h1>

          <p>{user.email}</p>
        </div>
      </div>

      <div className="reservations-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR SHELF</p>
            <h2>Reserved Books</h2>
          </div>
        </div>

        {!user.reservations || user.reservations.length === 0 ? (
          <div className="empty-state small-empty">
            <h3>No books reserved yet.</h3>

            <p>Apparently your virtual nightstand has room.</p>

            <Link to="/books" className="primary-button">
              Find a Book
            </Link>
          </div>
        ) : (
          <div className="reservation-grid">
            {user.reservations.map((book) => (
              <article key={book.id} className="reservation-card">
                <img src={book.coverimage} alt={`Cover of ${book.title}`} />

                <div className="reservation-info">
                  <h3>{book.title}</h3>

                  <p>{book.author}</p>

                  <button
                    className="return-button"
                    onClick={() => handleReturn(book.id)}
                  >
                    Return Book
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
