-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data
-- Table Structure
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    task VARCHAR(120) NOT NULL,
    completed BOOL DEFAULT FALSE,
);

INSERT INTO tasks ("task")
VALUES ('Eat', false),
('Sleep', false);
