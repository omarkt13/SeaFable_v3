-- Create the main database tables for SeaFable platform

-- Captains table
CREATE TABLE captains (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    bio TEXT,
    avatar_url VARCHAR(500),
    years_experience INTEGER,
    languages TEXT[], -- Array of languages spoken
    specialties TEXT[], -- Array of specialties
    certifications TEXT[], -- Array of certifications
    rating DECIMAL(3,2) DEFAULT 0.0,
    total_reviews INTEGER DEFAULT 0,
    location VARCHAR(255),
    country VARCHAR(100),
    vessel_name VARCHAR(255),
    vessel_type VARCHAR(100),
    vessel_capacity INTEGER,
    vessel_year INTEGER,
    insurance_valid BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    avatar_url VARCHAR(500),
    date_of_birth DATE,
    nationality VARCHAR(100),
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(50),
    sailing_experience VARCHAR(50), -- beginner, intermediate, advanced
    dietary_restrictions TEXT[],
    accessibility_needs TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Experiences table
CREATE TABLE experiences (
    id SERIAL PRIMARY KEY,
    captain_id INTEGER REFERENCES captains(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    location VARCHAR(255),
    country VARCHAR(100),
    departure_marina VARCHAR(255),
    duration_hours INTEGER,
    duration_display VARCHAR(50),
    max_guests INTEGER,
    min_guests INTEGER DEFAULT 1,
    price_per_person DECIMAL(10,2),
    difficulty_level VARCHAR(50), -- beginner, intermediate, advanced
    category VARCHAR(100), -- cultural, adventure, culinary, wildlife, etc.
    included_amenities TEXT[],
    what_to_bring TEXT[],
    cancellation_policy TEXT,
    weather_dependent BOOLEAN DEFAULT true,
    seasonal_availability TEXT[], -- months when available
    rating DECIMAL(3,2) DEFAULT 0.0,
    total_reviews INTEGER DEFAULT 0,
    total_bookings INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Experience images table
CREATE TABLE experience_images (
    id SERIAL PRIMARY KEY,
    experience_id INTEGER REFERENCES experiences(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Experience itinerary table
CREATE TABLE experience_itinerary (
    id SERIAL PRIMARY KEY,
    experience_id INTEGER REFERENCES experiences(id) ON DELETE CASCADE,
    step_order INTEGER NOT NULL,
    time_start VARCHAR(10), -- e.g., "09:00"
    duration_minutes INTEGER,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    activities TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    experience_id INTEGER REFERENCES experiences(id),
    captain_id INTEGER REFERENCES captains(id),
    booking_date DATE NOT NULL,
    departure_time TIME,
    number_of_guests INTEGER NOT NULL,
    guest_names TEXT[],
    guest_ages INTEGER[],
    total_price DECIMAL(10,2),
    booking_status VARCHAR(50) DEFAULT 'confirmed', -- pending, confirmed, cancelled, completed
    special_requests TEXT,
    dietary_requirements TEXT[],
    payment_status VARCHAR(50) DEFAULT 'paid', -- pending, paid, refunded
    weather_insurance BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id),
    user_id INTEGER REFERENCES users(id),
    experience_id INTEGER REFERENCES experiences(id),
    captain_id INTEGER REFERENCES captains(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    experience_highlights TEXT[],
    would_recommend BOOLEAN DEFAULT true,
    verified_booking BOOLEAN DEFAULT true,
    helpful_votes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Weather data table (for historical and forecast data)
CREATE TABLE weather_data (
    id SERIAL PRIMARY KEY,
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_experiences_captain_id ON experiences(captain_id);
CREATE INDEX idx_experiences_location ON experiences(location);
CREATE INDEX idx_experiences_country ON experiences(country);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_experience_id ON bookings(experience_id);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_reviews_experience_id ON reviews(experience_id);
CREATE INDEX idx_weather_location_date ON weather_data(location, date);
