-- SQL Script: 01-create-tables.sql
-- Description: Creates all necessary tables for the SeaFable platform,
--              including users, host profiles, experiences, bookings, and reviews.
--              Ensures UUIDs for primary keys, proper foreign key constraints,
--              and timestamp triggers for maintainability.

-- Drop existing tables in reverse order of dependency to ensure clean recreation
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS itinerary_steps CASCADE;
DROP TABLE IF EXISTS experience_images CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS host_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS weather_data CASCADE; -- Keep weather data if still relevant for weather contingency

-- Trigger function to update 'updated_at' column automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Stores hashed passwords
    avatar_url TEXT,
    role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'host', 'admin')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- HostProfiles Table (Renamed from Captains)
CREATE TABLE IF NOT EXISTS host_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE, -- Link to a user account
    name VARCHAR(200) NOT NULL, -- Can be individual name or company name
    bio TEXT,
    avatar_url TEXT,
    years_experience INT CHECK (years_experience >= 0),
    certifications TEXT[], -- Array of strings for certifications
    specialties TEXT[], -- Array of strings for specialties
    rating NUMERIC(2,1) DEFAULT 0.0 CHECK (rating >= 0.0 AND rating <= 5.0),
    total_reviews INT DEFAULT 0 CHECK (total_reviews >= 0),
    host_type VARCHAR(50) NOT NULL CHECK (host_type IN ('captain', 'instructor', 'guide', 'company', 'individual_operator')),
    languages_spoken TEXT[],
    business_name VARCHAR(255), -- Optional, if host_type is company or individual_operator
    business_registration_id VARCHAR(100), -- Optional
    insurance_details TEXT, -- Optional
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER update_host_profiles_updated_at BEFORE UPDATE ON host_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE INDEX IF NOT EXISTS idx_host_profiles_user_id ON host_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_host_profiles_type ON host_profiles(host_type);
CREATE INDEX IF NOT EXISTS idx_host_profiles_rating ON host_profiles(rating DESC);
CREATE INDEX IF NOT EXISTS idx_host_profiles_specialties ON host_profiles USING GIN(specialties);

-- Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    host_id UUID NOT NULL REFERENCES host_profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    short_description TEXT,
    location VARCHAR(255), -- General area (e.g., "Nice")
    specific_location VARCHAR(255), -- More precise location (e.g., "Baie des Anges")
    country VARCHAR(100),
    activity_type VARCHAR(50) NOT NULL, -- e.g., 'sailing', 'surfing', 'kayaking', 'diving', 'paddleboarding'
    category TEXT[] NOT NULL, -- Array of experience categories (e.g., ['luxury', 'adventure', 'eco_tour'])
    duration_hours NUMERIC(4,1) CHECK (duration_hours > 0),
    duration_display VARCHAR(100), -- e.g., "3 hours", "Half-day"
    max_guests INT CHECK (max_guests > 0),
    min_guests INT DEFAULT 1 CHECK (min_guests > 0 AND min_guests <= max_guests),
    price_per_person NUMERIC(10,2) CHECK (price_per_person >= 0),
    difficulty_level VARCHAR(50) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'all_levels')),
    rating NUMERIC(2,1) DEFAULT 0.0 CHECK (rating >= 0.0 AND rating <= 5.0),
    total_reviews INT DEFAULT 0 CHECK (total_reviews >= 0),
    total_bookings INT DEFAULT 0 CHECK (total_bookings >= 0),
    primary_image_url TEXT,
    weather_contingency TEXT, -- Details on what happens if weather is bad
    included_amenities TEXT[],
    what_to_bring TEXT[],
    min_age INT CHECK (min_age >= 0),
    max_age INT,
    age_restriction_details TEXT,
    activity_specific_details JSONB, -- Flexible JSONB for unique details per activity type
    tags TEXT[], -- Keywords for search
    seasonal_availability TEXT[], -- e.g., ["May", "June", "July"]
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE INDEX IF NOT EXISTS idx_experiences_host_id ON experiences(host_id);
CREATE INDEX IF NOT EXISTS idx_experiences_activity_type ON experiences(activity_type);
CREATE INDEX IF NOT EXISTS idx_experiences_location_country ON experiences(location, country);
CREATE INDEX IF NOT EXISTS idx_experiences_price_per_person ON experiences(price_per_person);
CREATE INDEX IF NOT EXISTS idx_experiences_difficulty_level ON experiences(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_experiences_rating ON experiences(rating DESC);
CREATE INDEX IF NOT EXISTS idx_experiences_category ON experiences USING GIN(category);
CREATE INDEX IF NOT EXISTS idx_experiences_tags ON experiences USING GIN(tags);

-- Experience Images Table
CREATE TABLE IF NOT EXISTS experience_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experience_id UUID NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_experience_images_experience_id ON experience_images(experience_id);

-- Itinerary Steps Table (Renamed from experience_itinerary)
CREATE TABLE IF NOT EXISTS itinerary_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experience_id UUID NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
    step_order INT NOT NULL CHECK (step_order > 0),
    time_estimate VARCHAR(100), -- e.g., "09:00", "Morning"
    duration_minutes INT CHECK (duration_minutes > 0),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    activities_in_step TEXT[], -- e.g., ["Snorkeling", "Beach walk"]
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (experience_id, step_order) -- Ensures unique order per experience
);
CREATE INDEX IF NOT EXISTS idx_itinerary_steps_experience_id ON itinerary_steps(experience_id);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    experience_id UUID NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
    host_id UUID NOT NULL REFERENCES host_profiles(id) ON DELETE CASCADE,
    booking_date DATE NOT NULL, -- The date of the experience
    departure_time TIME, -- Specific time if applicable
    number_of_guests INT NOT NULL CHECK (number_of_guests > 0),
    guest_details JSONB, -- Stores array of {name, age, special_requests} for each guest
    total_price NUMERIC(10,2) NOT NULL CHECK (total_price >= 0),
    booking_status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (booking_status IN ('pending', 'confirmed', 'cancelled_user', 'cancelled_host', 'completed', 'rescheduled')),
    special_requests TEXT, -- General requests for the booking
    dietary_requirements TEXT[],
    payment_id VARCHAR(255), -- Transaction ID from payment gateway
    payment_method VARCHAR(100),
    payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'succeeded', 'failed', 'refunded')),
    amount_paid NUMERIC(10,2),
    currency VARCHAR(10) DEFAULT 'USD',
    booked_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, -- When the booking was made
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_experience_id ON bookings(experience_id);
CREATE INDEX IF NOT EXISTS idx_bookings_host_id ON bookings(host_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date_status ON bookings(booking_date, booking_status);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID UNIQUE NOT NULL REFERENCES bookings(id) ON DELETE CASCADE, -- One review per booking
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    experience_id UUID NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,
    host_id UUID NOT NULL REFERENCES host_profiles(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    pros TEXT[], -- What the user liked
    cons TEXT[], -- What the user disliked
    would_recommend BOOLEAN,
    verified_booking BOOLEAN DEFAULT TRUE, -- True if linked to a completed booking
    helpful_votes INT DEFAULT 0 CHECK (helpful_votes >= 0),
    response_from_host_comment TEXT,
    response_from_host_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE INDEX IF NOT EXISTS idx_reviews_experience_id ON reviews(experience_id);
CREATE INDEX IF NOT EXISTS idx_reviews_host_id ON reviews(host_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating DESC);

-- Weather data table (for historical and forecast data)
CREATE TABLE IF NOT EXISTS weather_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  temperature_celsius INTEGER,
  wind_speed_knots INTEGER,
  wind_direction VARCHAR(10),
  wave_height_meters DECIMAL(3,1),
  weather_condition VARCHAR(50), -- sunny, cloudy, rainy, stormy
  visibility_km INTEGER,
  precipitation_chance INTEGER,
  sailing_conditions VARCHAR(50), -- excellent, good, fair, poor
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_weather_location_date ON weather_data(location, date DESC);

-- Log table creation
CREATE TABLE IF NOT EXISTS schema_migrations (
    version VARCHAR(255) PRIMARY KEY,
    applied_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO schema_migrations (version) VALUES ('01-create-tables-' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDDHH24MISSMS'))
ON CONFLICT (version) DO NOTHING;
