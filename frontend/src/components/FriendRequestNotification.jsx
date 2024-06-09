import React, { useState, useEffect } from 'react'
import { fetchAcceptFriendRequest, fetchRejectFriendRequest, fetchGetUserById } from '../api/users';
import { fetchSetReadNotification } from '../api/notification';
import styled from 'styled-components';

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
			await fetchAcceptFriendRequest(notification.data.friendRequest.request_id);
			await fetchSetReadNotification(notification._id);
			onModify();
		} catch (error) {
			console.error('Error aceptando solicitud de amistad:', error);
		}
	}

	const handleReject = async () => {
		try {
			console.log(notification.data.friendRequest.request_id);
			await fetchSetReadNotification(notification._id);
			await fetchRejectFriendRequest(notification.data.friendRequest.request_id);
			onModify();
		} catch (error) {
			console.error('Error rechazando solicitud de amistad:', error);
		}
	}

	return (
		<Item className='d-flex justify-content-between align-items-center'>
			<span>SOLICITUD DE AMISTAD. {fromUser} te ha enviado una solicitud de amistad</span>
			<div className='d-flex'>
				<button onClick={handleAccept} className='btn btn-success btn-sm'><i className="fa-solid fa-check"></i></button>
				<div className="m-1"></div>
				<button onClick={handleReject} className='btn btn-danger btn-sm'><i className="fa-solid fa-x"></i></button>
			</div>
		</Item>
	)
}

const Item = styled.div`
	border-radius: 10px;
	background-color: #fff;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	border: 1px solid #ccc;
	padding: 1rem;
	margin-top: 1rem;
`;

export default FriendRequestNotification;
