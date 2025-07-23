-- Reset user_id to NULL for all products
UPDATE products 
SET user_id = NULL;

-- Reset user_id to NULL for all categories
UPDATE categories 
SET user_id = NULL;