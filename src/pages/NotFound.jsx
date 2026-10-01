
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="page-container not-found">
      <span className="not-found-code">404</span>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>

      <Link to="/" className="button button-primary">
        Return Home
      </Link>
    </main>
  );
}
