const express=require('express');
const app=express();
const db=require('./utils/dbconnection.js');
const studentRoutes=require('./routes/studentRoutes.js');
const port=3000;

app.get('/',(req,res)=>{
    res.send('hello world');
});

app.use("/students",studentRoutes);


app.listen(port,(err)=>{

    console.log("server is running");
});