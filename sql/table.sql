-- CREATE TABLE shoes (
-- id SERIAL PRIMARY KEY,
-- color VARCHAR(255),
-- brand VARCHAR(255),
-- price DECIMAL,
-- size INT,
-- in_stock INT
-- );

ALTER TABLE shoes
ADD COLUMN image_url VARCHAR(255);
