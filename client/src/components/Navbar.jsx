import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getUserInfo, logoutUser } from "../utils/auth";

function Navbar() {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const user = getUserInfo();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        FlowerGun
      </Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        {user ? (
          <>
            <Link to="/orders">My Orders</Link>
            <span className="nav-user">Hi, {user.name}</span>
            <button className="btn-link" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
