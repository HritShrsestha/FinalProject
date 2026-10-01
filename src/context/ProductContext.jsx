
import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://fakestoreapi.com/products",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to fetch products.");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            "Could not load products. Check your internet connection and try again."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, []);

  function addProduct(product) {
    setProducts((previous) => [
      { ...product, id: `local-${Date.now()}` },
      ...previous,
    ]);
  }

  return (
    <ProductContext.Provider
      value={{ products, loading, error, addProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used inside ProductProvider");
  }

  return context;
}
