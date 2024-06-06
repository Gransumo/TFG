import React, { useEffect, useState } from "react";
import UserToRequest from "../components/UserToRequest";
import UserToInvite from "../components/UserToInvite";
import { fetchGetUser } from "../api/users";

const SearchUsers = ({ action, event }) => {
	const [users, setUsers] = useState([]);
	const [busqueda, setBusqueda] = useState('');
	const [loading, setLoading] = useState(false);

	
	useEffect(() => {
		async function buscarAmigos() {
			try {
				setLoading(true);
				if (busqueda !== '') {	
					const data = await fetchGetUser(busqueda);
					console.log(data);
					setUsers(data);
				}else
					setUsers([]);
				setLoading(false);
			} catch (error) {
				console.error("Error buscando amigos:", error);
			}
		}
		buscarAmigos();
	}, [busqueda]);
	
	const handleBusqueda = (e) => {
		setBusqueda(e.target.value);
	}

	return (
		<div className="container">
			<div>
				<div>Buscar amigos</div>
				<input type="text" className="form-control" placeholder="Nombre de usuario" value={busqueda} onChange={(e) => {handleBusqueda(e)}} />
			</div>
			<div>
				{loading && <div>Cargando amigos...</div>}
				{users.map((user) => (
					action === 'Request' ? (
						<UserToRequest key={user.id} user={user} />
					  ) : action === 'Invitation' ? (
						<UserToInvite key={user.id} user={user} event={event} />
					  ) : null
				))}
			</div>
		</div>
	)
}

export default SearchUsers;
