# Full-Stack Product Catalog Management System

A complete product catalog management system with image upload functionality, built with Node.js, Express, React, TypeScript, and PostgreSQL.

## Features

- User authentication with JWT
- Product management (CRUD operations)
- Image upload and management
- Filtering, pagination, and search
- Responsive design

## Tech Stack

### Backend
- Node.js with Express
- PostgreSQL database
- JWT authentication
- Multer for file uploads

### Frontend
- React with TypeScript
- React Router for navigation
- React Hook Form for form handling
- Axios for API requests
- TailwindCSS for styling

## Project Structure

```
FullStack Catalogue Management System/
├── Backend/                # Express backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middlewares/        # Custom middlewares
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── uploads/            # Uploaded images
│   ├── .env                # Environment variables
│   ├── index.js            # Entry point
│   └── package.json        # Dependencies
│
└── frontend/               # React frontend
    ├── public/             # Static files
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── contexts/       # React contexts
    │   ├── hooks/          # Custom hooks
    │   ├── pages/          # Page components
    │   ├── services/       # API services
    │   ├── types/          # TypeScript types
    │   ├── utils/          # Utility functions
    │   ├── App.tsx         # Main App component
    │   └── main.tsx        # Entry point
    ├── .env                # Environment variables
    └── package.json        # Dependencies
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database

### Database Setup
1. Create a PostgreSQL database named `product_catalog`:
```
CREATE DATABASE product_catalog;
```

2. Make sure your `.env` file has the correct database credentials.

3. Run the initialization script to create the required tables:
```
cd Backend
npm run init-db
```

This will create the necessary `users` and `products` tables in your database.

### Backend Setup
1. Navigate to the backend directory:
```
cd Backend
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file with the following variables:
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

4. Start the backend server:
```
npm run dev
```

### Frontend Setup
1. Navigate to the frontend directory:
```
cd frontend
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file with the following variables:
```
VITE_API_URL=http://localhost:3000/api
```

4. Start the frontend development server:
```
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

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
- `GET /api/images/:filename` - Serve uploaded images"# FullStack-Catalogue-system" 
