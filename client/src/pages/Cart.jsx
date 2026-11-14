import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <section>
        <h1>Your Cart</h1>
        <p className="message">Your cart is empty.</p>
        <Link to="/" className="btn">
          Go Shopping
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Your Cart</h1>

      <div className="cart-list">
        {cartItems.map((item) => (
          <div className="cart-item" key={item._id}>
            <img src={item.image} alt={item.name} />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>Rs. {item.price}</p>
            </div>

            <select
              value={item.qty}
              onChange={(e) => updateQty(item._id, Number(e.target.value))}
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>

            <button
              className="btn-danger"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <h2>Total: Rs. {cartTotal}</h2>
        <button className="btn" onClick={() => navigate("/checkout")}>
          Proceed to Checkout
        </button>
      </div>
    </section>
  );
}

export default Cart;
