import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const [customerId, setCustomerId] = useState();
  const [amount,setAmount]=useState(0)
  
  const [paymentmethodid,setpaymentmethodid]=useState()

  console.log(customerId, 'customerId');

  useEffect(() => {
    axios
      .get('http://localhost:3000/get-customer')
      .then((res) => {
        console.log('res ');
        console.log(res.data[0]);
        setCustomerId(res.data[0].idcustomer);

            
            axios.post('http://localhost:3000/idapi',{customerId:`${res.data[0].idcustomer}`}).then((res)=>{
                console.log(res.data.paymentMethodidsent,'res00------------------');
                setpaymentmethodid(res.data.paymentMethodidsent)
            })
       
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const handleSubmit = () => {
    axios
      .post('http://localhost:3000/payment', {
        amount: amount,
        idcustomer: customerId,
        paymentid: paymentmethodid,
      })
      .then((res) => {
        console.log(res, 'res---');
        console.log(res.data, 'al habibi');
      })
      .catch((err) => {
        console.log(err, 'err---');
      });
  };
  return (
    <div>
      pay for test
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="amount"
      />
      <button onClick={handleSubmit}>Pay</button>
    </div>
  );
};

export default PaymentForm;
