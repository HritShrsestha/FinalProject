
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({
  id,
  name,
  price,
  image,
  rating,
}) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={`/product/${id}`} className="product-image-link">
        <div className="product-image-wrapper">
          <img
            src={image}
            alt={name}
            className="product-image"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="product-info">
        <Link to={`/product/${id}`} className="product-name">
          {name}
        </Link>

        <div className="rating">
          <Star size={16} fill="currentColor" />
          <span>{rating?.rate ?? "N/A"}</span>
          {rating?.count != null && (
            <span className="rating-count">
              ({rating.count})
            </span>
          )}
        </div>

        <div className="product-bottom">
          <span className="product-price">
            ${Number(price).toFixed(2)}
          </span>

          <button
            className="button button-primary add-cart-button"
            onClick={() =>
              addToCart({ id, name, price, image, rating })
            }
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  rating: PropTypes.shape({
    rate: PropTypes.number,
    count: PropTypes.number,
  }),
};
