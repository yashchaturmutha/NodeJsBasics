require("dotenv").config();
const mongoose=require('mongoose');
const express=require('express');
const connection = require("./db");
const session=require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const app=express();
const User=require('./models/User');
const cors=require('cors');

// const csrf=require('csurf');
var bodyParser = require('body-parser');
const expValidator=require('express-validator')

const store = new MongoDBStore({
    uri: process.env.DB_CONNECTION,
    collection: 'sessions'
  });


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

// app.use(session({
//     secret:'2023-06-20',
//     // session will not be saved on every request
//     resave:false ,
//     //This option only modifies the behavior when an existing session was loaded for the request.
//     //no session gets saved for a request where it doesn't need to be saved
//     saveUninitialized:false,
//     store:store,
//     // cookie:{
//         // 
//     // }
// }));

connection();

// app.use(csrf());
// app.use((req,res,next)=>{

//     if(! req.session.user)
//         return next();

//     User.findById(req.session.user._id)
//     .then((user)=>{
//         req.user=user;
//         next();
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// })
// Import Routes
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const authRoutes=require('./routes/auth');
// const otpRoutes=require('./routes/otp');

app.use('/admin', adminRoute);
app.use('/shop', shopRoute);
// app.use('/otp', otpRoutes);
app.use('/auth',authRoutes);

app.listen(4000,()=>console.log("Listening"));