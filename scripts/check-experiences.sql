-- SQL Script: check-experiences.sql
-- Description: Simple query to check the existence and basic details of experiences.

SELECT id, title, activity_type, location, country, host_id FROM experiences ORDER BY created_at DESC;
