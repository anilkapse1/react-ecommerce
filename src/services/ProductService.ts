import type { Product } from '../types/Product';

const API_CONFIG = {
  baseUrl: 'https://dummyjson.com',
  endpoints: {
    products: '/products',
    productById: (id: number) => `/products/${id}`,
    categories: '/products/categories',
    productsByCategory: (category: string) => `/products/category/${category}`,
    search: (query: string) => `/products/search?q=${query}`
  }
} as const;

const transformers = {
  product: (data: any): Product => ({
    id: data.id,
    title: data.title,
    price: data.price,
    thumbnail: data.thumbnail,
    brand: data.brand || 'Unknown',
    category: data.category,
    description: data.description,
    rating: data.rating,
    stock: data.stock
  }),
  
  productList: (data: any): Product[] => 
    data.products?.map(transformers.product) || []
};

class ProductService {
  private async fetchData<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  private methods = {
    getAllProducts: async (): Promise<Product[]> => {
      const data = await this.fetchData(API_CONFIG.endpoints.products);
      return transformers.productList(data);
    },

    getProductById: async (id: number): Promise<Product> => {
      const data = await this.fetchData(API_CONFIG.endpoints.productById(id));
      return transformers.product(data);
    },

    getCategories: async (): Promise<string[]> => {
      return await this.fetchData<string[]>(API_CONFIG.endpoints.categories);
    },

    getProductsByCategory: async (category: string): Promise<Product[]> => {
      const data = await this.fetchData(API_CONFIG.endpoints.productsByCategory(category));
      return transformers.productList(data);
    },

    searchProducts: async (query: string): Promise<Product[]> => {
      const data = await this.fetchData(API_CONFIG.endpoints.search(query));
      return transformers.productList(data);
    }
  };

  getAllProducts = this.methods.getAllProducts;
  getProductById = this.methods.getProductById;
  getCategories = this.methods.getCategories;
  getProductsByCategory = this.methods.getProductsByCategory;
  searchProducts = this.methods.searchProducts;
}

export const productService = new ProductService();