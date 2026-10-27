import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="app">
      <Navbar />

      <main className="page-container">
        <Outlet />
      </main>

      <footer className="footer">
        <p>Book Buddy • Find your next favorite story.</p>
      </footer>
    </div>
  );
}
