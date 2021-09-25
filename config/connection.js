const mysql = require("mysql");
var connection = mysql.createConnection({
  // Connection
  host: "localhost",
  port: 3306,
  database: "employeesDB",
  // MySQL Workbench
  user: "root",
  //Use your database password
  password: "Piforpa12347890@",
});
//connecting database
connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
