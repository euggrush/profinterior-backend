INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
('ivanov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Иван', 'Иванов', 'avatar1.jpg'),
('petrov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Пётр', 'Петров', 'avatar2.jpg');

INSERT INTO categories(name) VALUES
('bedrooms'),
('livingrooms'),
('bathrooms'),
('kitchens');

ALTER TABLE projects DISABLE TRIGGER ALL;
INSERT INTO projects(title, description, pictures, user_id) VALUES
('project 1 title','project 1 description','image1', 1),
('project 2 title','project 2 description','image2', 1),
('project 3 title','project 3 description','image3', 1),
('project 4 title','project 4 description','image4', 1);
ALTER TABLE projects ENABLE TRIGGER ALL;

ALTER TABLE project_categories DISABLE TRIGGER ALL;
INSERT INTO project_categories(project_id, category_id) VALUES
(1, 1),
(2, 2),
(3, 2),
(4, 4),
(5, 3);
ALTER TABLE project_categories ENABLE TRIGGER ALL;

ALTER TABLE pictures DISABLE TRIGGER ALL;
INSERT INTO pictures(path, user_id, project_id) VALUES
('image1.jpeg', 1, 1),
('image2.jpeg', 1, 1),
('image3.jpeg', 1, 2),
('image4.jpeg', 1, 2),
('image5.jpeg', 1, 3),
('image6.jpeg', 1, 3),
('image7.jpeg', 1, 4),
('image8.jpeg', 1, 4),
('image9.jpeg', 1, 3),
('image10.jpeg', 1, 1);
ALTER TABLE pictures ENABLE TRIGGER ALL;

