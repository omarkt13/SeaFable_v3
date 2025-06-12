-- Create Test Users for Authentication Testing
-- This script creates test users for both customer and business flows

-- First, clean up any existing test data
DELETE FROM public.users WHERE email IN ('test.customer@seafable.com');
DELETE FROM public.host_profiles WHERE email IN ('test.business@seafable.com');

-- Create test customer user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'test.customer@seafable.com',
  crypt('TestPassword123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"firstName": "John", "lastName": "Customer", "full_name": "John Customer"}',
  false,
  'authenticated',
  'authenticated'
);

-- Create corresponding user profile
INSERT INTO public.users (
  id,
  email,
  first_name,
  last_name,
  full_name,
  role,
  created_at,
  updated_at
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'test.customer@seafable.com'),
  'test.customer@seafable.com',
  'John',
  'Customer',
  'John Customer',
  'user',
  now(),
  now()
);

-- Create test business user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'test.business@seafable.com',
  crypt('TestPassword123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"businessName": "Test Ocean Adventures", "contactName": "Jane Business"}',
  false,
  'authenticated',
  'authenticated'
);

-- Create corresponding host profile
INSERT INTO public.host_profiles (
  id,
  user_id,
  business_name,
  contact_name,
  email,
  phone,
  business_type,
  location,
  description,
  verification_status,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  (SELECT id FROM auth.users WHERE email = 'test.business@seafable.com'),
  'Test Ocean Adventures',
  'Jane Business',
  'test.business@seafable.com',
  '+33123456789',
  'water_sports',
  'Nice, France',
  'Test business for authentication testing',
  'pending',
  now(),
  now()
);

-- Verify the test data was created
SELECT 
  'Test Users Created' as status,
  (SELECT COUNT(*) FROM public.users WHERE email LIKE 'test.%@seafable.com') as customer_users,
  (SELECT COUNT(*) FROM public.host_profiles WHERE email LIKE 'test.%@seafable.com') as business_profiles,
  (SELECT COUNT(*) FROM auth.users WHERE email LIKE 'test.%@seafable.com') as auth_users;

-- Display test credentials
SELECT 
  'TEST CREDENTIALS' as info,
  'Customer: test.customer@seafable.com / TestPassword123!' as customer_login,
  'Business: test.business@seafable.com / TestPassword123!' as business_login;
