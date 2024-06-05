import React, { useState, useEffect } from "react";
import Modal from "../partials/Modal";
import { fetchMyEvents, fetchEvent, fetchExitEvent } from "../api/events";
import { Link } from "react-router-dom";

const EventItem = ({ event, onLeave }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [warning, setWarning] = useState(null);

	const salirEvento = async (id) => {
		try {
			const response = await fetchExitEvent(id);
			onLeave(id);
		} catch (error) {
			const jsonError = JSON.parse(error.request.response);
			console.error("Error saliendo del evento:", error);
			if (error.request.status === 403) {
				setWarning(jsonError.error)
			}
		}
	}

	const handlerLeave = () => {
		salirEvento(event.id);
	}

	const handleModal = (status) => {
		if (status === false) {
			setWarning(null);
		}
		setModalOpen(status);
	}

	return (
		<>
			<Link to={`/events/${event.code}`}>
				<div className="border border-dark container p-2">
					<h3>{event.name}</h3>
					<button className="btn btn-danger" onClick={() => { handleModal(true) }}>
						<i className="fa-solid fa-right-from-bracket"></i>
					</button>
				</div>
			</Link>
			<Modal isOpen={modalOpen} onClose={handleModal} modalTitle={'Salir de evento'}>
				{warning && <div className="alert alert-danger">{warning}</div>}
				<p>¿Estás seguro que deseas salir del evento {event.name}?</p>
				<button onClick={handlerLeave} className="btn btn-danger">Salir</button>
			</Modal>
		</>
	);
}

export default EventItem;
