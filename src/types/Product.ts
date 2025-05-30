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
}

export interface CartItem extends Product {
  quantity: number;
}