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
  quantity: number;
}

export interface ProductContextType {
  products: Product[];
  loading: boolean;
  refreshProducts: () => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ShoppingCartTileProps {
  item: Product;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}