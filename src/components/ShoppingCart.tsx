import React from "react";
import ShoppingCartTile from "./ShoppingCartTile";
import "../styles/ShoppingCart.scss";
import { Typography } from "@mui/material";
import { useProductContext } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import type { Product } from "../models/IProduct";

const ShoppingCart: React.FC = () => {
  const { products, setProducts, loading } = useProductContext();
  const { addToCart, removeFromCart } = useCart();

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setProducts((items) => items.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
  addToCart(product, quantity);
};

 const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId);
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="shopping-cart">
      <div className="shopping-cart__header">
        <Typography variant="h1" gutterBottom>
          Style, Taste, and Tech — All at Your Fingertips
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ display: "block" }}>
          Free shipping on orders above ₹999
        </Typography>
      </div>

      {products.length === 0 ? (
        <div className="shopping-cart__empty">
          <p>No products available</p>
        </div>
      ) : (
        <div className="shopping-cart__grid">
          {products.map((item) => (
            <ShoppingCartTile
             key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onAddToCart={handleAddToCart} 
              showQuantityControls={true}
              onRemove={handleRemoveFromCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
