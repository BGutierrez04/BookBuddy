import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import BooksPage from "./pages/BooksPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<BooksPage />} />

        <Route path="/books" element={<BooksPage />} />

        <Route path="/books/:id" element={<BookDetailsPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/account" element={<AccountPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
