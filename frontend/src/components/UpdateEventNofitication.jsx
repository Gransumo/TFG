import React, { useState, useEffect } from 'react'
import { fetchEvent } from '../api/events';
import styled from 'styled-components';

export const UpdateEventNofitication = ({ notification }) => {
	const [event, setEvent] = useState(null)

	useEffect(() => {
		async function cargarEvento() {
			try {
				const response = await fetchEvent(notification.data.event_update.event_id);
				console.log(response);
				setEvent(response);
			} catch (error) {
				console.error('Error obteniendo evento:', error);
			}
		}
		cargarEvento();
	}, []);

	return (
		<Item>
			<span>
				EVENTO. Ha habido un cambio en {event && event.name}
			</span>
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

export default UpdateEventNofitication;
