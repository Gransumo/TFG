import React, { useState, useEffect } from 'react'
import { fetchNotifications } from '../api/notification';
import FriendRequestNotification from '../components/FriendRequestNotification';
import EventInvitationNotification from '../components/EventInvitationNotification';
import UpdateEventNofitication from '../components/UpdateEventNofitication';

const NotificationList = () => {
	const [notifications, setNotifications] = useState([]);
	const [loading, setLoading] = useState(true);
	const [render, setRender] = useState(0);

	useEffect(() => {
		async function cargarNotificaciones() {
			try {
				const response = await fetchNotifications();
				response.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
				setNotifications(response);
				setLoading(false);
			} catch (error) {
				console.error('Error obteniendo notificaciones:', error);
			}
		}
		cargarNotificaciones();
	}, [render]);

	const handleUpdate = () => {
		setRender(render + 1);
	}

	return (
		<>
			{loading && <p>Cargando...</p>}
			{!loading && notifications.length === 0 && <p>No hay notificaciones</p>}
			{
				notifications.map((notification, index) => {
					if (notification.type === 'friendRequest') {
						return <FriendRequestNotification key={index} notification={notification} onModify={handleUpdate} />
					} else if (notification.type === 'eventInvitation') {
						return <EventInvitationNotification key={index} notification={notification} onModify={handleUpdate} />
					} else if (notification.type === 'eventUpdate') {
						return <UpdateEventNofitication key={index} notification={notification} onModify={handleUpdate} />
					}
				})
			}
		</>
	)
}

export default NotificationList;
