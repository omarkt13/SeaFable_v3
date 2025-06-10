-- Insert booking data

-- First, let's reset the sequence for bookings if needed
SELECT setval('bookings_id_seq', 1, false);

INSERT INTO bookings (user_id, experience_id, captain_id, booking_date, departure_time, number_of_guests, guest_names, guest_ages, total_price, booking_status, special_requests, dietary_requirements, payment_status, weather_insurance) VALUES

-- Emma Johnson bookings - using experiences 1, 2, 3
(1, 1, 1, '2024-07-15', '09:00', 2, ARRAY['Emma Johnson', 'David Johnson'], ARRAY[39, 42], 250.00, 'completed', 'Celebrating wedding anniversary', ARRAY['vegetarian'], 'paid', true),
(1, 2, 1, '2024-08-22', '10:00', 2, ARRAY['Emma Johnson', 'David Johnson'], ARRAY[39, 42], 680.00, 'completed', 'Honeymoon trip', ARRAY['vegetarian'], 'paid', true),
(1, 3, 1, '2024-09-10', '16:00', 2, ARRAY['Emma Johnson', 'David Johnson'], ARRAY[39, 42], 378.00, 'confirmed', 'Sunset photography', ARRAY['vegetarian'], 'paid', false),

-- Michael Chen bookings - using experiences 4, 5, 6
(2, 4, 2, '2024-06-18', '08:00', 4, ARRAY['Michael Chen', 'Lisa Chen', 'Kevin Chen', 'Amy Chen'], ARRAY[46, 44, 16, 14], 580.00, 'completed', 'Family vacation', ARRAY[]::text[], 'paid', true),
(2, 5, 2, '2024-07-25', '09:30', 4, ARRAY['Michael Chen', 'Lisa Chen', 'Kevin Chen', 'Amy Chen'], ARRAY[46, 44, 16, 14], 1180.00, 'completed', 'Educational trip for kids', ARRAY[]::text[], 'paid', false),
(2, 6, 2, '2024-08-12', '14:00', 4, ARRAY['Michael Chen', 'Lisa Chen', 'Kevin Chen', 'Amy Chen'], ARRAY[46, 44, 16, 14], 1180.00, 'confirmed', 'Arctic adventure', ARRAY[]::text[], 'paid', true),

-- Sophie Dubois bookings - using experiences 7, 8, 9
(3, 7, 2, '2024-05-20', '11:00', 3, ARRAY['Sophie Dubois', 'Marie Dubois', 'Claire Dubois'], ARRAY[32, 58, 30], 840.00, 'completed', 'Mother''s Day celebration', ARRAY['gluten-free'], 'paid', false),
(3, 8, 2, '2024-06-30', '08:00', 3, ARRAY['Sophie Dubois', 'Marie Dubois', 'Claire Dubois'], ARRAY[32, 58, 30], 885.00, 'completed', 'Sisters trip', ARRAY['gluten-free'], 'paid', true),
(3, 9, 3, '2024-09-15', '10:00', 3, ARRAY['Sophie Dubois', 'Marie Dubois', 'Claire Dubois'], ARRAY[32, 58, 30], 435.00, 'confirmed', 'Cultural exploration', ARRAY['gluten-free'], 'paid', false),

-- James Wilson bookings - using experiences 10, 11, 12
(4, 10, 3, '2024-05-12', '17:00', 1, ARRAY['James Wilson'], ARRAY[44], 95.00, 'completed', 'Solo sailing experience', ARRAY[]::text[], 'paid', false),
(4, 11, 3, '2024-07-08', '14:00', 2, ARRAY['James Wilson', 'Mark Wilson'], ARRAY[44, 46], 210.00, 'completed', 'Brothers adventure', ARRAY[]::text[], 'paid', true),
(4, 12, 4, '2024-12-20', '19:00', 2, ARRAY['James Wilson', 'Mark Wilson'], ARRAY[44, 46], 490.00, 'confirmed', 'Northern Lights expedition', ARRAY[]::text[], 'paid', true),

-- Maria Rodriguez bookings - using experiences 13, 14, 15
(5, 13, 7, '2024-06-14', '09:00', 6, ARRAY['Maria Rodriguez', 'Carlos Rodriguez', 'Ana Rodriguez', 'Luis Rodriguez', 'Carmen Rodriguez', 'Pablo Rodriguez'], ARRAY[37, 39, 15, 13, 65, 67], 1680.00, 'completed', 'Family reunion', ARRAY['pescatarian'], 'paid', true),
(5, 14, 5, '2024-08-05', '10:00', 6, ARRAY['Maria Rodriguez', 'Carlos Rodriguez', 'Ana Rodriguez', 'Luis Rodriguez', 'Carmen Rodriguez', 'Pablo Rodriguez'], ARRAY[37, 39, 15, 13, 65, 67], 2100.00, 'completed', 'Grandparents'' 40th anniversary', ARRAY['pescatarian'], 'paid', false),
(5, 15, 5, '2024-09-28', '11:00', 6, ARRAY['Maria Rodriguez', 'Carlos Rodriguez', 'Ana Rodriguez', 'Luis Rodriguez', 'Carmen Rodriguez', 'Pablo Rodriguez'], ARRAY[37, 39, 15, 13, 65, 67], 1470.00, 'confirmed', 'Cultural education for children', ARRAY['pescatarian'], 'paid', true),

-- Lars Andersen bookings - using experiences 16, 17, 18
(6, 16, 6, '2024-06-21', '20:00', 2, ARRAY['Lars Andersen', 'Ingrid Andersen'], ARRAY[49, 47], 590.00, 'completed', 'Midnight sun experience', ARRAY[]::text[], 'paid', false),
(6, 17, 6, '2024-07-18', '09:00', 2, ARRAY['Lars Andersen', 'Ingrid Andersen'], ARRAY[49, 47], 290.00, 'completed', 'Baltic heritage tour', ARRAY[]::text[], 'paid', true),
(6, 18, 6, '2024-08-30', '10:00', 2, ARRAY['Lars Andersen', 'Ingrid Andersen'], ARRAY[49, 47], 270.00, 'confirmed', 'Innovation and technology', ARRAY[]::text[], 'paid', false),

-- Isabella Romano bookings - using experiences 19, 20, 21
(7, 19, 7, '2024-05-25', '08:30', 1, ARRAY['Isabella Romano'], ARRAY[34], 295.00, 'completed', 'Solo travel adventure', ARRAY['dairy-free'], 'paid', true),
(7, 20, 7, '2024-07-12', '15:00', 3, ARRAY['Isabella Romano', 'Giulia Romano', 'Francesco Romano'], ARRAY[32, 36, 36], 567.00, 'completed', 'Cousins reunion', ARRAY['dairy-free'], 'paid', false),
(7, 21, 7, '2024-04-15', '11:00', 3, ARRAY['Isabella Romano', 'Giulia Romano', 'Francesco Romano'], ARRAY[34, 32, 36], 495.00, 'completed', 'Tulip season special', ARRAY['dairy-free'], 'paid', true),

-- Thomas Mueller bookings - using experiences 22, 23, 24
(8, 22, 8, '2024-06-08', '10:00', 2, ARRAY['Thomas Mueller', 'Anna Mueller'], ARRAY[41, 38], 290.00, 'completed', 'Accessible sailing experience', ARRAY[]::text[], 'paid', true),
(8, 23, 8, '2024-08-16', '09:00', 2, ARRAY['Thomas Mueller', 'Anna Mueller'], ARRAY[41, 38], 370.00, 'completed', 'Historical interest', ARRAY[]::text[], 'paid', false),
(8, 24, 8, '2024-09-22', '12:00', 2, ARRAY['Thomas Mueller', 'Anna Mueller'], ARRAY[41, 38], 290.00, 'confirmed', 'Engineering heritage', ARRAY[]::text[], 'paid', true),

-- Charlotte Williams bookings - using experiences 25, 26, 27
(9, 25, 9, '2024-07-03', '08:00', 4, ARRAY['Charlotte Williams', 'Emma Williams', 'Sophie Williams', 'Grace Williams'], ARRAY[29, 27, 25, 23], 740.00, 'completed', 'Sisters'' trip', ARRAY['vegan'], 'paid', true),
(9, 26, 9, '2024-08-19', '09:00', 4, ARRAY['Charlotte Williams', 'Emma Williams', 'Sophie Williams', 'Grace Williams'], ARRAY[29, 27, 25, 23], 660.00, 'completed', 'Scottish adventure', ARRAY['vegan'], 'paid', false),
(9, 27, 9, '2024-09-05', '15:00', 4, ARRAY['Charlotte Williams', 'Emma Williams', 'Sophie Williams', 'Grace Williams'], ARRAY[29, 27, 25, 23], 392.00, 'confirmed', 'Racing experience', ARRAY['vegan'], 'paid', true),

-- Dimitris Papadopoulos bookings - using experiences 28, 29, 30
(10, 28, 9, '2024-06-25', '16:30', 2, ARRAY['Dimitris Papadopoulos', 'Elena Papadopoulos'], ARRAY[36, 34], 378.00, 'completed', 'Local exploration', ARRAY[]::text[], 'paid', false),
(10, 29, 10, '2024-08-08', '08:00', 2, ARRAY['Dimitris Papadopoulos', 'Elena Papadopoulos'], ARRAY[36, 34], 330.00, 'completed', 'Diving certification practice', ARRAY[]::text[], 'paid', true),
(10, 30, 10, '2024-10-12', '06:00', 2, ARRAY['Dimitris Papadopoulos', 'Elena Papadopoulos'], ARRAY[36, 34], 550.00, 'confirmed', 'Arctic wildlife photography', ARRAY[]::text[], 'paid', true),

-- Amelie Leroy bookings - using experiences 31, 32, 1
(11, 31, 10, '2024-05-18', '10:30', 2, ARRAY['Amelie Leroy', 'Jean Leroy'], ARRAY[33, 35], 560.00, 'completed', 'Romantic getaway', ARRAY[]::text[], 'paid', true),
(11, 32, 10, '2024-07-22', '11:00', 2, ARRAY['Amelie Leroy', 'Jean Leroy'], ARRAY[33, 35], 250.00, 'completed', 'Ecology education', ARRAY[]::text[], 'paid', false),
(11, 1, 1, '2024-08-26', '09:30', 2, ARRAY['Amelie Leroy', 'Jean Leroy'], ARRAY[33, 35], 270.00, 'confirmed', 'Technology innovation tour', ARRAY[]::text[], 'paid', true),

-- Oliver Thompson bookings - using experiences 2, 3, 4
(12, 2, 1, '2024-06-12', '08:30', 1, ARRAY['Oliver Thompson'], ARRAY[45], 145.00, 'completed', 'Wildlife photography', ARRAY[]::text[], 'paid', false),
(12, 3, 1, '2024-07-28', '09:00', 3, ARRAY['Oliver Thompson', 'Helen Thompson', 'Jack Thompson'], ARRAY[45, 43, 17], 465.00, 'completed', 'Family fishing experience', ARRAY[]::text[], 'paid', true),
(12, 4, 2, '2024-11-15', '18:00', 3, ARRAY['Oliver Thompson', 'Helen Thompson', 'Jack Thompson'], ARRAY[45, 43, 17], 735.00, 'confirmed', 'Northern Lights family trip', ARRAY[]::text[], 'paid', true);
