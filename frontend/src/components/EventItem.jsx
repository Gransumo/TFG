import React, { useState, useEffect } from "react";
import Modal from "../partials/Modal";
import { fetchMyEvents, fetchEvent, fetchExitEvent, fetchIsAdmin } from "../api/events";
import { Link } from "react-router-dom";
import styled from "styled-components";

const EventItem = ({ event, onLeave }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const [warning, setWarning] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);

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

	useEffect(() => {
		async function checkAdmin() {
			try {
				const response = await fetchIsAdmin(event.id);
				setIsAdmin(response.isAdmin);
			} catch (error) {
				console.error('Error obteniendo administrador:', error);
			}
		}
		if (event)
			checkAdmin();
	}, [event]);

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
			<Item className="border border-dark container p-2">
				<div className="container m-0 p-0">
					<Link to={`/events/${event.code}`}>
						<h3>{event.name}</h3>
					</Link>
				</div>
				{!isAdmin && (
					<ExitButton className="btn btn-danger" onClick={() => { handleModal(true) }}>
						<i className="fa-solid fa-right-from-bracket" onClick={() => { handleModal(true) }}></i>
					</ExitButton>
				)}
			</Item>
			<Modal isOpen={modalOpen} onClose={handleModal} modalTitle={'Salir de evento'}>
				{warning && <div className="alert alert-danger">{warning}</div>}
				<p>¿Estás seguro que deseas salir del evento {event.name}?</p>
				<button onClick={handlerLeave} className="btn btn-danger">Salir</button>
			</Modal>
		</>
	);
}

export default EventItem;

const ExitButton = styled.button`
	right: 0;
`;

const Item = styled.div`
	display: flex;
	justify-content: space-between;
`;