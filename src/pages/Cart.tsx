import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ShoppingCartTile from "../components/ShoppingCartTile";
import { ROUTE_CONFIG } from "../constant/routes";
import { Button } from "@mui/material";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    updateCartQuantity,
    removeFromCart,
    addToCart,
    getTotalPrice,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <button
          onClick={() => navigate(ROUTE_CONFIG.Routes.Home.path)}
          className="continue-shopping"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__header">
        <Button onClick={() => navigate(-1)} sx={{ backgroundColor: "var(--common-theme-color)", color: "#fff" }}>
          ← Continue Shopping
        </Button>
        <h1>Shopping Cart</h1>
      </div>

      <div className="cart__content">
        <div className="cart__items">
          {cartItems.map((item) => (
            <ShoppingCartTile
              key={item.id}
              item={item}
              onAddToCart={addToCart}
              showQuantityControls={true}
              onUpdateQuantity={updateCartQuantity}
              onRemove={removeFromCart}
              isInCart={true}
            />
          ))}
        </div>

        <div className="cart__summary">
          <h3>Order Summary</h3>
          <div className="summary-line">
            <span>
              Items (
              {cartItems.reduce((sum, item) => sum + (item.quantity ?? 0), 0)}):
            </span>
            <span>₹{getTotalPrice().toFixed(0)}</span>
          </div>
          <div className="summary-line total">
            <span>Total:</span>
            <span>₹{getTotalPrice().toFixed(0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
