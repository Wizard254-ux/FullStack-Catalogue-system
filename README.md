# Full-Stack Product Catalog Management System

A complete product catalog management system with image upload functionality, built with Node.js, Express, React, TypeScript, and PostgreSQL.

## Features

- **User Authentication**: Secure login and registration with JWT
- **User-Specific Data**: Users can only see and manage their own products and categories
- **Product Management**: Full CRUD operations for products
- **Image Upload**: Upload and manage product images
- **Category Management**: Create and manage product categories
- **Filtering & Search**: Filter products by category, price range, and search terms
- **Responsive Design**: Works on desktop and mobile devices

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
├── frontend/               # React frontend
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   ├── App.tsx         # Main App component
│   │   └── main.tsx        # Entry point
│   ├── .env                # Environment variables
│   └── package.json        # Dependencies
│
└── postman_collection.json # Postman API collection
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

4. Run the setup script to initialize the database:
```
npm run setup
```

5. Start the backend server:
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
- `POST /api/products` - Create new product with image upload
- `PUT /api/products/:id` - Update product with optional new image
- `DELETE /api/products/:id` - Delete product

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category

## User-Specific Data

This system implements user-specific data isolation:

- Each user can only see and manage their own products and categories
- Authentication is required for all API endpoints
- Products and categories are linked to users via a `user_id` foreign key

## Testing with Postman

A Postman collection is included in the root directory (`postman_collection.json`). To use it:

1. Import the collection into Postman
2. Register a new user or login with an existing user
3. Copy the JWT token from the response
4. Update the collection variable `token` with your JWT token
5. Use the collection to test all API endpoints

## License

This project is licensed under the MIT License.