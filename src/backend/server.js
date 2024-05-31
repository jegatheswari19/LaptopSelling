const express = require('express');
const mysql=require('mysql');
const cors=require('cors');

const app = express()
app.use(cors())

const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Jega@2004",
    database:  "e-commerce"
})

app.get('/', (re,res) =>{
    return res.json("from backend side")
})

app.listen(8801,() =>{
    console.log("listen");
})