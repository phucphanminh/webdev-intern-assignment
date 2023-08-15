-- Create schema if not exists
CREATE SCHEMA IF NOT EXISTS goldensneaker;

-- Switch to the created schema
SET search_path TO goldensneaker;

-- Create table items
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  color VARCHAR(7),
  price DECIMAL(10, 2),
  image TEXT,
  inCart BOOLEAN,
  count INT
);
