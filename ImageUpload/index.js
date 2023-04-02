const express=require('express');
const connection = require("./db");
const app=express();

require('dotenv').config();

app.set('view engine','ejs');
app.use(express.static('./public'));

// database connection
connection();

const uploadRoutes=require('./routes/upload');

app.use('/upload',uploadRoutes);  

app.listen(3001,()=>console.log("Listening"));


