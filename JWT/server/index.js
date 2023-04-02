require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");

//register
const registerRoute = require("./routes/handleRegister");

//login
const loginRoute = require("./routes/handleLogin");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/login", loginRoute);
app.use("/register", registerRoute);


const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));