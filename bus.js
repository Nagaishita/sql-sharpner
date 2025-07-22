const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sharpner25',
  multipleStatements: true, // to run multiple CREATEs
  database:'testDB'
});

connection.connect((err) => {
  if (err) {
    console.error('Connection error:', err);
    return;
  }
  console.log('Connected to MySQL');

  const createDBAndTables = `
    CREATE DATABASE IF NOT EXISTS bus_booking_db;
    USE bus_booking_db;

    CREATE TABLE IF NOT EXISTS Users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS Buses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      busNumber VARCHAR(50),
      totalSeats INT,
      availableSeats INT
    );

    CREATE TABLE IF NOT EXISTS Bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT,
      busId INT,
      seatNumber INT,
      FOREIGN KEY (userId) REFERENCES Users(id),
      FOREIGN KEY (busId) REFERENCES Buses(id)
    );

    CREATE TABLE IF NOT EXISTS Payments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      bookingId INT,
      amountPaid DECIMAL(10, 2),
      paymentStatus VARCHAR(50),
      FOREIGN KEY (bookingId) REFERENCES Bookings(id)
    );
  `;

  connection.query(createDBAndTables, (err) => {
    if (err) {
      console.error('Error creating schema:', err);
    } else {
      console.log('Database and tables created with foreign keys!');
    }
    connection.end();
  });
});

app.listen(port, () => {
  console.log('Server is running on port', port);
});
