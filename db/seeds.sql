USE employeesDB;


INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 50000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 30000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 40000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 50000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 80000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 75000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 60000, 4);




INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES ("Syed", "Nahid", 1, null); 
INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES ("Rifat", "Ritu", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES ("Monica", "Galler", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES ("Ross", "Galler", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES ("Chandler", "Bing", 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES ("Phibie", "Phibie", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES ("Saif", "Hasan", 6, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES ("Row", "Hasan", 7, null);