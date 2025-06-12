-- Check if users table exists and has records
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'users'
) AS users_table_exists;

-- Count users in the users table if it exists
SELECT COUNT(*) AS user_count 
FROM users;

-- Check auth.users table (Supabase's built-in auth table)
SELECT COUNT(*) AS auth_user_count 
FROM auth.users;

-- List first 5 users from auth.users (if any)
SELECT id, email, email_confirmed_at, created_at
FROM auth.users
LIMIT 5;
