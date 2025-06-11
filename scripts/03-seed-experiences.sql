-- SQL Script: 03-seed-experiences.sql
-- Description: Seeds initial data for the 'experiences' table,
--              including diverse water activities.
--              Assumes 'host_profiles' table already exists.
--              Uses ON CONFLICT DO UPDATE to ensure idempotency.

INSERT INTO experiences (
    id, host_id, title, description, short_description, location, specific_location, country,
    activity_type, category, duration_hours, duration_display, max_guests, min_guests, price_per_person,
    difficulty_level, rating, total_reviews, total_bookings, primary_image_url,
    weather_contingency, included_amenities, what_to_bring, min_age, max_age,
    activity_specific_details, tags, seasonal_availability, is_active
) VALUES
-- Sailing Experience (Host: Jean-Pierre Dubois)
(
    'e1a2b3c4-d5e6-7777-8888-999900000001',
    (SELECT id FROM host_profiles WHERE name = 'Jean-Pierre Dubois'),
    'Sunset Sailing in the French Riviera',
    'A breathtaking sunset cruise along the Côte d''Azur. Enjoy complimentary local wines and appetizers as you soak in the stunning coastal views. Perfect for romantic evenings or a relaxing escape.',
    'Experience the magic of the French Riviera at golden hour with wine and local delicacies.',
    'Nice', 'Baie des Anges', 'France',
    'sailing', ARRAY['luxury', 'relaxation', 'romantic'], 3, '3 hours', 12, 2, 120.00,
    'all_levels', 4.8, 156, 200, '/placeholder.svg?height=400&width=600&text=French+Riviera+Sunset+Sailing',
    'If weather is unsuitable, tour will be rescheduled or refunded.',
    ARRAY['Wine & Appetizers', 'Professional Crew', 'Blankets', 'Safety equipment'],
    ARRAY['Light jacket', 'Camera', 'Sunglasses'], 12, NULL,
    '{
        "vesselName": "Azure Dream",
        "vesselType": "Luxury Catamaran",
        "vesselCapacity": 12,
        "itineraryHighlights": ["View of Promenade des Anglais", "Cap Ferrat sightseeing"]
    }',
    ARRAY['sailing', 'sunset', 'riviera', 'luxury', 'wine', 'france'],
    ARRAY['April', 'May', 'June', 'July', 'August', 'September', 'October'], TRUE
),
-- Surfing Experience (Host: Chloe "Shaka" Smith)
(
    'e1a2b3c4-d5e6-7777-8888-999900000002',
    (SELECT id FROM host_profiles WHERE name = 'Chloe "Shaka" Smith'),
    'Beginner Surf Lessons at Bondi Beach',
    'Our beginner-friendly surf lessons cover all the basics: ocean safety, paddling, popping up, and riding waves. All equipment provided. Guaranteed fun!',
    'Catch your first wave at the iconic Bondi Beach with expert instructors.',
    'Sydney', 'Bondi Beach', 'Australia',
    'surfing', ARRAY['lesson', 'adventure', 'sports', 'beginner'], 2, '2 hours', 8, 1, 75.00,
    'beginner', 4.9, 230, 300, '/placeholder.svg?height=400&width=600&text=Bondi+Beach+Surf+Lesson',
    'Lessons proceed in light rain. Cancelled for storms/dangerous surf (reschedule/refund).',
    ARRAY['Surfboard', 'Wetsuit', 'Rashguard', 'Sunscreen', 'Professional Instruction'],
    ARRAY['Swimwear', 'Towel', 'Water bottle', 'Enthusiasm!'], 8, NULL,
    '{
        "boardTypesAvailable": ["Foamie", "Soft-top Longboard"],
        "waveType": "Beach break",
        "skillLevelFocus": ["beginner"]
    }',
    ARRAY['surfing', 'lessons', 'bondi', 'beginner', 'waves', 'australia'],
    ARRAY['January', 'February', 'March', 'April', 'May', 'September', 'October', 'November', 'December'], TRUE
),
-- Kayaking Experience (Host: Mike "River" Thompson)
(
    'e1a2b3c4-d5e6-7777-8888-999900000003',
    (SELECT id FROM host_profiles WHERE name = 'Mike "River" Thompson'),
    'Sea Kayaking Emerald Cove Adventure',
    'Join us for a guided sea kayaking tour in the stunning Clayoquot Sound. We''ll navigate through calm inlets, observe marine life like seals and eagles, and enjoy the tranquility of nature. No experience necessary.',
    'Paddle through pristine waters, explore hidden coves, and spot local wildlife.',
    'Vancouver Island', 'Clayoquot Sound', 'Canada',
    'kayaking', ARRAY['eco_tour', 'adventure', 'wildlife', 'family_friendly'], 4, 'Half-day (4 hours)', 10, 2, 95.00,
    'all_levels', 4.7, 180, 250, '/placeholder.svg?height=400&width=600&text=Clayoquot+Sound+Kayaking',
    'Tours run rain or shine, unless conditions are unsafe (high winds/lightning). Reschedule/refund offered.',
    ARRAY['Kayak', 'Paddle', 'PFD (Life Vest)', 'Dry Bag', 'Snacks', 'Guided Tour'],
    ARRAY['Water-resistant clothing', 'Hat', 'Sunglasses', 'Water shoes', 'Binoculars (optional)'], 6, NULL,
    '{
        "kayakTypesAvailable": ["Single Touring Kayak", "Double Touring Kayak"],
        "routeDescription": "Sheltered coastal route with potential wildlife sightings and old-growth forest views.",
        "waterBodyType": "Coastal inlet"
    }',
    ARRAY['kayaking', 'eco-tour', 'wildlife', 'vancouver island', 'adventure', 'canada'],
    ARRAY['May', 'June', 'July', 'August', 'September'], TRUE
),
-- Diving Experience (Host: Ahmed "DeepBlue" Hassan)
(
    'e1a2b3c4-d5e6-7777-8888-999900000004',
    (SELECT id FROM host_profiles WHERE name = 'Ahmed "DeepBlue" Hassan'),
    'Coral Reef Exploration Dive in the Red Sea',
    'Embark on a boat trip to Ras Muhammad National Park for two guided dives at spectacular reef sites. Encounter colorful fish, intricate coral formations, and diverse marine life. Suitable for certified divers.',
    'Discover the vibrant underwater world of the Red Sea''s famous coral reefs.',
    'Sharm El Sheikh', 'Ras Muhammad National Park', 'Egypt',
    'diving', ARRAY['adventure', 'eco_tour', 'sports', 'scuba'], 5, '2 Dives (approx. 5h total)', 12, 2, 110.00,
    'intermediate', 4.9, 310, 400, '/placeholder.svg?height=400&width=600&text=Red+Sea+Diving',
    'Dives are subject to sea conditions. Host may alter dive sites for safety. Reschedule/refund for cancellations.',
    ARRAY['Dive Guide', 'Tanks & Weights', 'Lunch on boat', 'Park Fees', 'Refreshments'],
    ARRAY['Dive certification card', 'Swimwear', 'Towel', 'Logbook', 'Sunscreen'], 15, NULL,
    '{
        "diveType": "Reef dive (boat)",
        "maxDepthMeters": 25,
        "certificationRequired": "Open Water Diver or equivalent",
        "equipmentRentalAvailable": true
    }',
    ARRAY['diving', 'scuba', 'red sea', 'coral reef', 'marine life', 'egypt', 'boat dive'],
    NULL, TRUE -- Year-round availability
),
-- Paddleboarding Experience (Host: Serena "Zen" Williams)
(
    'e1a2b3c4-d5e6-7777-8888-999900000005',
    (SELECT id FROM host_profiles WHERE name = 'Serena "Zen" Williams'),
    'Sunrise SUP Yoga on Lake Tahoe',
    'Start your day with a peaceful paddle to a calm spot in Emerald Bay, followed by a rejuvenating yoga session on your board. All levels welcome, a perfect way to connect with nature and find your balance.',
    'Greet the sunrise with a unique blend of paddleboarding and yoga on serene Lake Tahoe.',
    'Lake Tahoe', 'Emerald Bay', 'USA',
    'paddleboarding', ARRAY['relaxation', 'lesson', 'sports', 'wellness', 'yoga'], 1.5, '90 minutes', 10, 1, 65.00,
    'all_levels', 4.8, 150, 220, '/placeholder.svg?height=400&width=600&text=Lake+Tahoe+SUP+Yoga',
    'Cancelled for high winds or thunderstorms. Reschedule/refund offered.',
    ARRAY['Paddleboard', 'Paddle', 'Anchor for yoga', 'Yoga Instruction', 'PFD (optional for yoga)'],
    ARRAY['Comfortable activewear (quick-dry)', 'Water bottle', 'Sunscreen', 'Small towel'], 10, NULL,
    '{
        "boardTypesAvailable": ["Yoga SUP", "All-around SUP"],
        "waterBodyType": "Calm lake bay",
        "guidedTour": true,
        "yogaStyle": "Hatha/Vinyasa Flow"
    }',
    ARRAY['paddleboarding', 'sup', 'yoga', 'lake tahoe', 'sunrise', 'wellness', 'mindfulness', 'usa'],
    ARRAY['June', 'July', 'August', 'September'], TRUE
),
-- Another Sailing Experience (Host: Dimitris Papadopoulos)
(
    'e1a2b3c4-d5e6-7777-8888-999900000006',
    (SELECT id FROM host_profiles WHERE name = 'Dimitris Papadopoulos'),
    'Greek Island Hopping Adventure',
    'Sail through the azure waters of the Aegean Sea, visiting iconic islands like Mykonos and hidden gems. Enjoy swimming, snorkeling, and authentic Greek cuisine onboard.',
    'Discover the beauty of the Cyclades with stops at secluded beaches and traditional villages.',
    'Santorini', 'Cyclades Islands Circuit', 'Greece',
    'sailing', ARRAY['adventure', 'cultural', 'family_friendly', 'island_hopping'], 8, 'Full day (8 hours)', 10, 4, 180.00,
    'all_levels', 4.9, 234, 350, '/placeholder.svg?height=400&width=600&text=Greek+Island+Hopping',
    'Subject to Meltemi winds in summer. Itinerary may be adjusted for comfort and safety.',
    ARRAY['Lunch & Drinks', 'Snorkeling Gear', 'Local Guide', 'Safety equipment'],
    ARRAY['Swimwear', 'Sunscreen', 'Hat', 'Camera', 'Light sweater'], 5, NULL,
    '{
        "vesselName": "Aegean Spirit",
        "vesselType": "Traditional Caique",
        "vesselCapacity": 10,
        "itineraryHighlights": ["Visit Red Beach (Santorini)", "Swim in Hot Springs (Palea Kameni)", "Explore Thirassia village", "Lunch at a secluded bay"]
    }',
    ARRAY['sailing', 'greek islands', 'cyclades', 'adventure', 'culture', 'boat trip', 'greece'],
    ARRAY['April', 'May', 'June', 'July', 'August', 'September', 'October'], TRUE
)
ON CONFLICT (id) DO UPDATE SET
    host_id = EXCLUDED.host_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    short_description = EXCLUDED.short_description,
    location = EXCLUDED.location,
    specific_location = EXCLUDED.specific_location,
    country = EXCLUDED.country,
    activity_type = EXCLUDED.activity_type,
    category = EXCLUDED.category,
    duration_hours = EXCLUDED.duration_hours,
    duration_display = EXCLUDED.duration_display,
    max_guests = EXCLUDED.max_guests,
    min_guests = EXCLUDED.min_guests,
    price_per_person = EXCLUDED.price_per_person,
    difficulty_level = EXCLUDED.difficulty_level,
    rating = EXCLUDED.rating,
    total_reviews = EXCLUDED.total_reviews,
    total_bookings = EXCLUDED.total_bookings,
    primary_image_url = EXCLUDED.primary_image_url,
    weather_contingency = EXCLUDED.weather_contingency,
    included_amenities = EXCLUDED.included_amenities,
    what_to_bring = EXCLUDED.what_to_bring,
    min_age = EXCLUDED.min_age,
    max_age = EXCLUDED.max_age,
    age_restriction_details = EXCLUDED.age_restriction_details,
    activity_specific_details = EXCLUDED.activity_specific_details,
    tags = EXCLUDED.tags,
    seasonal_availability = EXCLUDED.seasonal_availability,
    is_active = EXCLUDED.is_active,
    updated_at = CURRENT_TIMESTAMP,
    created_at = experiences.created_at
;

INSERT INTO schema_migrations (version) VALUES ('03-seed-experiences-' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDDHH24MISSMS'))
ON CONFLICT (version) DO NOTHING;
