const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sharpner25", // <-- replace this
});

connection.query("CREATE DATABASE school", (err, result) => {
  if (err) throw err;
  console.log("Database 'school' created successfully!");
  connection.end();
});
