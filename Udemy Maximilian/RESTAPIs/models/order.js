const mongoose=require('mongoose');

const OrderSchema = mongoose.Schema({
	products: [
        {
		product: {type:Object,required:true},
		quantity: {type:Number,required:true}
    	}
    ],
	user:{
        email:{
            type:String,
            required:true
        },  
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'
        }
    }
});

module.exports = mongoose.model('Order', OrderSchema);