-- Insert review data

-- First, let's reset the sequence for reviews if needed
SELECT setval('reviews_id_seq', 1, false);

INSERT INTO reviews (booking_id, user_id, experience_id, captain_id, rating, title, comment, experience_highlights, would_recommend, verified_booking, helpful_votes) VALUES

-- Reviews for completed bookings
(1, 1, 1, 1, 5, 'Perfect Anniversary Celebration', 'Captain James made our anniversary absolutely magical! His knowledge of Solent history was incredible, and the traditional afternoon tea was a lovely touch. The weather was perfect and we saw so many historic sites. Highly recommend for couples!', ARRAY['Traditional afternoon tea', 'Historical stories', 'Perfect weather', 'Romantic atmosphere'], true, true, 23),

(2, 1, 2, 1, 5, 'Unforgettable Honeymoon Experience', 'Marie is an absolute gem! The gourmet meal was restaurant quality, the wine selection was perfect, and the secret coves were breathtaking. This was the highlight of our honeymoon in France. Worth every penny!', ARRAY['Gourmet cuisine', 'Secret coves', 'Wine tasting', 'Professional service'], true, true, 45),

(4, 2, 4, 2, 5, 'Amazing Family Wildlife Adventure', 'Sarah''s expertise as a marine biologist made this trip educational and exciting for our teenagers. We saw dolphins, seals, and learned so much about Scottish marine life. The kids are still talking about it weeks later!', ARRAY['Marine wildlife sightings', 'Educational content', 'Teen-friendly', 'Expert guide'], true, true, 67),

(5, 2, 5, 2, 4, 'Great Cultural Experience', 'Marco''s knowledge of Italian maritime history is impressive. The Amalfi Coast is stunning from the water. Only minor issue was the weather was a bit choppy, but Marco handled it professionally. Kids loved the limoncello tasting (non-alcoholic version)!', ARRAY['Cultural immersion', 'Historical knowledge', 'Family-friendly', 'Professional handling'], true, true, 34),

(7, 3, 7, 2, 5, 'Perfect Mother''s Day Surprise', 'Marie created the most wonderful Mother''s Day experience for us three generations of women. The attention to dietary restrictions was perfect, and the hidden coves were like something from a fairy tale. Maman was so happy!', ARRAY['Multi-generational fun', 'Dietary accommodation', 'Beautiful locations', 'Special occasion'], true, true, 56),

(8, 3, 8, 2, 5, 'Sisters Trip of a Lifetime', 'The Amalfi Coast heritage voyage exceeded all expectations. Marco''s family stories and the traditional lunch were highlights. The UNESCO sites were breathtaking. Already planning our return trip!', ARRAY['Family traditions', 'UNESCO sites', 'Traditional cuisine', 'Memorable experience'], true, true, 78),

(10, 4, 10, 3, 4, 'Thrilling Racing Experience', 'Great introduction to competitive sailing! James is an excellent instructor and the Cowes racing scene is legendary. Got a bit wet but that''s part of the fun. Would love to do a longer racing course.', ARRAY['Racing instruction', 'Competitive atmosphere', 'Expert teaching', 'Authentic experience'], true, true, 29),

(11, 4, 11, 3, 5, 'Adrenaline Rush in Wales', 'Emma is an incredible sailor and teacher! The Pembrokeshire coast is dramatic and beautiful. High-speed sailing was exhilarating. Perfect for experienced sailors looking for a challenge.', ARRAY['High-speed sailing', 'Dramatic coastline', 'Expert instruction', 'Challenging experience'], true, true, 41),

(13, 5, 13, 7, 5, 'Magical Family Reunion', 'Six family members from 13 to 67 years old and everyone had an amazing time! Marie accommodated all our dietary needs and the grandparents loved the gentle pace. The Monaco experience was luxurious and memorable.', ARRAY['Multi-generational appeal', 'Dietary accommodation', 'Luxury experience', 'Family bonding'], true, true, 89),

(14, 5, 14, 5, 4, 'Wonderful Anniversary Celebration', 'Beautiful way to celebrate the grandparents'' 40th anniversary. The Capri Blue Grotto was stunning, though we had to wait a bit due to crowds. Marco''s stories about his family''s sailing history were touching.', ARRAY['Special celebration', 'Blue Grotto visit', 'Family history', 'Scenic beauty'], true, true, 52),

(16, 6, 16, 6, 5, 'Midnight Sun Magic', 'Absolutely incredible experience! The midnight sun over the Lofoten Islands is something everyone should see. Lars'' knowledge of Arctic conditions and his storytelling made this unforgettable. The 24-hour daylight is surreal.', ARRAY['Midnight sun', 'Arctic expertise', 'Storytelling', 'Unique experience'], true, true, 73),

(17, 6, 17, 6, 4, 'Fascinating Baltic Heritage', 'Hans'' passion for maritime history really shows. The tall ship experience was authentic and educational. Great for history buffs. The traditional German meal was hearty and delicious.', ARRAY['Maritime history', 'Authentic tall ship', 'Educational content', 'Traditional cuisine'], true, true, 38),

(19, 7, 19, 7, 5, 'Perfect Solo Adventure', 'As a solo female traveler, I felt completely safe and welcome. Marco''s professionalism and the beauty of the Amalfi Coast made this a perfect day. The dairy-free options were thoughtfully prepared.', ARRAY['Solo-friendly', 'Professional service', 'Dietary accommodation', 'Safety'], true, true, 61),

(20, 7, 20, 7, 5, 'Incredible Diving Experience', 'Nikos is an excellent dive master and the underwater volcanic formations around Santorini are otherworldly. The combination of sailing and diving was perfect. Highly recommend for certified divers.', ARRAY['Expert dive instruction', 'Volcanic formations', 'Combined sailing/diving', 'Professional equipment'], true, true, 47),

(22, 8, 22, 8, 5, 'Excellent Accessible Experience', 'Hans and his crew went above and beyond to ensure I could fully participate despite mobility challenges. The tall ship was well-equipped and the crew was incredibly helpful. Accessibility done right!', ARRAY['Accessibility accommodation', 'Helpful crew', 'Full participation', 'Professional service'], true, true, 92),

(23, 8, 23, 8, 4, 'Educational Hanseatic Tour', 'Fascinating insight into medieval maritime trade. Hans'' knowledge is encyclopedic. The UNESCO sites were impressive. Only wish we had more time at each port. Great for history enthusiasts.', ARRAY['Historical education', 'UNESCO sites', 'Expert knowledge', 'Cultural immersion'], true, true, 35),

(25, 9, 25, 9, 5, 'Amazing Sisters Adventure', 'Four sisters, four different personalities, and we all loved it! James'' knowledge of the Isle of Wight was incredible. The circumnavigation showed us so many different landscapes. Vegan meal options were delicious and creative.', ARRAY['Group dynamics', 'Diverse landscapes', 'Dietary accommodation', 'Comprehensive tour'], true, true, 68),

(26, 9, 26, 9, 5, 'Scottish Whisky and Sailing Perfection', 'Sarah combined our love of sailing with Scotland''s finest whisky traditions perfectly. The distillery visits were educational and the tastings were exceptional. The Scottish lochs are breathtaking. Perfect girls'' trip!', ARRAY['Whisky education', 'Scenic lochs', 'Cultural experience', 'Group bonding'], true, true, 54),

(28, 10, 28, 9, 4, 'Beautiful Local Experience', 'As locals, we thought we knew Santorini, but Nikos showed us hidden spots we''d never seen. The sunset was spectacular and the wine tasting featured some excellent local varieties. Great way to see our home from a new perspective.', ARRAY['Local insights', 'Hidden locations', 'Spectacular sunset', 'Local wine'], true, true, 42),

(29, 10, 29, 10, 5, 'Excellent Diving Practice', 'Perfect for practicing our diving skills! Nikos'' instruction helped us improve our technique and the Aegean Sea visibility was incredible. The underwater volcanic formations are unique. Great for intermediate divers.', ARRAY['Skill improvement', 'Clear visibility', 'Unique geology', 'Expert instruction'], true, true, 31),

(31, 11, 31, 10, 5, 'Romantic French Riviera Dream', 'Marie created the perfect romantic experience for us. The secret coves were incredibly romantic, the gourmet picnic was divine, and the French Riviera coastline is simply stunning. Couldn''t have asked for a better day.', ARRAY['Romantic atmosphere', 'Gourmet cuisine', 'Secret locations', 'Stunning coastline'], true, true, 76),

(32, 11, 32, 10, 4, 'Educational Wadden Sea Tour', 'Hans'' knowledge of marine ecology is impressive. The Wadden Sea ecosystem is fascinating and we learned so much about conservation. Great for nature lovers and those interested in environmental protection.', ARRAY['Marine ecology', 'Conservation education', 'Unique ecosystem', 'Environmental awareness'], true, true, 28),

(34, 12, 2, 1, 5, 'Outstanding Wildlife Photography', 'Sarah''s expertise in both marine biology and photography made this trip exceptional. We saw incredible wildlife and she helped us capture amazing photos. The Scottish Highlands from the sea are breathtaking.', ARRAY['Wildlife photography', 'Expert guidance', 'Marine biology', 'Scenic beauty'], true, true, 65),

(35, 12, 3, 1, 4, 'Great Family Fishing Experience', 'Robert taught us traditional Cornish fishing methods and we actually caught our dinner! The kids loved learning about sustainable fishing and the fresh seafood lunch was incredible. Authentic Cornish experience.', ARRAY['Traditional techniques', 'Family learning', 'Fresh seafood', 'Cultural authenticity'], true, true, 49);
