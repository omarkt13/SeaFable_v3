-- ============================================================================
-- SEAFABLE DEMO AUTHENTICATION USERS SETUP
-- ============================================================================
-- This script creates demo users in Supabase Auth for testing purposes
-- Run this after setting up the schema and before seeding demo data
-- ============================================================================

-- Note: These INSERT statements should be run in the Supabase SQL editor
-- or via the Supabase CLI to properly create auth.users entries

-- ============================================================================
-- CREATE DEMO CUSTOMER USER
-- ============================================================================

-- Check if auth.users table exists and is accessible
DO $$
BEGIN
    -- This will raise an exception if the auth schema is not accessible
    PERFORM 1 FROM information_schema.schemata WHERE schema_name = 'auth';
    
    -- If we get here, auth schema exists, now check for users table
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'auth' AND table_name = 'users'
    ) THEN
        RAISE NOTICE 'auth.users table does not exist or is not accessible. This script must be run with appropriate permissions.';
        RETURN;
    END IF;
    
    -- Continue with the script if auth.users exists
    RAISE NOTICE 'auth.users table exists and is accessible. Proceeding with demo user creation.';
END $$;

-- Insert demo customer into auth.users
-- This creates the authentication record for demo@seafable.com
INSERT INTO auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    phone_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    reauthentication_sent_at
) VALUES (
    '550e8400-e29b-41d4-a716-446655440000'::uuid,
    '00000000-0000-0000-0000-000000000000'::uuid,
    'authenticated',
    'authenticated',
    'demo@seafable.com',
    crypt('password123', gen_salt('bf')), -- Encrypted password
    NOW(),
    NULL,
    '',
    NULL,
    '',
    NULL,
    '',
    '',
    NULL,
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{"first_name": "Demo", "last_name": "Customer"}',
    FALSE,
    NOW(),
    NOW(),
    NULL,
    NULL,
    '',
    '',
    NULL,
    '',
    0,
    NULL,
    '',
    NULL
) ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = NOW();

-- ============================================================================
-- CREATE DEMO BUSINESS USER
-- ============================================================================

-- Insert demo business user into auth.users
-- This creates the authentication record for captain@seafable.com
INSERT INTO auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    phone_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    reauthentication_sent_at
) VALUES (
    '550e8400-e29b-41d4-a716-446655440001'::uuid,
    '00000000-0000-0000-0000-000000000000'::uuid,
    'authenticated',
    'authenticated',
    'captain@seafable.com',
    crypt('password123', gen_salt('bf')), -- Encrypted password
    NOW(),
    NULL,
    '',
    NULL,
    '',
    NULL,
    '',
    '',
    NULL,
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{"first_name": "Captain", "last_name": "Rodriguez", "business_name": "Ocean Adventures"}',
    FALSE,
    NOW(),
    NOW(),
    NULL,
    NULL,
    '',
    '',
    NULL,
    '',
    0,
    NULL,
    '',
    NULL
) ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = NOW();

-- ============================================================================
-- CREATE ADDITIONAL DEMO USERS
-- ============================================================================

-- Demo manager user
INSERT INTO auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
) VALUES (
    '550e8400-e29b-41d4-a716-446655440002'::uuid,
    '00000000-0000-0000-0000-000000000000'::uuid,
    'authenticated',
    'authenticated',
    'marina@seafable.com',
    crypt('password123', gen_salt('bf')),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{"first_name": "Marina", "last_name": "Thompson"}',
    NOW(),
    NOW()
) ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    updated_at = NOW();

-- ============================================================================
-- VERIFY DEMO USERS CREATION
-- ============================================================================

-- Check that demo users were created successfully
DO $$
BEGIN
    -- Verify customer user
    IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'demo@seafable.com') THEN
        RAISE NOTICE 'Demo customer user created successfully: demo@seafable.com';
    ELSE
        RAISE WARNING 'Demo customer user was not created successfully';
    END IF;
    
    -- Verify business user
    IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'captain@seafable.com') THEN
        RAISE NOTICE 'Demo business user created successfully: captain@seafable.com';
    ELSE
        RAISE WARNING 'Demo business user was not created successfully';
    END IF;
    
    -- Verify manager user
    IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'marina@seafable.com') THEN
        RAISE NOTICE 'Demo manager user created successfully: marina@seafable.com';
    ELSE
        RAISE WARNING 'Demo manager user was not created successfully';
    END IF;
    
    RAISE NOTICE 'Demo authentication users setup completed!';
    RAISE NOTICE 'Demo customer: demo@seafable.com / password123';
    RAISE NOTICE 'Demo business owner: captain@seafable.com / password123';
    RAISE NOTICE 'Demo manager: marina@seafable.com / password123';
END $$;
