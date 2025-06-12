-- Improve database structure with better constraints, indexes, and audit fields

-- Add audit fields to all tables
ALTER TABLE captains ADD COLUMN IF NOT EXISTS created_by INTEGER;
ALTER TABLE captains ADD COLUMN IF NOT EXISTS updated_by INTEGER;

ALTER TABLE users ADD COLUMN IF NOT EXISTS created_by INTEGER;
ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_by INTEGER;

ALTER TABLE experiences ADD COLUMN IF NOT EXISTS created_by INTEGER;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS updated_by INTEGER;

ALTER TABLE bookings ADD COLUMN IF NOT EXISTS created_by INTEGER;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS updated_by INTEGER;

-- Add proper foreign key constraints
ALTER TABLE experiences 
ADD CONSTRAINT fk_experiences_captain 
FOREIGN KEY (captain_id) REFERENCES captains(id) ON DELETE CASCADE;

ALTER TABLE bookings 
ADD CONSTRAINT fk_bookings_user 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE bookings 
ADD CONSTRAINT fk_bookings_experience 
FOREIGN KEY (experience_id) REFERENCES experiences(id) ON DELETE CASCADE;

ALTER TABLE bookings 
ADD CONSTRAINT fk_bookings_captain 
FOREIGN KEY (captain_id) REFERENCES captains(id) ON DELETE CASCADE;

ALTER TABLE reviews 
ADD CONSTRAINT fk_reviews_booking 
FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE;

ALTER TABLE reviews 
ADD CONSTRAINT fk_reviews_user 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE reviews 
ADD CONSTRAINT fk_reviews_experience 
FOREIGN KEY (experience_id) REFERENCES experiences(id) ON DELETE CASCADE;

ALTER TABLE reviews 
ADD CONSTRAINT fk_reviews_captain 
FOREIGN KEY (captain_id) REFERENCES captains(id) ON DELETE CASCADE;

-- Add check constraints for data integrity
ALTER TABLE experiences 
ADD CONSTRAINT chk_experiences_price_positive 
CHECK (price_per_person > 0);

ALTER TABLE experiences 
ADD CONSTRAINT chk_experiences_guests_valid 
CHECK (max_guests >= min_guests AND min_guests > 0);

ALTER TABLE experiences 
ADD CONSTRAINT chk_experiences_duration_positive 
CHECK (duration_hours > 0);

ALTER TABLE bookings 
ADD CONSTRAINT chk_bookings_guests_positive 
CHECK (number_of_guests > 0);

ALTER TABLE bookings 
ADD CONSTRAINT chk_bookings_price_positive 
CHECK (total_price >= 0);

ALTER TABLE reviews 
ADD CONSTRAINT chk_reviews_rating_valid 
CHECK (rating >= 1 AND rating <= 5);

ALTER TABLE captains 
ADD CONSTRAINT chk_captains_experience_positive 
CHECK (years_experience >= 0);

ALTER TABLE captains 
ADD CONSTRAINT chk_captains_rating_valid 
CHECK (rating >= 0 AND rating <= 5);

-- Create comprehensive indexes for better performance
CREATE INDEX IF NOT EXISTS idx_experiences_location_country ON experiences(location, country);
CREATE INDEX IF NOT EXISTS idx_experiences_price_range ON experiences(price_per_person);
CREATE INDEX IF NOT EXISTS idx_experiences_category_difficulty ON experiences(category, difficulty_level);
CREATE INDEX IF NOT EXISTS idx_experiences_rating_reviews ON experiences(rating DESC, total_reviews DESC);
CREATE INDEX IF NOT EXISTS idx_experiences_availability ON experiences(seasonal_availability);

CREATE INDEX IF NOT EXISTS idx_bookings_date_status ON bookings(booking_date, booking_status);
CREATE INDEX IF NOT EXISTS idx_bookings_user_status ON bookings(user_id, booking_status);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);

CREATE INDEX IF NOT EXISTS idx_reviews_experience_rating ON reviews(experience_id, rating);
CREATE INDEX IF NOT EXISTS idx_reviews_captain_rating ON reviews(captain_id, rating);
CREATE INDEX IF NOT EXISTS idx_reviews_verified ON reviews(verified_booking, created_at);

CREATE INDEX IF NOT EXISTS idx_captains_location_rating ON captains(location, rating DESC);
CREATE INDEX IF NOT EXISTS idx_captains_specialties ON captains USING GIN(specialties);

CREATE INDEX IF NOT EXISTS idx_weather_location_date ON weather_data(location, date DESC);

-- Create full-text search indexes
CREATE INDEX IF NOT EXISTS idx_experiences_search ON experiences USING GIN(
  to_tsvector('english', title || ' ' || description || ' ' || location)
);

CREATE INDEX IF NOT EXISTS idx_captains_search ON captains USING GIN(
  to_tsvector('english', name || ' ' || bio || ' ' || location)
);

-- Create materialized view for search performance
CREATE MATERIALIZED VIEW IF NOT EXISTS experience_search_materialized AS
SELECT 
    e.id,
    e.title,
    e.description,
    e.short_description,
    e.location,
    e.country,
    e.duration_hours,
    e.duration_display,
    e.max_guests,
    e.min_guests,
    e.price_per_person,
    e.difficulty_level,
    e.category,
    e.rating,
    e.total_reviews,
    e.total_bookings,
    e.seasonal_availability,
    c.name as captain_name,
    c.avatar_url as captain_avatar,
    c.rating as captain_rating,
    c.specialties as captain_specialties,
    c.vessel_name,
    c.vessel_type,
    c.vessel_capacity,
    ei.image_url as primary_image,
    ARRAY_AGG(DISTINCT ei2.image_url) FILTER (WHERE ei2.image_url IS NOT NULL) as all_images,
    to_tsvector('english', e.title || ' ' || e.description || ' ' || e.location || ' ' || c.name) as search_vector
FROM experiences e
JOIN captains c ON e.captain_id = c.id
LEFT JOIN experience_images ei ON e.id = ei.experience_id AND ei.is_primary = true
LEFT JOIN experience_images ei2 ON e.id = ei2.experience_id
GROUP BY e.id, c.id, ei.image_url;

-- Create index on the materialized view
CREATE INDEX IF NOT EXISTS idx_experience_search_materialized_search 
ON experience_search_materialized USING GIN(search_vector);

CREATE INDEX IF NOT EXISTS idx_experience_search_materialized_filters 
ON experience_search_materialized(category, difficulty_level, price_per_person, rating);

-- Create function to refresh the materialized view
CREATE OR REPLACE FUNCTION refresh_experience_search()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY experience_search_materialized;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-refresh materialized view when data changes
CREATE OR REPLACE FUNCTION trigger_refresh_experience_search()
RETURNS trigger AS $$
BEGIN
    PERFORM refresh_experience_search();
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Add triggers (commented out for now as they can be expensive)
-- CREATE TRIGGER trigger_experiences_refresh_search
--     AFTER INSERT OR UPDATE OR DELETE ON experiences
--     FOR EACH STATEMENT EXECUTE FUNCTION trigger_refresh_experience_search();

-- Add data validation functions
CREATE OR REPLACE FUNCTION validate_booking_capacity(
    p_experience_id INTEGER,
    p_number_of_guests INTEGER
) RETURNS BOOLEAN AS $$
DECLARE
    max_capacity INTEGER;
BEGIN
    SELECT max_guests INTO max_capacity 
    FROM experiences 
    WHERE id = p_experience_id;
    
    RETURN p_number_of_guests <= max_capacity;
END;
$$ LANGUAGE plpgsql;

-- Add function to calculate experience rating
CREATE OR REPLACE FUNCTION update_experience_rating(p_experience_id INTEGER)
RETURNS void AS $$
DECLARE
    avg_rating DECIMAL(3,2);
    review_count INTEGER;
BEGIN
    SELECT 
        ROUND(AVG(rating::numeric), 1),
        COUNT(*)
    INTO avg_rating, review_count
    FROM reviews 
    WHERE experience_id = p_experience_id;
    
    UPDATE experiences 
    SET 
        rating = COALESCE(avg_rating, 0),
        total_reviews = review_count,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_experience_id;
END;
$$ LANGUAGE plpgsql;

-- Add function to update captain rating
CREATE OR REPLACE FUNCTION update_captain_rating(p_captain_id INTEGER)
RETURNS void AS $$
DECLARE
    avg_rating DECIMAL(3,2);
    review_count INTEGER;
BEGIN
    SELECT 
        ROUND(AVG(rating::numeric), 1),
        COUNT(*)
    INTO avg_rating, review_count
    FROM reviews 
    WHERE captain_id = p_captain_id;
    
    UPDATE captains 
    SET 
        rating = COALESCE(avg_rating, 0),
        total_reviews = review_count,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_captain_id;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update ratings when reviews change
CREATE OR REPLACE FUNCTION trigger_update_ratings()
RETURNS trigger AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        PERFORM update_experience_rating(NEW.experience_id);
        PERFORM update_captain_rating(NEW.captain_id);
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        PERFORM update_experience_rating(OLD.experience_id);
        PERFORM update_captain_rating(OLD.captain_id);
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_reviews_update_ratings
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW EXECUTE FUNCTION trigger_update_ratings();

-- Add performance monitoring
CREATE TABLE IF NOT EXISTS query_performance_log (
    id SERIAL PRIMARY KEY,
    query_type VARCHAR(100),
    execution_time_ms INTEGER,
    parameters JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Refresh the materialized view initially
SELECT refresh_experience_search();
