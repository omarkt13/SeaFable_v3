-- Add password_hash column to users table if it doesn't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

-- Add role column to users table if it doesn't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user';

-- Update existing users with mock password hashes (in a real app, you would never do this)
-- This is just for demonstration purposes
UPDATE users SET password_hash = '$2a$10$XdUECj9QLpYwU.zVjKS4XOgwU6OjVtYzXZOtDc18D/enp7QJj3cJi' WHERE password_hash IS NULL;
-- The hash above is for the password 'password123'

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create index on role for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
