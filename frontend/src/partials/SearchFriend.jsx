import React, { useEffect, useState } from "react";
import User from "../components/User";
import { fetchGetUser } from "../api/users";

const SearchFriend = () => {
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
					<User key={user.id} user={user} />
				))}
			</div>
		</div>
	)
}

export default SearchFriend;
