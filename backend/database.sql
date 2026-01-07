-- Database Schema for SPRTPA Letter Management System

-- 1. Branches Table
CREATE TABLE branches (
    branch_id SERIAL PRIMARY KEY,
    branch_name VARCHAR(100) NOT NULL,
    location VARCHAR(255)
);

-- 2. Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('Super Admin', 'Staff')) NOT NULL,
    branch_id INT REFERENCES branches(branch_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Letters Table
CREATE TABLE letters (
    letter_id SERIAL PRIMARY KEY,
    letter_number VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    sender VARCHAR(100),
    status VARCHAR(20) CHECK (status IN ('Pending', 'Processing', 'Completed')) DEFAULT 'Pending',
    priority VARCHAR(20) CHECK (priority IN ('Normal', 'Urgent', 'High')) DEFAULT 'Normal',
    assigned_user_id INT REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Attachments Table
CREATE TABLE attachments (
    attachment_id SERIAL PRIMARY KEY,
    letter_id INT REFERENCES letters(letter_id) ON DELETE CASCADE,
    file_path VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Audit Logs Table
CREATE TABLE audit_logs (
    log_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    action VARCHAR(255) NOT NULL,
    details TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial Seed Data (Optional)
INSERT INTO branches (branch_name, location) VALUES ('Head Office', 'Colombo');
-- Default Admin: admin / password123 (Hash this before real use!)
INSERT INTO users (username, password_hash, role, branch_id) VALUES ('admin', '$2a$10$X.randomhashplaceholder...', 'Super Admin', 1);
