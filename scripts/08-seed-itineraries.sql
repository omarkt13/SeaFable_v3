-- Insert experience itineraries

-- First, let's reset the sequence for experience_itinerary if needed
SELECT setval('experience_itinerary_id_seq', 1, false);

INSERT INTO experience_itinerary (experience_id, step_order, time_start, duration_minutes, title, description, location, activities) VALUES

-- Solent Heritage Sailing Adventure itinerary (experience_id = 1)
(1, 1, '09:00', 30, 'Welcome and Safety Briefing', 'Meet your captain and crew, receive safety briefing and introduction to the yacht. Enjoy welcome refreshments while learning about the day''s planned route.', 'Cowes Yacht Haven', ARRAY['Safety briefing', 'Yacht introduction', 'Welcome refreshments']),
(1, 2, '09:30', 90, 'Sail to Royal Yacht Squadron', 'Sail past the prestigious Royal Yacht Squadron and learn about its role in yachting history. Hear stories of royal connections and famous regattas.', 'Royal Yacht Squadron', ARRAY['Historical commentary', 'Photography opportunities', 'Royal yacht spotting']),
(1, 3, '11:00', 60, 'Osborne House Waters', 'Cruise past Queen Victoria''s beloved Osborne House and learn about royal maritime traditions. Perfect photo opportunities of this historic royal residence.', 'Osborne House', ARRAY['Royal history', 'Photography', 'Architectural viewing']),
(1, 4, '12:00', 90, 'Traditional Afternoon Tea', 'Anchor in a sheltered bay and enjoy a traditional British afternoon tea with scones, clotted cream, and jam while surrounded by maritime history.', 'Sheltered Bay', ARRAY['Traditional afternoon tea', 'Relaxation', 'Scenic dining']),
(1, 5, '13:30', 90, 'Historic Forts Tour', 'Sail past the historic Solent forts built to defend Portsmouth Harbor. Learn about naval battles and defensive strategies that shaped British maritime power.', 'Solent Forts', ARRAY['Military history', 'Fort viewing', 'Naval heritage']),
(1, 6, '15:00', 60, 'Return to Cowes', 'Leisurely sail back to Cowes with final opportunities for questions and photography. Farewell refreshments and trip summary.', 'Cowes Yacht Haven', ARRAY['Final photography', 'Trip summary', 'Farewell']),

-- Highland Wildlife Safari itinerary (experience_id = 4)
(4, 1, '08:00', 45, 'Marine Biology Introduction', 'Meet your marine biologist guide and receive an introduction to Scottish marine ecosystems. Learn about species we might encounter and receive wildlife identification charts.', 'Oban Marina', ARRAY['Marine biology briefing', 'Species identification', 'Equipment distribution']),
(4, 2, '08:45', 120, 'Seal Colony Visit', 'Cruise to nearby seal colonies and observe these magnificent marine mammals in their natural habitat. Learn about seal behavior and conservation efforts.', 'Seal Rocks', ARRAY['Seal watching', 'Behavioral observation', 'Conservation education']),
(4, 3, '10:45', 90, 'Dolphin and Whale Watching', 'Head to deeper waters where dolphins and whales are frequently spotted. Use provided binoculars and learn about marine mammal migration patterns.', 'Deep Waters off Mull', ARRAY['Dolphin spotting', 'Whale watching', 'Migration education']),
(4, 4, '12:15', 60, 'Lunch and Highland Views', 'Enjoy hot soup and sandwiches while taking in the dramatic Highland scenery. Perfect time for photography and relaxation.', 'Sheltered Loch', ARRAY['Highland cuisine', 'Scenic photography', 'Relaxation']),
(4, 5, '13:15', 120, 'Seabird Colonies', 'Visit dramatic cliffs where thousands of seabirds nest. Learn about different species and their unique adaptations to marine life.', 'Seabird Cliffs', ARRAY['Seabird identification', 'Cliff viewing', 'Adaptation education']),
(4, 6, '15:15', 45, 'Return and Debrief', 'Return to Oban with a summary of wildlife spotted and conservation discussion. Receive take-home wildlife identification guides.', 'Oban Marina', ARRAY['Wildlife summary', 'Conservation discussion', 'Resource sharing']),

-- Santorini Sunset Wine Odyssey itinerary (experience_id = 13)
(13, 1, '16:00', 30, 'Volcanic Island Introduction', 'Board your yacht and receive an introduction to Santorini''s unique volcanic geology. Learn about the island''s formation and wine-making traditions.', 'Vlychada Marina', ARRAY['Geological briefing', 'Wine introduction', 'Safety overview']),
(13, 2, '16:30', 90, 'Red Beach Swimming Stop', 'Sail to the famous Red Beach for swimming and snorkeling. Explore the unique volcanic sand and dramatic red cliffs.', 'Red Beach', ARRAY['Swimming', 'Snorkeling', 'Geological exploration']),
(13, 3, '18:00', 90, 'Volcanic Wine Tasting', 'Anchor in a secluded bay and enjoy tastings of unique Santorini wines made from grapes grown in volcanic soil. Learn about Assyrtiko and other local varieties.', 'Secluded Caldera Bay', ARRAY['Wine tasting', 'Volcanic viticulture', 'Local varieties']),
(13, 4, '19:30', 60, 'Traditional Greek Dinner', 'Enjoy a traditional Greek meal featuring local specialties like fava, tomato keftedes, and fresh seafood while the sun begins to set.', 'Caldera Waters', ARRAY['Traditional cuisine', 'Local specialties', 'Cultural dining']),
(13, 5, '20:30', 60, 'World-Famous Sunset', 'Position the yacht for optimal sunset viewing. Watch the sun set over the Aegean Sea with Santorini''s dramatic caldera as your backdrop.', 'Sunset Viewing Point', ARRAY['Sunset photography', 'Scenic viewing', 'Romantic atmosphere']),
(13, 6, '21:30', 30, 'Evening Return', 'Leisurely sail back to marina under the stars with final wine service and reflection on the day''s experiences.', 'Vlychada Marina', ARRAY['Stargazing', 'Final wine service', 'Day reflection']),

-- Midnight Sun Arctic Sailing itinerary (experience_id = 22)
(22, 1, '14:00', 60, 'Arctic Preparation', 'Meet your Arctic sailing expert and receive specialized clothing and safety equipment. Learn about midnight sun phenomenon and Arctic conditions.', 'Svolvær Harbor', ARRAY['Arctic briefing', 'Equipment fitting', 'Safety preparation']),
(22, 2, '15:00', 180, 'Lofoten Island Exploration', 'Sail through the dramatic Lofoten archipelago, passing towering peaks that rise directly from the sea. Learn about Arctic geology and Sami culture.', 'Lofoten Waters', ARRAY['Island exploration', 'Geological education', 'Cultural learning']),
(22, 3, '18:00', 120, 'Traditional Norwegian Feast', 'Anchor in a protected fjord and enjoy a traditional Norwegian meal featuring Arctic char, reindeer, and local specialties while surrounded by midnight sun.', 'Protected Fjord', ARRAY['Traditional cuisine', 'Arctic specialties', 'Cultural dining']),
(22, 4, '20:00', 180, 'Midnight Sun Photography', 'Position for optimal midnight sun viewing and photography. Learn about Arctic light conditions and capture this unique natural phenomenon.', 'Open Arctic Waters', ARRAY['Photography workshop', 'Light education', 'Midnight sun viewing']),
(22, 5, '23:00', 120, 'Arctic Wildlife Watching', 'Search for Arctic wildlife including seals, whales, and seabirds that remain active during the midnight sun period.', 'Wildlife Areas', ARRAY['Wildlife spotting', 'Behavioral observation', 'Arctic adaptation']),
(22, 6, '01:00', 60, 'Return Under Midnight Sun', 'Return to harbor under the surreal light of the midnight sun with hot drinks and reflection on this unique Arctic experience.', 'Svolvær Harbor', ARRAY['Midnight sailing', 'Hot beverages', 'Experience reflection']);
