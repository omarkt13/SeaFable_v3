-- Check current state of users table
SELECT 'Current users in database:' as info;
SELECT id, email, first_name, last_name, role, created_at 
FROM users 
ORDER BY created_at DESC;

-- Check for duplicate users
SELECT 'Checking for duplicates:' as info;
SELECT email, COUNT(*) as count 
FROM users 
GROUP BY email 
HAVING COUNT(*) > 1;

-- Clean up any duplicate users (keep the most recent one)
WITH ranked_users AS (
  SELECT id, email, 
         ROW_NUMBER() OVER (PARTITION BY email ORDER BY created_at DESC) as rn
  FROM users
)
DELETE FROM users 
WHERE id IN (
  SELECT id FROM ranked_users WHERE rn > 1
);

-- Check if our test users exist in the users table
SELECT 'Test users in database:' as info;
SELECT id, email, first_name, last_name, role 
FROM users 
WHERE email IN ('customer1@seafable.com', 'business1@seafable.com');

-- If test users don't exist in users table, we'll need to create them
-- This will be handled by the next script
