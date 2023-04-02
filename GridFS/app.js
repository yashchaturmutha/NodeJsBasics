const express=require('express');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const app=express();


// app.use(methodOverride('_method'));
app.set('view engine','ejs');

// Mongo URI
const mongoURI = 'mongodb+srv://ymc:sSF0wJ73I4Y7Svju@cluster0.t8yorqh.mongodb.net/gridFS';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Init gfs
let gfs, gridfsBucket;;

conn.once('open', () => {
gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
});
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
}); 

// Storage Engine

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });

const upload = multer({ storage }).single('myImage');

app.post('/upload',upload,(req,res)=>{
    console.log(req.file);
    // res.json({file:req.file})
    res.redirect('/');
})

// @route GET /
// @desc Loads form
app.get('/', (req, res) => {
   
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        res.render('index', { files: false });
      } 
      
      else {
        files.map(file => {
          if (
            file.contentType === 'image/jpeg' ||
            file.contentType === 'image/png'
          ) {
            file.isImage = true;
          } else {
            file.isImage = false;
          }
        });
        res.render('index', { files: files });
      }

    });
  });

// @route GET /files
// @desc  Display all files in JSON
app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }
  
      // Files exist
      return res.json(files);
    });
  });

// @route GET /files/:filename
// @desc  Display single file object
app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      // File exists
      return res.json(file);
    });
  });  

// @route GET /image/:filename
// @desc Display Image
app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
  
      // Check if image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        // Read output to browser
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
        console.log(readStream);
      } else {
        res.status(404).json({
          err: 'Not an image'
        });
      }
    });
  });

app.listen(5000,()=>{console.log("Listening");});