import React, { useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import LoadingSpinner from './LoadingSpinner';

interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ value, onChange, error }) => {
  const [newCategory, setNewCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const { categories, createCategory, isLoading } = useCategories();

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      setIsAddingCategory(true);
      try {
        const success = await createCategory(newCategory.trim());
        if (success) {
          onChange(newCategory.trim());
          setNewCategory('');
        }
      } finally {
        setIsAddingCategory(false);
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isLoading}
          className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:opacity-75"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
          <option value="new" className="font-bold text-green-600">+ Add New Category</option>
        </select>
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {value === 'new' && (
        <div className="flex space-x-2 bg-green-50 p-2 rounded-md border border-green-200">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category name"
            className="block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
            autoFocus
          />
          <button
            type="button"
            onClick={handleAddCategory}
            disabled={isAddingCategory}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAddingCategory ? (
              <div className="flex items-center">
                <LoadingSpinner size="small" />
                <span className="ml-2">Adding...</span>
              </div>
            ) : 'Add'}
          </button>
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {isLoading ? (
            <span className="flex items-center">
              <LoadingSpinner size="small" />
              <span className="ml-1">Loading categories...</span>
            </span>
          ) : (
            `${categories.length} categories available`
          )}
        </span>
        <button 
          type="button" 
          onClick={() => onChange('new')}
          className="text-xs text-green-600 hover:text-green-800"
          disabled={isLoading}
        >
          + Add new category
        </button>
      </div>
    </div>
  );
};

export default CategorySelector;