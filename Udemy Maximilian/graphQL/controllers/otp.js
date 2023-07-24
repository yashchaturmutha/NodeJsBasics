const otpGen  = require("otp-generator");
const otpTool = require("otp-without-db"); 
const key     = "secretKey"; // Use unique key and keep it secret
let email = "y@gmail.com";  
const crypto  = require("crypto");

exports.getOtp=async(req,res)=>{

    let otp = otpGen.generate(6, { upperCase: false, specialChars: false, alphabets: false });  
    const ttl      = 5 * 60 * 1000; //5 Minutes in miliseconds
    const expires  = Date.now() + ttl; //timestamp to 5 minutes in the future
    const data     = `${email}.${otp}.${expires}`; // email.otp.expiry_timestamp
    const hash     = crypto.createHmac("sha256",key).update(data).digest("hex"); // creating SHA256 hash of the data
    const fullHash = `${hash}.${expires}`; // Hash.expires, format to send to the user
    // you have to implement the function to send SMS yourself. For demo purpose. let's assume it's called sendSMS
    return res.send({fullHash,otp});
};

exports.verifyOtp=async(req,res)=>{
    const {hash,otp,email}=req.body;

    let [hashValue,expires] = hash.split(".");

    let now = Date.now();

    if(now>parseInt(expires)){
        return res.send(false);
    } 
    // Calculate new hash with the same key and the same algorithm
    let data  = `${email}.${otp}.${expires}`;
    let newCalculatedHash = crypto.createHmac("sha256",key).update(data).digest("hex");
    // Match the hashes
    if(newCalculatedHash === hashValue){
        return res.send(true);
    } 
    return res.send(false);
    // res.send(otpTool.verifyOTP(email,otp,hash,key));
}