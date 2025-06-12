-- =====================================================
-- FIXED: Create Test Users in Supabase Auth + Database
-- =====================================================

-- Note: This script creates database records, but we need to use the API
-- to create users in Supabase Auth. The JavaScript script below will handle this.

-- Clean up existing test data first
DELETE FROM public.host_profiles WHERE email IN ('test.business@seafable.com');
DELETE FROM public.users WHERE email IN ('test.customer@seafable.com', 'test.business@seafable.com');

-- We'll create the database records after the Auth users are created
-- This script prepares the database structure

-- Verify tables exist
SELECT 
  'users table' as table_name,
  COUNT(*) as record_count
FROM public.users
UNION ALL
SELECT 
  'host_profiles table' as table_name,
  COUNT(*) as record_count  
FROM public.host_profiles;

-- Show current auth users (this will be empty initially)
SELECT 
  'Current database users' as info,
  COUNT(*) as count
FROM public.users;

SELECT 'Database is ready for user creation' as status;
