
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <ShoppingBag size={25} />
        <span>KazamaStore</span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/" end>
          Products
        </NavLink>

        <NavLink to="/cart" className="cart-link">
          <ShoppingCart size={19} />
          Cart
          <span className="cart-badge">{cartCount}</span>
        </NavLink>
      </nav>
    </header>
  );
}
