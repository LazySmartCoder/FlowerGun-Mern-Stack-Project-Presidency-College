import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { saveUserInfo } from "../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      saveUserInfo(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="form-section">
      <h1>Login</h1>

      {error && <p className="message error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn">
          Login
        </button>
      </form>

      <p>
        New here? <Link to="/register">Create an account</Link>
      </p>
    </section>
  );
}

export default Login;
