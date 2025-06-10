-- Insert experience images

-- First, let's reset the sequence for experience_images if needed
SELECT setval('experience_images_id_seq', 1, false);

INSERT INTO experience_images (experience_id, image_url, alt_text, is_primary, display_order) VALUES

-- Solent Heritage Sailing Adventure images (experience_id = 1)
(1, '/placeholder.svg?height=400&width=600&text=Solent+Heritage+Hero', 'Historic Solent waters with Royal Yacht Squadron in background', true, 1),
(1, '/placeholder.svg?height=400&width=600&text=Osborne+House+View', 'View of Osborne House from the water', false, 2),
(1, '/placeholder.svg?height=400&width=600&text=Traditional+Afternoon+Tea', 'Traditional afternoon tea served on deck', false, 3),
(1, '/placeholder.svg?height=400&width=600&text=Historic+Forts', 'Historic Solent forts and naval heritage', false, 4),

-- Isle of Wight Coastal Discovery images (experience_id = 2)
(2, '/placeholder.svg?height=400&width=600&text=Isle+of+Wight+Cliffs', 'Dramatic chalk cliffs of Isle of Wight', true, 1),
(2, '/placeholder.svg?height=400&width=600&text=Secluded+Bay+Swimming', 'Guests swimming in secluded bay', false, 2),
(2, '/placeholder.svg?height=400&width=600&text=Coastal+Village', 'Charming coastal village from the sea', false, 3),
(2, '/placeholder.svg?height=400&width=600&text=Full+Circumnavigation', 'Full view of Isle of Wight coastline', false, 4),

-- Sunset Racing Experience images (experience_id = 3)
(3, '/placeholder.svg?height=400&width=600&text=Cowes+Racing', 'Competitive yacht racing in Cowes waters', true, 1),
(3, '/placeholder.svg?height=400&width=600&text=Racing+Instruction', 'Captain teaching racing techniques', false, 2),
(3, '/placeholder.svg?height=400&width=600&text=Racing+Fleet', 'Fleet of racing yachts at sunset', false, 3),

-- Highland Wildlife Safari images (experience_id = 4)
(4, '/placeholder.svg?height=400&width=600&text=Scottish+Dolphins', 'Dolphins in Scottish Highland waters', true, 1),
(4, '/placeholder.svg?height=400&width=600&text=Marine+Biologist+Guide', 'Marine biologist explaining wildlife behavior', false, 2),
(4, '/placeholder.svg?height=400&width=600&text=Highland+Scenery', 'Dramatic Scottish Highland coastline', false, 3),
(4, '/placeholder.svg?height=400&width=600&text=Seal+Colony', 'Seal colony on rocky outcrop', false, 4),

-- Hebridean Island Hopping images (experience_id = 5)
(5, '/placeholder.svg?height=400&width=600&text=Iona+Abbey', 'Historic Iona Abbey from the water', true, 1),
(5, '/placeholder.svg?height=400&width=600&text=Staffa+Basalt', 'Dramatic basalt formations at Staffa', false, 2),
(5, '/placeholder.svg?height=400&width=600&text=Celtic+Heritage', 'Ancient Celtic stone circles', false, 3),
(5, '/placeholder.svg?height=400&width=600&text=Island+Hopping', 'Multiple Hebridean islands view', false, 4),

-- Continue with more experience images...
(13, '/placeholder.svg?height=400&width=600&text=Santorini+Sunset', 'Iconic Santorini sunset from sailing yacht', true, 1),
(13, '/placeholder.svg?height=400&width=600&text=Volcanic+Wine+Tasting', 'Wine tasting with volcanic backdrop', false, 2),
(13, '/placeholder.svg?height=400&width=600&text=Caldera+Swimming', 'Swimming in Santorini caldera waters', false, 3),
(13, '/placeholder.svg?height=400&width=600&text=Traditional+Greek+Meal', 'Traditional Greek meal on deck', false, 4),

-- French Riviera experiences (experience_id = 14)
(14, '/placeholder.svg?height=400&width=600&text=Cote+Azur+Gourmet', 'Gourmet dining on French Riviera yacht', true, 1),
(14, '/placeholder.svg?height=400&width=600&text=Provencal+Cuisine', 'Chef preparing Provençal specialties', false, 2),
(14, '/placeholder.svg?height=400&width=600&text=Wine+Tasting+Riviera', 'Wine tasting with Riviera coastline', false, 3),
(14, '/placeholder.svg?height=400&width=600&text=Luxury+Beach+Club', 'Exclusive beach club access', false, 4),

-- Add more images for other experiences...
(22, '/placeholder.svg?height=400&width=600&text=Midnight+Sun+Arctic', 'Midnight sun over Lofoten Islands', true, 1),
(22, '/placeholder.svg?height=400&width=600&text=Arctic+Sailing', 'Sailing yacht in Arctic waters', false, 2),
(22, '/placeholder.svg?height=400&width=600&text=Lofoten+Peaks', 'Dramatic peaks rising from the sea', false, 3),
(22, '/placeholder.svg?height=400&width=600&text=Traditional+Norwegian', 'Traditional Norwegian meal on deck', false, 4),

-- Additional images for more experiences
(6, '/placeholder.svg?height=400&width=600&text=Loch+Katrine+Whisky', 'Whisky tasting on Scottish loch', true, 1),
(7, '/placeholder.svg?height=400&width=600&text=Cornish+Smugglers', 'Hidden smugglers cove in Cornwall', true, 1),
(8, '/placeholder.svg?height=400&width=600&text=Poldark+Locations', 'Dramatic Poldark filming locations', true, 1),
(9, '/placeholder.svg?height=400&width=600&text=Cornish+Fishing', 'Traditional Cornish fishing methods', true, 1),
(10, '/placeholder.svg?height=400&width=600&text=Pembrokeshire+Thrill', 'High-speed sailing Pembrokeshire coast', true, 1),
(11, '/placeholder.svg?height=400&width=600&text=Welsh+Dragon+Racing', 'Competitive sailing instruction Wales', true, 1),
(12, '/placeholder.svg?height=400&width=600&text=Monaco+Glamour', 'Luxury Monaco harbor experience', true, 1),
(15, '/placeholder.svg?height=400&width=600&text=Secret+Coves+Provence', 'Hidden Mediterranean coves', true, 1),
(16, '/placeholder.svg?height=400&width=600&text=Amalfi+Heritage', 'UNESCO Amalfi Coast heritage', true, 1),
(17, '/placeholder.svg?height=400&width=600&text=Capri+Blue+Grotto', 'Famous Blue Grotto Capri', true, 1),
(18, '/placeholder.svg?height=400&width=600&text=Cinque+Terre+Coast', 'Dramatic Cinque Terre coastline', true, 1),
(19, '/placeholder.svg?height=400&width=600&text=Cycladic+Islands', 'Traditional Cycladic island hopping', true, 1),
(20, '/placeholder.svg?height=400&width=600&text=Aegean+Diving', 'Underwater volcanic formations', true, 1),
(21, '/placeholder.svg?height=400&width=600&text=Northern+Lights', 'Aurora Borealis sailing expedition', true, 1),
(23, '/placeholder.svg?height=400&width=600&text=Fjord+Wildlife', 'Arctic wildlife in Norwegian fjords', true, 1),
(24, '/placeholder.svg?height=400&width=600&text=Baltic+Tall+Ship', 'Traditional tall ship Baltic Sea', true, 1),
(25, '/placeholder.svg?height=400&width=600&text=Hanseatic+Heritage', 'Historic Hanseatic League ports', true, 1),
(26, '/placeholder.svg?height=400&width=600&text=Wadden+Sea+Ecology', 'UNESCO Wadden Sea ecosystem', true, 1),
(27, '/placeholder.svg?height=400&width=600&text=Dutch+Innovation', 'Sustainable sailing technology', true, 1),
(28, '/placeholder.svg?height=400&width=600&text=Tulip+Season', 'Dutch tulip fields and canals', true, 1),
(29, '/placeholder.svg?height=400&width=600&text=Windmill+Heritage', 'Traditional Dutch windmills', true, 1),
(30, '/placeholder.svg?height=400&width=600&text=Additional+Experience', 'Additional sailing experience', true, 1),
(31, '/placeholder.svg?height=400&width=600&text=Additional+Experience+2', 'Additional sailing experience 2', true, 1),
(32, '/placeholder.svg?height=400&width=600&text=Additional+Experience+3', 'Additional sailing experience 3', true, 1);
