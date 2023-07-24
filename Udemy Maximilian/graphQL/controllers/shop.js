const Order = require('../models/order');
const Product=require('../models/product');
const User=require('../models/User');
const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.getProductById=async(req, res,next)=>{

    const products=await Product.findById(req.params.id);
    console.log("products");
    console.log(products);
    return res.send(products?products:{"message":"Not Found"});
}

exports.getProduct=(req,res)=>{

    const ITEMS_PER_PAGE=2;
    const {page}=req.query;

    Product
    .find()
    .countDocuments()
    .then((totalItems)=>{
        return Product
        .find()
        .skip((page-1)*ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        //id is retrieved by default so minus sign applied
        //minus sign does not work on other attr 
        // .select('title price -_id')
        // .populate('userId','name')
        .then((products)=>{
            return res.send({products,totalItems,hasNextPage:page*ITEMS_PER_PAGE< totalItems,hasPreviousPage:page>1});
        })
    })
}

exports.postCart=async(req,res)=>{

    const productId=req.body.productId;
    // const user=await User.findById('647b2c82e2335956652d98ad');

    Product.findById(productId)
    .then(async (data)=>{
        await req.user.addToCart(data);
        res.send({"message":"Add To Cart"})
    }).catch((error)=>{
        res.send({"error":error})
    })
}

exports.getCart=async(req,res)=>{

    // const user=await User.findById(req.session.user._id);
    // console.log(user);
    console.log(req.user);

    // req.user
    // // .findById(req.session.user._id)
    // .populate('cart.items.productId')
    // // .populate({path:'cart.items.productId',select:'title -_id'})
    // .exec()
    // .then(products=>{
        // return res.send({"message":products})         
    // })
    return res.send({"message":"products"})     
}

exports.getOrders=async(req,res)=>{  

    // const user=await User.findById('647b2c82e2335956652d98ad');

    Order.find({'user.userId':req.user._id})
    //id is retrieved by default so minus sign applied
    //minus sign does not work on other attr 
    // .select('title price -_id')
    // .populate('userId','name')
    .then((orders)=>{
        return res.send({"message":orders});
    })
}

exports.createPdf=async(req,res)=>{

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('./docs/output3.pdf'));
    doc.pipe(res);

    doc.fontSize(25).text('Some text with an embedded font!');
    
    doc.end();
}

exports.downloadFile=async(req,res)=>{
    var stream = fs.createReadStream('./docs/output3.pdf');
    var filename = "output3.pdf"; 

    // Be careful of special characters
    filename = encodeURIComponent(filename);

    // Ideally this should strip them
    res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    stream.pipe(res);
}