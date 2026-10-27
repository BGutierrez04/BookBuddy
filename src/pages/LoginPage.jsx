import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");

      const result = await loginUser(form);

      login(result.token);

      navigate("/account");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className="form-page">
      <div className="form-card">
        <p className="eyebrow">WELCOME BACK</p>

        <h1>Login</h1>

        <p className="form-subtitle">
          Login to manage your library reservations.
        </p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="primary-button full-button">
            Login
          </button>
        </form>

        <p className="form-footer">
          Need an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </section>
  );
}
