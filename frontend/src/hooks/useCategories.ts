import { useState, useEffect } from 'react';
import { categoryService } from '../services/api';

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await categoryService.getCategories();
      console.log('Fetched categories:', data);
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories');
      console.error('Error fetching categories:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createCategory = async (name: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await categoryService.createCategory(name);
      // Refresh categories after creating a new one
      await fetchCategories();
      return true;
    } catch (err) {
      setError('Failed to create category');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    isLoading,
    error,
    fetchCategories,
    createCategory
  };
};