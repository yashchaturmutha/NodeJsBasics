const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	cart: {
		items:[
			{
			productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
			quantity:{type:Number,required:true}
			}
		]
	}
});

UserSchema.methods.addToCart=function(product){

	// this => object of UserSchema
	console.log("addToCart");
	console.log(this);

	const cartProductIndex=this.cart.items.findIndex(cp=>{
		return cp.productId.toString()==product._id.toString();
	});

	console.log("cartProductIndex "+cartProductIndex);

	let newQty=1;
	const updatedCartItems=[...this.cart.items];

	if(cartProductIndex>=0){
		newQty=updatedCartItems[cartProductIndex].quantity+1;
		updatedCartItems[cartProductIndex].quantity=newQty;
	} else {
		updatedCartItems.push({
			productId:product._id,
			quantity:newQty
		})
	}
	console.log("updatedCartItems");
	console.log(updatedCartItems);

	this.cart.items=updatedCartItems;
	return this.save();
}

UserSchema.methods.removeFromCart=function(productId){

	// this => object of UserSchema

	const updatedCartItems=this.cart.items.filter(item=>{
		return item.productId.toString()!==productId.toString();
	});
	this.cart.items=updatedCartItems;
	return this.save();
}

UserSchema.methods.clearCart=function(){
this.cart={items:[]};
return this.save();
}

module.exports = mongoose.model('User', UserSchema);