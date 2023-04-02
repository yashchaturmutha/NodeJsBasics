const multer=require('multer');
const express=require('express');
const path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');
const cors=require('cors');
const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use('/src/image',express.static('./src/image'))

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "image_mysql"
});

con.connect(function async(err) {
    if (err)
    console.log(err);
    else
    {
    console.log("Connected!");

    // var sql='DROP TABLE images';
    // con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("Table Deleted");
    //   });

    // sql = "CREATE TABLE images (myimage VARCHAR(255), name VARCHAR(255))";
    // con.query(sql, function (err, result) {
    //   if (err) throw err;
    //   console.log("Table created");
    // });
    }
  });

const storage = multer.diskStorage({
    destination:'./src/image',
    filename :(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
}
//     url: mongoURI,
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//         crypto.randomBytes(16, (err, buf) => {
//           if (err) {
//             return reject(err);
//           }
//           const filename = buf.toString('hex') + path.extname(file.originalname);
//           const fileInfo = {
//             filename: filename,
//             bucketName: 'uploads'
//           };
//           resolve(fileInfo);
//         });
//       });
//     }
  });

const fileFilter = (req, file, cb) => {

    const fileTypes=/jpeg|jpg|png|png|gif/;

    const check=fileTypes.test(file.mimetype);
    const extname=fileTypes.test(path.extname(file.originalname));

    if(check && extname)
    {
        cb(null, true);

    }
    else{
        cb(new Error('Unsupported files'), false);
    }
}

const upload = multer({
        storage:storage,
        limits:{
            fileSize:1024*1024*10
        },
        fileFilter:fileFilter
    }).single('myimage');


// const upload = multer({ storage }).single('myImage');

app.post('/upload',upload,(req,res)=>{

    var data={
        myimage:req.file.filename,
    //     // myimage:req.files.myimage,
        name : req.body.name
    }
    console.log(data);
    // console.log(req.body.name);
    console.log(req.file);
    // console.log(req.files);
    console.log(req.body);

    // res.json(req);

    var sql = `INSERT INTO images (name, myimage) VALUES ('${data.name}', '${data.myimage}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Image inserted");
    });

    res.json(data);
    // res.redirect('/');
});

app.use((error, req, res, next) => {
    console.log('This is the rejected field ->', error.field);
  });

app.get('/upload',(req,res)=>{

    // console.log(data);

    var sql = "SELECT * FROM images";
    con.query(sql, function (err, result,fields) {
        if (err) throw err;
        console.log("Images Shown");
        // console.log(result);
        // console.log(fields);
        res.json(result);
        // res.json(fields);
    });
    // console.log(req.file);
    // res.json({file:req.file})
    // res.redirect('/');
});
app.listen(8080,()=>{console.log("Listening");});
