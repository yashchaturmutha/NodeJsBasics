require('dotenv').config()
const express=require('express');
const fs=require('fs');
const app=express();

app.set('view engine','ejs');
app.use(express.json());
app.use(express.static('public'));

const stripePublicKey=process.env.STRIPE_PUBLIC_LEY;
const stripePrivateKey=process.env.STRIPE_SECRET_KEY;
const stripe=require('stripe')(stripePrivateKey);

app.get('/store',(req,res)=>{
fs.readFile('items.json',(error,data)=>{
    if(error){
        return res.status(500).end();
    }
    res.render('store.ejs',{
        items:JSON.parse(data),
        stripePublicKey:stripePublicKey
    });
})
})

app.post('/purchase',(req,res)=>{
    fs.readFile('items.json',async(error,data)=>{
        if(error){
            return res.status(500).end();
        }
        else {
            console.log("Purchase");
            const itemsJSON=JSON.parse(data);
            const itemsArray=itemsJSON.music.concat(itemsJSON.merch)
            
            console.log("req.body");
            console.log(req.body);

            let total=0;
            req.body.items.forEach((item) => {
                const itemJSON=itemsArray.find((i)=>{
                    return i.id==item.id
                });
                console.log("itemJSON");
                console.log(itemJSON);
                total=total+(itemJSON.price*item.quantity);
            });
            console.log("total");
            console.log(total);

            // stripe.paymentIntents.create({
            //     amount:total,
            //     // source:req.body.stripeTokenId,
            //     // payment_method:req.body.stripeTokenId,
            //     payment_method_data:{
            //         'type': 'card',
            //         'card' : {
            //             'token' : req.body.stripeTokenId
            //         }
            //     },
            //     currency:'usd',
            //     payment_method_types:['card'],
            //     confirm:true
            // }).then(()=>{
            //     console.log("Charge Successful");
            //     res.json({message:"Successfully Purchased"})
            // }).catch((err)=>{
            //     console.log("Charge Failed");
            //     console.log(err);
            //     res.status(500).end()
            // })

            const customer = await stripe.customers.create();
            const ephemeralKey = await stripe.ephemeralKeys.create(
                {customer: customer.id},
                {apiVersion: '2022-11-15'}
            );
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total,
                currency: 'usd',
                customer: customer.id,
                payment_method_types: ['card'],
            });

            console.log("Charge Successful");
            // res.json({message:"Successfully Purchased"})
            res.json({
                paymentIntent: paymentIntent.client_secret,
                ephemeralKey: ephemeralKey.secret,
                customer: customer.id,
                publishableKey: stripePublicKey
            });
            const obj={
                paymentIntent: paymentIntent.client_secret,
                ephemeralKey: ephemeralKey.secret,
                customer: customer.id,
                publishableKey: stripePublicKey
            }
            console.log(obj);
        }
    })
})

app.listen(3000,()=>console.log(stripePublicKey+"\n"+stripePrivateKey));
