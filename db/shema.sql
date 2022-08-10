DROP DATABASE IF EXISTS employee_db; 
CREATE DATABASE employee_db;

USE employee_db; 

CREATE TABLE departments(
    id INT AUTO_INCRMENT PRIMARY KEY, 
    de_name VARCHAR(30)
);

CREATE TABLE roles (
id INT AUTO_INCRMENT PRIMARY KEY,
title VARCHAR(50),
salary DECIMAL,
department_id INT,
FOREIGN KEY (department_id)
REFERENCES departments(id)
ON DELETE SET NULL
);

CREATE TABLE  employees(
id INT AUTO_INCRMENT PRIMARY KEY,
first_name VARCHAR(50),
last_name VARCHAR(50),
role_id INT, 
manager_id INT
FOREIGN KEY (role_id)
REFERENCES roles(id)
ON DELETE SET NULL,
FOREIGN KEY (manager_id)
REFERENCES employees(id)
ON DELETE SET NULL
);