import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <span className="logo-icon">📚</span>
        Book Buddy
      </Link>

      <nav className="nav-links">
        <NavLink to="/books">Books</NavLink>

        <NavLink to="/account">Account</NavLink>

        {!token ? (
          <>
            <NavLink to="/login">Login</NavLink>

            <Link to="/register" className="nav-button">
              Register
            </Link>
          </>
        ) : (
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
