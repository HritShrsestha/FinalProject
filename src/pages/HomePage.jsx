
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useProducts } from "../context/ProductContext";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import Loading from "../components/Loading";

export default function HomePage() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) =>
      product.title.toLowerCase().includes(search.trim().toLowerCase())
    );

    if (sort === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, sort]);

  return (
    <main className="page-container">
      <section className="hero">
        <span className="eyebrow">YOUR EVERYDAY MARKETPLACE</span>
        <h1>Find things you'll love.</h1>
        <p>
          Explore our collection of products and find something
          perfect for you.
        </p>
      </section>

      <section className="catalog-section">
        <div className="section-heading">
          <div>
            <h2>Our Products</h2>
            <p>
              {loading
                ? "Loading the collection..."
                : `${filteredProducts.length} products available`}
            </p>
          </div>
        </div>

        <div className="toolbar">
          <div className="search-box">
            <Search size={19} />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products by name"
            />
          </div>

          <div className="sort-box">
            <SlidersHorizontal size={18} />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort products by price"
            >
              <option value="default">Default order</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <div className="error-message" role="alert">
            <h3>Something went wrong</h3>
            <p>{error}</p>
          </div>
        ) : (
          <ProductList products={filteredProducts} />
        )}
      </section>

      <ProductForm />
    </main>
  );
}
