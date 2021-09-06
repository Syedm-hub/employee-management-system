INSERT INTO departments (department_name)
VALUES ("Marketing"), ("Finance"), ("Admin"), ("Engineering");

INSERT INTO roles (title, salary, department_id)
VALUES ("Marketing Manager", 50000, 1),
       ("Marketing Executive", 40000, 1),
       ("Controller", 60000, 2),
       ("Analyst", 42000, 2),
       ("HR Director", 70000, 3),
       ("Admin exectuive", 40000, 3),
       ("Full Stack Engineer", 70000, 4),
       ("OS Developer", 60000, 4);


       INSERT INTO employees (first_name, last_name, role_id, manager_id)
       VALUES ("Syed", "Morshed", 1, 1),
              ("Shaon", "kole", 2, 1),
              ("Saif", "Hossain", 2, 2),
              ("Rifat", "Hasan", 3, 2),
              ("Josh", "kale", 5, 3),
              ("Montana" "ron", 7, 4),
              ("Nahid", "Hasan", 6, 3),
              ("Roony", "Pitaar", 8,4)
 