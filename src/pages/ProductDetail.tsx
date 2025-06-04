import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ROUTE_CONFIG } from "../constant/routes";
import { Button } from "@mui/material";
import "../styles/ProductDetail.scss";
import type { Product } from "../models/IProduct";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, getCartItemsCount } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      console.log(`${quantity} item(s) added to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate(ROUTE_CONFIG.Routes.Cart.path);
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <div className="rating-stars">
        {"★".repeat(fullStars)}
        {hasHalfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </div>
    );
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-detail__header">
        <Button onClick={() => navigate(-1)} sx={{ backgroundColor: "var(--common-theme-color)", color: "#fff" }}>
          ← Back
        </Button>
        <div className="cart-info">
          Cart ({getCartItemsCount()}) |
          <Button
            onClick={() => navigate(ROUTE_CONFIG.Routes.Cart.path)}
            sx={{ backgroundColor: "#f0c14b", color: "#1976d2", margin: '5px' }}
          >
            View Cart
          </Button>
        </div>
      </div>

      <div className="product-detail__content">
        <div className="product-detail__left">
          <div className="product-image">
            <img src={product.thumbnail} alt={product.title} />
          </div>
        </div>

        <div className="product-detail__right">
          <div className="product-brand">{product.brand}</div>

          <h1 className="product-title">{product.title}</h1>

          <div className="product-rating">
            {renderStars(product.rating)}
            <span className="rating-count">
              ({Math.floor(Math.random() * 5000)})
            </span>
          </div>

          <div className="product-pricing">
            <div className="limited-deal">Limited time deal</div>
            <div className="discount-percent">
              -{Math.floor(20 + Math.random() * 30)}%
            </div>
            <div className="current-price">
              <span className="currency">₹</span>
              <span className="price">{(product.price * 80).toFixed(0)}</span>
            </div>
            <div className="original-price">
              <span className="mrp">M.R.P: </span>
              <span className="crossed-price">
                ₹{(product.price * 100).toFixed(0)}
              </span>
            </div>
          </div>

          <div className="fulfillment-info">
            <span className="fulfilled-badge">📦 Fulfilled</span>
            <div className="inclusive-text">Inclusive of all taxes</div>
          </div>

          <div className="delivery-info">
            <strong>FREE delivery Sunday, 1 June.</strong>
            <div className="order-within">Order within 7 hrs 17 mins.</div>
          </div>

          <div className="stock-info">
            <span className="in-stock">In stock</span>
          </div>

          <div className="quantity-section">
            <label htmlFor="quantity">Quantity:</label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            >
              {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="action-buttons">
            <Button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</Button>
            <Button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</Button>
          </div>

          <div className="product-description">
            <h3>About this item</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
