import { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";


// import styles from "./styles.module.css";

const Login = () => {

	const navigate=useNavigate();

	const [data, setData] = useState({ email: "", password: "" });
	// const [error, setError] = useState("");

	// const handleChange = (e) => {
	// 	// console.log("===============",...data, e.target.value);
	// 	let check ={...data, [e.target.name]: e.target.value} 
	// 	console.log(check)

	//    setData(check);
	// };

console.log(data);

const handleSubmit = async (e) => {
	e.preventDefault()
	console.log( "=======", data);

	        // const {email,password}=data;
	
			const res= await fetch('/login', {
	
				method: "POST",
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify( data)
			});
	
				const data1=res.json();
	
				if(res.status === 400 || res.status===401 || !data1)
				{
				window.alert("Invalid Login");
				console.log("Invalid Login");
				// setError("Invalid Login");
				}
				else
				{
					window.alert("User Login successful");
					console.log("User Login successful");
					navigate("/");
				}		
	
}

	// const handleSubmit = async (e) => {
	// 	console.log(e);
		
    //     e.preventDefault();
	// 	console.log("============", data)

    //     const {email,password}=data;
	
	// 		const res= await fetch('/login', {
	
	// 			method: "POST",
	// 			headers: {
	// 				'Content-type': 'application/json'
	// 			},
	// 			body: JSON.stringify({
	// 				email,
	// 				password})
	// 		});
	
	// 			const data=res.json();
	
	// 			if(res.status === 400 || res.status===401 || !data)
	// 			{
	// 			window.alert("Invalid Login");
	// 			console.log("Invalid Login");
	// 			// setError("Invalid Login");
	// 			}
	// 			else
	// 			{
	// 				window.alert("User Login successful");
	// 				console.log("User Login successful");
	// 				navigate("/");
	// 			}		
	// };

	return (
		<div >
			 {/* <div className={styles.login_form_container}> */}
				 {/* <div className={styles.left}> */}
					<form onSubmit={handleSubmit} method='POST'>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={(e)=>setData({...data, [e.target.name]: e.target.value})}
							value={data.email}
							// required
							// className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={(e)=>setData({...data, [e.target.name]: e.target.value})}
							value={data.password}
							// required
							// className={styles.input}
						/>

						{/* {error && <div>{error}</div>} */}
						
                        <button type="submit" >
							Sign In
						</button>
					</form>
				 {/* </div> */}

				<div >
					<h1>New Here ?</h1>
					<Link to="/register">
						<button type="button" >
							Sign Up
						</button>
					</Link>
				</div>
			 {/* </div> */}
		</div>
	);
};

export default Login;