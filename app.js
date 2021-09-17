const inquirer = require("inquirer");
const table = require("console.table");
// MySQL Connection
const connection = require("./config/connection");
// Prompts
const prompt = require("./config/prompts");
require("console.table");

// launch app
start();

function start() {
  inquirer.prompt(prompt.firstPrompt).then(function ({ task }) {
    switch (task) {
      case "View Employees":
        viewEmployee();
        break;
      case "View Employees by Manager":
        viewEmployeeByManager();
        break;
      case "View Employees by Department":
        viewEmployeeByDepartment();
        break;
      case "View Departments":
        viewDepartments();
        break;
      case "View Roles":
        viewRoles();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Add Department":
        addDepartment();
        break;
      case "Add Role":
        addRole();
        break;
      case "Update Employee Role":
        updateEmployeeRole();
        break;
      case "Remove Employee":
        deleteEmployee();
        break;
      case "Remove Department":
        deleteDepartment();
        break;
      case "Exit":
        console.log(`\n`);
        connection.end();
        break;
    }
  });
}

//View Employees
function viewEmployee() {
  console.log("\n");

  var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  LEFT JOIN role r
	ON e.role_id = r.id
  LEFT JOIN department d
  ON d.id = r.department_id
  LEFT JOIN employee m
	ON m.id = e.manager_id`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("\n");

    start();
  });
}

//View Employee Manager
function viewEmployeeByManager() {
  console.log("\n");

  var query = `SELECT e.manager_id, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role r
	ON e.role_id = r.id
  	LEFT JOIN department d
  	ON d.id = r.department_id
  	LEFT JOIN employee m
	ON m.id = e.manager_id GROUP BY e.manager_id`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const managerChoices = res

      .filter((mgr) => mgr.manager_id)
      .map(({ manager_id, manager }) => ({
        value: manager_id,
        name: manager,
      }));

    inquirer
      .prompt(prompt.viewManagerPrompt(managerChoices))
      .then(function (answer) {
        var query = `SELECT e.id, e.first_name, e.last_name, r.title, CONCAT(m.first_name, ' ', m.last_name) AS manager
			FROM employee e
			JOIN role r
			ON e.role_id = r.id
			JOIN department d
			ON d.id = r.department_id
			LEFT JOIN employee m
			ON m.id = e.manager_id
			WHERE m.id = ?`;

        connection.query(query, answer.managerId, function (err, res) {
          if (err) throw err;

          console.table("\nManager's subordinates:", res);
          console.log("\n");

          start();
        });
      });
  });
}

//View Employees by Department
function viewEmployeeByDepartment() {
  console.log("View employees by department\n");

  var query = `SELECT d.id, d.name
	FROM employee e
	LEFT JOIN role r
	ON e.role_id = r.id
	LEFT JOIN department d
	ON d.id = r.department_id
	GROUP BY d.id, d.name`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const departmentChoices = res.map((data) => ({
      value: data.id,
      name: data.name,
    }));

    inquirer
      .prompt(prompt.departmentPrompt(departmentChoices))
      .then(function (answer) {
        var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
			FROM employee e
			JOIN role r
				ON e.role_id = r.id
			JOIN department d
			ON d.id = r.department_id
			WHERE d.id = ?`;

        connection.query(query, answer.departmentId, function (err, res) {
          if (err) throw err;

          console.table("\nDepartment Rota: ", res);
          console.log("\n");

          start();
        });
      });
  });
}

//View Departments
function viewDepartments() {
  var query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(`\nDEPARTMENTS:\n`);
    res.forEach((department) => {
      console.log(`ID: ${department.id} | ${department.name} Department`);
    });
    console.log("\n");
    start();
  });
}

// View Roles
function viewRoles() {
  var query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(`\nROLES:\n`);
    res.forEach((role) => {
      console.log(
        `ID: ${role.id} | Title: ${role.title}\n Salary: ${role.salary}\n`
      );
    });
    console.log("/n");
    start();
  });
}

// Add Employees
const addEmployee = () => {
  let departmentArray = [];
  connection.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;

    res.forEach((element) => {
      departmentArray.push(`${element.id} ${element.name}`);
    });

    let roleArray = [];
    connection.query(`SELECT id, title FROM role`, (err, res) => {
      if (err) throw err;

      res.forEach((element) => {
        roleArray.push(`${element.id} ${element.title}`);
      });

      let managerArray = [];
      connection.query(
        `SELECT id, first_name, last_name FROM employee`,
        (err, res) => {
          if (err) throw err;
          res.forEach((element) => {
            managerArray.push(
              `${element.id} ${element.first_name} ${element.last_name}`
            );
          });

          inquirer
            .prompt(
              prompt.insertEmployee(departmentArray, roleArray, managerArray)
            )
            .then((response) => {
              let roleCode = parseInt(response.role);
              let managerCode = parseInt(response.manager);
              connection.query(
                "INSERT INTO employee SET ?",
                {
                  first_name: response.firstName,
                  last_name: response.lastName,
                  role_id: roleCode,
                  manager_id: managerCode,
                },
                (err, res) => {
                  if (err) throw err;
                  console.log("\n" + res.affectedRows + " employee created");
                  console.log("\n");
                  viewEmployee();
                }
              );
            });
        }
      );
    });
  });
};

//Add Departments
function addDepartment() {
  inquirer.prompt(prompt.insertDepartment).then(function (answer) {
    var query = "INSERT INTO department (name) VALUES ( ? )";
    connection.query(query, answer.department, function (err, res) {
      if (err) throw err;
      console.log(
        `You have added this department: ${answer.department.toUpperCase()}.`
      );
    });
    console.log("\n");
    viewDepartments();
  });
}

// Add Roles
function addRole() {
  var query = `SELECT * FROM department`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const departmentChoices = res.map(({ id, name }) => ({
      value: id,
      name: `${id} ${name}`,
    }));

    inquirer
      .prompt(prompt.insertRole(departmentChoices))
      .then(function (answer) {
        var query = `INSERT INTO role SET ?`;

        connection.query(
          query,
          {
            title: answer.roleTitle,
            salary: answer.roleSalary,
            department_id: answer.departmentId,
          },
          function (err, res) {
            if (err) throw err;

            console.log("\n" + res.affectedRows + " role created");
            console.log("\n");

            viewRoles();
          }
        );
      });
  });
}

//Update Employee Role
const updateEmployeeRole = () => {
  let employees = [];
  connection.query(
    `SELECT id, first_name, last_name
  FROM employee`,
    (err, res) => {
      if (err) throw err;

      res.forEach((element) => {
        employees.push(
          `${element.id} ${element.first_name} ${element.last_name}`
        );
      });

      let job = [];
      connection.query(`SELECT id, title FROM role`, (err, res) => {
        if (err) throw err;

        res.forEach((element) => {
          job.push(`${element.id} ${element.title}`);
        });

        inquirer.prompt(prompt.updateRole(employees, job)).then((response) => {
          let idCode = parseInt(response.update);
          let roleCode = parseInt(response.role);
          connection.query(
            `UPDATE employee SET role_id = ${roleCode} WHERE id = ${idCode}`,
            (err, res) => {
              if (err) throw err;

              console.log(
                "\n" + "\n" + res.affectedRows + " Updated successfully!"
              );
              console.log("\n");
              start();
            }
          );
        });
      });
    }
  );
};

//Remove Employee
function deleteEmployee() {
  console.log("Deleting an employee");

  var query = `SELECT e.id, e.first_name, e.last_name
      FROM employee e`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${id} ${first_name} ${last_name}`,
    }));

    inquirer
      .prompt(prompt.deleteEmployeePrompt(deleteEmployeeChoices))
      .then(function (answer) {
        var query = `DELETE FROM employee WHERE ?`;

        connection.query(query, { id: answer.employeeId }, function (err, res) {
          if (err) throw err;

          console.log("\n" + res.affectedRows + "  employee deleted");
          console.log("\n");

          start();
        });
      });
  });
}

//Remove Department
function deleteDepartment() {
  console.log("\nRemove a Department:\n");

  var query = `SELECT e.id, e.name FROM department e`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const deleteDepartmentChoices = res.map(({ id, name }) => ({
      value: id,
      name: `${id} ${name}`,
    }));

    inquirer
      .prompt(prompt.deleteDepartmentPrompt(deleteDepartmentChoices))
      .then(function (answer) {
        var query = `DELETE FROM department WHERE ?`;

        connection.query(
          query,
          { id: answer.departmentId },
          function (err, res) {
            if (err) throw err;

            console.log("\n" + res.affectedRows + " department deleted");
            console.log("\n");

            viewDepartments();
          }
        );
      });
  });
}
