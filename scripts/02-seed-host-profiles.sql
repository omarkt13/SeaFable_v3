-- SQL Script: 02-seed-host-profiles.sql
-- Description: Seeds initial data for the 'host_profiles' table.
--              Assumes 'users' table already exists (created by 01-create-tables.sql).
--              Uses ON CONFLICT DO UPDATE to ensure idempotency.

INSERT INTO host_profiles (id, user_id, name, bio, avatar_url, years_experience, certifications, specialties, rating, total_reviews, host_type, languages_spoken, business_name) VALUES
-- Sailing Captain for French Riviera
('a1b2c3d4-e5f6-7777-8888-999900000001', (SELECT id FROM users WHERE email = 'captain.james@seafable.com'), 'Jean-Pierre Dubois', 'Passionate sailor with 20+ years navigating the Mediterranean. Loves sharing the beauty of the French Riviera.', '/placeholder.svg?height=80&width=80&text=JP', 20, ARRAY['RYA Yachtmaster Ocean', 'STCW Certified'], ARRAY['Sunset Cruises', 'Luxury Charters', 'Wine Tasting Afloat'], 4.9, 156, 'captain', ARRAY['French', 'English', 'Italian'], 'Riviera Dreams Yachting')
ON CONFLICT (id) DO UPDATE SET
    user_id = EXCLUDED.user_id,
    name = EXCLUDED.name,
    bio = EXCLUDED.bio,
    avatar_url = EXCLUDED.avatar_url,
    years_experience = EXCLUDED.years_experience,
    certifications = EXCLUDED.certifications,
    specialties = EXCLUDED.specialties,
    rating = EXCLUDED.rating,
    total_reviews = EXCLUDED.total_reviews,
    host_type = EXCLUDED.host_type,
    languages_spoken = EXCLUDED.languages_spoken,
    business_name = EXCLUDED.business_name,
    updated_at = CURRENT_TIMESTAMP,
    created_at = host_profiles.created_at -- Preserve original created_at
,

-- Surf Instructor for Bondi Beach
('a1b2c3d4-e5f6-7777-8888-999900000002', (SELECT id FROM users WHERE email = 'captain.sarah@seafable.com'), 'Chloe "Shaka" Smith', 'Former pro surfer, now dedicated to teaching beginners the joy of surfing at iconic Bondi Beach. Safety first, fun always!', '/placeholder.svg?height=80&width=80&text=CS', 10, ARRAY['ISA Level 2 Surf Instructor', 'Bronze Medallion (Surf Lifesaving)'], ARRAY['Beginner Surf Lessons', 'Ocean Awareness', 'Youth Surf Camps'], 4.9, 230, 'instructor', ARRAY['English'], 'Bondi Surf School')
ON CONFLICT (id) DO UPDATE SET
    user_id = EXCLUDED.user_id,
    name = EXCLUDED.name,
    bio = EXCLUDED.bio,
    avatar_url = EXCLUDED.avatar_url,
    years_experience = EXCLUDED.years_experience,
    certifications = EXCLUDED.certifications,
    specialties = EXCLUDED.specialties,
    rating = EXCLUDED.rating,
    total_reviews = EXCLUDED.total_reviews,
    host_type = EXCLUDED.host_type,
    languages_spoken = EXCLUDED.languages_spoken,
    business_name = EXCLUDED.business_name,
    updated_at = CURRENT_TIMESTAMP,
    created_at = host_profiles.created_at
,

-- Kayak Guide for Vancouver Island
('a1b2c3d4-e5f6-7777-8888-999900000003', (SELECT id FROM users WHERE email = 'captain.robert@seafable.com'), 'Mike "River" Thompson', 'Nature enthusiast and experienced kayak guide. Knows the hidden gems of Clayoquot Sound and its wildlife like the back of his hand.', '/placeholder.svg?height=80&width=80&text=MT', 15, ARRAY['SKGABC Level 3 Guide', 'Wilderness First Responder'], ARRAY['Wildlife Kayak Tours', 'Multi-day Expeditions', 'Coastal Ecology'], 4.7, 180, 'guide', ARRAY['English', 'French'], 'Island Paddlers Co.')
ON CONFLICT (id) DO UPDATE SET
    user_id = EXCLUDED.user_id,
    name = EXCLUDED.name,
    bio = EXCLUDED.bio,
    avatar_url = EXCLUDED.avatar_url,
    years_experience = EXCLUDED.years_experience,
    certifications = EXCLUDED.certifications,
    specialties = EXCLUDED.specialties,
    rating = EXCLUDED.rating,
    total_reviews = EXCLUDED.total_reviews,
    host_type = EXCLUDED.host_type,
    languages_spoken = EXCLUDED.languages_spoken,
    business_name = EXCLUDED.business_name,
    updated_at = CURRENT_TIMESTAMP,
    created_at = host_profiles.created_at
,

-- Dive Instructor for Red Sea
('a1b2c3d4-e5f6-7777-8888-999900000004', (SELECT id FROM users WHERE email = 'captain.emma@seafable.com'), 'Ahmed "DeepBlue" Hassan', 'PADI Master Instructor with thousands of dives in the Red Sea. Passionate about marine conservation and underwater photography.', '/placeholder.svg?height=80&width=80&text=AH', 18, ARRAY['PADI Master Instructor', 'EFR Instructor Trainer', 'Tec Diver'], ARRAY['Guided Dives', 'PADI Courses (All Levels)', 'Underwater Photography Workshops'], 4.9, 310, 'instructor', ARRAY['Arabic', 'English', 'German'], 'Red Sea Divers United')
ON CONFLICT (id) DO UPDATE SET
    user_id = EXCLUDED.user_id,
    name = EXCLUDED.name,
    bio = EXCLUDED.bio,
    avatar_url = EXCLUDED.avatar_url,
    years_experience = EXCLUDED.years_experience,
    certifications = EXCLUDED.certifications,
    specialties = EXCLUDED.specialties,
    rating = EXCLUDED.rating,
    total_reviews = EXCLUDED.total_reviews,
    host_type = EXCLUDED.host_type,
    languages_spoken = EXCLUDED.languages_spoken,
    business_name = EXCLUDED.business_name,
    updated_at = CURRENT_TIMESTAMP,
    created_at = host_profiles.created_at
,

-- SUP Yoga Instructor for Lake Tahoe
('a1b2c3d4-e5f6-7777-8888-999900000005', (SELECT id FROM users WHERE email = 'captain.marie@seafable.com'), 'Serena "Zen" Williams', 'Certified yoga and SUP instructor. Believes in the healing power of nature and movement. Offers serene sunrise sessions on Lake Tahoe.', '/placeholder.svg?height=80&width=80&text=SW', 8, ARRAY['RYT 500 Yoga Instructor', 'WPA Certified SUP Instructor'], ARRAY['SUP Yoga', 'Mindfulness Paddles', 'Paddleboard Fitness'], 4.8, 150, 'instructor', ARRAY['English', 'Spanish'], 'Tahoe SUP & Soul')
ON CONFLICT (id) DO UPDATE SET
    user_id = EXCLUDED.user_id,
    name = EXCLUDED.name,
    bio = EXCLUDED.bio,
    avatar_url = EXCLUDED.avatar_url,
    years_experience = EXCLUDED.years_experience,
    certifications = EXCLUDED.certifications,
    specialties = EXCLUDED.specialties,
    rating = EXCLUDED.rating,
    total_reviews = EXCLUDED.total_reviews,
    host_type = EXCLUDED.host_type,
    languages_spoken = EXCLUDED.languages_spoken,
    business_name = EXCLUDED.business_name,
    updated_at = CURRENT_TIMESTAMP,
    created_at = host_profiles.created_at
,

-- Sailing Captain for Greek Islands
('a1b2c3d4-e5f6-7777-8888-999900000006', (SELECT id FROM users WHERE email = 'captain.marco@seafable.com'), 'Dimitris Papadopoulos', 'Seasoned Greek captain with a deep love for the Aegean Sea and its islands. Offers authentic cultural and sailing experiences.', '/placeholder.svg?height=80&width=80&text=DP', 25, ARRAY['Hellenic Coast Guard Skipper License', 'STCW Certified'], ARRAY['Cycladic Island Hopping', 'Historical Sailing Tours', 'Traditional Greek Cuisine Onboard'], 4.9, 234, 'captain', ARRAY['Greek', 'English'], 'Aegean Sailors')
ON CONFLICT (id) DO UPDATE SET
    user_id = EXCLUDED.user_id,
    name = EXCLUDED.name,
    bio = EXCLUDED.bio,
    avatar_url = EXCLUDED.avatar_url,
    years_experience = EXCLUDED.years_experience,
    certifications = EXCLUDED.certifications,
    specialties = EXCLUDED.specialties,
    rating = EXCLUDED.rating,
    total_reviews = EXCLUDED.total_reviews,
    host_type = EXCLUDED.host_type,
    languages_spoken = EXCLUDED.languages_spoken,
    business_name = EXCLUDED.business_name,
    updated_at = CURRENT_TIMESTAMP,
    created_at = host_profiles.created_at
;

INSERT INTO schema_migrations (version) VALUES ('02-seed-host-profiles-' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDDHH24MISSMS'))
ON CONFLICT (version) DO NOTHING;
