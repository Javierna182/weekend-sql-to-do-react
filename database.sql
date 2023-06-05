-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data
-- Table Structure
CREATE TABLE tasks (
    task VARCHAR(120) NOT NULL;
);

INSERT INTO tasks ("task")
VALUES ('Eat'),
('Sleep');