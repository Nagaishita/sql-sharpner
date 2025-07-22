const express=require('express');
const app=express();
const port=3000;
const mysql=require('mysql2');

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'sharpner25',
    database:'testDB'
});

connection.connect((err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("connection has been created");

    const creationQuery=`create table Students(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20),
    email VARCHAR(20)
    )`
    connection.execute(creationQuery,(err)=>{
        if(err){
             console.log("Error creating table:", err.message);
            console.log("MySQL Error Code:", err.errno);
            console.log("SQL State:", err.sqlState);
            connection.end();
            return;
        }
        console.log("table is created");
    });
});


app.get('/',(req,res)=>{
    res.send('hello world');
});

app.listen(port,(err)=>{

    console.log("server is running");
});