import React,{useState} from 'react';
import StripeContainer from './Components/StripeContainer';
import im1 from "../src/assets/im1.jpeg"

function App() {
  const [showItem,setShowItem]=useState(false)
  return (
    <div className="App">
    <h1>The Spatula Store</h1>
    {showItem ? <StripeContainer/>:<> <h3>$10.00</h3> <img src={im1} alt="sp" height={100} /> <button onClick={()=>setShowItem(true)}>Purchase</button></>}
    </div>
  );
}

export default App;
