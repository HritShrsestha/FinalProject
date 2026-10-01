
# KazamaStore — React E-commerce Assessment

A responsive mini e-commerce application built using React, Vite,
React Hooks, React Router, and the Fake Store API.

## Features

- Reusable ProductCard component with PropTypes
- Product listing using Array.map()
- Add to Cart with a dynamic cart count
- Search products by name
- Sort products by price
- Fetch products using useEffect
- Loading and error states
- Controlled Add New Product form
- Form validation and inline error messages
- Product details page using URL parameters
- Shopping cart with quantity updates and removal
- React Router navigation and a 404 page
- Responsive user interface

## Technologies

- React
- Vite
- JavaScript
- React Router DOM
- PropTypes
- Lucide React
- Fake Store API
- CSS

## Requirements

Install Node.js and npm before running the project.

## Installation

1. Open the project folder in a terminal.
2. Install the dependencies:

   npm install

3. Start the development server:

   npm run dev

4. Open the local URL displayed in the terminal.

## Routes

- / — Product listing
- /product/:id — Product details
- /cart — Shopping cart
- * — Not Found page

## API

Product data is fetched from:

https://fakestoreapi.com/products

An internet connection is required to load the initial products.

## Notes

New products and cart items are stored in React state and are
not permanently saved. Refreshing the browser resets these changes.

Checkout is a demonstration only; no payment processing is included.

## Assessment

Created as a React JS assignment-based assessment project
covering components, props, state, events, hooks, forms, and routing.
