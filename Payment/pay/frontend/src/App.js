// import React from 'react';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import AddCustomer from './components/AddCustomer';
// import AddCard from './components/AddCard';
// import {Route, BrowserRouter as Router ,Routes , route} from 'react-router-dom'
// import PaymentForm from './components/PaymentForm';
// import Addcustomerformik from './components/Addcustomerformik';

// const stripePromise = loadStripe(
//   'pk_test_51N3e2JSIOp89KyYyPL1L1NAznrvMR2PrAMMpi5akZ7sH9fDVrrJRjOVYBJT0so0RjAcg8R5xSjKr14XbSI7rexIn00ThqrNOeV'
// );

// const App = () => {
//   return (
//     <Elements stripe={stripePromise}>
//     <Router>
//       <Routes>
//       <Route path='/' element={<Addcustomerformik/>}/>
//          <Route path='/addCard' element={<AddCard  />}/>
//          <Route path='/payment' element={<PaymentForm/>}/>
//       </Routes>
//     </Router>
//     </Elements>
    
//   );
// };

// export default App;


import React from 'react'
import { BrowserRouter as Switch ,Route,Routes} from 'react-router-dom'
import List1 from './List'
import ApplePay from './ApplePay'

const App = () => {
  return (
    <>
      <a href='/'>Home</a>
      <Switch>
      <Routes>
        <Route exact path='/' element={<List1/>}/>
          
        <Route exact path='/apple-pay' element={ <ApplePay/>}/>
         
        
        </Routes>
      </Switch>
    </>
  )
}

export default App