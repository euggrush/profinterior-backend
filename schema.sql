DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS pictures CASCADE;
DROP TABLE IF EXISTS project_categories CASCADE;

CREATE TABLE categories(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(255) NOT NULL
);

CREATE TABLE users(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email varchar(255) UNIQUE NOT NULL,
  password_hash varchar(255) NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  avatar varchar(50) NOT NULL,
  role varchar(5) DEFAULT 'user',
  created_at timestamp DEFAULT current_timestamp,
  CHECK(role='user' OR role='admin')
);


CREATE TABLE projects(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title varchar(255) NOT NULL,
  created_at timestamp DEFAULT current_timestamp,
  description text NOT NULL,
  pictures text NOT NULL,
  user_id integer NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE pictures(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  project_id integer NOT NULL,
  user_id integer NOT NULL,
  path text,
  created_at timestamp DEFAULT current_timestamp,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (project_id) REFERENCES projects(id)
);


CREATE TABLE project_categories(
  project_id integer NOT NULL,
  category_id integer NOT NULL,
  CONSTRAINT article_categories_pk PRIMARY KEY (project_id, category_id),
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE INDEX ON projects(title);
