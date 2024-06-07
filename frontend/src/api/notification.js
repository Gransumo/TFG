import { NOTIFICACIONES } from './axiosConfig';

const fetchNotifications = async () => {
	try {
		const response = await NOTIFICACIONES.get('/notifications');
		return response.data;
	} catch (error) {
		console.error('Error en fetchNotifications:', error);
		throw error;
	}
}

const fetchSetReadNotification = async (notificationId) => {
	try {
		const response = await NOTIFICACIONES.put(`/notifications/${notificationId}`);
		return response.data;
	} catch (error) {
		console.error('Error en fetchSetReadNotification:', error);
		throw error;
	}
}

export { fetchNotifications, fetchSetReadNotification };
