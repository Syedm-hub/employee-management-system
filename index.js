//Import Modules

const inquirer = require("inquirer");
const mysql = require("mysql2");
const { exit } = require("process");

//Create DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_db",
});

//Prompt
function employeeTracking() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What you want to do with this app?",
        name: "promptSelection",
        choices: [
          "View all employees",
          "View all roles of every employees",
          "Add new employee",
          "Add new role",
          "Update new employee role",
          "View all departments",
          "Add new department",
          "Exit",
        ],
      },
    ])

    .then((prompt) => {
      switch (prompt.promptSelection) {
        case "View all employees":
          viewEmployees();
          break;
        case "View all roles of every employees":
          viewRoles();
          break;
        case "Add new employee":
          addEmployee();
          break;
        case "Add new role":
          addRole();
          break;
        case "Update new employee role":
          updateRole();
          break;
        case "View all departments":
          viewDepartment();
          break;
        case "Add new department":
          addNewdepartment();
          break;
        case "Exit":
          endTask();
          break;
      }
    });
}
