import React from "react";
import "../styles/ShoppingCartTile.scss";
import { Button } from "@mui/material";
import "../styles/_colors.scss";
import type { ShoppingCartTileProps } from "../models/IProduct";



const ShoppingCartTile: React.FC<ShoppingCartTileProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity);
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

  return (
    <div className="cart-tile">
      <div className="cart-tile__image">
        <img src={item.thumbnail} alt={item.title} />
      </div>

      <div className="cart-tile__content">
        <div className="cart-tile__brand">{item.brand}</div>

        <h3 className="cart-tile__title">{item.title}</h3>

        <div className="cart-tile__rating">
          {renderStars(item.rating)}
          <span className="rating-count">({Math.floor(Math.random() * 1000)})</span>
        </div>

        <div className="cart-tile__pricing">
          <div className="current-price">
            <span className="currency">₹</span>
            <span className="price">{(item.price * 80).toFixed(0)}</span>
          </div>
          <div className="original-price">
            <span className="mrp">M.R.P: </span>
            <span className="crossed-price">₹{(item.price * 100).toFixed(0)}</span>
          </div>
          <div className="discount">({Math.floor(20 + Math.random() * 30)}% off)</div>
        </div>

        <div className="cart-tile__delivery">
          FREE delivery <strong>Wed, 4 Jun</strong>
        </div>

        <div className="cart-tile__quantity-section">
          <div className="cart-tile__quantity">
            <label htmlFor={`quantity-${item.id}`}>Qty:</label>
            <input
              id={`quantity-${item.id}`}
              type="number"
              min="1"
              max={item.stock}
              value={item.quantity}
              onChange={handleQuantityChange}
            />
          </div>

          <div className="cart-tile__total">Total: ₹{(item.price * 80 * item.quantity).toFixed(0)}</div>
        </div>

        <div className="cart-tile__actions">
          <Button sx={{ backgroundColor: "var(--common-theme-color)" }} variant="contained">
            Add to cart
          </Button>
          <Button variant="text" onClick={() => onRemove(item.id)}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartTile;
