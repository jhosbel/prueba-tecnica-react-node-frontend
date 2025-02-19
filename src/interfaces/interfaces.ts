export interface Product {
  _id: string;
  brand: string;
  category: string;
  createdAt: string;
  description: string;
  name: string;
  price: number;
  sku: string;
  stock: number;
  tags: string[];
  updatedAt: string;
}

export interface UserProduct {
  _id: string;
  category: string;
  name: string;
  originalPrice: number;
  price: number;
  specialPrice: number;
  specialPriceId: string;
  assignedAt: string;
}

export interface EditProduct {
  name: string;
  originalPrice: string;
  specialPrice: number;
  specialPriceId: string;
}
