import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProducts } from '../hooks/useProducts';
import type {Product, ProductFormData} from '../types';
import FilterBar from '../components/FilterBar';
import ProductTable from '../components/ProductTable';
import Pagination from '../components/Pagination';
import ProductForm from '../components/ProductForm';
import { User,LogOut } from 'lucide-react'; // Import the User icon



const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const [showLogout, setShowLogout] = useState(false); // State to control logout button visibility

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };
  
  const {
    products,
    pagination,
    isLoading,
    error,
    changePage,
    updateFilters,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreateProduct = async (formData: ProductFormData) => {
    try {
      await createProduct(formData);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleUpdateProduct = async (formData: ProductFormData) => {
    if (!editingProduct) return;
    
    try {
      await updateProduct(editingProduct.id, formData);
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: number) => {
      try {
        await deleteProduct(id);
      } catch (error) {
        console.error('Error deleting product:', error);
      }

  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
<header className="bg-gradient-to-r from-white via-gray-50 to-white shadow sticky top-0 z-10">
  <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-blue-600">Product Catalog</h1>

    <div className="relative flex items-center space-x-4">
      {user && (
        <>
          <button
            onClick={toggleLogout}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
            aria-label="User menu"
          >
            <User size={24} />
          </button>

          {showLogout && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
              <span className="block px-4 py-1 text-sm text-gray-700">
                Welcome, <span className="font-semibold text-blue-600">{user.username}</span>
              </span>
              <button
                onClick={handleLogout}
                className="block w-full flex flex-row  item-center gap-3 font-semibold text-left text-red-500 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              >
                Logout

                <LogOut size={14} className="mt-1" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  </div>
</header>

      {/* Main content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters with add button */}
        <div className="mb-6">
          <FilterBar 
            onFilter={updateFilters} 
            onAddNew={() => setIsModalOpen(true)} 
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex fixed z-40 inset-0 justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Products table */}
        {!isLoading && products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found. Add a new product to get started.</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden border-b border-gray-200 rounded-lg">
            <ProductTable
              products={products}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.pages}
            onPageChange={changePage}
          />
        )}
      </main>

      {/* Modal for adding/editing products */}
      {isModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            {/* Modal content */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative z-50">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                      </h3>
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-4">
                      <ProductForm
                        onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
                        product={editingProduct || undefined}
                        isLoading={isLoading}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;