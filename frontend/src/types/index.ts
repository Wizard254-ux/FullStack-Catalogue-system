export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  tags: string[];
  image_url: string | null;
  created_at: string;
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ProductsResponse {
  products: Product[];
  pagination: PaginationData;
}

export interface ProductFormData {
  name: string;
  category: string;
  price: number;
  tags: string;
  image?: File;
}

export interface UploadResponse {
  message: string;
  file: {
    filename: string;
    originalname: string;
    mimetype: string;
    size: number;
    path: string;
  };
}