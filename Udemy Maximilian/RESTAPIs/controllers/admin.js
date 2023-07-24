const Order = require('../models/order');
const Product=require('../models/product');
const User=require('../models/User');

exports.postAddProduct=async(req, res,next)=>{

    const {title,description,imageUrl,price,userId}=req.body;

    // const user=await User.findById(userId);
    const productObject=new Product({
        title,description,imageUrl,price
    })
    console.log(productObject);

    //mongoose gets only id from user Object
    productObject.userId=req.user;

    try{
        await productObject.save();
        return res.send({"message":"Product Saved"})
    }
    catch(e){
        return res.status(400).send({"error":e})
    }
}

exports.postEditProduct=async(req,res)=>{

    const {id,title,description,imageUrl}=req.body;

    Product.findById(id).then(async(product)=>{
        product.description=description;
        product.title=title;
        product.imageUrl=imageUrl;
        await product.save();
        return res.send(product);
    });
}

exports.deleteProduct=async(req,res)=>{

    await Product.findByIdAndRemove(req.params.id);
    res.send({"message":"Deleted "})
}

exports.deleteFromCart=async(req,res)=>{

    const {productId,userId}=req.body;

    // const user=await User.findById(userId);

    req.user.removeFromCart(productId).then(()=>{
        res.send({"message":"Deleted"})
    }).catch((err)=>{
        res.status(400).send({"error":err})
    });

}

exports.postOrder=async(req,res)=>{

    // const user=await User.findById('647b2c82e2335956652d98ad');

    req.user
    .populate('cart.items.productId')
    // .exec()
    .then(async(user)=>{
        // console.log(Object.keys(user.cart.items[0]));
        // console.log(user.cart.items[0].productId);
        const products=user.cart.items.map(i=>{
            console.log("user");
            console.log(i.productId);
            return {quantity:i.quantity,product:i.productId._doc}
        });

        const order=new Order({ 
            user:{
                email:req.user.email,
                userId:req.user
            },
            products:products
        });
        await order.save();
        user.clearCart();
        res.send({"message":"Ordered"})
    })
}