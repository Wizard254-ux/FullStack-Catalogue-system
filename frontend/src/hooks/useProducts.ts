import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/api';
import type {Product, PaginationData, ProductFormData} from '../types';
import { stringToTags } from '../utils/formatters';

interface UseProductsProps {
  initialPage?: number;
  initialLimit?: number;
}

interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const useProducts = ({ initialPage = 1, initialLimit = 10 }: UseProductsProps = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: initialPage,
    limit: initialLimit,
    pages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({});

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      };
      
      const data = await productService.getProducts(params);
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.limit, filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const changePage = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const updateFilters = (newFilters: ProductFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page when filters change
  };

  const createProduct = async (formData: ProductFormData) => {
    try {
      setIsLoading(true);
      
      const data = new FormData();
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('price', formData.price.toString());
      
      const tags = stringToTags(formData.tags);
      data.append('tags', JSON.stringify(tags));
      
      if (formData.image) {
        data.append('image', formData.image);
      }
      
      await productService.createProduct(data);
      await fetchProducts();
    } catch (err) {
      setError('Failed to create product');
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (id: number, formData: ProductFormData) => {
    try {
      setIsLoading(true);
      
      const data = new FormData();
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('price', formData.price.toString());
      
      const tags = stringToTags(formData.tags);
      data.append('tags', JSON.stringify(tags));
      
      if (formData.image) {
        data.append('image', formData.image);
      } else {
        // Explicitly set removeImage flag if image is null
        data.append('removeImage', 'true');
      }
      
      await productService.updateProduct(id, data);
      await fetchProducts();
    } catch (err) {
      setError('Failed to update product');
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      setIsLoading(true);
      await productService.deleteProduct(id);
      await fetchProducts();
    } catch (err) {
      setError('Failed to delete product');
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    products,
    pagination,
    isLoading,
    error,
    fetchProducts,
    changePage,
    updateFilters,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};