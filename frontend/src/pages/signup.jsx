import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Signup = ({ onSignup }) => {
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
		<Background>
			<FormBox className="col-md-6 col-ms-3">
				<BoxTitle><h3>Signup</h3></BoxTitle>
				<form onSubmit={handleSubmit}>
					<div>
						<FormInput type="text" id="username" placeholder="Usuario" required value={username} onChange={e => setUsername(e.target.value)} />
					</div>
					<div>
						<FormInput type="email" id="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
					</div>
					<div>
						<FormInput type="password" id="password" placeholder="Contraseña" required value={password} onChange={e => setPassword(e.target.value)} />
					</div>
					<FormSubmit type="submit">Signup</FormSubmit>
				</form>
				<div className="d-flex justify-content-end p-2">
					<Link to='/' style={{color: '#FF6600'}}>Ya tengo cuenta</Link>
				</div>
				{error && <div>{error.message}</div>}
			</FormBox>
		</Background>
	);
}

export default Signup;


const Background = styled.div`
	background: linear-gradient(to right, #FF6600 50%, #fff 50%);
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const FormBox = styled.div`
	background: white;
	padding: 20px;
	border-radius: 8px;
	min-width: 300px;
	max-height: 90vh;
	overflow-y: auto;
	position: relative;
	border-radius: 5px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
	padding: 20px;
`;

const BoxTitle = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 20px;
	padding-bottom:10px;
	border-bottom: 1px solid #FF6600;
	h3 {
		font-weight: bold;
		font-size: 20px;
		color:1766DC;
	}
`;

const FormInput = styled.input`
	margin-bottom: 10px;
	padding: 10px;
	width: 100%;
	border: 1px solid #FF6600;
	border-radius: 5px;
`;

const FormSubmit = styled.button`
	background: #FF6600;
	color: white;
	padding: 10px;
	width: 100%;
	border: none;
	border-radius: 5px;
	cursor: pointer;
`;

