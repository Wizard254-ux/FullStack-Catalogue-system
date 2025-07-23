-- Add user_id to products table
ALTER TABLE products 
ADD COLUMN user_id INTEGER REFERENCES users(id);

-- Add user_id to categories table
ALTER TABLE categories 
ADD COLUMN user_id INTEGER REFERENCES users(id);

-- Update existing products to belong to the first user (if any)
UPDATE products 
SET user_id = (SELECT id FROM users ORDER BY id LIMIT 1)
WHERE user_id IS NULL;

-- Update existing categories to belong to the first user (if any)
UPDATE categories 
SET user_id = (SELECT id FROM users ORDER BY id LIMIT 1)
WHERE user_id IS NULL;