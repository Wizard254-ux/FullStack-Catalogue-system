import React from 'react';
import type {Product} from '../types';
import { formatPrice, formatDate } from '../utils/formatters';
import { getFullImageUrl } from '../utils/imageUtils';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const placeholderImage = 'https://via.placeholder.com/150?text=No+Image';
  
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-w-16 aspect-h-9 bg-gray-100">
        <img
          src={getFullImageUrl(product.image_url)}
          alt={product.name}
          className="object-cover w-full h-48"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderImage;
          }}
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
        
        <div className="mt-1 flex items-center justify-between">
          <span className="text-blue-600 font-medium">{formatPrice(product.price)}</span>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        
        {product.tags && product.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-3 text-xs text-gray-500">
          Added on {formatDate(product.created_at)}
        </div>
        
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => onEdit(product)}
            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;