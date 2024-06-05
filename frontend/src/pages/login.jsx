import React from "react";
import { useState } from "react";
import { getToken } from "../utils/token";
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		if (getToken()) {
			return;
		}
		e.preventDefault();
		try {
			await onLogin(username, password);
			return;
		} catch (error) {
			setError(error);
		}
	}
	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Username:</label>
					<input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} />
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
				</div>
				<button type="submit">Login</button>
			</form>
			<Link to='/signup'>Registrarse</Link>
			{error && <div>{error.message}</div>}
		</div>
	);
}

export default Login;

