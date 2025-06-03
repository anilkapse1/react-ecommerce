import React, { createContext, useContext, useState, useEffect } from "react";
import ProductService from "../services/product.service";
import { useToast } from "../context/ToastContext";
import type { Product, ProductContextType } from "../models/IProduct";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  // GET PRODUCTS
  const getProducts = async () => {
    try {
      setLoading(true);
      const productData = await ProductService.getProducts();
      if (productData.products) {
        const transformData = productData.products.map(
          ({ id, title, price, thumbnail, brand, category, description, rating, stock }: Product) => ({
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
        setProducts(transformData);
        setOriginalProducts(transformData);
        showToast("Products loaded successfully!", "success");
      }
    } catch (error) {
      showToast("Failed to load products", "error");
    } finally {
      setLoading(false);
    }
  };

  // GET PRODUCT BY SEARCH QUERY OR KEYWORD
  const searchProducts = async (value: any) => {
    setLoading(true);
    try {
      const productData = await ProductService.getProductsBySearch(value);
      if (productData.products) {
        const transformData = productData.products.map(
          ({ id, title, price, thumbnail, brand, category, description, rating, stock }: Product) => ({
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
        setProducts(transformData);
        showToast("Products loaded successfully!", "success");
      }
    } catch (e) {
      showToast("Failed to load products", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts, loading, setLoading, refreshProducts: getProducts, searchProducts, originalProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook
export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
