//Import Modules
const inquirer = require("inquirer");
const mysql = require("mysql2");

//Setting up DB connection
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employees_db",
  },
  console.log(`Connected to Database.`)
);

//Start inquirer
function startSystem() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Choose your options",
        name: "PromptSelector",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Quit",
        ],
      },
    ])
    .then((prompt) => {
      switch (prompt.promptSelector) {
        case "View All Employees":
          viewEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Quit":
          endSystem();
          break;
      }
    });
}

//Viewing roles
function viewEmployees() {
  db.query(
    `Select employees.id, employees.first_name, employees.last_name, roles.title,
  departments.dept_name, roles.salary FROM employees
  INNER JOIN roles ON employees.role_id = roles.id
  INNER JOIN departments ON roles.department_id = departments.id ORDER BY employees.id`,
    (err, results) => {
      if (err) throw err;
      console.table(results);
      returnSystem();
    }
  );
}

//View Departments
function viewDepartments() {
  db.query(`SELECT * FROM departments`, (err, results) => {
    if (err) throw err;
    console.table(results);
    returnSystem();
  });
}

//View all roles
function viewRoles() {
  db.query(
    `SELECT role.id, roles.title, roles.salary, departments.dept_name FROM roles
  INNER JOIN departments on roles.department_id = departments.id ORDER BY roles.id;`,
    (err, results) => {
      if (err) throw err;
      console.table(results);
      returnSystem();
    }
  );
}

//Add roles
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "Which role you want to add?",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What Is The Salary?",
      },
      {
        type: "list",
        name: "department",
        message: "What Department",
        choices: ["Marketing", "Finance", "Admin", "Engineering"],
      },
    ])
    .then(async (response) => {
      let deptID = await db
        .promise()
        .query(
          `SELECT id FROM departments WHERE dept_name = "${response.department}"`
        );
      deptID[0].forEach((object) => {
        deptID = object["id"];
      });
      db.query(
        `INSERT INTO roles (title, salary, department_id) VALUES (/)`,
        [response.roleName, response.roleSalary, deptID],
        (err, _results) => {
          if (err) throw err;
          console.log("New Role Succesfully Added");
          returnSystem();
        }
      );
    });
}

//Add department to database
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "deptName",
        message: "What department you want to add?",
      },
    ])
    .then((response) => {
      db.query(
        `INSERT INTO departments (dept_name) VALUES(/)`,
        [response.deptName],
        (err, _results) => {
          if (err) throw err;
          console.log("New Dept added");
          returnSystem();
        }
      );
    });
}

//Add Employees to Database
async function addEmployee() {
  let roles = await db.promise().query(`SELECT title FROM roles`);
  let roleContainer = [];
  roles[0].forEach((object) => {
    roleContainer.push(object["title"]);
  });

  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeFirstName",
        message: "First Name?",
      },
      {
        type: "input",
        name: "employeeLastName",
        message: "Last Name?",
      },
      {
        type: "list",
        name: "role",
        message: "Role?",
        choices: roleContainer,
      },
      {
        type: "list",
        name: "manager",
        message: "Choose Manager or select Not Applicable If None",
        choices: ["Not Applicable"],
      },
    ])
    .then(async (response) => {
      let roleID = await db
        .promise()
        .query(`SELECT id FROM roles WHERE title = "${response.role}"`);
      roleID[0].forEach((object) => {
        roleID = object["id"];
      });

      db.query(
        `INSERT INTO employees (first_name, last_name, role_id) VALUES (/)`,
        [response.empFirstName, response.empLastName, roleID],
        (err, _results) => {
          if (err) throw err;
          console.log("New Employee Succesfully Added");
          returnSystem();
        }
      );
    });
}

// UPDATE EMPLOYEE
async function updateEmployeeRole() {
  let employees = await db
    .promise()
    .query(`SELECT CONCAT (first_name," ",last_name) AS name FROM employees`);
  let employeeContainer = [];
  employees[0].forEach((object) => {
    employeeContainer.push(object["name"]);
  });

  let roles = await db.promise().query(`SELECT title FROM roles`);
  let roleContainer = [];
  roles[0].forEach((object) => {
    roleContainer.push(object["title"]);
  });

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeName",
        message: "Select Employee To Update",
        choices: employeeContainer,
      },
      {
        type: "list",
        name: "role",
        message: "Select New Role to Assign To Employee",
        choices: roleContainer,
      },
    ])
    .then(async (response) => {
      let roleID = await db
        .promise()
        .query(`SELECT id FROM roles WHERE title = "${response.role}"`);
      roleID[0].forEach((object) => {
        roleID = object["id"];
      });

      db.query(
        `UPDATE employees SET role_id="${roleID}" WHERE CONCAT (first_name," ",last_name)="${response.empName}"`,
        (err, _results) => {
          if (err) throw err;
          console.log("Employee Updated");
          returnSystem();
        }
      );
    });
}

// RELAUNCH OPTIONS
function returnSystem() {
  startSystem();
}

startSystem();
