const express=require('express');
const router=express.Router();
const ImageModel = require("../models/ImageModel");
var multer = require('multer');
const path=require('path');

//Set Storage Engine
var storage = multer.diskStorage({
    // destination: (req, file, cb) => {
        // cb(null, './public/uploads/')
    // },
    destination:'./public/uploads/',
    filename: (req, file, cb) => {
        // cb(null,Date.now()+path.extname(file.originalname));
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    }
});

// Instructing multer to use this storage engine
// Init Upload Variable
var upload = multer({ 
    storage: storage,
    // limits:{fileSize:1000000} 1 mb restriction,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    // const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    // const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    // const mimetype = 
  
    if(file.mimetype=='image/jpeg' || file.mimetype=='image/png' || file.mimetype=='image/jpg' ){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
}

router.get('/',(req,res)=>{
    res.render('./upload');
})

router.get('/:getname',async (req,res)=>{
// res.render('show');
// console.log(req.body.getname);

// if(req.body.getname===undefined)
// return;

    // console.log(req.params.getname);
    const getImage=await ImageModel.find({userName:req.params.getname});
    // console.log(getImage);
    console.log(getImage[0].image.filename);

    // const getAllImage=await ImageModel.find();
    // console.log(getAllImage);

    if(getImage){
    res.render('show', {
        msg: 'Image Found!',
        file: `uploads/${getImage[0].image.filename}`
      });
    }

    else {
    res.render('show', {
        msg: 'Error: No Image Found!'
      });
    }
})

router.post('/',(req,res)=>{

     upload(req, res,async (err) => {
        if(err)
        {
            res.render('upload',{
                msg:err
            })
        }
        
        else if(req.file == undefined){
              res.render('upload', {
                msg: 'Error: No File Selected!'
              });
        }

        // else
        // {
            
        //     console.log(req.file);
        //     res.send("Image Uploaded"); 
        // }

        else {

            try{
                const newImage=new ImageModel({
                    userName : req.body.name,
                    // image:{
                    //     data : req.file.filename,
                    //     contentType : req.file.mimetype
                    // },
                    image:req.file
                });
    
                await newImage.save();
                // res.status(201).send({ message: "Image created successfully" });
            
                res.render('upload', {
                  msg: 'File Uploaded!',
                  file:`uploads/${req.file.filename}`
                });
            }

            catch (error) {
                res.status(500).send({ message: "Internal Server Error" });
            }

          }
    })
})

module.exports = router;