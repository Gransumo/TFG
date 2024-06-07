import React, { useState, useEffect } from 'react'
import { fetchAcceptInvitation, fetchRejectInvitation, fetchEvent } from '../api/events';
import { fetchSetReadNotification } from '../api/notification';


const EventInvitationNotification = ({ notification, onModify }) => {
	const [event, setEvent] = useState(null)

	useEffect(() => {
		async function cargarEvento() {
			try {
				const response = await fetchEvent(notification.data.event_invitation.event_id);

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
			await fetchAcceptInvitation(notification.data.event_invitation.event_id);
			onModify();
		} catch (error) {
			console.error('Error aceptando invitación:', error);
		}
	}

	const handleReject = async () => {
		try {
			await fetchRejectInvitation(notification.data.event_invitation.event_id, notification.data.event_invitation.invitation_id);
			await fetchSetReadNotification(notification._id);
			onModify();
		} catch (error) {
			console.error('Error rechazando invitación:', error);
		}
	}

	return (
		<>
			<p>{event.name}</p>
			<button onClick={handleAccept}>Aceptar</button>
			<button onClick={handleReject}>Rechazar</button>
		</>
	)
}

export default EventInvitationNotification;
