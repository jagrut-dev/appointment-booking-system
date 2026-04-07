CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'customer'
);

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  provider_id INT REFERENCES users(id),
  title VARCHAR(150),
  price DECIMAL(10,2),
  duration INT
);

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES users(id),
  provider_id INT REFERENCES users(id),
  service_id INT REFERENCES services(id),
  appointment_date DATE,
  appointment_time TIME
);