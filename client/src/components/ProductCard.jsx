import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <span className="category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="price">Rs. {product.price}</p>
        <Link to={`/product/${product._id}`} className="btn">
          View Product
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
