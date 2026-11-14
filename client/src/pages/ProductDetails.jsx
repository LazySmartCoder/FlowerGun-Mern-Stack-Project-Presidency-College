import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError("Product not found.");
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, Number(qty));
    navigate("/cart");
  };

  if (error) {
    return <p className="message error">{error}</p>;
  }

  if (!product) {
    return <p className="message">Loading product...</p>;
  }

  return (
    <section className="details">
      <img src={product.image} alt={product.name} className="details-image" />

      <div className="details-info">
        <span className="category">{product.category}</span>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="price">Rs. {product.price}</p>
        <p>In stock: {product.stock}</p>

        <div className="qty-box">
          <label>Qty</label>
          <select value={qty} onChange={(e) => setQty(e.target.value)}>
            {[...Array(product.stock).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>

        <button className="btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </section>
  );
}

export default ProductDetails;
