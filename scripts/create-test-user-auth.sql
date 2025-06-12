-- First, let's check if any users exist in auth.users
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 5;
