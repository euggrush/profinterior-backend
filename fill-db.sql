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

ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO COMMENTS(text, user_id, article_id) VALUES
('Хочу такую же футболку :-), Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.,', 2, 1),
('Совсем немного...,', 2, 1),
('Мне кажется или я уже читал это где-то?, Хочу такую же футболку :-), Планируете записать видосик на эту тему?', 1, 2),
('Это где ж такие красоты?', 1, 2),
('Согласен с автором!', 1, 3),
('Плюсую, но слишком много буквы!, Совсем немного..., Согласен с автором!', 1, 3),
('Согласен с автором!, Мне не нравится ваш стиль. Ощущение, что вы меня поучаете., Совсем немного...,', 2, 4),
('Совсем немного..., Это где ж такие красоты?, Мне кажется или я уже читал это где-то?', 2, 4),
('Планируете записать видосик на эту тему?', 2, 5),
('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', 1, 5);
ALTER TABLE comments ENABLE TRIGGER ALL;

