var mysql = require('mysql');

var connection = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "multi_vendor",
  multipleStatements: true
});

connection.getConnection(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


module.exports = { connection };
