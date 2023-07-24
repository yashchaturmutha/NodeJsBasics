const mongoose = require("mongoose");
const User = require("./models/User");

module.exports = async() => {

    try {
		mongoose.connect(process.env.DB_CONNECTION,  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

		console.log("Connected to database successfully");
	} 
    
    catch (error) {
		console.log(error.message);
		console.log("Could not connect Database !");
	}
};