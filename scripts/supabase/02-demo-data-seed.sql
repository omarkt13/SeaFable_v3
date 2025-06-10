-- ============================================================================
-- SEAFABLE DEMO DATA SEEDING SCRIPT
-- ============================================================================
-- This script seeds the database with demo data including:
-- - Demo user accounts with proper authentication
-- - Sample businesses and business users
-- - Water sports equipment and experiences
-- - Sample bookings and reviews
-- ============================================================================

-- First, check if user_profiles table exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles') THEN
        RAISE EXCEPTION 'user_profiles table does not exist. Please run the schema creation script first.';
    END IF;
END $$;

-- ============================================================================
-- DEMO USER ACCOUNTS
-- ============================================================================

-- Insert demo customer user profile
-- Note: The auth.users entry should be created via Supabase Auth API
-- This assumes the user already exists in auth.users with the specified ID
INSERT INTO public.user_profiles (
    id,
    email,
    first_name,
    last_name,
    phone,
    sailing_experience,
    dietary_restrictions,
    email_verified,
    role
) VALUES (
    '550e8400-e29b-41d4-a716-446655440000'::uuid, -- Demo customer UUID
    'demo@seafable.com',
    'Demo',
    'Customer',
    '+1-555-0123',
    'intermediate',
    ARRAY['vegetarian'],
    true,
    'customer'
) ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    updated_at = NOW();

-- ============================================================================
-- DEMO BUSINESSES
-- ============================================================================

-- Ocean Adventures - Main demo business
INSERT INTO public.businesses (
    id,
    name,
    description,
    business_type,
    phone,
    email,
    website,
    address,
    city,
    country,
    postal_code,
    latitude,
    longitude,
    business_hours,
    amenities,
    certifications,
    status
) VALUES (
    '660e8400-e29b-41d4-a716-446655440001'::uuid,
    'Ocean Adventures',
    'Premier water sports and sailing experiences on the Mediterranean coast. Offering everything from beginner sailing lessons to luxury yacht charters.',
    'yacht_charter',
    '+34-971-123456',
    'info@oceanadventures.com',
    'https://oceanadventures.com',
    'Marina Port Adriano, El Toro',
    'Mallorca',
    'Spain',
    '07180',
    39.5138,
    2.4891,
    '{
        "monday": {"open": "08:00", "close": "20:00"},
        "tuesday": {"open": "08:00", "close": "20:00"},
        "wednesday": {"open": "08:00", "close": "20:00"},
        "thursday": {"open": "08:00", "close": "20:00"},
        "friday": {"open": "08:00", "close": "20:00"},
        "saturday": {"open": "07:00", "close": "21:00"},
        "sunday": {"open": "07:00", "close": "21:00"}
    }',
    ARRAY['parking', 'wifi', 'restrooms', 'equipment_rental', 'refreshments', 'changing_rooms'],
    ARRAY['RYA Training Center', 'PADI Dive Center', 'ISO 9001 Certified'],
    'active'
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    updated_at = NOW();

INSERT INTO public.businesses (
    id,
    name,
    description,
    business_type,
    phone,
    email,
    website,
    address,
    city,
    country,
    postal_code,
    latitude,
    longitude,
    business_hours,
    amenities,
    certifications,
    status
) VALUES (
    '660e8400-e29b-41d4-a716-446655440002'::uuid,
    'Mediterranean Diving Center',
    'Professional diving center offering PADI courses and guided diving experiences in crystal clear Mediterranean waters.',
    'diving_center',
    '+34-971-789012',
    'dive@medcenter.com',
    'https://medcenter.com',
    'Cala Millor Beach',
    'Mallorca',
    'Spain',
    '07560',
    39.5951,
    3.3844,
    '{
        "monday": {"open": "09:00", "close": "18:00"},
        "tuesday": {"open": "09:00", "close": "18:00"},
        "wednesday": {"open": "09:00", "close": "18:00"},
        "thursday": {"open": "09:00", "close": "18:00"},
        "friday": {"open": "09:00", "close": "18:00"},
        "saturday": {"open": "08:00", "close": "19:00"},
        "sunday": {"open": "08:00", "close": "19:00"}
    }',
    ARRAY['equipment_rental', 'air_fills', 'nitrox', 'underwater_photography', 'boat_diving'],
    ARRAY['PADI 5 Star Dive Center', 'SSI Training Center'],
    'active'
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    updated_at = NOW();

-- ============================================================================
-- DEMO BUSINESS USERS
-- ============================================================================

-- Captain Rodriguez - Business owner
INSERT INTO public.business_users (
    id,
    user_id,
    business_id,
    email,
    first_name,
    last_name,
    phone,
    role,
    permissions,
    certifications,
    hire_date,
    is_active,
    email_verified
) VALUES (
    '770e8400-e29b-41d4-a716-446655440001'::uuid,
    '550e8400-e29b-41d4-a716-446655440001'::uuid, -- Business user UUID
    '660e8400-e29b-41d4-a716-446655440001'::uuid, -- Ocean Adventures
    'captain@seafable.com',
    'Captain',
    'Rodriguez',
    '+34-971-123456',
    'owner',
    ARRAY['manage_bookings', 'manage_staff', 'view_analytics', 'manage_payments', 'manage_equipment'],
    ARRAY['RYA Yachtmaster Ocean', 'MCA Commercial Endorsement', 'STCW Basic Safety Training'],
    '2020-01-15',
    true,
    true
) ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    updated_at = NOW();

INSERT INTO public.business_users (
    id,
    user_id,
    business_id,
    email,
    first_name,
    last_name,
    phone,
    role,
    permissions,
    certifications,
    hire_date,
    is_active,
    email_verified
) VALUES (
    '770e8400-e29b-41d4-a716-446655440002'::uuid,
    '550e8400-e29b-41d4-a716-446655440002'::uuid,
    '660e8400-e29b-41d4-a716-446655440001'::uuid,
    'marina@seafable.com',
    'Marina',
    'Thompson',
    '+34-971-123457',
    'manager',
    ARRAY['manage_bookings', 'view_analytics'],
    ARRAY['RYA Day Skipper', 'First Aid at Sea'],
    '2021-03-20',
    true,
    true
) ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    updated_at = NOW();

-- ============================================================================
-- DEMO EQUIPMENT/FLEET
-- ============================================================================

INSERT INTO public.equipment (
    id,
    business_id,
    name,
    type,
    brand,
    model,
    year,
    capacity,
    length_meters,
    engine_power,
    registration_number,
    status,
    hourly_rate,
    daily_rate,
    weekly_rate,
    deposit_required,
    images,
    features,
    location
) VALUES 
(
    '880e8400-e29b-41d4-a716-446655440001'::uuid,
    '660e8400-e29b-41d4-a716-446655440001'::uuid,
    'Serenity',
    'sailing_yacht',
    'Beneteau',
    'Oceanis 46.1',
    2022,
    8,
    14.60,
    57,
    'ES-7890-AB',
    'available',
    150.00,
    1200.00,
    7500.00,
    2000.00,
    ARRAY['/placeholder.svg?height=300&width=400'],
    ARRAY['GPS Navigation', 'Autopilot', 'Bow Thruster', 'Air Conditioning', 'WiFi'],
    'Marina Port Adriano - Berth A12'
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    type = EXCLUDED.type,
    updated_at = NOW();

INSERT INTO public.equipment (
    id,
    business_id,
    name,
    type,
    brand,
    model,
    year,
    capacity,
    length_meters,
    engine_power,
    registration_number,
    status,
    hourly_rate,
    daily_rate,
    weekly_rate,
    deposit_required,
    images,
    features,
    location
) VALUES 
(
    '880e8400-e29b-41d4-a716-446655440002'::uuid,
    '660e8400-e29b-41d4-a716-446655440001'::uuid,
    'Thunder Wave',
    'speedboat',
    'Sunseeker',
    'Predator 57',
    2021,
    12,
    17.50,
    1200,
    'ES-7891-CD',
    'available',
    300.00,
    2400.00,
    15000.00,
    3000.00,
    ARRAY['/placeholder.svg?height=300&width=400'],
    ARRAY['Twin Engines', 'Hydraulic Platform', 'Premium Sound System', 'Wet Bar'],
    'Marina Port Adriano - Berth B05'
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    type = EXCLUDED.type,
    updated_at = NOW();

INSERT INTO public.equipment (
    id,
    business_id,
    name,
    type,
    brand,
    model,
    year,
    capacity,
    length_meters,
    engine_power,
    registration_number,
    status,
    hourly_rate,
    daily_rate,
    weekly_rate,
    deposit_required,
    images,
    features,
    location
) VALUES 
(
    '880e8400-e29b-41d4-a716-446655440003'::uuid,
    '660e8400-e29b-41d4-a716-446655440001'::uuid,
    'Sea Explorer',
    'catamaran',
    'Lagoon',
    'Lagoon 42',
    2023,
    10,
    12.80,
    57,
    'ES-7892-EF',
    'available',
    200.00,
    1600.00,
    10000.00,
    2500.00,
    ARRAY['/placeholder.svg?height=300&width=400'],
    ARRAY['Shallow Draft', 'Large Deck Space', 'Dual Helm Stations', 'Solar Panels'],
    'Marina Port Adriano - Berth C08'
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    type = EXCLUDED.type,
    updated_at = NOW();

-- ============================================================================
-- DEMO EXPERIENCES
-- ============================================================================

-- Check if experiences table exists and has the necessary structure
DO $$
BEGIN
    -- If experiences table doesn't exist, create it
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'experiences') THEN
        CREATE TABLE public.experiences (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
            title TEXT NOT NULL,
            description TEXT,
            short_description TEXT,
            category TEXT NOT NULL CHECK (category IN (
                'sailing', 'diving', 'fishing', 'water_sports', 'boat_tours', 'surfing',
                'yacht_charter', 'sailing_lessons', 'diving_certification'
            )),
            difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'all_levels')),
            duration_hours INTEGER,
            duration_display TEXT,
            max_participants INTEGER,
            min_participants INTEGER DEFAULT 1,
            price_per_person DECIMAL(10, 2),
            group_discount_rate DECIMAL(5, 2),
            equipment_included TEXT[],
            what_to_bring TEXT[],
            meeting_point TEXT,
            cancellation_policy TEXT,
            weather_dependent BOOLEAN DEFAULT TRUE,
            seasonal_availability TEXT[],
            age_restrictions TEXT,
            fitness_requirements TEXT,
            certification_required TEXT[],
            images TEXT[],
            rating DECIMAL(3, 2) DEFAULT 0.0,
            total_reviews INTEGER DEFAULT 0,
            total_bookings INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    END IF;
END $$;

-- Insert demo experiences
INSERT INTO public.experiences (
    id,
    business_id,
    title,
    description,
    short_description,
    category,
    difficulty_level,
    duration_hours,
    duration_display,
    max_participants,
    min_participants,
    price_per_person,
    group_discount_rate,
    equipment_included,
    what_to_bring,
    meeting_point,
    cancellation_policy,
    weather_dependent,
    seasonal_availability,
    age_restrictions,
    certification_required,
    images,
    rating,
    total_reviews,
    total_bookings,
    is_active
) VALUES 
(
    '990e8400-e29b-41d4-a716-446655440001'::uuid,
    '660e8400-e29b-41d4-a716-446655440001'::uuid,
    'Sunset Sailing Adventure',
    'Experience the magic of a Mediterranean sunset aboard our luxury sailing yacht. This 3-hour journey takes you along the stunning Mallorca coastline, with opportunities to swim in crystal-clear waters and enjoy complimentary drinks and snacks.',
    'Luxury sunset sailing with swimming and refreshments',
    'sailing',
    'all_levels',
    3,
    '3 hours',
    8,
    2,
    89.00,
    10.00,
    ARRAY['Life jackets', 'Snorkeling gear', 'Towels', 'Drinks', 'Snacks'],
    ARRAY['Sunscreen', 'Hat', 'Swimwear', 'Camera'],
    'Marina Port Adriano - Berth A12',
    'Free cancellation up to 24 hours before departure',
    true,
    ARRAY['April', 'May', 'June', 'July', 'August', 'September', 'October'],
    'Minimum age 8 years',
    ARRAY[]::TEXT[],
    ARRAY['/placeholder.svg?height=300&width=400'],
    4.8,
    156,
    423,
    true
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    updated_at = NOW();

INSERT INTO public.experiences (
    id,
    business_id,
    title,
    description,
    short_description,
    category,
    difficulty_level,
    duration_hours,
    duration_display,
    max_participants,
    min_participants,
    price_per_person,
    group_discount_rate,
    equipment_included,
    what_to_bring,
    meeting_point,
    cancellation_policy,
    weather_dependent,
    seasonal_availability,
    age_restrictions,
    certification_required,
    images,
    rating,
    total_reviews,
    total_bookings,
    is_active
) VALUES 
(
    '990e8400-e29b-41d4-a716-446655440002'::uuid,
    '660e8400-e29b-41d4-a716-446655440001'::uuid,
    'High-Speed Coastal Tour',
    'Feel the adrenaline rush on our powerful speedboat as we explore hidden coves and dramatic coastlines. This action-packed 2-hour tour includes stops at secluded beaches and opportunities for cliff jumping.',
    'Thrilling speedboat adventure to hidden coves',
    'water_sports',
    'intermediate',
    2,
    '2 hours',
    12,
    4,
    125.00,
    15.00,
    ARRAY['Life jackets', 'Safety equipment', 'Snorkeling gear', 'Water'],
    ARRAY['Sunscreen', 'Swimwear', 'Secure bag for belongings'],
    'Marina Port Adriano - Berth B05',
    'Free cancellation up to 12 hours before departure',
    true,
    ARRAY['May', 'June', 'July', 'August', 'September'],
    'Minimum age 16 years, good physical condition required',
    ARRAY[]::TEXT[],
    ARRAY['/placeholder.svg?height=300&width=400'],
    4.6,
    89,
    267,
    true
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    updated_at = NOW();

INSERT INTO public.experiences (
    id,
    business_id,
    title,
    description,
    short_description,
    category,
    difficulty_level,
    duration_hours,
    duration_display,
    max_participants,
    min_participants,
    price_per_person,
    group_discount_rate,
    equipment_included,
    what_to_bring,
    meeting_point,
    cancellation_policy,
    weather_dependent,
    seasonal_availability,
    age_restrictions,
    certification_required,
    images,
    rating,
    total_reviews,
    total_bookings,
    is_active
) VALUES 
(
    '990e8400-e29b-41d4-a716-446655440003'::uuid,
    '660e8400-e29b-41d4-a716-446655440002'::uuid,
    'Discover Scuba Diving',
    'Perfect introduction to scuba diving for beginners. Our certified PADI instructors will guide you through basic skills in shallow water before exploring a beautiful reef site. All equipment included.',
    'Beginner-friendly scuba diving experience',
    'diving',
    'beginner',
    4,
    '4 hours (2 hours training + 2 hours diving)',
    6,
    1,
    95.00,
    0.00,
    ARRAY['Full diving equipment', 'Wetsuit', 'Mask and fins', 'Underwater photos'],
    ARRAY['Swimwear', 'Towel', 'Medical certificate if over 45'],
    'Mediterranean Diving Center - Cala Millor',
    'Free cancellation up to 24 hours before start',
    true,
    ARRAY['April', 'May', 'June', 'July', 'August', 'September', 'October'],
    'Minimum age 10 years, maximum age 65 years',
    ARRAY[]::TEXT[],
    ARRAY['/placeholder.svg?height=300&width=400'],
    4.9,
    234,
    567,
    true
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    updated_at = NOW();

-- ============================================================================
-- DEMO BOOKINGS
-- ============================================================================

-- Check if bookings table exists before inserting
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'bookings') THEN
        -- Insert demo booking
        INSERT INTO public.bookings (
            id,
            user_id,
            business_id,
            experience_id,
            booking_reference,
            booking_date,
            start_time,
            end_time,
            participants,
            participant_details,
            total_amount,
            deposit_amount,
            payment_status,
            booking_status,
            special_requests,
            dietary_requirements,
            emergency_contact,
            weather_insurance
        ) VALUES 
        (
            'aa0e8400-e29b-41d4-a716-446655440001'::uuid,
            '550e8400-e29b-41d4-a716-446655440000'::uuid,
            '660e8400-e29b-41d4-a716-446655440001'::uuid,
            '990e8400-e29b-41d4-a716-446655440001'::uuid,
            'SF20230615-ABCD1234',
            CURRENT_DATE + INTERVAL '7 days',
            '18:00',
            '21:00',
            2,
            '[
                {"name": "Demo Customer", "age": 32, "experience": "intermediate"},
                {"name": "Jane Smith", "age": 28, "experience": "beginner"}
            ]'::jsonb,
            178.00,
            89.00,
            'paid',
            'confirmed',
            'Celebrating anniversary',
            ARRAY['vegetarian'],
            '{"name": "John Doe", "phone": "+1-555-0199"}'::jsonb,
            true
        ) ON CONFLICT (id) DO UPDATE SET
            booking_date = EXCLUDED.booking_date,
            updated_at = NOW();
    END IF;
END $$;

-- ============================================================================
-- DEMO REVIEWS
-- ============================================================================

-- Check if reviews table exists before inserting
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'reviews') THEN
        -- Insert demo review
        INSERT INTO public.reviews (
            id,
            booking_id,
            user_id,
            business_id,
            experience_id,
            rating,
            title,
            comment,
            experience_highlights,
            would_recommend,
            verified_booking
        ) VALUES 
        (
            'bb0e8400-e29b-41d4-a716-446655440001'::uuid,
            'aa0e8400-e29b-41d4-a716-446655440001'::uuid,
            '550e8400-e29b-41d4-a716-446655440000'::uuid,
            '660e8400-e29b-41d4-a716-446655440001'::uuid,
            '990e8400-e29b-41d4-a716-446655440001'::uuid,
            5,
            'Absolutely magical sunset experience!',
            'Captain Rodriguez and his crew provided an unforgettable evening. The yacht was beautiful, the route was scenic, and the sunset was breathtaking. The snacks and drinks were a nice touch. Highly recommend for couples or small groups!',
            ARRAY['Professional crew', 'Beautiful yacht', 'Stunning sunset views', 'Great refreshments'],
            true,
            true
        ) ON CONFLICT (id) DO UPDATE SET
            rating = EXCLUDED.rating,
            comment = EXCLUDED.comment;
    END IF;
END $$;

-- ============================================================================
-- UPDATE SEQUENCES AND FINAL SETUP
-- ============================================================================

-- Update statistics for better query planning
ANALYZE public.user_profiles;
ANALYZE public.businesses;
ANALYZE public.business_users;
ANALYZE public.equipment;
ANALYZE public.experiences;
ANALYZE public.bookings;
ANALYZE public.reviews;

-- Verify data integrity
DO $$
BEGIN
    -- Check that all foreign key relationships are valid
    IF EXISTS (SELECT 1 FROM public.business_users WHERE business_id NOT IN (SELECT id FROM public.businesses)) THEN
        RAISE WARNING 'Invalid business_id references found in business_users';
    END IF;
    
    IF EXISTS (SELECT 1 FROM public.equipment WHERE business_id NOT IN (SELECT id FROM public.businesses)) THEN
        RAISE WARNING 'Invalid business_id references found in equipment';
    END IF;
    
    IF EXISTS (SELECT 1 FROM public.experiences WHERE business_id NOT IN (SELECT id FROM public.businesses)) THEN
        RAISE WARNING 'Invalid business_id references found in experiences';
    END IF;
    
    RAISE NOTICE 'Demo data seeding completed successfully!';
    RAISE NOTICE 'Demo credentials: demo@seafable.com / password123 (customer)';
    RAISE NOTICE 'Demo credentials: captain@seafable.com / password123 (business)';
END $$;
