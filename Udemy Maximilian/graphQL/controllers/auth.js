const User=require('../models/User');
const bcrypt=require('bcryptjs');
const nodemailer=require('nodemailer');
const sendGridTransport=require('nodemailer-sendgrid-transport');
const { check, validationResult } = require('express-validator');
const jwt=require('jsonwebtoken');

const transporter=nodemailer.createTransport(sendGridTransport({
    auth:{
        api_key:'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'
    }
}))

exports.getLogin=async(req,res)=>{  

    // const user=await User.findById('647b2c82e2335956652d98ad');
    console.log("getLogin");
    console.log(req.session);
    res.send({"message":req.session.isLoggedIn?req.session.isLoggedIn:false})
    // Order.find({'user.userId':user._id})
    // //id is retrieved by default so minus sign applied
    // //minus sign does not work on other attr 
    // // .select('title price -_id')
    // // .populate('userId','name')
    // .then((orders)=>{
    //     return res.send({"message":orders});
    // })
}

exports.postLogin=async(req,res)=>{

    let {email,password}=req.body;

    console.log("postLogin");
    console.log(req.session);

    User.findOne({email:email}).then(async(user)=>{

        if(!user){
            const error=new Error('Invalid Creds');
            error.statusCode=401;
            throw error;
            // return res.status(400).send({message:"Invalid Creds"});
        }

        const check=await bcrypt.compare(password,user.password);

        if(check){
            // req.session.user=user;
            // req.session.isLoggedIn=true;
    
            // req.session.save(err=>{
            //     console.log(err);
            // })
            const token=jwt.sign({email,password},'mykey',{expiresIn:'10s'});
            return res.send({token});
        }
        const error=new Error('Invalid Password');
        error.statusCode=401;
        throw error;
       
    }).catch((e)=>{
        return res.status(500).send({"error":e})
    });

}

exports.postLogout=async(req,res)=>{

    req.session.destroy(err=>{
        console.log(err);
        return res.send({"message":"Logged out"})
    })

}

exports.postSignUp=async(req,res)=>{

    let {email,password,confirmPassword}=req.body;

    const errors=validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        return res.status(422).send({errors:errors.array()});
    }

    User.findOne({email:email}).then(async(user)=>{

        if(!user){

            password=await bcrypt.hash(password,12);

            const user=new User({
                email:email,
                password:password,
                cart:{
                    items:[]
                }
            });
            user.save();

            // await transporter.sendMail({
            //     from:'chaturmuthayash@gmail.com',
            //     to:'chyeshwant2@gmail.com',
            //     subject:'Sendgrid',
            //     html:'<h1>Signed Up !</h1>'
            // })
            return res.send({message:"Signed Up"})
        }

        return res.status(400).send({message:"User Already Exists"})
    }).catch((e)=>{
        console.log(e);
        return res.status(500).send({error:e})
    })

}