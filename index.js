//Import Modules
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

//Setting up DB connection
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_db",
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
          endManager();
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
