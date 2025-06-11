-- SQL Script: 04-seed-users.sql
-- Description: Seeds initial data for the 'users' table.
--              Includes both regular users and users linked to host profiles.
--              Uses ON CONFLICT DO UPDATE to ensure idempotency.

-- Note: The password_hash is a bcrypt hash for 'password123'.
-- In a real application, these would be generated securely during user registration.

INSERT INTO users (id, first_name, last_name, email, password_hash, avatar_url, role) VALUES
('u1a2b3c4-d5e6-7777-8888-999900000001', 'Emma', 'Johnson', 'emma.johnson@seafable.com', '$2a$10$XdUECj9QLpYwU.zVjKS4XOgwU6OjVtYzXZOtDc18D/enp7QJj3cJi', '/placeholder.svg?height=100&width=100&text=EJ', 'user')
ON CONFLICT (id) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    email = EXCLUDED.email,
    password_hash = EXCLUDED.password_hash,
    avatar_url = EXCLUDED.avatar_url,
    role = EXCLUDED.role,
    updated_at = CURRENT_TIMESTAMP,
    created_at = users.created_at
,
('u1a2b3c4-d5e6-7777-8888-999900000002', 'Michael', 'Chen', 'michael.chen@seafable.com', '$2a$10$XdUECj9QLpYwU.zVjKS4XOgwU6OjVtYzXZOtDc18D/enp7QJj3cJi', '/placeholder.svg?height=100&width=100&text=MC', 'user')
ON CONFLICT (id) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    email = EXCLUDED.email,
    password_hash = EXCLUDED.password_hash,
    avatar_url = EXCLUDED.avatar_url,
    role = EXCLUDED.role,
    updated_at = CURRENT_TIMESTAMP,
    created_at = users.created_at
,
('u1a2b3c4-d5e6-7777-8888-999900000003', 'Sophie', 'Dubois', 'sophie.dubois@seafable.com', '$2a$10$XdUECj9QLpYwU.zVjKS4XOgwU6OjVtYzXZOtDc18D/enp7QJj3cJi', '/placeholder.svg?height=100&width=100&text=SD', 'user')
ON CONFLICT (id) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    email = EXCLUDED.email,
    password_hash = EXCLUDED.password_hash,
    avatar_url = EXCLUDED.avatar_url,
    role = EXCLUDED.role,
    updated_at = CURRENT_TIMESTAMP,
    created_at = users.created_at
,
-- Users linked to Host Profiles
('captain.james@seafable.com', 'James', 'Morrison', 'captain.james@seafable.com', '$2a$10$XdUECj9QLpYwU.zVjKS4XOgwU6OjVtYzXZOtDc18D/enp7QJj3cJi', '/placeholder.svg?height=100&width=100&text=JM', 'host')
ON CONFLICT (email) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    password_hash = EXCLUDED.password_hash,
    avatar_url = EXCLUDED.avatar_url,
    role = EXCLUDED.role,
    updated_at = CURRENT_TIMESTAMP
,
('captain.sarah@seafable.com', 'Sarah', 'Williams', 'captain.sarah@seafable.com', '$2a$10$XdUECj9QLpYwU.zVjKS4XOgwU6OjVtYzXZOtDc18D/enp7QJj3cJi', '/placeholder.svg?height=100&width=100&text=SW', 'host')
ON CONFLICT (email) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    password_hash = EXCLUDED.password_hash,
    avatar_url = EXCLUDED.avatar_url,
    role = EXCLUDED.role,
    updated_at = CURRENT_TIMESTAMP
,
('captain.robert@seafable.com', 'Robert', 'Thompson', 'captain.robert@seafable.com', '$2a$10$XdUECj9QLpYwU.zVjKS4XOgwU6OjVtYzXZOtDc18D/enp7QJj3cJi', '/placeholder.svg?height=100&width=100&text=RT', 'host')
ON CONFLICT (email) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    password_hash = EXCLUDED.password_hash,
    avatar_url = EXCLUDED.avatar_url,
    role = EXCLUDED.role,
    updated_at = CURRENT_TIMESTAMP
,
('captain.emma@seafable.com', 'Emma', 'Davies', 'captain.emma@seafable.com', '$2a$10$XdUECj9QLpYwU.zVjKS4XOgwU6OjVtYzXZOtDc18D/enp7QJj3cJi', '/placeholder.svg?height=100&width=100&text=ED', 'host')
ON CONFLICT (email) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    password_hash = EXCLUDED.password_hash,
    avatar_url = EXCLUDED.avatar_url,
    role = EXCLUDED.role,
    updated_at = CURRENT_TIMESTAMP
,
('captain.marie@seafable.com', 'Marie', 'Dubois', 'captain.marie@seafable.com', '$2a$10$XdUECj9QLpYwU.zVjKS4XOgwU6OjVtYzXZOtDc18D/enp7QJj3cJi', '/placeholder.svg?height=100&width=100&text=MD', 'host')
ON CONFLICT (email) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    password_hash = EXCLUDED.password_hash,
    avatar_url = EXCLUDED.avatar_url,
    role = EXCLUDED.role,
    updated_at = CURRENT_TIMESTAMP
,
('captain.marco@seafable.com', 'Marco', 'Rossi', 'captain.marco@seafable.com', '$2a$10$XdUECj9QLpYwU.zVjKS4XOgwU6OjVtYzXZOtDc18D/enp7QJj3cJi', '/placeholder.svg?height=100&width=100&text=MR', 'host')
ON CONFLICT (email) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    password_hash = EXCLUDED.password_hash,
    avatar_url = EXCLUDED.avatar_url,
    role = EXCLUDED.role,
    updated_at = CURRENT_TIMESTAMP
;

INSERT INTO schema_migrations (version) VALUES ('04-seed-users-' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDDHH24MISSMS'))
ON CONFLICT (version) DO NOTHING;
