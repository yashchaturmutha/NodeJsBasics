import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const stripePromise = loadStripe('pk_test_51N3e2JSIOp89KyYyPL1L1NAznrvMR2PrAMMpi5akZ7sH9fDVrrJRjOVYBJT0so0RjAcg8R5xSjKr14XbSI7rexIn00ThqrNOeV');

const AddCustomer = () => {
    const navigate=useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [line1,setline1]=useState('');
  const [city,setcity]=useState('')
  const[state1, setstate1]=useState('')
  const[pcode,setpcode]=useState('')
  const [country,setcountry]=useState('')



  const handleSubmit = async (event) => {
    event.preventDefault();

    const stripe = await stripePromise;


    axios.post('http://localhost:3000/create-customer', {
       
          name,
          email,
          line1,
          city,
          state1,
          pcode,
          country       
      }).then((res)=>{
        console.log("res",res);
        navigate("/addCard")
      })

   
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
       <input
        type="text"
        value={line1}
        onChange={(e) => setline1(e.target.value)}
        placeholder="line1"
      /> <input
        type="text"
        value={city}
        onChange={(e) => setcity(e.target.value)}
        placeholder="city"
      /> <input
        type="text"
        value={state1}
        onChange={(e) => setstate1(e.target.value)}
        placeholder="state1"
      /> <input
        type="text"
        value={pcode}
        onChange={(e) => setpcode(e.target.value)}
        placeholder="pcode"
      /> <input
        type="text"
        value={country}
        onChange={(e) => setcountry(e.target.value)}
        placeholder="country"
      />
      <button type="submit">Add Customer</button>
    </form>
  );
};

export default AddCustomer;
