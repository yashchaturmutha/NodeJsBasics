const express=require('express');
const router = express.Router();
const otp=require('../controllers/otp');

router.get('/getotp',otp.getOtp);
router.post('/verify',otp.verifyOtp);

module.exports=router;