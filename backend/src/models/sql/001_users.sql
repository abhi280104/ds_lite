CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT,
    name VARCHAR(100),
    is_email_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);
