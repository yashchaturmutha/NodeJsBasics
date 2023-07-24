import React, { useEffect, useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';

const ApplePay = () => {
  const stripe = useStripe();
  const element = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (!stripe || !element) {
      return;
    }
    const pr = stripe.paymentRequest({
      currency: 'usd',
      country: 'US',
      requestPayerEmail: true,
      requestPayerName: true,
      total: {
        label: 'Demo Payment',
        amount: 100,
      },
    });
    pr.canMakePayment().then((result) => {
      console.log('result----------', result);
      if (result) {
        //show some button on the  page
        setPaymentRequest(pr);
      }
    });

    pr.on('paymentmethod', async (e) => {
        console.log(e,'e-----------------');
      //create payment intent on the server
      const { clientSecret } = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodType: 'card',
          currency: 'usd',
        }),
      }).then((r) => r.json());
      //confirm the payment intent on client
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: e.paymentMethod.id,
        },
        {
          handleActions: false,
        }
      );
      if (error) {
        console.log('at time of intent  create error');
        e.complete('fail');
        return;
      }

      e.complete('success');
      if (paymentIntent.status == 'requires_action') {
        stripe.confirmCardPayment(clientSecret);
        console.log('abcd');
      }
    });
  }, [stripe, element]);
  return (
    <>
      <div>ApplePay</div>
      {paymentRequest && (
        <PaymentRequestButtonElement options={{ paymentRequest }} />
      )}
    </>
  );
};

export default ApplePay;
