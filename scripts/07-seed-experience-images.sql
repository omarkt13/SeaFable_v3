-- SQL Script: 07-seed-experience-images.sql
-- Description: Seeds initial data for the 'experience_images' table.
--              Assumes 'experiences' table already exists.
--              Uses ON CONFLICT DO UPDATE to ensure idempotency.

INSERT INTO experience_images (id, experience_id, image_url, alt_text, display_order) VALUES
-- Images for Sunset Sailing in the French Riviera (experience_id = e1a2b3c4-d5e6-7777-8888-999900000001)
('img1a2b3c4-d5e6-7777-8888-999900000001', (SELECT id FROM experiences WHERE title = 'Sunset Sailing in the French Riviera'), '/placeholder.svg?height=400&width=600&text=French+Riviera+Sunset+Sailing+1', 'Luxury catamaran sailing at sunset on the French Riviera', 1)
ON CONFLICT (id) DO UPDATE SET
    experience_id = EXCLUDED.experience_id,
    image_url = EXCLUDED.image_url,
    alt_text = EXCLUDED.alt_text,
    display_order = EXCLUDED.display_order,
    created_at = experience_images.created_at
,
('img1a2b3c4-d5e6-7777-8888-999900000002', (SELECT id FROM experiences WHERE title = 'Sunset Sailing in the French Riviera'), '/placeholder.svg?height=400&width=600&text=French+Riviera+Sunset+Sailing+2', 'Guests enjoying wine and appetizers on deck with coastal view', 2)
ON CONFLICT (id) DO UPDATE SET
    experience_id = EXCLUDED.experience_id,
    image_url = EXCLUDED.image_url,
    alt_text = EXCLUDED.alt_text,
    display_order = EXCLUDED.display_order,
    created_at = experience_images.created_at
,
('img1a2b3c4-d5e6-7777-8888-999900000003', (SELECT id FROM experiences WHERE title = 'Sunset Sailing in the French Riviera'), '/placeholder.svg?height=400&width=600&text=French+Riviera+Sunset+Sailing+3', 'Panoramic view of Nice coastline from the sea at dusk', 3)
ON CONFLICT (id) DO UPDATE SET
    experience_id = EXCLUDED.experience_id,
    image_url = EXCLUDED.image_url,
    alt_text = EXCLUDED.alt_text,
    display_order = EXCLUDED.display_order,
    created_at = experience_images.created_at
,

-- Images for Beginner Surf Lessons at Bondi Beach (experience_id = e1a2b3c4-d5e6-7777-8888-999900000002)
('img1a2b3c4-d5e6-7777-8888-999900000004', (SELECT id FROM experiences WHERE title = 'Beginner Surf Lessons at Bondi Beach'), '/placeholder.svg?height=400&width=600&text=Bondi+Surf+Lesson+1', 'Beginner surfer riding a small wave at Bondi Beach', 1)
ON CONFLICT (id) DO UPDATE SET
    experience_id = EXCLUDED.experience_id,
    image_url = EXCLUDED.image_url,
    alt_text = EXCLUDED.alt_text,
    display_order = EXCLUDED.display_order,
    created_at = experience_images.created_at
,
('img1a2b3c4-d5e6-7777-8888-999900000005', (SELECT id FROM experiences WHERE title = 'Beginner Surf Lessons at Bondi Beach'), '/placeholder.svg?height=400&width=600&text=Bondi+Surf+Lesson+2', 'Surf instructor demonstrating paddling technique on the sand', 2)
ON CONFLICT (id) DO UPDATE SET
    experience_id = EXCLUDED.experience_id,
    image_url = EXCLUDED.image_url,
    alt_text = EXCLUDED.alt_text,
    display_order = EXCLUDED.display_order,
    created_at = experience_images.created_at
,
('img1a2b3c4-d5e6-7777-8888-999900000006', (SELECT id FROM experiences WHERE title = 'Beginner Surf Lessons at Bondi Beach'), '/placeholder.svg?height=400&width=600&text=Bondi+Surf+Lesson+3', 'Group of students with surfboards walking towards the ocean', 3)
ON CONFLICT (id) DO UPDATE SET
    experience_id = EXCLUDED.experience_id,
    image_url = EXCLUDED.image_url,
    alt_text = EXCLUDED.alt_text,
    display_order = EXCLUDED.display_order,
    created_at = experience_images.created_at
,

-- Images for Sea Kayaking Emerald Cove Adventure (experience_id = e1a2b3c4-d5e6-7777-8888-999900000003)
('img1a2b3c4-d5e6-7777-8888-999900000007', (SELECT id FROM experiences WHERE title = 'Sea Kayaking Emerald Cove Adventure'), '/placeholder.svg?height=400&width=600&text=Kayaking+Emerald+Cove+1', 'Kayakers paddling through a calm, forested inlet in Clayoquot Sound', 1)
ON CONFLICT (id) DO UPDATE SET
    experience_id = EXCLUDED.experience_id,
    image_url = EXCLUDED.image_url,
    alt_text = EXCLUDED.alt_text,
    display_order = EXCLUDED.display_order,
    created_at = experience_images.created_at
,
('img1a2b3c4-d5e6-7777-8888-999900000008', (SELECT id FROM experiences WHERE title = 'Sea Kayaking Emerald Cove Adventure'), '/placeholder.svg?height=400&width=600&text=Kayaking+Emerald+Cove+2', 'Close-up of a seal popping its head out of the water near a kayak', 2)
ON CONFLICT (id) DO UPDATE SET
    experience_id = EXCLUDED.experience_id,
    image_url = EXCLUDED.image_url,
    alt_text = EXCLUDED.alt_text,
    display_order = EXCLUDED.display_order,
    created_at = experience_images.created_at
,

-- Images for Coral Reef Exploration Dive in the Red Sea (experience_id = e1a2b3c4-d5e6-7777-8888-999900000004)
('img1a2b3c4-d5e6-7777-8888-999900000009', (SELECT id FROM experiences WHERE title = 'Coral Reef Exploration Dive in the Red Sea'), '/placeholder.svg?height=400&width=600&text=Red+Sea+Diving+1', 'Scuba diver exploring a vibrant coral reef with colorful fish', 1)
ON CONFLICT (id) DO UPDATE SET
    experience_id = EXCLUDED.experience_id,
    image_url = EXCLUDED.image_url,
    alt_text = EXCLUDED.alt_text,
    display_order = EXCLUDED.display_order,
    created_at = experience_images.created_at
,
('img1a2b3c4-d5e6-7777-8888-999900000010', (SELECT id FROM experiences WHERE title = 'Coral Reef Exploration Dive in the Red Sea'), '/placeholder.svg?height=400&width=600&text=Red+Sea+Diving+2', 'Close-up of intricate hard and soft coral formations', 2)
ON CONFLICT (id) DO UPDATE SET
    experience_id = EXCLUDED.experience_id,
    image_url = EXCLUDED.image_url,
    alt_text = EXCLUDED.alt_text,
    display_order = EXCLUDED.display_order,
    created_at = experience_images.created_at
,

-- Images for Sunrise SUP Yoga on Lake Tahoe (experience_id = e1a2b3c4-d5e6-7777-8888-999900000005)
('img1a2b3c4-d5e6-7777-8888-999900000011', (SELECT id FROM experiences WHERE title = 'Sunrise SUP Yoga on Lake Tahoe'), '/placeholder.svg?height=400&width=600&text=SUP+Yoga+Tahoe+1', 'Person doing yoga pose on a paddleboard at sunrise on Lake Tahoe', 1)
ON CONFLICT (id) DO UPDATE SET
    experience_id = EXCLUDED.experience_id,
    image_url = EXCLUDED.image_url,
    alt_text = EXCLUDED.alt_text,
    display_order = EXCLUDED.display_order,
    created_at = experience_images.created_at
,
('img1a2b3c4-d5e6-7777-8888-999900000012', (SELECT id FROM experiences WHERE title = 'Sunrise SUP Yoga on Lake Tahoe'), '/placeholder.svg?height=400&width=600&text=SUP+Yoga+Tahoe+2', 'Paddleboards anchored in calm water with mountains in background', 2)
ON CONFLICT (id) DO UPDATE SET
    experience_id = EXCLUDED.experience_id,
    image_url = EXCLUDED.image_url,
    alt_text = EXCLUDED.alt_text,
    display_order = EXCLUDED.display_order,
    created_at = experience_images.created_at
,

-- Images for Greek Island Hopping Adventure (experience_id = e1a2b3c4-d5e6-7777-8888-999900000006)
('img1a2b3c4-d5e6-7777-8888-999900000013', (SELECT id FROM experiences WHERE title = 'Greek Island Hopping Adventure'), '/placeholder.svg?height=400&width=600&text=Greek+Island+Hopping+1', 'Traditional Greek caique sailing in the Aegean Sea', 1)
ON CONFLICT (id) DO UPDATE SET
    experience_id = EXCLUDED.experience_id,
    image_url = EXCLUDED.image_url,
    alt_text = EXCLUDED.alt_text,
    display_order = EXCLUDED.display_order,
    created_at = experience_images.created_at
,
('img1a2b3c4-d5e6-7777-8888-999900000014', (SELECT id FROM experiences WHERE title = 'Greek Island Hopping Adventure'), '/placeholder.svg?height=400&width=600&text=Greek+Island+Hopping+2', 'White-washed village on a Greek island cliffside', 2)
ON CONFLICT (id) DO UPDATE SET
    experience_id = EXCLUDED.experience_id,
    image_url = EXCLUDED.image_url,
    alt_text = EXCLUDED.alt_text,
    display_order = EXCLUDED.display_order,
    created_at = experience_images.created_at
;

INSERT INTO schema_migrations (version) VALUES ('07-seed-experience-images-' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDDHH24MISSMS'))
ON CONFLICT (version) DO NOTHING;
