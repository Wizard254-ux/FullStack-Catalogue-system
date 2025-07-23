import React from 'react';
import { useForm } from 'react-hook-form';
import type {Product, ProductFormData} from '../types';
import ImageUpload from './ImageUpload';
import CategorySelector from './CategorySelector';
import { tagsToString, stringToTags } from '../utils/formatters';

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  product?: Product;
  isLoading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  product,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: product
      ? {
          name: product.name,
          category: product.category,
          price: product.price,
          tags: tagsToString(product.tags),
        }
      : undefined,
  });

  const [imageFile, setImageFile] = React.useState<File | null>(null);

  const handleFormSubmit = (data: ProductFormData) => {
    // Process tags to ensure they're properly formatted
    const processedTags = stringToTags(data.tags);
    
    console.log('Submitting form with data:', data);
    
      onSubmit({
      ...data,
      tags: processedTags.join(','), // Ensure tags are sent as a comma-separated string
       image: imageFile ?? undefined,
    });
  };
  


  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Product name is required' })}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <CategorySelector
          value={watch('category') || ''}
          onChange={(value) => setValue('category', value)}
          error={errors.category?.message}
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price ($)
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          min="0"
          {...register('price', {
            required: 'Price is required',
            min: {
              value: 0,
              message: 'Price must be greater than or equal to 0',
            },
          })}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
          Tags (comma separated)
        </label>
        <input
          id="tags"
          type="text"
          {...register('tags')}
          placeholder="e.g. new, sale, featured"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Product Image</label>
        <ImageUpload
          onImageChange={setImageFile}
          currentImageUrl={product?.image_url}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;