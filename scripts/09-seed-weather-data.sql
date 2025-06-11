-- Insert weather data for various locations

INSERT INTO weather_data (id, location, date, temperature_celsius, wind_speed_knots, wind_direction, wave_height_meters, weather_condition, visibility_km, precipitation_chance, sailing_conditions) VALUES

-- Cowes, Isle of Wight weather data
('w1a2b3c4-d5e6-7777-8888-999900000005', 'Cowes, Isle of Wight', '2024-07-15', 22, 12, 'SW', 0.8, 'sunny', 15, 10, 'excellent'),
('w1a2b3c4-d5e6-7777-8888-999900000006', 'Cowes, Isle of Wight', '2024-07-16', 24, 8, 'W', 0.5, 'sunny', 20, 5, 'excellent'),
('w1a2b3c4-d5e6-7777-8888-999900000007', 'Cowes, Isle of Wight', '2024-07-17', 21, 15, 'SW', 1.2, 'partly cloudy', 12, 20, 'good'),
('w1a2b3c4-d5e6-7777-8888-999900000008', 'Cowes, Isle of Wight', '2024-08-15', 25, 10, 'S', 0.6, 'sunny', 18, 15, 'excellent'),
('w1a2b3c4-d5e6-7777-8888-999900000009', 'Cowes, Isle of Wight', '2024-09-15', 19, 18, 'W', 1.5, 'cloudy', 10, 35, 'fair')
ON CONFLICT (id) DO UPDATE SET
    location = EXCLUDED.location,
    date = EXCLUDED.date,
    temperature_celsius = EXCLUDED.temperature_celsius,
    wind_speed_knots = EXCLUDED.wind_speed_knots,
    wind_direction = EXCLUDED.wind_direction,
    wave_height_meters = EXCLUDED.wave_height_meters,
    weather_condition = EXCLUDED.weather_condition,
    visibility_km = EXCLUDED.visibility_km,
    precipitation_chance = EXCLUDED.precipitation_chance,
    sailing_conditions = EXCLUDED.sailing_conditions,
    created_at = weather_data.created_at
,

-- Oban, Scotland weather data
('w1a2b3c4-d5e6-7777-8888-999900000010', 'Oban, Scotland', '2024-06-18', 16, 14, 'NW', 1.0, 'partly cloudy', 12, 25, 'good'),
('w1a2b3c4-d5e6-7777-8888-999900000011', 'Oban, Scotland', '2024-07-18', 18, 12, 'W', 0.8, 'sunny', 15, 15, 'excellent'),
('w1a2b3c4-d5e6-7777-8888-999900000012', 'Oban, Scotland', '2024-08-18', 20, 10, 'SW', 0.6, 'sunny', 18, 10, 'excellent'),
('w1a2b3c4-d5e6-7777-8888-999900000013', 'Oban, Scotland', '2024-09-18', 15, 16, 'NW', 1.3, 'cloudy', 8, 40, 'fair')
ON CONFLICT (id) DO UPDATE SET
    location = EXCLUDED.location,
    date = EXCLUDED.date,
    temperature_celsius = EXCLUDED.temperature_celsius,
    wind_speed_knots = EXCLUDED.wind_speed_knots,
    wind_direction = EXCLUDED.wind_direction,
    wave_height_meters = EXCLUDED.wave_height_meters,
    weather_condition = EXCLUDED.weather_condition,
    visibility_km = EXCLUDED.visibility_km,
    precipitation_chance = EXCLUDED.precipitation_chance,
    sailing_conditions = EXCLUDED.sailing_conditions,
    created_at = weather_data.created_at
,

-- Cannes, French Riviera weather data
('w1a2b3c4-d5e6-7777-8888-999900000014', 'Cannes, French Riviera', '2024-05-20', 24, 8, 'E', 0.3, 'sunny', 25, 5, 'excellent'),
('w1a2b3c4-d5e6-7777-8888-999900000015', 'Cannes, French Riviera', '2024-06-20', 27, 10, 'SE', 0.4, 'sunny', 20, 10, 'excellent'),
('w1a2b3c4-d5e6-7777-8888-999900000016', 'Cannes, French Riviera', '2024-07-20', 29, 12, 'S', 0.5, 'sunny', 22, 8, 'excellent'),
('w1a2b3c4-d5e6-7777-8888-999900000017', 'Cannes, French Riviera', '2024-08-20', 31, 6, 'E', 0.2, 'sunny', 25, 3, 'excellent'),
('w1a2b3c4-d5e6-7777-8888-999900000018', 'Cannes, French Riviera', '2024-09-20', 26, 14, 'W', 0.8, 'partly cloudy', 15, 20, 'good')
ON CONFLICT (id) DO UPDATE SET
    location = EXCLUDED.location,
    date = EXCLUDED.date,
    temperature_celsius = EXCLUDED.temperature_celsius,
    wind_speed_knots = EXCLUDED.wind_speed_knots,
    wind_direction = EXCLUDED.wind_direction,
    wave_height_meters = EXCLUDED.wave_height_meters,
    weather_condition = EXCLUDED.weather_condition,
    visibility_km = EXCLUDED.visibility_km,
    precipitation_chance = EXCLUDED.precipitation_chance,
    sailing_conditions = EXCLUDED.sailing_conditions,
    created_at = weather_data.created_at
,

-- Santorini, Greece weather data
('w1a2b3c4-d5e6-7777-8888-999900000019', 'Santorini, Greece', '2024-06-25', 26, 15, 'N', 0.6, 'sunny', 20, 5, 'excellent'),
('w1a2b3c4-d5e6-7777-8888-999900000020', 'Santorini, Greece', '2024-07-25', 29, 18, 'N', 0.8, 'sunny', 25, 2, 'excellent'),
('w1a2b3c4-d5e6-7777-8888-999900000021', 'Santorini, Greece', '2024-08-25', 31, 20, 'N', 1.0, 'sunny', 22, 5, 'good'),
('w1a2b3c4-d5e6-7777-8888-999900000022', 'Santorini, Greece', '2024-09-25', 27, 12, 'NE', 0.5, 'sunny', 20, 10, 'excellent')
ON CONFLICT (id) DO UPDATE SET
    location = EXCLUDED.location,
    date = EXCLUDED.date,
    temperature_celsius = EXCLUDED.temperature_celsius,
    wind_speed_knots = EXCLUDED.wind_speed_knots,
    wind_direction = EXCLUDED.wind_direction,
    wave_height_meters = EXCLUDED.wave_height_meters,
    weather_condition = EXCLUDED.weather_condition,
    visibility_km = EXCLUDED.visibility_km,
    precipitation_chance = EXCLUDED.precipitation_chance,
    sailing_conditions = EXCLUDED.sailing_conditions,
    created_at = weather_data.created_at
,

-- Amalfi, Italy weather data
('w1a2b3c4-d5e6-7777-8888-999900000023', 'Amalfi, Italy', '2024-05-25', 23, 8, 'SW', 0.4, 'sunny', 18, 15, 'excellent'),
('w1a2b3c4-d5e6-7777-8888-999900000024', 'Amalfi, Italy', '2024-06-25', 26, 10, 'S', 0.5, 'sunny', 20, 10, 'excellent'),
('w1a2b3c4-d5e6-7777-8888-999900000025', 'Amalfi, Italy', '2024-07-25', 28, 6, 'SE', 0.3, 'sunny', 25, 5, 'excellent'),
('w1a2b3c4-d5e6-7777-8888-999900000026', 'Amalfi, Italy', '2024-08-25', 30, 12, 'SW', 0.6, 'sunny', 22, 12, 'excellent')
ON CONFLICT (id) DO UPDATE SET
    location = EXCLUDED.location,
    date = EXCLUDED.date,
    temperature_celsius = EXCLUDED.temperature_celsius,
    wind_speed_knots = EXCLUDED.wind_speed_knots,
    wind_direction = EXCLUDED.wind_direction,
    wave_height_meters = EXCLUDED.wave_height_meters,
    weather_condition = EXCLUDED.weather_condition,
    visibility_km = EXCLUDED.visibility_km,
    precipitation_chance = EXCLUDED.precipitation_chance,
    sailing_conditions = EXCLUDED.sailing_conditions,
    created_at = weather_data.created_at
,

-- Lofoten Islands, Norway weather data
('w1a2b3c4-d5e6-7777-8888-999900000027', 'Lofoten Islands, Norway', '2024-06-21', 12, 20, 'W', 1.5, 'partly cloudy', 10, 30, 'good'),
('w1a2b3c4-d5e6-7777-8888-999900000028', 'Lofoten Islands, Norway', '2024-07-21', 15, 16, 'NW', 1.2, 'cloudy', 8, 25, 'good'),
('w1a2b3c4-d5e6-7777-8888-999900000029', 'Lofoten Islands, Norway', '2024-08-21', 18, 12, 'SW', 0.8, 'partly cloudy', 12, 20, 'good'),
('w1a2b3c4-d5e6-7777-8888-999900000030', 'Lofoten Islands, Norway', '2024-12-21', -2, 25, 'N', 2.0, 'clear', 15, 10, 'challenging')
ON CONFLICT (id) DO UPDATE SET
    location = EXCLUDED.location,
    date = EXCLUDED.date,
    temperature_celsius = EXCLUDED.temperature_celsius,
    wind_speed_knots = EXCLUDED.wind_speed_knots,
    wind_direction = EXCLUDED.wind_direction,
    wave_height_meters = EXCLUDED.wave_height_meters,
    weather_condition = EXCLUDED.weather_condition,
    visibility_km = EXCLUDED.visibility_km,
    precipitation_chance = EXCLUDED.precipitation_chance,
    sailing_conditions = EXCLUDED.sailing_conditions,
    created_at = weather_data.created_at
,

-- St. Ives, Cornwall weather data
('w1a2b3c4-d5e6-7777-8888-999900000031', 'St. Ives, Cornwall', '2024-05-12', 18, 16, 'SW', 1.2, 'partly cloudy', 12, 25, 'good'),
('w1a2b3c4-d5e6-7777-8888-999900000032', 'St. Ives, Cornwall', '2024-06-12', 20, 14, 'W', 1.0, 'sunny', 15, 20, 'good'),
('w1a2b3c4-d5e6-7777-8888-999900000033', 'St. Ives, Cornwall', '2024-07-12', 22, 12, 'SW', 0.8, 'sunny', 18, 15, 'excellent'),
('w1a2b3c4-d5e6-7777-8888-999900000034', 'St. Ives, Cornwall', '2024-08-12', 24, 10, 'S', 0.6, 'sunny', 20, 10, 'excellent')
ON CONFLICT (id) DO UPDATE SET
    location = EXCLUDED.location,
    date = EXCLUDED.date,
    temperature_celsius = EXCLUDED.temperature_celsius,
    wind_speed_knots = EXCLUDED.wind_speed_knots,
    wind_direction = EXCLUDED.wind_direction,
    wave_height_meters = EXCLUDED.wave_height_meters,
    weather_condition = EXCLUDED.weather_condition,
    visibility_km = EXCLUDED.visibility_km,
    precipitation_chance = EXCLUDED.precipitation_chance,
    sailing_conditions = EXCLUDED.sailing_conditions,
    created_at = weather_data.created_at
,

-- Tenby, Wales weather data
('w1a2b3c4-d5e6-7777-8888-999900000035', 'Tenby, Wales', '2024-05-08', 17, 18, 'W', 1.3, 'cloudy', 10, 35, 'fair'),
('w1a2b3c4-d5e6-7777-8888-999900000036', 'Tenby, Wales', '2024-06-08', 19, 15, 'SW', 1.0, 'partly cloudy', 12, 25, 'good'),
('w1a2b3c4-d5e6-7777-8888-999900000037', 'Tenby, Wales', '2024-07-08', 21, 12, 'S', 0.8, 'sunny', 15, 20, 'good'),
('w1a2b3c4-d5e6-7777-8888-999900000038', 'Tenby, Wales', '2024-08-08', 23, 10, 'SE', 0.6, 'sunny', 18, 15, 'excellent')
ON CONFLICT (id) DO UPDATE SET
    location = EXCLUDED.location,
    date = EXCLUDED.date,
    temperature_celsius = EXCLUDED.temperature_celsius,
    wind_speed_knots = EXCLUDED.wind_speed_knots,
    wind_direction = EXCLUDED.wind_direction,
    wave_height_meters = EXCLUDED.wave_height_meters,
    weather_condition = EXCLUDED.weather_condition,
    visibility_km = EXCLUDED.visibility_km,
    precipitation_chance = EXCLUDED.precipitation_chance,
    sailing_conditions = EXCLUDED.sailing_conditions,
    created_at = weather_data.created_at
,

-- Kiel, Germany weather data
('w1a2b3c4-d5e6-7777-8888-999900000039', 'Kiel, Germany', '2024-06-08', 19, 14, 'W', 0.9, 'partly cloudy', 12, 30, 'good'),
('w1a2b3c4-d5e6-7777-8888-999900000040', 'Kiel, Germany', '2024-07-08', 22, 12, 'SW', 0.7, 'sunny', 15, 20, 'good'),
('w1a2b3c4-d5e6-7777-8888-999900000041', 'Kiel, Germany', '2024-08-08', 24, 10, 'S', 0.5, 'sunny', 18, 15, 'excellent'),
('w1a2b3c4-d5e6-7777-8888-999900000042', 'Kiel, Germany', '2024-09-08', 20, 16, 'W', 1.1, 'cloudy', 10, 35, 'fair')
ON CONFLICT (id) DO UPDATE SET
    location = EXCLUDED.location,
    date = EXCLUDED.date,
    temperature_celsius = EXCLUDED.temperature_celsius,
    wind_speed_knots = EXCLUDED.wind_speed_knots,
    wind_direction = EXCLUDED.wind_direction,
    wave_height_meters = EXCLUDED.wave_height_meters,
    weather_condition = EXCLUDED.weather_condition,
    visibility_km = EXCLUDED.visibility_km,
    precipitation_chance = EXCLUDED.precipitation_chance,
    sailing_conditions = EXCLUDED.sailing_conditions,
    created_at = weather_data.created_at
,

-- Amsterdam, Netherlands weather data
('w1a2b3c4-d5e6-7777-8888-999900000043', 'Amsterdam, Netherlands', '2024-04-15', 15, 16, 'W', 0.8, 'partly cloudy', 12, 30, 'good'),
('w1a2b3c4-d5e6-7777-8888-999900000044', 'Amsterdam, Netherlands', '2024-05-15', 18, 14, 'SW', 0.6, 'sunny', 15, 25, 'good'),
('w1a2b3c4-d5e6-7777-8888-999900000045', 'Amsterdam, Netherlands', '2024-06-15', 21, 12, 'S', 0.4, 'sunny', 18, 20, 'excellent'),
('w1a2b3c4-d5e6-7777-8888-999900000046', 'Amsterdam, Netherlands', '2024-07-15', 23, 10, 'SE', 0.3, 'sunny', 20, 15, 'excellent')
ON CONFLICT (id) DO UPDATE SET
    location = EXCLUDED.location,
    date = EXCLUDED.date,
    temperature_celsius = EXCLUDED.temperature_celsius,
    wind_speed_knots = EXCLUDED.wind_speed_knots,
    wind_direction = EXCLUDED.wind_direction,
    wave_height_meters = EXCLUDED.wave_height_meters,
    weather_condition = EXCLUDED.weather_condition,
    visibility_km = EXCLUDED.visibility_km,
    precipitation_chance = EXCLUDED.precipitation_chance,
    sailing_conditions = EXCLUDED.sailing_conditions,
    created_at = weather_data.created_at
,

-- Weather data for Nice, France
('w1a2b3c4-d5e6-7777-8888-999900000001', 'Nice, France', '2025-07-15', 28, 8, 'SE', 0.3, 'sunny', 25, 5, 'excellent'),
('w1a2b3c4-d5e6-7777-8888-999900000002', 'Nice, France', '2025-07-16', 29, 10, 'S', 0.4, 'sunny', 22, 10, 'excellent')
ON CONFLICT (id) DO UPDATE SET
    location = EXCLUDED.location,
    date = EXCLUDED.date,
    temperature_celsius = EXCLUDED.temperature_celsius,
    wind_speed_knots = EXCLUDED.wind_speed_knots,
    wind_direction = EXCLUDED.wind_direction,
    wave_height_meters = EXCLUDED.wave_height_meters,
    weather_condition = EXCLUDED.weather_condition,
    visibility_km = EXCLUDED.visibility_km,
    precipitation_chance = EXCLUDED.precipitation_chance,
    sailing_conditions = EXCLUDED.sailing_conditions,
    created_at = weather_data.created_at
,

-- Weather data for Sydney, Australia (Bondi Beach)
('w1a2b3c4-d5e6-7777-8888-999900000003', 'Sydney, Australia', '2025-08-20', 18, 15, 'SW', 1.2, 'partly cloudy', 15, 20, 'good'),
('w1a2b3c4-d5e6-7777-8888-999900000004', 'Sydney, Australia', '2025-08-21', 17, 18, 'S', 1.5, 'cloudy', 10, 30, 'fair')
ON CONFLICT (id) DO UPDATE SET
    location = EXCLUDED.location,
    date = EXCLUDED.date,
    temperature_celsius = EXCLUDED.temperature_celsius,
    wind_speed_knots = EXCLUDED.wind_speed_knots,
    wind_direction = EXCLUDED.wind_direction,
    wave_height_meters = EXCLUDED.wave_height_meters,
    weather_condition = EXCLUDED.weather_condition,
    visibility_km = EXCLUDED.visibility_km,
    precipitation_chance = EXCLUDED.precipitation_chance,
    sailing_conditions = EXCLUDED.sailing_conditions,
    created_at = weather_data.created_at
;

INSERT INTO schema_migrations (version) VALUES ('09-seed-weather-data-' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDDHH24MISSMS'))
ON CONFLICT (version) DO NOTHING;
