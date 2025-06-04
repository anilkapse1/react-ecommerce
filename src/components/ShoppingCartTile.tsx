import React from "react";
import { Button } from "@mui/material";
import "../styles/_colors.scss";
import type { Product, ShoppingCartTileProps } from "../models/IProduct";
import { useNavigate } from "react-router-dom";
import "../styles/ShoppingCartTile.scss";

const ShoppingCartTile: React.FC<ShoppingCartTileProps> = ({
  item,
  onAddToCart,
  showQuantityControls = false,
  onUpdateQuantity,
  onRemove,
   isInCart = false
}) => {
  const navigate = useNavigate();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const handleCardClick = () => {
    navigate(`/react-ecommerce/products/${item.id}`);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item as Product, 1);
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
    <div className="cart-tile" onClick={handleCardClick}>
      <div className="cart-tile__image">
        <img src={item.thumbnail} alt={item.title} />
      </div>

      <div className="cart-tile__content">
        <div className="cart-tile__brand">{item.brand}</div>

        <h3 className="cart-tile__title">{item.title}</h3>

        <div className="cart-tile__rating">
          {renderStars(item.rating)}
          <span className="rating-count">
            ({Math.floor(Math.random() * 1000)})
          </span>
        </div>

        <div className="cart-tile__pricing">
          <div className="current-price">
            <span className="currency">₹</span>
            <span className="price">{(item.price * 80).toFixed(0)}</span>
          </div>
          <div className="original-price">
            <span className="mrp">M.R.P: </span>
            <span className="crossed-price">
              ₹{(item.price * 100).toFixed(0)}
            </span>
          </div>
          <div className="discount">
            ({Math.floor(20 + Math.random() * 30)}% off)
          </div>
        </div>

        <div className="cart-tile__delivery">
          FREE delivery <strong>Wed, 4 Jun</strong>
        </div>

        {showQuantityControls && (
          <div className="cart-tile__quantity-section">
            <div className="cart-tile__quantity">
              <label htmlFor={`quantity-${item.id}`}>Qty:</label>
              <input
                id={`quantity-${item.id}`}
                type="number"
                min="1"
                max={item.stock}
                value={item.quantity || 1}
                onChange={handleQuantityChange}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="cart-tile__total">
              Total: ₹{(item.price * 80 * (item.quantity ?? 1)).toFixed(0)}
            </div>
          </div>
        )}

        <div className="cart-tile__actions">
          {isInCart ? (
            <Button
              sx={{ backgroundColor: "#ee8096" }}
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                onRemove?.(item.id);
              }}
            >
              Remove from cart
            </Button>
          ) : (
            <Button
              sx={{ backgroundColor: "var(--common-theme-color)" }}
              variant="contained"
              onClick={handleAddToCartClick}
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartTile;
