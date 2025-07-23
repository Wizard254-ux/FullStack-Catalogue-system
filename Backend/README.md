# Product Catalog Backend

This is the backend for the Product Catalog Management System.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database

### Database Setup
1. Create a PostgreSQL database named `product_catalog`:
```
CREATE DATABASE product_catalog;
```

2. Run the initialization script:
```
npm run init-db
```
Or manually run the SQL commands in `config/init.sql`.

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=product_catalog
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h
UPLOAD_PATH=uploads
```

### Installation
1. Install dependencies:
```
npm install
```

2. Start the development server:
```
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (with filtering, pagination, search)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product with image upload (protected)
- `PUT /api/products/:id` - Update product with optional new image (protected)
- `DELETE /api/products/:id` - Delete product (protected)

### Image Upload
- `POST /api/upload` - Upload image (protected)
- `GET /api/images/:filename` - Serve uploaded images

## Query Parameters for Products

- `page` - Page number for pagination (default: 1)
- `limit` - Number of products per page (default: 10)
- `search` - Search by product name or tags
- `category` - Filter by category
- `minPrice` - Filter by minimum price
- `maxPrice` - Filter by maximum price

Example: `/api/products?page=1&limit=10&search=laptop&category=electronics&minPrice=500&maxPrice=2000`