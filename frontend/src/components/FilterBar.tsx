import React, { useState } from 'react';
import { useCategories } from '../hooks/useCategories';

interface FilterBarProps {
  onFilter: (filters: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => void;
  onAddNew: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilter, onAddNew }) => {
  // Fetch categories from backend
  const { categories } = useCategories();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onFilter({
      search: search || undefined,
      category: category || undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    });
  };

  const handleReset = () => {
    setSearch('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    
    onFilter({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or tag"
            className="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Min Price ($)
          </label>
          <input
            id="minPrice"
            type="number"
            min="0"
            step="0.01"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            className="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Max Price ($)
          </label>
          <input
            id="maxPrice"
            type="number"
            min="0"
            step="0.01"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            className="w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <button
          type="button"
          onClick={onAddNew}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Product
        </button>
        
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </form>
  );
};

export default FilterBar;