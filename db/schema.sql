CREATE DATABASE jobby;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_type VARCHAR(50)
);

CREATE TABLE employers(
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_type VARCHAR(50)
);

CREATE TABLE work_experiences(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    company_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE
);

INSERT INTO work_experiences (user_id, company_name, position, start_date, end_date) VALUES(1, 'Microsoft', 'Software Engineer','2020-03-15', '2021-12-03');
INSERT INTO work_experiences (user_id, company_name, position, start_date, end_date) VALUES(1, 'Google', 'Software Engineer','2020-03-15', '2021-12-03');

CREATE TABLE education (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  institution_name VARCHAR(255) NOT NULL,
  degree VARCHAR(255) NOT NULL,
  field_of_study VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  gpa NUMERIC(3,2)
);

INSERT INTO education (user_id, institution_name, degree, field_of_study, start_date, end_date) VALUES(1, 'Federation University', 'Master Degree','Software engineering', '2020-15-03', '2021-12-03')

CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  skill_name VARCHAR(255) NOT NULL
);

INSERT INTO skills(user_id, skill_name) values(1, 'Javascript');

CREATE TABLE user_about(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    about TEXT,
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    portfolio_url VARCHAR(255)
);

INSERT INTO user_about(user_id, about) values(1, 'Experienced Front-End Engineer');

CREATE TABLE job_postings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  salary_range VARCHAR(255),
  date_posted TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  employer_id INTEGER
);


