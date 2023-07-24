const express=require('express');
const router = express.Router();
const auth=require('../controllers/auth')
const isAuth=require('../middleware/is-auth');

//check=> will extract from anywhere
//query=> will check only req.query
const { check, validationResult,body,query,param,cookie,header } = require('express-validator');

router.get('/login',isAuth,auth.getLogin)
router.post('/login',auth.postLogin)
router.post('/logout',isAuth,auth.postLogout)

router.post('/signup',check('email').isEmail().withMessage('Invalid Email Hain Aapka')
    .custom((value)=>{
    if(value=='admin@gmail.com'){
        throw new Error('Forbidden Email hain ')
    }
    return true;
}).normalizeEmail()
// ,body('password').isLength({min:6}).withMessage('Yeh message saare validations ke liye common hain').isAlphanumeric()
,body('password','Yeh message saare validations ke liye common hain').isLength({min:6}).isAlphanumeric()
,body('confirmpassword')
.custom((value,{req})=>{
    if(value!==req.body.password){
        throw new Error('Password mismatch zaala')
    }
    return true;
})
,auth.postSignUp)

module.exports=router;