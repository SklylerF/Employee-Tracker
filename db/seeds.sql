INSERT INTO departments (deb_name)
VALUES
 ("Engineering"),
("Financing"),
("Legal"),
("Sales"),
("Service");

INSERT INTO roles (title, salary, department_id)
VALUES 
("Sales Lead", 40000.00, 4),
("Salesperson", 15000.00, 4),
("Lead Engineer",70000.00, 1),
("Software Engineer", 80000.00, 1),
("Accountant manager", 70000.00, 2),
("Accountant", 50000.00, 2),
("Legal Team Lead", 20000.00, 3),
("Lawyer", 160000.00, 3),


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
("skyler","ferreira", 3, NULL),
("ale", "orosco", 4, 1),
("omar", "patel", 4, 1),
("max", "theman", 1, NULL),
("nate", "maclevini", 2, 4),
("risa", "thehomie", 5, NULL),
("carser", "mygod", 6, 6),
("britney", "spears", 2, 4),
("rhowen", "raju",2 ,4);