import React, { useState, useEffect } from 'react'
import { fetchAcceptInvitation, fetchRejectInvitation, fetchEvent } from '../api/events';
import { fetchSetReadNotification } from '../api/notification';
import styled from 'styled-components';

const EventInvitationNotification = ({ notification, onModify }) => {
	const [event, setEvent] = useState(null)

	useEffect(() => {
		async function cargarEvento() {
			try {
				const response = await fetchEvent(notification.data.event_invitation.event_id);
				console.log(response);
				setEvent(response);
			} catch (error) {
				console.error('Error obteniendo evento:', error);
			}
		}
		cargarEvento();
	}, []);

	const handleAccept = async () => {
		try {
			await fetchSetReadNotification(notification._id);
			await fetchAcceptInvitation(notification.data.event_invitation.event_id, notification.data.event_invitation.event_invitation_id);
			onModify();
		} catch (error) {
			console.error('Error aceptando invitación:', error);
		}
	}

	const handleReject = async () => {
		try {
			console.log(notification.data.event_invitation.event_id, notification.data.event_invitation.invitation_id);
			await fetchRejectInvitation(notification.data.event_invitation.event_id, notification.data.event_invitation.event_invitation_id);
			await fetchSetReadNotification(notification._id);
			onModify();
		} catch (error) {
			console.error('Error rechazando invitación:', error);
		}
	}

	return (
		<Item className='d-flex justify-content-between align-items-center'>
			<span>INVITACION. Has sido invitado al evento: {event && event.name}</span>
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

export default EventInvitationNotification;
