import React, { useState, useEffect } from "react";
import EventItem from "../components/EventItem";
import { fetchMyEvents, fetchExitEvent } from "../api/events";
import Modal from "./Modal";
import SearchEvents from "../partials/SearchEvents";

const EventList = () => {
	const [events, setEvents] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [update, setUpdate] = useState(false);

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
	}, [update]);

	const handleModal = (status) => {
		setModalOpen(status);
	}

	const updateEvents = async (id) => {
		const newEvents = events.filter((event) => event.id !== id);
		setEvents(newEvents);
	}

	const handleUpdateEvents = async () => {
		setUpdate(!update);
	}

	return (
		<div className="container">
			<button className="btn btn-primary" onClick={() => { handleModal(true) }}>Buscar Evento</button>
			<Modal open={modalOpen} onClose={handleModal} modalTitle={'Buscar Evento'}>
				<SearchEvents />
			</Modal>
			{events.map((event) => (
				<EventItem key={event.id} event={event} onLeave={updateEvents} />
			))}
		</div>
	);
}

export default EventList;
