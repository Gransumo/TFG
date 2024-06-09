import React, { useEffect, useState } from "react";
import Friend from "../components/Friend";
import { fetchFriendList, fetchDeleteFriend } from "../api/users";

const FriendList = () => {
	const [friends, setFriends] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function cargarAmigos() {
			try {
				const response = await fetchFriendList();
				console.log(response);
				setFriends(response.friends);
				setLoading(false);
			} catch (error) {
				console.error("Error obteniendo amigos:", error);
			}
		}
		cargarAmigos();
	}, []);

	const deleteFriend = async (id) => {
		try {
			const response = await fetchDeleteFriend(id);
			console.log(response);
			const newFriends = friends.filter((friend) => friend.id !== id);
			setFriends(newFriends);
		} catch (error) {
			console.error("Error eliminando amigo:", error);
		}
	}

	if (loading) {
		return <div>Cargando amigos...</div>;
	}
	return (
		<div className="container p-3">
			{friends.map((friend) => (
				<Friend key={friend.id} friend={friend} onDelete={deleteFriend}/>
			))}
		</div>
	)
}

export default FriendList ;
