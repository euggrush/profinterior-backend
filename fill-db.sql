INSERT INTO users(email, password_hash, name) VALUES
('ivanov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Иван');

INSERT INTO categories(name) VALUES
('bedrooms'),
('livingrooms'),
('bathrooms'),
('kitchens');

ALTER TABLE projects DISABLE TRIGGER ALL;
INSERT INTO projects(title, description, category_id) VALUES
('project 1 title','project 1 description', 1),
('project 2 title','project 2 description', 1),
('project 3 title','project 3 description', 1),
('project 4 title','project 4 description', 1);
ALTER TABLE projects ENABLE TRIGGER ALL;

ALTER TABLE pictures DISABLE TRIGGER ALL;
INSERT INTO pictures(path, project_id) VALUES
('image1.jpeg', 1),
('image2.jpeg', 1),
('image3.jpeg', 1),
('image4.jpeg', 1),
('image5.jpeg', 1),
('image6.jpeg', 1),
('image7.jpeg', 1),
('image8.jpeg', 4),
('image9.jpeg', 3),
('image10.jpeg', 1);
ALTER TABLE pictures ENABLE TRIGGER ALL;

