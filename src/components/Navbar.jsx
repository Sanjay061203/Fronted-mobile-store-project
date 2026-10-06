import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const favorites = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav>
      {user ? (
        <>
          <Link to="/">Home</Link>
          <Link to="/mobiles">Mobiles</Link>
          <Link to="/favorites">Favorites ({favorites.length})</Link>
          <Link to="/cart">Cart ({totalCartCount})</Link>
          <Link to="/orders">My Orders</Link>
          <button className="theme-toggle-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
          <span style={{ color: "#38bdf8", marginLeft: "auto", fontWeight: "bold" }}>
            Hi, {user.name}
          </span>
          <Link to="/logout">Logout</Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <button className="theme-toggle-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;