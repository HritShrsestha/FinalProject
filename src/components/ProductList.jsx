
import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <h3>No products found</h3>
        <p>Try another search term or add a new product.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.title}
          price={Number(product.price)}
          image={product.image}
          rating={product.rating}
        />
      ))}
    </div>
  );
}
