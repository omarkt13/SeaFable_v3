-- Create a test user for login testing
-- First, let's check if any users exist
SELECT 
  id,
  email,
  first_name,
  last_name,
  role,
  created_at
FROM users 
LIMIT 5;
