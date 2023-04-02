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
app.use('/src/video',express.static('./src/video'))

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
    }
  });

const storage = multer.diskStorage({
    destination:'./src/video',
    filename :(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
}
  });

const fileFilter = (req, file, cb) => {

    const fileTypes=/mp4|ogg|webm/;

    const check=fileTypes.test(file.mimetype);
    const extname=fileTypes.test(path.extname(file.originalname));

    if(check && extname)
        cb(null, true);

    else
        cb(new Error('Unsupported files'), false);
}

const upload = multer({
        storage:storage,
        limits:{
            fileSize:1024*1024*100
        },
        fileFilter:fileFilter
    }).single('myvideo');


// const upload = multer({ storage }).single('myImage');

app.post('/uploadVideo',upload,(req,res)=>{

    var data={
        myvideo:req.file.filename,
    //     // myimage:req.files.myimage,
        name : req.body.name
    }
    console.log(data);
    // console.log(req.body.name);
    console.log(req.file);
    // console.log(req.files);
    console.log(req.body);

    // res.json(req);

    var sql = `INSERT INTO videos (name, myvideo) VALUES ('${data.name}', '${data.myvideo}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Video inserted");
    });

    res.json(data);
    // res.redirect('/');
});

app.use((error, req, res, next) => {
    console.log('This is the rejected field ->', error.field);
  });

app.get('/uploadVideo',(req,res)=>{

    // console.log(data);

    var sql = "SELECT * FROM videos";
    con.query(sql, function (err, result,fields) {
        if (err) throw err;
        console.log("Videos Shown");
        // console.log(result);
        // console.log(fields);
        res.json(result);
        // res.json(fields);
    });
    // console.log(req.file);
    // res.json({file:req.file})
    // res.redirect('/');
});
app.listen(5000,()=>{console.log("Listening");});
