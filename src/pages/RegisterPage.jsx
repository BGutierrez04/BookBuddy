import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
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

      const result = await registerUser(form);

      login(result.token);

      navigate("/account");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className="form-page">
      <div className="form-card">
        <p className="eyebrow">JOIN BOOK BUDDY</p>

        <h1>Create Account</h1>

        <p className="form-subtitle">
          Create an account and start reserving books.
        </p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="firstname">First Name</label>

              <input
                id="firstname"
                name="firstname"
                type="text"
                value={form.firstname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="lastname">Last Name</label>

              <input
                id="lastname"
                name="lastname"
                type="text"
                value={form.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

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
            Create Account
          </button>
        </form>

        <p className="form-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </section>
  );
}
