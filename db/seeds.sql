INSERT INTO department (id, department_name) 
VALUES (1, "IT"), (2, "HR"), (3, "Sales"), (4, "Marketing"), (5, "Finance");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Manager", 100000, 1), (2, "Enginer", 90000, 2), (3, "Developer", 80000, 3), (4, "Designer", 70000, 4), (5, "Accountant", 8000, 5), (6, "Salesman", 6000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Smith", 1, NULL), (2, "Jane", "Smith", 2, 1), (3, "Mike", "Smith", 3, 1), (4, "Mary", "Smith", 4, 1), (5, "John", "Doe", 5, 1), (6, "Jane", "Doe", 6, 1), (7, "Mike", "Doe", 7, 1), (8, "Mary", "Doe", 8, 1), (9, "John", "Smith", 2, NULL), (10, "Jane", "Smith", 3, NULL), (11, "Mike", "Smith", 4, NULL), (12, "Mary", "Smith", 5, NULL), (13, "John", "Doe", 6, NULL), (14, "Jane", "Doe", 7, NULL), (15, "Mike", "Doe", 8, NULL), (16, "Mary", "Doe", 9, NULL);