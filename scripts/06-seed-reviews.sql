-- Insert review data

-- First, let's reset the sequence for reviews if needed
SELECT setval('reviews_id_seq', 1, false);

INSERT INTO reviews (
    id, booking_id, user_id, experience_id, host_id, rating, title, comment,
    pros, cons, would_recommend, verified_booking, helpful_votes,
    response_from_host_comment, response_from_host_at, created_at
) VALUES
-- Review for Sunset Sailing in French Riviera
(
    'r1a2b3c4-d5e6-7777-8888-999900000001',
    (SELECT id FROM bookings WHERE special_requests = 'Celebrating wedding anniversary'),
    (SELECT id FROM users WHERE email = 'emma.johnson@seafable.com'),
    (SELECT id FROM experiences WHERE title = 'Sunset Sailing in the French Riviera'),
    (SELECT id FROM host_profiles WHERE name = 'Jean-Pierre Dubois'),
    5, 'Absolutely Magical Evening!',
    'This was hands down the best part of our trip to the French Riviera! Jean-Pierre was incredibly knowledgeable and made us feel so welcome. The wine selection was excellent and the sunset views were breathtaking. Highly recommend SeaFable for anyone looking for a premium sailing experience.',
    ARRAY['Stunning sunset views', 'Excellent wine selection', 'Professional and friendly host', 'Perfect weather'],
    ARRAY['None'], TRUE, TRUE, 8,
    'Thank you Emma! It was our pleasure to share this magical evening with you. We hope to see you again soon!',
    '2025-07-16 10:00:00', '2025-07-15 22:00:00'
)
ON CONFLICT (id) DO UPDATE SET
    booking_id = EXCLUDED.booking_id,
    user_id = EXCLUDED.user_id,
    experience_id = EXCLUDED.experience_id,
    host_id = EXCLUDED.host_id,
    rating = EXCLUDED.rating,
    title = EXCLUDED.title,
    comment = EXCLUDED.comment,
    pros = EXCLUDED.pros,
    cons = EXCLUDED.cons,
    would_recommend = EXCLUDED.would_recommend,
    verified_booking = EXCLUDED.verified_booking,
    helpful_votes = EXCLUDED.helpful_votes,
    response_from_host_comment = EXCLUDED.response_from_host_comment,
    response_from_host_at = EXCLUDED.response_from_host_at,
    updated_at = CURRENT_TIMESTAMP,
    created_at = reviews.created_at
,
-- Review for Beginner Surf Lessons at Bondi Beach
(
    'r1a2b3c4-d5e6-7777-8888-999900000002',
    (SELECT id FROM bookings WHERE special_requests = 'Family surf lesson'),
    (SELECT id FROM users WHERE email = 'michael.chen@seafable.com'),
    (SELECT id FROM experiences WHERE title = 'Beginner Surf Lessons at Bondi Beach'),
    (SELECT id FROM host_profiles WHERE name = 'Chloe "Shaka" Smith'),
    4, 'Great Family Experience',
    'Perfect introduction to surfing for our family. The kids loved it and Chloe was very patient with all their questions. The whole crew made sure everyone felt safe and comfortable. Only minor issue was the wind was quite strong, but that''s nature! Would definitely book with SeaFable again.',
    ARRAY['Kid-friendly host', 'Great instruction', 'Safety-focused', 'Educational for children'],
    ARRAY['Windy conditions'], TRUE, TRUE, 3,
    'Thank you for choosing SeaFable for your family adventure! We''re delighted the children enjoyed their first surfing experience. The ocean can be unpredictable, but it sounds like you made the most of it! - The SeaFable Team',
    '2025-08-21 12:00:00', '2025-08-20 18:00:00'
)
ON CONFLICT (id) DO UPDATE SET
    booking_id = EXCLUDED.booking_id,
    user_id = EXCLUDED.user_id,
    experience_id = EXCLUDED.experience_id,
    host_id = EXCLUDED.host_id,
    rating = EXCLUDED.rating,
    title = EXCLUDED.title,
    comment = EXCLUDED.comment,
    pros = EXCLUDED.pros,
    cons = EXCLUDED.cons,
    would_recommend = EXCLUDED.would_recommend,
    verified_booking = EXCLUDED.verified_booking,
    helpful_votes = EXCLUDED.helpful_votes,
    response_from_host_comment = EXCLUDED.response_from_host_comment,
    response_from_host_at = EXCLUDED.response_from_host_at,
    updated_at = CURRENT_TIMESTAMP,
    created_at = reviews.created_at
;

INSERT INTO schema_migrations (version) VALUES ('06-seed-reviews-' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDDHH24MISSMS'))
ON CONFLICT (version) DO NOTHING;
