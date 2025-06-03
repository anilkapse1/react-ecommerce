import React, { createContext, useContext, useState } from "react";
import type { CartContextType, Product } from "../models/IProduct";
import type { IReactProp } from "../models/IReactProp";



const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<IReactProp> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: (item.quantity ?? 0) + quantity } : item));
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * 80 * (item.quantity ?? 0), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        getCartItemsCount,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
