DROP SCHEMA IF EXISTS goldensneaker;
CREATE SCHEMA goldensneaker;
USE goldensneaker;

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  color VARCHAR(7),
  price DECIMAL(10, 2),
  image TEXT,
  inCart BOOLEAN,
  count INT
);

