-- Verify authentication tables and data integrity
-- Run this to check the current state of auth-related tables

-- Check users table structure and data
SELECT 'USERS TABLE' as table_name;
SELECT 
  id,
  email,
  first_name,
  last_name,
  role,
  created_at
FROM users 
ORDER BY created_at DESC 
LIMIT 10;

-- Check host_profiles table structure and data
SELECT 'HOST_PROFILES TABLE' as table_name;
SELECT 
  id,
  user_id,
  name,
  business_name,
  host_type,
  rating,
  total_reviews,
  created_at
FROM host_profiles 
ORDER BY created_at DESC 
LIMIT 10;

-- Check for orphaned records (host_profiles without corresponding users)
SELECT 'ORPHANED HOST PROFILES' as check_name;
SELECT hp.id, hp.user_id, hp.business_name
FROM host_profiles hp
LEFT JOIN users u ON hp.user_id = u.id
WHERE u.id IS NULL;

-- Check for duplicate emails
SELECT 'DUPLICATE EMAILS IN USERS' as check_name;
SELECT email, COUNT(*) as count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

-- Check auth.users vs public.users consistency
-- Note: This requires RLS to be disabled or service role access
SELECT 'AUTH USERS COUNT' as metric, COUNT(*) as value FROM auth.users
UNION ALL
SELECT 'PUBLIC USERS COUNT' as metric, COUNT(*) as value FROM users
UNION ALL
SELECT 'HOST PROFILES COUNT' as metric, COUNT(*) as value FROM host_profiles;

-- Check recent registrations
SELECT 'RECENT REGISTRATIONS' as section;
SELECT 
  'USER' as type,
  email,
  created_at
FROM users
WHERE created_at > NOW() - INTERVAL '7 days'
UNION ALL
SELECT 
  'HOST' as type,
  COALESCE(business_name, name) as email,
  created_at
FROM host_profiles
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
