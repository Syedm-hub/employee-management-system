const mysql = require("mysql");
var connection = mysql.createConnection({
  // Connection
  host: "localhost",
  port: 3306,
  // MySQL Workbench
  user: "root",
  password: "Piforpa12347890@",

  database: "employeesDB",
});
//connecting database
connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
