import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Query json-server for matching user credentials
      const response = await api.get(
        `/users?email=${email.trim()}&password=${password.trim()}`
      );

      if (response.data.length > 0) {
        // Store user details in localStorage
        localStorage.setItem("user", JSON.stringify(response.data[0]));
        alert("Login successful!");
        navigate("/");
        window.location.reload(); // Refresh to update Navbar state
      } else {
        alert("Invalid Email or Password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Error logging in. Check if backend server is running.");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;