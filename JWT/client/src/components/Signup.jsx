import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import styles from "./styles.module.css";

const Signup = () => {

	const navigate = useNavigate();

	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	
	const [error, setError] = useState("");

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// const {firstName,lastName,email,password}=data;

		const res= await fetch('/register', {

			method: "POST",
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(data)
		});

			const data=res.json();

			if(res.status === 400 || res.status===409 || !data)
			{
			window.alert("Invalid Registeration");
			console.log("Invalid Registeration");
			setError("Invalid Registeration");
			}
			else
			{
				window.alert("User created successfully");
				console.log("User created successfully");
				navigate("/login");
			}		
			
	};

	return (
		<div >
			{/* <div className={styles.signup_form_container}> */}

				{/* <div className={styles.left}> */}

					<Link to="/login">
						<button type="button" >
							Sign in
						</button>
					</Link>
				{/* </div> */}
				
				{/* <div className={styles.right}> */}

					<form method='POST' onSubmit={handleSubmit}>
					
						<h1>Create Account</h1>
					
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							// className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							// className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							// className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							// className={styles.input}
						/>
						
						{error && <div >{error}</div>}

						<button type="submit" >
							Sign Up
						</button>

					</form>
				{/* </div> */}
			{/* </div> */}
		</div>
	);
};

export default Signup;