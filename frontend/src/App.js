import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { setToken, getToken } from './utils/token';

import { fetchLogin, fetchWhoami, fetchSignup } from "./api/users";
import { initInterceptors } from './api/axiosConfig';

import Login from './pages/login';
import Signup from './pages/signup';
import Layout from './pages/Layout';
import LoadingScreen from './components/LoadingScreen';
import Events from './pages/Events'
import Friends from './pages/Friends';
import Profile from './pages/Profile';
import Inbox from './pages/Inbox';
import CreateEvent from './pages/CreateEvent';
import Event from './pages/Event';


initInterceptors();

function App() {
	const [user, setUser] = useState(null);
	const [cargandoUsuario, setCargandoUsuario] = useState(true);

	useEffect(() => {
		async function cargarUsuario() {
			if (!getToken()) {
				setCargandoUsuario(false);
				return;
			}
			try {
				const user = await fetchWhoami();
				setUser(user);
				setCargandoUsuario(false);
			} catch (error) {
				console.error('Error obteniendo usuario:', error);
			}
		}
		cargarUsuario();
	}, []);

	const login = async (username, password) => {
		try {
			const data  = await fetchLogin(username, password);
			setToken(data.token);
			setUser(data.usuario);
		} catch (error) {
			console.error('Error en login: ', error);
		}
	}

	const signUp = async (username, email, password) => {
		try {
			await fetchSignup(username, email, password);
			window.location.href = '/';
		} catch (error) {
			console.error('Error en signup: ', error);
		}
	}

	if (cargandoUsuario) 
		return (<LoadingScreen />);
	return (
		<div>
			<Routes>
				<Route path="/" element={user ? <Layout user={user} /> : <Login onLogin={login} />} >
					<Route path='events' element={<Events />} />
					<Route path='events/:eventCode' element={<Event />} />
					<Route path='friends' element={<Friends />} />
					<Route path='profile' element={<Profile />} />
					<Route path='inbox' element={<Inbox />} />
					<Route path='create-event' element={<CreateEvent />} />
					<Route path='*' element={<h1>Not Found</h1>} />
					
				</Route>
				<Route path="/signup" element={<Signup onSignup={signUp}/>} />
			</Routes>
		</div>
	);
}

export default App;
