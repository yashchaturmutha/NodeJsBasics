import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const AddCard = () => {

    const navigate=useNavigate()
  const [customerId, setCustomerId] = useState();
  const [userid,setUserId]=useState(1)

  console.log(customerId, 'customerId');

  useEffect(() => {
    console.log(userid,'----------------------------------');
    axios
      .get(`http://localhost:3000/get-customer/${userid}`,)
      .then((res) => {
        console.log('res ');
        console.log(res.data[0]);
        setCustomerId(res.data[0].idcustomer);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userid]);

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      setErrorMessage('Error adding card. Please try again.');
    } else {
      console.log('customerId', customerId);
      const body = {
        customerId: customerId,
        paymentMethodId: paymentMethod.id,
      };
      axios.post('http://localhost:3000/add-card', body).then(()=>{
        navigate("/payment")
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <input type='text' onChange={(e)=>setUserId(e.target.value)} placeholder='enter userId'></input>
      <CardElement   />
      <button type="submit">Add Card</button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default AddCard;
