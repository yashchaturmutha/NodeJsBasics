import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#000',
      fontWeight: 500,
      fontFamily: 'Roboto , Open Sans , Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const [confirmpaymentbtn, setconfirmpaymentbtn] = useState(false);
  const [waitconfirm, setwaitcofirm] = useState(false);

  const handleSubmit = async (e) => {
    // const cardElement=elements.getElement(CardElement)
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      let data = {
        name: 'package_1',
        desc: 'description',
      };
      let address = {
        name: 'vikas',
        address: {
          line1: '510 Townsend St',
          postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        },
      };
      try {
        const { id } = paymentMethod;
        const response = await axios.post('http://localhost:4000/payment', {
          amount: 1000,
          id,
          items: JSON.stringify(data),
        });

        console.log(response.data.client_secret, id);
        localStorage.setItem('secret key', response.data.client_secret);
        setconfirmpaymentbtn(true);
        if (response && waitconfirm) {
          console.log('Successful payment', response);
          let status = await stripe.confirmCardPayment(
            `${response.data.client_secret}`,
            {
              payment_method: {
                card: elements.getElement(CardElement),
                billing_details: address
              },
            }
          );

          console.log(status);
          setSuccess(true);
        }
      } catch (error) {
        console.log('error', error);
      }
    } else {
      console.log(error.message);
    }
  };
  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button>Pay</button>
          {confirmpaymentbtn ? (
            <button onClick={() => setwaitcofirm(true)}>confirm payment</button>
          ) : null}
        </form>
      ) : (
        <div>
          <h2>
            You just bought a sweet congrats this is the best decision of your
            life
          </h2>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
