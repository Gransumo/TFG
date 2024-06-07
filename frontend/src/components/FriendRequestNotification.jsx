import React, { useState, useEffect } from 'react'
import { fetchAcceptFriendRequest, fetchRejectFriendRequest, fetchGetUserById } from '../api/users';
import { fetchSetReadNotification } from '../api/notification';

const FriendRequestNotification = ({ notification, onModify }) => {
	const [fromUser, setFromUser] = useState(null);

	useEffect(() => {
		async function cargarUsuario() {
			try {
				const response = await fetchGetUserById(notification.data.friendRequest.from_user_id);
				setFromUser(response.username);
			} catch (error) {
				console.error('Error obteniendo usuario:', error);
			}
		}
		cargarUsuario();
	}, []);

	const handleAccept = async () => {
		try {
			await fetchSetReadNotification(notification._id);
			await fetchAcceptFriendRequest(notification.data.friendRequest.request_id);
			onModify();
		} catch (error) {
			console.error('Error aceptando solicitud de amistad:', error);
		}
	}

	const handleReject = async () => {
		try {
			await fetchSetReadNotification(notification._id);
			await fetchRejectFriendRequest(notification.data.friendRequest.request_id);
			onModify();
		} catch (error) {
			console.error('Error rechazando solicitud de amistad:', error);
		}
	}

	return (
		<>
			<p>{fromUser} te ha enviado una solicitud de amistad</p>
			<button onClick={handleAccept}>Aceptar</button>
			<button onClick={handleReject}>Rechazar</button>
		</>
	)
}

export default FriendRequestNotification;
