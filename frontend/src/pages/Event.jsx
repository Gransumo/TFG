import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { fetchEvent } from '../api/events';

export const Event = () => {
	const { eventCode } = useParams();
	const [event, setEvent] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function cargarEvento() {
			try {
				const response = await fetchEvent(eventCode);
				setEvent(response);
				setLoading(false);
			} catch (error) {
				console.error('Error obteniendo evento:', error);
				setError(error);
			}
		}
		cargarEvento();
	}, [eventCode]);
	if (loading) {
		return <div>Cargando evento...</div>;
	}
	return (
		<div>{event.name}</div>
	)
}

export default Event;
