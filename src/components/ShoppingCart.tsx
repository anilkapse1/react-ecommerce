import React, { useState, useEffect } from 'react';
import ShoppingCartTile from './ShoppingCartTile';
import { productService } from '../services/ProductService';
import type { CartItem, Product } from '../types/Product';
import '../styles/ShoppingCart.scss';

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSampleProducts = async () => {
      try {
        const products = await productService.getAllProducts();
        const sampleCartItems: CartItem[] = products.slice(0, 12).map(product => ({
          ...product,
          quantity: 1
        }));
        setCartItems(sampleCartItems);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSampleProducts();
  }, []);

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="shopping-cart">
      <div className="shopping-cart__header">
        <h2 className="shopping-cart__title">Featured Products</h2>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="shopping-cart__empty">
          <p>No products available</p>
        </div>
      ) : (
        <div className="shopping-cart__grid">
          {cartItems.map(item => (
            <ShoppingCartTile
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;