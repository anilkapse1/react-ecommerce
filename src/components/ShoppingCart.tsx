import React, { useState, useEffect } from "react";
import ShoppingCartTile from "./ShoppingCartTile";
import { productService } from "../services/ProductService";
import type { CartItem } from "../types/Product";
import "../styles/ShoppingCart.scss";
import { Typography } from "@mui/material";

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSampleProducts = async () => {
      try {
        const products = await productService.getAllProducts();
        const sampleCartItems: CartItem[] = products.map((product) => ({
          ...product,
          quantity: 1,
        }));
        setCartItems(sampleCartItems);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSampleProducts();
  }, []);

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const handleRemove = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
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

      {cartItems.length === 0 ? (
        <div className="shopping-cart__empty">
          <p>No products available</p>
        </div>
      ) : (
        <div className="shopping-cart__grid">
          {cartItems.map((item) => (
            <ShoppingCartTile key={item.id} item={item} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemove} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
