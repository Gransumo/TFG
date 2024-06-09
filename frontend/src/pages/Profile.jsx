import React, { useState, useEffect } from 'react';
import { fetchWhoami } from '../api/users';
import { Link } from 'react-router-dom';

const Profile = ({onLogout}) => {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getUser = async () => {
			try {
				const user = await fetchWhoami();
				setUser(user);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		}
		getUser();
	}, []);

	return (
		<div className="container p-5" style={{ marginTop: "50px" }}>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #FF6600" }}>
				<h1 style={{ textAlign: "left" }}>PERFIL</h1>
			</div>
			<div className="d-flex justify-content-between align-items-center">
				<div className='container pt-3'>
					{loading ? (
						<h1>Cargando...</h1>
					) : (
						<div className='p-5'>
							<h1>¡HOLA! {user.username}</h1>
							<span className='text-secondary'>¿Preparado para quedar?</span>
							<p>Email: {user.email}</p>
						</div>
					)}
				</div>
				<div className='p-5'>
					<Link to="/" onClick={onLogout}>
						<button className="btn primary button d-flex justify-content-center align-items-center" style={{ width: "60px", height: "60px" }}><i class="fa-solid fa-right-from-bracket fa-xl"></i></button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Profile
