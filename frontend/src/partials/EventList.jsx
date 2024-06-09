import React, { useState, useEffect } from "react";
import EventItem from "../components/EventItem";
import { fetchMyEvents } from "../api/events";
import { Row } from "react-bootstrap";

const EventList = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		async function cargarEventos() {
			try {
				const response = await fetchMyEvents();
				console.log(response);
				setEvents(response);
			} catch (error) {
				console.error("Error obteniendo eventos:", error);
			}
		}
		cargarEventos();
	}, []);

	return (
		<div className="container p-3">
			<Row>
				{events.map((event) => (
					<EventItem key={event.id} event={event} />
				))}
			</Row>
		</div>
	);
}

export default EventList;
