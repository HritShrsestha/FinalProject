
import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  return (
    <main className="page-container cart-page">
      <div className="section-heading">
        <div>
          <h1>Your Shopping Cart</h1>
          <p>Review your items before checking out.</p>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Discover products and add something you love.</p>
          <Link to="/" className="button button-primary">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name || item.title} />

                <div className="cart-item-info">
                  <h3>{item.name || item.title}</h3>
                  <p>${Number(item.price).toFixed(2)} each</p>

                  <div className="quantity-control">
                    <button
                      className="icon-button"
                      aria-label={`Decrease ${item.name || item.title} quantity`}
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <Minus size={15} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      className="icon-button"
                      aria-label={`Increase ${item.name || item.title} quantity`}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

                <div className="cart-item-actions">
                  <strong>
                    ${(item.price * item.quantity).toFixed(2)}
                  </strong>

                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name || item.title} from cart`}
                  >
                    <Trash2 size={17} />
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="summary-row total-row">
              <strong>Total</strong>
              <strong>${cartTotal.toFixed(2)}</strong>
            </div>

            <button
              className="button button-primary checkout-button"
              onClick={() =>
                window.alert("Demo only: checkout is not implemented.")
              }
            >
              Proceed to Checkout
            </button>

            <button
              className="button button-outline checkout-button"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </aside>
        </div>
      )}

      <Link to="/" className="back-link">
        <ArrowLeft size={18} />
        Continue shopping
      </Link>
    </main>
  );
}
