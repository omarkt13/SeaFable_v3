-- Insert user data

INSERT INTO users (first_name, last_name, email, phone, avatar_url, date_of_birth, nationality, emergency_contact_name, emergency_contact_phone, sailing_experience, dietary_restrictions, accessibility_needs) VALUES

('Emma', 'Johnson', 'emma.johnson@email.com', '+44 7700 900001', '/placeholder.svg?height=100&width=100', '1985-03-15', 'British', 'David Johnson', '+44 7700 900002', 'beginner', ARRAY['vegetarian'], ARRAY[]::text[]),

('Michael', 'Chen', 'michael.chen@email.com', '+1 555 123 4567', '/placeholder.svg?height=100&width=100', '1978-11-22', 'American', 'Lisa Chen', '+1 555 123 4568', 'intermediate', ARRAY[]::text[], ARRAY[]::text[]),

('Sophie', 'Dubois', 'sophie.dubois@email.com', '+33 6 12 34 56 89', '/placeholder.svg?height=100&width=100', '1992-07-08', 'French', 'Pierre Dubois', '+33 6 12 34 56 90', 'beginner', ARRAY['gluten-free'], ARRAY[]::text[]),

('James', 'Wilson', 'james.wilson@email.com', '+44 7700 900003', '/placeholder.svg?height=100&width=100', '1980-01-30', 'British', 'Sarah Wilson', '+44 7700 900004', 'advanced', ARRAY[]::text[], ARRAY[]::text[]),

('Maria', 'Rodriguez', 'maria.rodriguez@email.com', '+34 600 123 456', '/placeholder.svg?height=100&width=100', '1987-09-12', 'Spanish', 'Carlos Rodriguez', '+34 600 123 457', 'intermediate', ARRAY['pescatarian'], ARRAY[]::text[]),

('Lars', 'Andersen', 'lars.andersen.guest@email.com', '+47 987 65 433', '/placeholder.svg?height=100&width=100', '1975-05-18', 'Norwegian', 'Ingrid Andersen', '+47 987 65 434', 'advanced', ARRAY[]::text[], ARRAY[]::text[]),

('Isabella', 'Romano', 'isabella.romano@email.com', '+39 338 123 4568', '/placeholder.svg?height=100&width=100', '1990-12-03', 'Italian', 'Giuseppe Romano', '+39 338 123 4569', 'beginner', ARRAY['dairy-free'], ARRAY[]::text[]),

('Thomas', 'Mueller', 'thomas.mueller@email.com', '+49 171 234 5679', '/placeholder.svg?height=100&width=100', '1983-08-25', 'German', 'Anna Mueller', '+49 171 234 5680', 'intermediate', ARRAY[]::text[], ARRAY['mobility assistance']),

('Charlotte', 'Williams', 'charlotte.williams@email.com', '+44 7700 900005', '/placeholder.svg?height=100&width=100', '1995-04-14', 'British', 'Robert Williams', '+44 7700 900006', 'beginner', ARRAY['vegan'], ARRAY[]::text[]),

('Dimitris', 'Papadopoulos', 'dimitris.papadopoulos@email.com', '+30 694 123 4568', '/placeholder.svg?height=100&width=100', '1988-10-07', 'Greek', 'Elena Papadopoulos', '+30 694 123 4569', 'intermediate', ARRAY[]::text[], ARRAY[]::text[]),

('Amelie', 'Leroy', 'amelie.leroy@email.com', '+33 6 12 34 56 91', '/placeholder.svg?height=100&width=100', '1991-06-20', 'French', 'Jean Leroy', '+33 6 12 34 56 92', 'beginner', ARRAY[]::text[], ARRAY[]::text[]),

('Oliver', 'Thompson', 'oliver.thompson@email.com', '+44 7700 900007', '/placeholder.svg?height=100&width=100', '1979-02-28', 'British', 'Helen Thompson', '+44 7700 900008', 'advanced', ARRAY[]::text[], ARRAY[]::text[]);
