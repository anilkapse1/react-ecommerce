export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  brand: string;
  category: string;
  description: string;
  rating: number;
  stock: number;
  quantity?: number;
}

export interface ProductContextType {
  products: Product[];
  originalProducts: Product[];
  loading: boolean;
  refreshProducts: () => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  searchProducts: (value: string) => void;
}

export interface ShoppingCartTileProps {
  item: Product;
  onAddToCart: (product: Product, quantity?: number) => void;
  showQuantityControls: boolean;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  isInCart?: boolean;
}

export interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  getCartItemsCount: () => number;
  getTotalPrice: () => number;
}