import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { getUserInfo } from "../utils/auth";

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const user = getUserInfo();

  const [fullName, setFullName] = useState(user ? user.name : "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");

  if (!user) {
    return (
      <section className="form-section">
        <h1>Checkout</h1>
        <p className="message">Please login before placing an order.</p>
        <button className="btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return <p className="message">Your cart is empty.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const orderItems = cartItems.map((item) => ({
      name: item.name,
      qty: item.qty,
      image: item.image,
      price: item.price,
      product: item._id,
    }));

    try {
      await axios.post(
        "/api/orders",
        {
          orderItems,
          shippingAddress: { fullName, address, city, pincode },
          totalPrice: cartTotal,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      clearCart();
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Could not place order");
    }
  };

  return (
    <section className="form-section">
      <h1>Checkout</h1>

      {error && <p className="message error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <label>City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <label>Pincode</label>
        <input
          type="text"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          required
        />

        <h3>Order Total: Rs. {cartTotal}</h3>

        <button type="submit" className="btn">
          Place Order
        </button>
      </form>
    </section>
  );
}

export default Checkout;
