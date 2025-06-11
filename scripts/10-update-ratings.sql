-- SQL Script: 10-update-ratings.sql
-- Description: Contains functions, triggers, and views for managing ratings
--              and search performance. Reflects the updated schema (host_profiles, etc.).

-- Function to update experience rating based on reviews
CREATE OR REPLACE FUNCTION update_experience_rating(p_experience_id UUID)
RETURNS void AS $$
DECLARE
    avg_rating NUMERIC(2,1);
    review_count INT;
BEGIN
    SELECT
        ROUND(AVG(rating::numeric), 1),
        COUNT(*)
    INTO avg_rating, review_count
    FROM reviews
    WHERE experience_id = p_experience_id;

    UPDATE experiences
    SET
        rating = COALESCE(avg_rating, 0.0),
        total_reviews = COALESCE(review_count, 0),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_experience_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update host rating based on reviews
CREATE OR REPLACE FUNCTION update_host_rating(p_host_id UUID)
RETURNS void AS $$
DECLARE
    avg_rating NUMERIC(2,1);
    review_count INT;
BEGIN
    SELECT
        ROUND(AVG(rating::numeric), 1),
        COUNT(*)
    INTO avg_rating, review_count
    FROM reviews
    WHERE host_id = p_host_id;

    UPDATE host_profiles
    SET
        rating = COALESCE(avg_rating, 0.0),
        total_reviews = COALESCE(review_count, 0),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_host_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to auto-update ratings when reviews change
CREATE OR REPLACE FUNCTION trigger_update_ratings()
RETURNS trigger AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        PERFORM update_experience_rating(NEW.experience_id);
        PERFORM update_host_rating(NEW.host_id);
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        PERFORM update_experience_rating(OLD.experience_id);
        PERFORM update_host_rating(OLD.host_id);
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to reviews table
DROP TRIGGER IF EXISTS trigger_reviews_update_ratings ON reviews;
CREATE TRIGGER trigger_reviews_update_ratings
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW EXECUTE FUNCTION trigger_update_ratings();

-- Create view for experience search with all related data (for simpler queries)
CREATE OR REPLACE VIEW experience_search_view AS
SELECT
    e.id,
    e.title,
    e.description,
    e.short_description,
    e.location,
    e.specific_location,
    e.country,
    e.activity_type,
    e.category,
    e.duration_hours,
    e.duration_display,
    e.max_guests,
    e.min_guests,
    e.price_per_person,
    e.difficulty_level,
    e.rating,
    e.total_reviews,
    e.total_bookings,
    e.seasonal_availability,
    e.included_amenities,
    e.what_to_bring,
    e.min_age,
    e.max_age,
    e.activity_specific_details,
    e.tags,
    hp.name as host_name,
    hp.avatar_url as host_avatar,
    hp.rating as host_rating,
    hp.specialties as host_specialties,
    hp.host_type,
    ei.image_url as primary_image_url,
    ARRAY_AGG(DISTINCT ei2.image_url ORDER BY ei2.display_order) FILTER (WHERE ei2.image_url IS NOT NULL) as all_images
FROM experiences e
JOIN host_profiles hp ON e.host_id = hp.id
LEFT JOIN experience_images ei ON e.id = ei.experience_id AND ei.display_order = 1 -- Assuming display_order 1 is primary
LEFT JOIN experience_images ei2 ON e.id = ei2.experience_id
GROUP BY e.id, hp.id, ei.image_url;

-- Create materialized view for search performance (for complex, frequently queried data)
-- This view should be refreshed periodically or via triggers
DROP MATERIALIZED VIEW IF EXISTS experience_search_materialized;
CREATE MATERIALIZED VIEW IF NOT EXISTS experience_search_materialized AS
SELECT
    e.id,
    e.title,
    e.description,
    e.short_description,
    e.location,
    e.specific_location,
    e.country,
    e.activity_type,
    e.category,
    e.duration_hours,
    e.duration_display,
    e.max_guests,
    e.min_guests,
    e.price_per_person,
    e.difficulty_level,
    e.rating,
    e.total_reviews,
    e.total_bookings,
    e.seasonal_availability,
    e.included_amenities,
    e.what_to_bring,
    e.min_age,
    e.max_age,
    e.activity_specific_details,
    e.tags,
    hp.name as host_name,
    hp.avatar_url as host_avatar,
    hp.rating as host_rating,
    hp.specialties as host_specialties,
    hp.host_type,
    ei.image_url as primary_image_url,
    ARRAY_AGG(DISTINCT ei2.image_url ORDER BY ei2.display_order) FILTER (WHERE ei2.image_url IS NOT NULL) as all_images,
    to_tsvector('english', e.title || ' ' || e.description || ' ' || e.location || ' ' || e.country || ' ' || e.activity_type || ' ' || array_to_string(e.category, ' ') || ' ' || array_to_string(e.tags, ' ') || ' ' || hp.name || ' ' || array_to_string(hp.specialties, ' ')) as search_vector
FROM experiences e
JOIN host_profiles hp ON e.host_id = hp.id
LEFT JOIN experience_images ei ON e.id = ei.experience_id AND ei.display_order = 1
LEFT JOIN experience_images ei2 ON e.id = ei2.experience_id
GROUP BY e.id, hp.id, ei.image_url;

-- Create index on the materialized view for full-text search
CREATE INDEX IF NOT EXISTS idx_experience_search_materialized_search
ON experience_search_materialized USING GIN(search_vector);

-- Create additional indexes on the materialized view for filtering
CREATE INDEX IF NOT EXISTS idx_experience_search_materialized_filters
ON experience_search_materialized(activity_type, difficulty_level, price_per_person, rating DESC);
CREATE INDEX IF NOT EXISTS idx_experience_search_materialized_location
ON experience_search_materialized(location, country);

-- Function to refresh the materialized view
CREATE OR REPLACE FUNCTION refresh_experience_search()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY experience_search_materialized;
END;
$$ LANGUAGE plpgsql;

-- Optional: Trigger to auto-refresh materialized view when underlying data changes
-- Note: This can be resource-intensive for high-volume writes. Consider scheduled refreshes instead.
-- CREATE OR REPLACE FUNCTION trigger_refresh_experience_search()
-- RETURNS trigger AS $$
-- BEGIN
--     PERFORM refresh_experience_search();
--     RETURN NULL;
-- END;
-- $$ LANGUAGE plpgsql;

-- DROP TRIGGER IF EXISTS trigger_experiences_refresh_search ON experiences;
-- CREATE TRIGGER trigger_experiences_refresh_search
--     AFTER INSERT OR UPDATE OR DELETE ON experiences
--     FOR EACH STATEMENT EXECUTE FUNCTION trigger_refresh_experience_search();

-- DROP TRIGGER IF EXISTS trigger_host_profiles_refresh_search ON host_profiles;
-- CREATE TRIGGER trigger_host_profiles_refresh_search
--     AFTER INSERT OR UPDATE OR DELETE ON host_profiles
--     FOR EACH STATEMENT EXECUTE FUNCTION trigger_refresh_experience_search();

-- Initial refresh of the materialized view
SELECT refresh_experience_search();

-- Performance monitoring table (if not already created in 01-create-tables.sql)
CREATE TABLE IF NOT EXISTS query_performance_log (
    id SERIAL PRIMARY KEY,
    query_type VARCHAR(100),
    execution_time_ms INTEGER,
    parameters JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO schema_migrations (version) VALUES ('10-update-ratings-' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDDHH24MISSMS'))
ON CONFLICT (version) DO NOTHING;
