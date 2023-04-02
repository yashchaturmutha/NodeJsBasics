const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
	userName: { 
        type: String, 
        required: true 
    },
	
    image :{ 
        // data: Buffer , 
        // contentType : String
        fieldname: String,
        originalname: String,
        encoding: String,
        mimetype: String,
        destination: String,
        filename: String,
        path: String,
        size: Number

    }
});



// collection
const ImageModel = mongoose.model("imageupload", imageSchema);


module.exports =ImageModel;