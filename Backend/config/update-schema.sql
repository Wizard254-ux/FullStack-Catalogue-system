-- Add user_id to products table
ALTER TABLE products 
ADD COLUMN user_id INTEGER REFERENCES users(id);

-- Add user_id to categories table
ALTER TABLE categories 
ADD COLUMN user_id INTEGER REFERENCES users(id);