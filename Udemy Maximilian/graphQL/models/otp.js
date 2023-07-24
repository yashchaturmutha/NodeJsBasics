const mongoose = require('mongoose');

const OTPSchema = mongoose.Schema({
	email:{
    type:String,
    unique:true
    },
    otp:String,
    createdAt:Date
});

module.exports = mongoose.model('OTP', OTPSchema);