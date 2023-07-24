import React from 'react'
import {Elements} from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from './PaymentForm'


const PUBLIC_KEY = "pk_test_51N3e2JSIOp89KyYyPL1L1NAznrvMR2PrAMMpi5akZ7sH9fDVrrJRjOVYBJT0so0RjAcg8R5xSjKr14XbSI7rexIn00ThqrNOeV"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
        <PaymentForm/>
    </Elements>
  )
}

export default StripeContainer