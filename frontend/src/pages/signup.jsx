import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = ({onSignup}) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await onSignup(username, email, password);
			return;
		} catch (error) {
			setError(error);
			console.error('Error en signup: ', error);
		}
	}
	return (
		<div>
			<h1>Signup</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Username:</label>
					<input type="text" id="username" required value={username} onChange={e => setUsername(e.target.value)}/>
				</div>
				<div>
					<label htmlFor="email">Email:</label>
					<input type="email" id="email" required value={email} onChange={e => setEmail(e.target.value)}/>
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<input type="password" id="password" required value={password} onChange={e => setPassword(e.target.value)}/>
				</div>
				<button type="submit">Signup</button>
			</form>
			<Link to='/'>Ya tengo cuenta</Link>
			{error && <div>{error.message}</div>}
		</div>
	);
}

export default Signup;