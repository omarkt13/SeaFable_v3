-- Insert weather data for various locations

INSERT INTO weather_data (location, date, temperature_celsius, wind_speed_knots, wind_direction, wave_height_meters, weather_condition, visibility_km, precipitation_chance, sailing_conditions) VALUES

-- Cowes, Isle of Wight weather data
('Cowes, Isle of Wight', '2024-07-15', 22, 12, 'SW', 0.8, 'sunny', 15, 10, 'excellent'),
('Cowes, Isle of Wight', '2024-07-16', 24, 8, 'W', 0.5, 'sunny', 20, 5, 'excellent'),
('Cowes, Isle of Wight', '2024-07-17', 21, 15, 'SW', 1.2, 'partly cloudy', 12, 20, 'good'),
('Cowes, Isle of Wight', '2024-08-15', 25, 10, 'S', 0.6, 'sunny', 18, 15, 'excellent'),
('Cowes, Isle of Wight', '2024-09-15', 19, 18, 'W', 1.5, 'cloudy', 10, 35, 'fair'),

-- Oban, Scotland weather data
('Oban, Scotland', '2024-06-18', 16, 14, 'NW', 1.0, 'partly cloudy', 12, 25, 'good'),
('Oban, Scotland', '2024-07-18', 18, 12, 'W', 0.8, 'sunny', 15, 15, 'excellent'),
('Oban, Scotland', '2024-08-18', 20, 10, 'SW', 0.6, 'sunny', 18, 10, 'excellent'),
('Oban, Scotland', '2024-09-18', 15, 16, 'NW', 1.3, 'cloudy', 8, 40, 'fair'),

-- Cannes, French Riviera weather data
('Cannes, French Riviera', '2024-05-20', 24, 8, 'E', 0.3, 'sunny', 25, 5, 'excellent'),
('Cannes, French Riviera', '2024-06-20', 27, 10, 'SE', 0.4, 'sunny', 20, 10, 'excellent'),
('Cannes, French Riviera', '2024-07-20', 29, 12, 'S', 0.5, 'sunny', 22, 8, 'excellent'),
('Cannes, French Riviera', '2024-08-20', 31, 6, 'E', 0.2, 'sunny', 25, 3, 'excellent'),
('Cannes, French Riviera', '2024-09-20', 26, 14, 'W', 0.8, 'partly cloudy', 15, 20, 'good'),

-- Santorini, Greece weather data
('Santorini, Greece', '2024-06-25', 26, 15, 'N', 0.6, 'sunny', 20, 5, 'excellent'),
('Santorini, Greece', '2024-07-25', 29, 18, 'N', 0.8, 'sunny', 25, 2, 'excellent'),
('Santorini, Greece', '2024-08-25', 31, 20, 'N', 1.0, 'sunny', 22, 5, 'good'),
('Santorini, Greece', '2024-09-25', 27, 12, 'NE', 0.5, 'sunny', 20, 10, 'excellent'),

-- Amalfi, Italy weather data
('Amalfi, Italy', '2024-05-25', 23, 8, 'SW', 0.4, 'sunny', 18, 15, 'excellent'),
('Amalfi, Italy', '2024-06-25', 26, 10, 'S', 0.5, 'sunny', 20, 10, 'excellent'),
('Amalfi, Italy', '2024-07-25', 28, 6, 'SE', 0.3, 'sunny', 25, 5, 'excellent'),
('Amalfi, Italy', '2024-08-25', 30, 12, 'SW', 0.6, 'sunny', 22, 12, 'excellent'),

-- Lofoten Islands, Norway weather data
('Lofoten Islands, Norway', '2024-06-21', 12, 20, 'W', 1.5, 'partly cloudy', 10, 30, 'good'),
('Lofoten Islands, Norway', '2024-07-21', 15, 16, 'NW', 1.2, 'cloudy', 8, 25, 'good'),
('Lofoten Islands, Norway', '2024-08-21', 18, 12, 'SW', 0.8, 'partly cloudy', 12, 20, 'good'),
('Lofoten Islands, Norway', '2024-12-21', -2, 25, 'N', 2.0, 'clear', 15, 10, 'challenging'),

-- St. Ives, Cornwall weather data
('St. Ives, Cornwall', '2024-05-12', 18, 16, 'SW', 1.2, 'partly cloudy', 12, 25, 'good'),
('St. Ives, Cornwall', '2024-06-12', 20, 14, 'W', 1.0, 'sunny', 15, 20, 'good'),
('St. Ives, Cornwall', '2024-07-12', 22, 12, 'SW', 0.8, 'sunny', 18, 15, 'excellent'),
('St. Ives, Cornwall', '2024-08-12', 24, 10, 'S', 0.6, 'sunny', 20, 10, 'excellent'),

-- Tenby, Wales weather data
('Tenby, Wales', '2024-05-08', 17, 18, 'W', 1.3, 'cloudy', 10, 35, 'fair'),
('Tenby, Wales', '2024-06-08', 19, 15, 'SW', 1.0, 'partly cloudy', 12, 25, 'good'),
('Tenby, Wales', '2024-07-08', 21, 12, 'S', 0.8, 'sunny', 15, 20, 'good'),
('Tenby, Wales', '2024-08-08', 23, 10, 'SE', 0.6, 'sunny', 18, 15, 'excellent'),

-- Kiel, Germany weather data
('Kiel, Germany', '2024-06-08', 19, 14, 'W', 0.9, 'partly cloudy', 12, 30, 'good'),
('Kiel, Germany', '2024-07-08', 22, 12, 'SW', 0.7, 'sunny', 15, 20, 'good'),
('Kiel, Germany', '2024-08-08', 24, 10, 'S', 0.5, 'sunny', 18, 15, 'excellent'),
('Kiel, Germany', '2024-09-08', 20, 16, 'W', 1.1, 'cloudy', 10, 35, 'fair'),

-- Amsterdam, Netherlands weather data
('Amsterdam, Netherlands', '2024-04-15', 15, 16, 'W', 0.8, 'partly cloudy', 12, 30, 'good'),
('Amsterdam, Netherlands', '2024-05-15', 18, 14, 'SW', 0.6, 'sunny', 15, 25, 'good'),
('Amsterdam, Netherlands', '2024-06-15', 21, 12, 'S', 0.4, 'sunny', 18, 20, 'excellent'),
('Amsterdam, Netherlands', '2024-07-15', 23, 10, 'SE', 0.3, 'sunny', 20, 15, 'excellent');
