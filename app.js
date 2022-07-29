const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
// create our express app
const app = express();
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => { res.send("Welcome to Library Management System \n  \n 1:To add new book type:http://localhost:5000/book/addbook \n 2:To get all books type:http://localhost:5000/book \n 3: To update an existing book type:http://localhost:5000/book/:id \n 4:To delete a book type:http://localhost:5000/book/:id \n"); });

// route

const routes = require('./routes/libook')
app.use('/', routes)

//start server
app.listen(5000, ()=>{
    console.log("listeniing at port:5000")
}) 
app.listen(4000, ()=>{
    console.log("Welcome to Library Management System")
}) 