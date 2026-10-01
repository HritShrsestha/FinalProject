
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import Loading from "../components/Loading";

export default function ProductDetails() {
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <main className="page-container">
        <div className="error-message" role="alert">
          {error}
        </div>
      </main>
    );
  }

  const product = products.find(
    (item) => String(item.id) === id
  );

  if (!product) {
    return (
      <main className="page-container">
        <div className="empty-state">
          <h2>Product not found</h2>
          <Link to="/" className="button button-primary">
            Back to products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <Link to="/" className="back-link">
        <ArrowLeft size={18} />
        Back to products
      </Link>

      <section className="details-layout">
        <div className="details-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="details-content">
          <span className="eyebrow">
            {product.category || "PRODUCT"}
          </span>

          <h1>{product.title}</h1>

          <div className="rating">
            <Star size={17} fill="currentColor" />
            <span>{product.rating?.rate ?? "N/A"}</span>
            <span className="rating-count">
              ({product.rating?.count ?? 0} reviews)
            </span>
          </div>

          <h2 className="details-price">
            ${Number(product.price).toFixed(2)}
          </h2>

          <p className="details-description">
            {product.description || "No description available."}
          </p>

          <button
            className="button button-primary"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </section>
    </main>
  );
}
