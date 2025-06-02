import React, { useState, useEffect } from "react";
import ShoppingCartTile from "./ShoppingCartTile";
import type { CartItem, Product } from "../models/IReactProp";
import "../styles/ShoppingCart.scss";
import { Typography } from "@mui/material";
import ProductService from "../services/product.service";
import { useToast } from "../context/ToastContext";

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  // useEffect(() => {
  //   const loadSampleProducts = async () => {
  //     try {
  //       const products = await productService.getAllProducts();
  //       const sampleCartItems: CartItem[] = products.map((product) => ({
  //         ...product,
  //         quantity: 1,
  //       }));
  //       console.log("=======1 product is:", sampleCartItems);
  //       setCartItems(sampleCartItems);
  //     } catch (error) {
  //       console.error("Failed to load products:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadSampleProducts();
  // }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const productData = await ProductService.getProducts();
        if (productData.products) {
          const transformData = productData.products.map(
            ({ id, title, price, thumbnail, brand, category, description, rating, stock }) => ({
              id,
              title,
              price,
              thumbnail,
              brand,
              category,
              description,
              rating,
              stock,
              quantity: 1,
            })
          );
          setCartItems(transformData);
          showToast("Products loaded successfully!", "success");
        }
      } catch (error) {
        showToast("Failed to load a product", "error");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
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
