require("dotenv").config();
const mongoose=require('mongoose');
const express=require('express');
const connection = require("./db");
const session=require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const app=express();
const User=require('./models/User');
const cors=require('cors');

var bodyParser = require('body-parser');
const expValidator=require('express-validator')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));

// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','*');
//     res.setHeader('Access-Control-Allow-Methods','OPTIONS,POST,GET,DELETE,PUT,PATCH');
//     res.setHeader('Access-Control-Allow-Headers','Content-Type','Authorization');
//     next();
// })
connection();

app.listen(4000,()=>console.log("Listening"));