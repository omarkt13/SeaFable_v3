-- ============================================================================
-- SEAFABLE AUTHENTICATION & BUSINESS MANAGEMENT SCHEMA
-- ============================================================================
-- This script creates the complete database schema for SeaFable's
-- authentication system and business management platform
-- ============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- AUTHENTICATION TABLES
-- ============================================================================

-- User profiles table (extends Supabase auth.users)
-- Stores additional customer information beyond basic auth
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    avatar_url TEXT,
    phone TEXT,
    date_of_birth DATE,
    nationality TEXT,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    sailing_experience TEXT CHECK (sailing_experience IN ('beginner', 'intermediate', 'advanced')),
    dietary_restrictions TEXT[],
    accessibility_needs TEXT[],
    email_verified BOOLEAN DEFAULT FALSE,
    role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Business profiles table
-- Stores water sports business information
CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    business_type TEXT NOT NULL CHECK (business_type IN (
        'sailing_school', 'yacht_charter', 'diving_center', 'fishing_charter',
        'water_sports_rental', 'marina', 'boat_tours', 'surf_school'
    )),
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    website TEXT,
    address TEXT,
    city TEXT,
    country TEXT,
    postal_code TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    business_hours JSONB,
    amenities TEXT[],
    certifications TEXT[],
    insurance_valid BOOLEAN DEFAULT TRUE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'suspended', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Business users table
-- Links users to businesses with roles and permissions
CREATE TABLE IF NOT EXISTS public.business_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    avatar_url TEXT,
    phone TEXT,
    role TEXT NOT NULL CHECK (role IN ('owner', 'manager', 'staff', 'captain', 'instructor')),
    permissions TEXT[] DEFAULT ARRAY[]::TEXT[],
    certifications TEXT[],
    hire_date DATE,
    salary DECIMAL(10, 2),
    commission_rate DECIMAL(5, 2),
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, business_id)
);

-- ============================================================================
-- WATER SPORTS SPECIFIC TABLES
-- ============================================================================

-- Equipment/Fleet table
-- Manages boats, jet skis, diving gear, etc.
CREATE TABLE IF NOT EXISTS public.equipment (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN (
        'sailing_yacht', 'motor_yacht', 'catamaran', 'speedboat', 'jet_ski',
        'diving_gear', 'fishing_equipment', 'surfboard', 'paddleboard', 'kayak'
    )),
    brand TEXT,
    model TEXT,
    year INTEGER,
    capacity INTEGER,
    length_meters DECIMAL(5, 2),
    engine_power INTEGER,
    fuel_type TEXT,
    registration_number TEXT,
    insurance_expiry DATE,
    last_maintenance DATE,
    next_maintenance DATE,
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'booked', 'maintenance', 'out_of_service')),
    hourly_rate DECIMAL(10, 2),
    daily_rate DECIMAL(10, 2),
    weekly_rate DECIMAL(10, 2),
    deposit_required DECIMAL(10, 2),
    images TEXT[],
    features TEXT[],
    location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skip creating experiences table since it already exists
-- Instead, we'll check if we need to add any missing columns to the existing table

DO $$
BEGIN
    -- Check if rating column exists in experiences table
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'experiences' AND column_name = 'rating'
    ) THEN
        -- Add rating column if it doesn't exist
        ALTER TABLE public.experiences ADD COLUMN rating DECIMAL(3, 2) DEFAULT 0.0;
    END IF;
    
    -- Check if total_reviews column exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'experiences' AND column_name = 'total_reviews'
    ) THEN
        -- Add total_reviews column if it doesn't exist
        ALTER TABLE public.experiences ADD COLUMN total_reviews INTEGER DEFAULT 0;
    END IF;
    
    -- Check if total_bookings column exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'experiences' AND column_name = 'total_bookings'
    ) THEN
        -- Add total_bookings column if it doesn't exist
        ALTER TABLE public.experiences ADD COLUMN total_bookings INTEGER DEFAULT 0;
    END IF;
END $$;

-- Bookings table
-- Customer bookings for experiences
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    business_id UUID REFERENCES public.businesses(id),
    experience_id UUID REFERENCES public.experiences(id),
    booking_reference TEXT UNIQUE NOT NULL,
    booking_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    participants INTEGER NOT NULL,
    participant_details JSONB,
    total_amount DECIMAL(10, 2) NOT NULL,
    deposit_amount DECIMAL(10, 2),
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'partially_paid', 'refunded', 'cancelled')),
    booking_status TEXT DEFAULT 'confirmed' CHECK (booking_status IN ('pending', 'confirmed', 'cancelled', 'completed', 'no_show')),
    special_requests TEXT,
    dietary_requirements TEXT[],
    emergency_contact JSONB,
    weather_insurance BOOLEAN DEFAULT FALSE,
    cancellation_reason TEXT,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
-- Customer reviews and ratings
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    booking_id UUID REFERENCES public.bookings(id),
    user_id UUID REFERENCES auth.users(id),
    business_id UUID REFERENCES public.businesses(id),
    experience_id UUID REFERENCES public.experiences(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT,
    experience_highlights TEXT[],
    would_recommend BOOLEAN DEFAULT TRUE,
    verified_booking BOOLEAN DEFAULT TRUE,
    helpful_votes INTEGER DEFAULT 0,
    response_from_business TEXT,
    response_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- User profiles indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);

-- Business indexes
CREATE INDEX IF NOT EXISTS idx_businesses_type ON public.businesses(business_type);
CREATE INDEX IF NOT EXISTS idx_businesses_status ON public.businesses(status);
CREATE INDEX IF NOT EXISTS idx_businesses_location ON public.businesses(city, country);

-- Business users indexes
CREATE INDEX IF NOT EXISTS idx_business_users_business_id ON public.business_users(business_id);
CREATE INDEX IF NOT EXISTS idx_business_users_role ON public.business_users(role);
CREATE INDEX IF NOT EXISTS idx_business_users_active ON public.business_users(is_active);

-- Equipment indexes
CREATE INDEX IF NOT EXISTS idx_equipment_business_id ON public.equipment(business_id);
CREATE INDEX IF NOT EXISTS idx_equipment_type ON public.equipment(type);
CREATE INDEX IF NOT EXISTS idx_equipment_status ON public.equipment(status);

-- Experiences indexes
CREATE INDEX IF NOT EXISTS idx_experiences_business_id ON public.experiences(business_id);
CREATE INDEX IF NOT EXISTS idx_experiences_category ON public.experiences(category);
CREATE INDEX IF NOT EXISTS idx_experiences_active ON public.experiences(is_active);
CREATE INDEX IF NOT EXISTS idx_experiences_rating ON public.experiences(rating);

-- Bookings indexes
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_business_id ON public.bookings(business_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(booking_status);
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON public.bookings(booking_reference);

-- Reviews indexes
CREATE INDEX IF NOT EXISTS idx_reviews_business_id ON public.reviews(business_id);
CREATE INDEX IF NOT EXISTS idx_reviews_experience_id ON public.reviews(experience_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE IF EXISTS public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.business_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.reviews ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Anyone can view active businesses" ON public.businesses;
DROP POLICY IF EXISTS "Business users can view own business data" ON public.business_users;
DROP POLICY IF EXISTS "Anyone can view available equipment" ON public.equipment;
DROP POLICY IF EXISTS "Business users can manage equipment" ON public.equipment;
DROP POLICY IF EXISTS "Anyone can view active experiences" ON public.experiences;
DROP POLICY IF EXISTS "Business users can manage experiences" ON public.experiences;
DROP POLICY IF EXISTS "Users can view own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can create reviews for own bookings" ON public.reviews;

-- User profiles policies
CREATE POLICY "Users can view own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Business policies
CREATE POLICY "Anyone can view active businesses" ON public.businesses
    FOR SELECT USING (status = 'active');

-- Business users policies
CREATE POLICY "Business users can view own business data" ON public.business_users
    FOR SELECT USING (
        user_id = auth.uid() OR 
        business_id IN (
            SELECT business_id FROM public.business_users 
            WHERE user_id = auth.uid() AND is_active = true
        )
    );

-- Equipment policies
CREATE POLICY "Anyone can view available equipment" ON public.equipment
    FOR SELECT USING (status = 'available');

CREATE POLICY "Business users can manage equipment" ON public.equipment
    FOR ALL USING (
        business_id IN (
            SELECT business_id FROM public.business_users 
            WHERE user_id = auth.uid() AND is_active = true
        )
    );

-- Experiences policies
CREATE POLICY "Anyone can view active experiences" ON public.experiences
    FOR SELECT USING (is_active = true);

CREATE POLICY "Business users can manage experiences" ON public.experiences
    FOR ALL USING (
        business_id IN (
            SELECT business_id FROM public.business_users 
            WHERE user_id = auth.uid() AND is_active = true
        )
    );

-- Bookings policies
CREATE POLICY "Users can view own bookings" ON public.bookings
    FOR SELECT USING (
        user_id = auth.uid() OR 
        business_id IN (
            SELECT business_id FROM public.business_users 
            WHERE user_id = auth.uid() AND is_active = true
        )
    );

CREATE POLICY "Users can create bookings" ON public.bookings
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON public.reviews
    FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for own bookings" ON public.reviews
    FOR INSERT WITH CHECK (
        user_id = auth.uid() AND 
        booking_id IN (SELECT id FROM public.bookings WHERE user_id = auth.uid())
    );

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers to avoid conflicts
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
DROP TRIGGER IF EXISTS update_businesses_updated_at ON public.businesses;
DROP TRIGGER IF EXISTS update_business_users_updated_at ON public.business_users;
DROP TRIGGER IF EXISTS update_equipment_updated_at ON public.equipment;
DROP TRIGGER IF EXISTS update_experiences_updated_at ON public.experiences;
DROP TRIGGER IF EXISTS update_bookings_updated_at ON public.bookings;

-- Apply updated_at triggers to all tables
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON public.businesses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_business_users_updated_at BEFORE UPDATE ON public.business_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_equipment_updated_at BEFORE UPDATE ON public.equipment
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON public.experiences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate booking reference
CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TRIGGER AS $$
BEGIN
    NEW.booking_reference = 'SF' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(gen_random_uuid()::text, 1, 8));
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS generate_booking_reference_trigger ON public.bookings;
CREATE TRIGGER generate_booking_reference_trigger BEFORE INSERT ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION generate_booking_reference();

-- Function to update experience ratings
CREATE OR REPLACE FUNCTION update_experience_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.experiences 
    SET 
        rating = (
            SELECT ROUND(AVG(rating)::numeric, 2) 
            FROM public.reviews 
            WHERE experience_id = NEW.experience_id
        ),
        total_reviews = (
            SELECT COUNT(*) 
            FROM public.reviews 
            WHERE experience_id = NEW.experience_id
        )
    WHERE id = NEW.experience_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_experience_rating_trigger ON public.reviews;
CREATE TRIGGER update_experience_rating_trigger AFTER INSERT ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION update_experience_rating();
