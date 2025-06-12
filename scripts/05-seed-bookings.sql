-- Insert booking data

-- First, let's reset the sequence for bookings if needed
SELECT setval('bookings_id_seq', 1, false);

INSERT INTO bookings (
    id, user_id, experience_id, host_id, booking_date, departure_time,
    number_of_guests, guest_details, total_price, booking_status,
    special_requests, dietary_requirements, payment_id, payment_method,
    payment_status, amount_paid, currency, booked_at
) VALUES
-- Emma Johnson booking for Sailing in French Riviera
(
    'b1a2b3c4-d5e6-7777-8888-999900000001',
    (SELECT id FROM users WHERE email = 'emma.johnson@seafable.com'),
    (SELECT id FROM experiences WHERE title = 'Sunset Sailing in the French Riviera'),
    (SELECT id FROM host_profiles WHERE name = 'Jean-Pierre Dubois'),
    '2025-07-15', '19:00:00', 2,
    '[{"name": "Emma Johnson", "age": 39, "special_requests": "None"}, {"name": "David Johnson", "age": 42, "special_requests": "None"}]'::jsonb,
    240.00, 'confirmed', 'Celebrating wedding anniversary', ARRAY['vegetarian'],
    'PAYID_12345', 'credit_card', 'succeeded', 240.00, 'USD', '2025-06-01 10:00:00'
)
ON CONFLICT (id) DO UPDATE SET
    user_id = EXCLUDED.user_id,
    experience_id = EXCLUDED.experience_id,
    host_id = EXCLUDED.host_id,
    booking_date = EXCLUDED.booking_date,
    departure_time = EXCLUDED.departure_time,
    number_of_guests = EXCLUDED.number_of_guests,
    guest_details = EXCLUDED.guest_details,
    total_price = EXCLUDED.total_price,
    booking_status = EXCLUDED.booking_status,
    special_requests = EXCLUDED.special_requests,
    dietary_requirements = EXCLUDED.dietary_requirements,
    payment_id = EXCLUDED.payment_id,
    payment_method = EXCLUDED.payment_method,
    payment_status = EXCLUDED.payment_status,
    amount_paid = EXCLUDED.amount_paid,
    currency = EXCLUDED.currency,
    booked_at = EXCLUDED.booked_at,
    updated_at = CURRENT_TIMESTAMP
,
-- Michael Chen booking for Surfing at Bondi Beach
(
    'b1a2b3c4-d5e6-7777-8888-999900000002',
    (SELECT id FROM users WHERE email = 'michael.chen@seafable.com'),
    (SELECT id FROM experiences WHERE title = 'Beginner Surf Lessons at Bondi Beach'),
    (SELECT id FROM host_profiles WHERE name = 'Chloe "Shaka" Smith'),
    '2025-08-20', '10:00:00', 3,
    '[{"name": "Michael Chen", "age": 46, "special_requests": "None"}, {"name": "Lisa Chen", "age": 44, "special_requests": "None"}, {"name": "Kevin Chen", "age": 16, "special_requests": "Needs larger wetsuit"}]'::jsonb,
    225.00, 'confirmed', 'Family surf lesson', ARRAY[]::text[],
    'PAYID_12346', 'paypal', 'succeeded', 225.00, 'USD', '2025-07-05 14:30:00'
)
ON CONFLICT (id) DO UPDATE SET
    user_id = EXCLUDED.user_id,
    experience_id = EXCLUDED.experience_id,
    host_id = EXCLUDED.host_id,
    booking_date = EXCLUDED.booking_date,
    departure_time = EXCLUDED.departure_time,
    number_of_guests = EXCLUDED.number_of_guests,
    guest_details = EXCLUDED.guest_details,
    total_price = EXCLUDED.total_price,
    booking_status = EXCLUDED.booking_status,
    special_requests = EXCLUDED.special_requests,
    dietary_requirements = EXCLUDED.dietary_requirements,
    payment_id = EXCLUDED.payment_id,
    payment_method = EXCLUDED.payment_method,
    payment_status = EXCLUDED.payment_status,
    amount_paid = EXCLUDED.amount_paid,
    currency = EXCLUDED.currency,
    booked_at = EXCLUDED.booked_at,
    updated_at = CURRENT_TIMESTAMP
,
-- Sophie Dubois booking for Kayaking in Vancouver Island
(
    'b1a2b3c4-d5e6-7777-8888-999900000003',
    (SELECT id FROM users WHERE email = 'sophie.dubois@seafable.com'),
    (SELECT id FROM experiences WHERE title = 'Sea Kayaking Emerald Cove Adventure'),
    (SELECT id FROM host_profiles WHERE name = 'Mike "River" Thompson'),
    '2025-09-10', '09:00:00', 1,
    '[{"name": "Sophie Dubois", "age": 32, "special_requests": "Prefers single kayak"}]'::jsonb,
    95.00, 'pending', 'Solo nature exploration', ARRAY['gluten-free'],
    NULL, NULL, 'pending', NULL, 'USD', '2025-08-15 11:00:00'
)
ON CONFLICT (id) DO UPDATE SET
    user_id = EXCLUDED.user_id,
    experience_id = EXCLUDED.experience_id,
    host_id = EXCLUDED.host_id,
    booking_date = EXCLUDED.booking_date,
    departure_time = EXCLUDED.departure_time,
    number_of_guests = EXCLUDED.number_of_guests,
    guest_details = EXCLUDED.guest_details,
    total_price = EXCLUDED.total_price,
    booking_status = EXCLUDED.booking_status,
    special_requests = EXCLUDED.special_requests,
    dietary_requirements = EXCLUDED.dietary_requirements,
    payment_id = EXCLUDED.payment_id,
    payment_method = EXCLUDED.payment_method,
    payment_status = EXCLUDED.payment_status,
    amount_paid = EXCLUDED.amount_paid,
    currency = EXCLUDED.currency,
    booked_at = EXCLUDED.booked_at,
    updated_at = CURRENT_TIMESTAMP
,
-- Emma Johnson booking for Diving in Red Sea (future booking)
(
    'b1a2b3c4-d5e6-7777-8888-999900000004',
    (SELECT id FROM users WHERE email = 'emma.johnson@seafable.com'),
    (SELECT id FROM experiences WHERE title = 'Coral Reef Exploration Dive in the Red Sea'),
    (SELECT id FROM host_profiles WHERE name = 'Ahmed "DeepBlue" Hassan'),
    '2025-11-01', '08:00:00', 2,
    '[{"name": "Emma Johnson", "age": 39, "special_requests": "None"}, {"name": "David Johnson", "age": 42, "special_requests": "Needs BCD rental"}]'::jsonb,
    220.00, 'confirmed', 'Advanced dive trip', ARRAY[]::text[],
    'PAYID_12347', 'credit_card', 'succeeded', 220.00, 'USD', '2025-09-20 09:00:00'
)
ON CONFLICT (id) DO UPDATE SET
    user_id = EXCLUDED.user_id,
    experience_id = EXCLUDED.experience_id,
    host_id = EXCLUDED.host_id,
    booking_date = EXCLUDED.booking_date,
    departure_time = EXCLUDED.departure_time,
    number_of_guests = EXCLUDED.number_of_guests,
    guest_details = EXCLUDED.guest_details,
    total_price = EXCLUDED.total_price,
    booking_status = EXCLUDED.booking_status,
    special_requests = EXCLUDED.special_requests,
    dietary_requirements = EXCLUDED.dietary_requirements,
    payment_id = EXCLUDED.payment_id,
    payment_method = EXCLUDED.payment_method,
    payment_status = EXCLUDED.payment_status,
    amount_paid = EXCLUDED.amount_paid,
    currency = EXCLUDED.currency,
    booked_at = EXCLUDED.booked_at,
    updated_at = CURRENT_TIMESTAMP
;

INSERT INTO schema_migrations (version) VALUES ('05-seed-bookings-' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDDHH24MISSMS'))
ON CONFLICT (version) DO NOTHING;
