import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="not-found">
      <h1>404</h1>

      <h2>This chapter doesn't exist.</h2>

      <p>The page you're looking for couldn't be found.</p>

      <Link to="/books" className="primary-button">
        Return to Library
      </Link>
    </section>
  );
}
