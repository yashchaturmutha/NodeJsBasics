import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const root = ReactDOM.createRoot(document.getElementById('root'));
const stripePromise=loadStripe('pk_live_51N3dwZSJ2jhyyeEICSKsZuAgmybw4SLuIulruTfptSqBKdEoaSCVsxdbWuKm5ag7TIWl6Og96toeMXXSY6WsbHwH00m232oSVr')
root.render(
  <Elements stripe={stripePromise}>

    <App />
  </Elements>
 
);


