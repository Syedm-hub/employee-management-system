USE employees_db;
INSERT INTO department (name)
 VALUES ("Marketing"),
		("Finance"),
		("Admin"),
		("Engineering");
		


INSERT INTO role (title, salary, department_ID) 
VALUES ("Marketing Manager", 50000, 1),
       ("Marketing Executive", 40000, 1),
       ("Controller", 60000, 2),
       ("Analyst", 42000, 2),
       ("HR Director", 70000, 3),
       ("Admin exectuive", 40000, 3),
       ("Full Stack Engineer", 70000, 4),
       ("OS Developer", 60000, 4);


USE employees_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES  ("Syed", "Morshed", 1, NULL ),
		("Shaon", "Kole", 2, 1),
		("Saif", "Hossain", 3, NULL),
		("Rifat", "Hasan", 4, 3),
		("Josh", "Kale", 5, 3),
		("Montana", "Ron", 6, NULL),
		("Nahid", "Hasan", 7, 6),
		("Roony", "Pitar",8, 6);
        







       
 