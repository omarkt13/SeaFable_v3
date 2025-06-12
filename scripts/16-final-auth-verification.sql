-- Final Authentication System Verification
-- This script verifies all authentication components are properly configured

-- Check if required tables exist
SELECT 
  'TABLE VERIFICATION' as check_type,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users' AND table_schema = 'public') 
    THEN '✅ EXISTS' 
    ELSE '❌ MISSING' 
  END as users_table,
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'host_profiles' AND table_schema = 'public') 
    THEN '✅ EXISTS' 
    ELSE '❌ MISSING' 
  END as host_profiles_table;

-- Check RLS policies
SELECT 
  'RLS POLICIES' as check_type,
  schemaname,
  tablename,
  policyname,
  CASE WHEN cmd = 'SELECT' THEN '✅ SELECT' 
       WHEN cmd = 'INSERT' THEN '✅ INSERT'
       WHEN cmd = 'UPDATE' THEN '✅ UPDATE'
       WHEN cmd = 'DELETE' THEN '✅ DELETE'
       ELSE cmd END as policy_type
FROM pg_policies 
WHERE schemaname = 'public' 
  AND tablename IN ('users', 'host_profiles')
ORDER BY tablename, policyname;

-- Check auth triggers
SELECT 
  'AUTH TRIGGERS' as check_type,
  trigger_name,
  event_manipulation,
  action_statement,
  CASE 
    WHEN trigger_name LIKE '%new_user%' THEN '✅ USER CREATION'
    ELSE '✅ OTHER'
  END as trigger_purpose
FROM information_schema.triggers 
WHERE event_object_table = 'users' 
  AND event_object_schema = 'auth';

-- Verify test data exists
SELECT 
  'TEST DATA VERIFICATION' as check_type,
  (SELECT COUNT(*) FROM public.users WHERE email LIKE 'test.%@seafable.com') as test_customers,
  (SELECT COUNT(*) FROM public.host_profiles WHERE email LIKE 'test.%@seafable.com') as test_businesses,
  (SELECT COUNT(*) FROM auth.users WHERE email LIKE 'test.%@seafable.com') as auth_test_users;

-- Performance test key queries
EXPLAIN (ANALYZE, BUFFERS) 
SELECT u.*, hp.business_name 
FROM public.users u
LEFT JOIN public.host_profiles hp ON u.id = hp.user_id
WHERE u.email = 'test.customer@seafable.com';

-- Check database constraints
SELECT 
  'CONSTRAINTS CHECK' as check_type,
  table_name,
  constraint_name,
  constraint_type
FROM information_schema.table_constraints 
WHERE table_schema = 'public' 
  AND table_name IN ('users', 'host_profiles')
  AND constraint_type IN ('PRIMARY KEY', 'FOREIGN KEY', 'UNIQUE')
ORDER BY table_name, constraint_type;

-- Final status summary
SELECT 
  'AUTHENTICATION SYSTEM STATUS' as final_status,
  CASE 
    WHEN (SELECT COUNT(*) FROM information_schema.tables WHERE table_name IN ('users', 'host_profiles') AND table_schema = 'public') = 2
    THEN '✅ TABLES READY'
    ELSE '❌ TABLES MISSING'
  END as tables_status,
  CASE 
    WHEN (SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public' AND tablename IN ('users', 'host_profiles')) > 0
    THEN '✅ RLS ENABLED'
    ELSE '❌ RLS MISSING'
  END as security_status,
  CASE 
    WHEN (SELECT COUNT(*) FROM auth.users WHERE email LIKE 'test.%@seafable.com') >= 2
    THEN '✅ TEST DATA READY'
    ELSE '❌ TEST DATA MISSING'
  END as test_data_status;
