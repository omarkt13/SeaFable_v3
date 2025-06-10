-- Update captain and experience ratings based on reviews

-- Update captain ratings
UPDATE captains SET 
    rating = subquery.avg_rating,
    total_reviews = subquery.review_count
FROM (
    SELECT 
        captain_id,
        ROUND(AVG(rating::numeric), 1) as avg_rating,
        COUNT(*) as review_count
    FROM reviews 
    GROUP BY captain_id
) AS subquery
WHERE captains.id = subquery.captain_id;

-- Update experience ratings
UPDATE experiences SET 
    rating = subquery.avg_rating,
    total_reviews = subquery.review_count,
    total_bookings = booking_subquery.booking_count
FROM (
    SELECT 
        experience_id,
        ROUND(AVG(rating::numeric), 1) as avg_rating,
        COUNT(*) as review_count
    FROM reviews 
    GROUP BY experience_id
) AS subquery,
(
    SELECT 
        experience_id,
        COUNT(*) as booking_count
    FROM bookings 
    GROUP BY experience_id
) AS booking_subquery
WHERE experiences.id = subquery.experience_id 
AND experiences.id = booking_subquery.experience_id;

-- Create view for experience search with all related data
CREATE OR REPLACE VIEW experience_search_view AS
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
    e.price_per_person,
    e.difficulty_level,
    e.category,
    e.rating,
    e.total_reviews,
    e.total_bookings,
    c.name as captain_name,
    c.avatar_url as captain_avatar,
    c.rating as captain_rating,
    c.specialties as captain_specialties,
    c.vessel_name,
    c.vessel_type,
    ei.image_url as primary_image,
    ARRAY_AGG(DISTINCT ei2.image_url) as all_images
FROM experiences e
JOIN captains c ON e.captain_id = c.id
LEFT JOIN experience_images ei ON e.id = ei.experience_id AND ei.is_primary = true
LEFT JOIN experience_images ei2 ON e.id = ei2.experience_id
GROUP BY e.id, c.id, ei.image_url;

-- Create indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_experiences_category ON experiences(category);
CREATE INDEX IF NOT EXISTS idx_experiences_price ON experiences(price_per_person);
CREATE INDEX IF NOT EXISTS idx_experiences_rating ON experiences(rating);
CREATE INDEX IF NOT EXISTS idx_experiences_difficulty ON experiences(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(booking_status);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- Display summary statistics
SELECT 'Database Summary' as info;
SELECT COUNT(*) as total_captains FROM captains;
SELECT COUNT(*) as total_users FROM users;
SELECT COUNT(*) as total_experiences FROM experiences;
SELECT COUNT(*) as total_bookings FROM bookings;
SELECT COUNT(*) as total_reviews FROM reviews;
SELECT COUNT(*) as total_experience_images FROM experience_images;
SELECT COUNT(*) as total_itinerary_steps FROM experience_itinerary;
SELECT COUNT(*) as total_weather_records FROM weather_data;
