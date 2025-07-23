import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  },
};

// Product services
export const productService = {
  getProducts: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  
  getProductById: async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  createProduct: async (productData: FormData) => {
    const response = await api.post('/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  updateProduct: async (id: number, productData: FormData) => {
    const response = await api.put(`/products/${id}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  deleteProduct: async (id: number) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

// Upload service
export const uploadService = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// Category service
export const categoryService = {
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
  
  createCategory: async (name: string) => {
    const response = await api.post('/categories', { name });
    return response.data;
  },
};

export default api;