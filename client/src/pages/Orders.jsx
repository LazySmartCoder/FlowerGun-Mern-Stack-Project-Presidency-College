import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserInfo } from "../utils/auth";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = getUserInfo();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/api/orders/myorders", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setOrders(data);
      } catch (err) {
        setError("Could not load orders.");
      }
    };

    fetchOrders();
  }, []);

  if (error) {
    return <p className="message error">{error}</p>;
  }

  return (
    <section>
      <h1>My Orders</h1>

      {orders.length === 0 && (
        <p className="message">You have not placed any orders yet.</p>
      )}

      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          <div className="order-head">
            <strong>Order ID: {order._id}</strong>
            <span>Rs. {order.totalPrice}</span>
          </div>
          <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>

          {order.orderItems.map((item) => (
            <div className="order-item" key={item._id}>
              <img src={item.image} alt={item.name} />
              <span>
                {item.name} x {item.qty}
              </span>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

export default Orders;
