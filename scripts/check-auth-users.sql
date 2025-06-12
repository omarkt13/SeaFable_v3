-- Check if any users exist in the auth.users table
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at,
    last_sign_in_at
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 10;
