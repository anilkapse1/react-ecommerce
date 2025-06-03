export const Endpoints = {
  PRODUCT_API_URL: import.meta.env.VITE_APP_PRODUCT_API_URL,

  ProductService: {
    getProducts: "products",
    getProductByID: "products/{0}",
    getCategories: "products/categories",
    getProductsByCategory: "products/category/{0}",
    getProductsBySearch: "products/search?q={0}",
  },
};
