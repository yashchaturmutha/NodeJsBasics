const express=require('express');
const printcontroller=require('./controller/print');
var bodyParser = require('body-parser');
// const cors=require('cors');
const app=express();

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
// const paypal=require('paypal-rest-sdk');

// paypal.configure({
//     'mode':'sandbox',
//     'client_id':'AXRFQZX3oUjSV4DIJZx7xj3y6XIApojZxNQLQnC3hwliOP1BVVE1JTLPGQ0zHpkz76coji4H0FcVinxP',
//     'client_secret':'EMBhG0Mpba_H-kK5LD3r0uKiIMkCfpEgEAr550py9jZneurAdVlZxiwTxFw36jE_TS9Gn5qRpSmZkmH1'
// })

const PORT = 4000 || process.env.PORT;

// app.post('/pay', (req, res) => {
//     const create_payment_json = {
//       "intent": "sale",
//       "payer": {
//           "payment_method": "paypal"
//       },
//       "redirect_urls": {
//           "return_url": "http://localhost:3000/success",
//           "cancel_url": "http://localhost:3000/cancel"
//       },
//       "transactions": [{
//           "item_list": {
//               "items": [{
//                   "name": "Red Sox Hat",
//                   "sku": "001",
//                   "price": "5.00",
//                   "currency": "USD",
//                   "quantity": 1
//               }]
//           },
//           "amount": {
//               "currency": "USD",
//               "total": "5.00"
//           },
//           "description": "Hat for the best team ever"
//       }]
//   };

//   app.get('/success', (req, res) => {
//     const payerId = req.query.PayerID;
//     const paymentId = req.query.paymentId;
  
//     const execute_payment_json = {
//       "payer_id": payerId,
//       "transactions": [{
//           "amount": {
//               "currency": "USD",
//               "total": "5.00"
//           }
//       }]
//     };
  
//     paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
//       if (error) {
//           console.log(error.response);
//           throw error;
//       } else {
//           console.log(JSON.stringify(payment));
//           res.send('Success');
//       }
//   });
//   });
//     paypal.payment.create(create_payment_json, function (error, payment) {
//         if (error) {
//             throw error;
//         } else {
//             for(let i = 0;i < payment.links.length;i++){
//               if(payment.links[i].rel === 'approval_url'){
//                 res.redirect(payment.links[i].href);
//               }
//             }
//         }
//       });
      
// });

// app.get('/cancel', (req, res) => res.send('Cancelled'));

// app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));

app.get('/get-test',printcontroller.getTest);
app.post('/post-test',printcontroller.postTest);

app.listen(PORT,()=>console.log("Server Start"));
