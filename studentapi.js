const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sharpner25", // update if you have a password
  database: "school" // make sure this DB exists
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected.");
});

// Create table if not exists
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    age INT
  )
`;

db.query(createTableQuery, (err) => {
  if (err) throw err;
  console.log("Students table ready.");
});

// POST - Add new student
app.post("/students", (req, res) => {
  const { name, email, age } = req.body;
  const sql = "INSERT INTO students (name, email, age) VALUES (?, ?, ?)";
  db.query(sql, [name, email, age], (err, result) => {
    if (err) return res.status(500).send(err.message);
    console.log("Inserted student ID:", result.insertId);
    res.send("Student added.");
  });
});

// GET - Retrieve all students
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results);
  });
});

// GET - Retrieve student by ID
app.get("/students/:id", (req, res) => {
  db.query("SELECT * FROM students WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err.message);
    if (results.length === 0) return res.status(404).send("Student not found.");
    res.json(results[0]);
  });
});

// PUT - Update student by ID
app.put("/students/:id", (req, res) => {
  const { name, email } = req.body;
  const sql = "UPDATE students SET name = ?, email = ? WHERE id = ?";
  db.query(sql, [name, email, req.params.id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    if (result.affectedRows === 0) return res.status(404).send("Student not found.");
    console.log("Updated student ID:", req.params.id);
    res.send("Student updated.");
  });
});

// DELETE - Remove student by ID
app.delete("/students/:id", (req, res) => {
  db.query("DELETE FROM students WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err.message);
    if (result.affectedRows === 0) return res.status(404).send("Student not found.");
    console.log("Deleted student ID:", req.params.id);
    res.send("Student deleted.");
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
