-- Verify database tables exist and have data
SELECT 'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'experiences' as table_name, COUNT(*) as record_count FROM experiences
UNION ALL
SELECT 'host_profiles' as table_name, COUNT(*) as record_count FROM host_profiles
UNION ALL
SELECT 'bookings' as table_name, COUNT(*) as record_count FROM bookings
ORDER BY table_name;
