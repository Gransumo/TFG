import React, { useState, useEffect } from "react";
import EventItem from "../components/EventItem";
import { fetchMyEvents, fetchExitEvent } from "../api/events";

const EventList = () => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function cargarEventos() {
			try {
				const response = await fetchMyEvents();
				console.log(response);
				setEvents(response);
				setLoading(false);
			} catch (error) {
				console.error("Error obteniendo eventos:", error);
			}
		}
		cargarEventos();
	}, []);

	const updateEvents = async (id) => {
		const newEvents = events.filter((event) => event.id !== id);
		setEvents(newEvents);
	}

	return (
		<div className="container">
			{events.map((event) => (
				<EventItem key={event.id} event={event} onLeave={updateEvents} />
			))}
		</div>
	);
}

export default EventList;
