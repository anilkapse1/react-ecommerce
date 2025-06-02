import http from "./base.services";
import { Endpoints } from "./endpoint";

const ProductService = {
  getProducts: async () => {
    return await http.get(Endpoints.PRODUCT_API_URL, Endpoints.ProductService.getProducts);
  },

  getProductByID: async (id: string | number) => {
    return await http.get(Endpoints.PRODUCT_API_URL, Endpoints.ProductService.getProductByID, id);
  },

  getCategories: async () => {
    return await http.get(Endpoints.PRODUCT_API_URL, Endpoints.ProductService.getCategories);
  },

  getProductsByCategory: async (category: string) => {
    return await http.get(Endpoints.PRODUCT_API_URL, Endpoints.ProductService.getProductsByCategory, category);
  },

  getProductsBySearch: async (searchTerm: string) => {
    return await http.get(Endpoints.PRODUCT_API_URL, Endpoints.ProductService.getProductsBySearch, searchTerm);
  },
};

export default ProductService;
