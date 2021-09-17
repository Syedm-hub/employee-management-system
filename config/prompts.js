module.exports = {
  firstPrompt: {
    type: "list",
    name: "task",
    message: "Make a selection:",
    choices: [
      "View Employees",
      "View Employees by Manager",
      "View Employees by Department",
      "View Departments",
      "View Roles",
      "Add Employee",
      "Add Department",
      "Add Role",
      "Update Employee Role",
      "Remove Employee",
      "Remove Department",

      "Exit",
    ],
  },

  //Promopt Managers
  viewManagerPrompt: (managerChoices) => [
    {
      type: "list",
      name: "managerId",
      message: "Choose your Manager?",
      choices: managerChoices,
    },
  ],

  //Select Department
  departmentPrompt: (departmentChoices) => [
    {
      type: "list",
      name: "departmentId",
      message: "Choose your Department?",
      choices: departmentChoices,
    },
  ],

  //Add Employee
  insertEmployee: (departmentArray, roleArray, managerArray) => [
    {
      name: "firstName",
      type: "input",
      message: "Enter employee's first name:",
    },

    {
      name: "lastName",
      type: "input",
      message: "Enter employee's last name:",
    },

    {
      name: "department",
      type: "list",
      message: "Choose employee's department",
      choices: departmentArray,
    },

    {
      name: "role",
      type: "list",
      message: "Choose employee's job position",
      choices: roleArray,
    },

    {
      name: "manager",
      type: "list",
      message: "Choose the manager of this employee:",
      choices: managerArray,
    },
  ],

  //Add Department
  insertDepartment: {
    name: "department",
    type: "input",
    message: "What is the name of the new department?",
  },

  //Add Roles
  insertRole: (departmentChoices) => [
    {
      type: "input",
      name: "roleTitle",
      message: "Role title?",
    },

    {
      type: "list",
      name: "departmentId",
      message: "Department?",
      choices: departmentChoices,
    },
  ],

  //Update Role
  updateRole: (employees, job) => [
    {
      name: "update",
      type: "list",
      message: "Choose the employee whose role is to be updated:",
      choices: employees,
    },

    {
      name: "role",
      type: "list",
      message: "Choose employee's job position",
      choices: job,
    },
  ],

  //Remove Employee
  deleteEmployeePrompt: (deleteEmployeeChoices) => [
    {
      type: "list",
      name: "employeeId",
      message: "Which employee do you want to remove?",
      choices: deleteEmployeeChoices,
    },
  ],

  //Remove Department
  deleteDepartmentPrompt: (deleteDepartmentChoices) => [
    {
      type: "list",
      name: "departmentId",
      message: "Which department do you want to remove?",
      choices: deleteDepartmentChoices,
    },
  ],

  //Remove Role
  deleteRolePrompt: (deleteRoleChoices) => [
    {
      type: "list",
      name: "roleId",
      message: "Which role do you want to remove?",
      choices: deleteRoleChoices,
    },
  ],
};
