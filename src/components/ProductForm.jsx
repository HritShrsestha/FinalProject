
import { useState } from "react";
import { useProducts } from "../context/ProductContext";

const initialForm = {
  name: "",
  price: "",
  image: "",
  category: "electronics",
};

export default function ProductForm() {
  const { addProduct } = useProducts();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSuccess("");
  }

  function validate() {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Product name is required.";
    }

    if (
      form.price.trim() === "" ||
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) <= 0
    ) {
      nextErrors.price = "Enter a price greater than zero.";
    }

    try {
      const url = new URL(form.image);

      if (!["http:", "https:"].includes(url.protocol)) {
        throw new Error("Invalid URL protocol");
      }
    } catch {
      nextErrors.image = "Enter a valid HTTP or HTTPS image URL.";
    }

    if (!form.category) {
      nextErrors.category = "Please select a category.";
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    setSuccess("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const product = {
      title: form.name.trim(),
      price: Number(form.price),
      image: form.image.trim(),
      category: form.category,
      rating: { rate: 0, count: 0 },
    };

    addProduct(product);
    setForm(initialForm);
    setErrors({});
    setSuccess("Product added successfully!");
  }

  return (
    <section className="form-section">
      <div className="section-heading">
        <div>
          <h2>Add a New Product</h2>
          <p>Add your own product to the store.</p>
        </div>
      </div>

      <form className="product-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && (
            <span className="field-error">{errors.name}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0.01"
            step="any"
            value={form.price}
            onChange={handleChange}
            placeholder="29.99"
            aria-invalid={Boolean(errors.price)}
          />
          {errors.price && (
            <span className="field-error">{errors.price}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            name="image"
            type="url"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            aria-invalid={Boolean(errors.image)}
          />
          {errors.image && (
            <span className="field-error">{errors.image}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
          {errors.category && (
            <span className="field-error">{errors.category}</span>
          )}
        </div>

        <button type="submit" className="button button-primary">
          Add Product
        </button>

        {success && (
          <p className="success-message" role="status">
            {success}
          </p>
        )}
      </form>
    </section>
  );
}
