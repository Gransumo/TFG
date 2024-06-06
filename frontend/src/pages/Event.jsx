import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { fetchEvent, fetchIsAdmin, fetchUpdateEvent, fetchExitEvent } from '../api/events';
import MembersList from '../partials/MembersList';
import Modal from '../partials/Modal';

function formatDate(dateString) {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(date);
}

export const Event = () => {
	const { eventCode } = useParams();
	const [event, setEvent] = useState(null);
	const [loading, setLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalExit, setModalExit] = useState(false);
	const [warning, setWarning] = useState(null);

	const getEvent = () => {
		return event;
	}

	const handleModal = (status) => {
		setModalOpen(status);
	}

	const handleExitModal = (status) => {
		setModalExit(status);
	}

	const handleEdit = (e) => {
		e.preventDefault();
		const name = document.getElementById('name').value;
		const description = document.getElementById('description').value;
		const date = document.getElementById('date').value;
		const location = document.getElementById('location').value;
		const private_value = document.getElementById('private').checked;
		const newEvent = {
			name,
			description,
			date,
			location,
			private: private_value
		}
		fetchUpdateEvent(event.id, newEvent);
		handleModal(false);
		window.location.reload();
	}

	useEffect(() => {

		async function cargarEvento() {
			try {
				const response = await fetchEvent(eventCode);
				setEvent(response);
				setLoading(false);
			} catch (error) {
				console.error('Error obteniendo evento:', error);
			}
		}
		cargarEvento();
	}, [eventCode]);

	useEffect(() => {
		async function checkAdmin() {
			try {
				const response = await fetchIsAdmin(event.id);
				setEvent({
					...event,
					admin: response.isAdmin
				});
			} catch (error) {
				console.error('Error obteniendo administrador:', error);
			}
		}
		if (event)
			checkAdmin();
	}, []);

	const salirEvento = async (id) => {
		try {
			const response = await fetchExitEvent(id);
			window.location.href = '/events';
		} catch (error) {
			const jsonError = JSON.parse(error.request.response);
			console.error("Error saliendo del evento:", error);
			if (error.request.status === 403) {
				setWarning(jsonError.error)
			}
		}
	}

	if (loading) {
		return <div>Cargando evento...</div>;
	}
	return (
		<>
			<div>
				<h1>{event.name}</h1>
				<h3>{event.code}</h3>
			</div>
			<h2>Descripción:</h2>
			<p>{event.description}</p>
			<h2>Fecha</h2>
			<p>{(event.date) ? formatDate(event.date) : 'No definida'}</p>
			<h2>Ubicacion</h2>
			<p>{(event.location) ? event.location : 'No definida'}</p>
			{event.admin && <i className="fa-solid fa-pen-to-square" onClick={() => { handleModal(true) }}></i>}
			<i className="fa-solid fa-right-from-bracket" onClick={() => { handleExitModal(true) }}></i>
			<Modal isOpen={modalOpen} onClose={handleModal} modalTitle={'EDITAR EVENTO'}>
				<form onSubmit={handleEdit} style={{ width: '500px' }}>
					<div className="form-group">
						<label htmlFor="name">Nombre</label>
						<input type="text" name="name" id="name" className="form-control" placeholder="Nombre del evento" defaultValue={event.name} />
					</div>
					<div className="form-group">
						<label htmlFor="description">Descripción</label>
						<textarea name="description" id="description" className="form-control" placeholder="Descripción del evento" defaultValue={event.description}></textarea>
					</div>
					<div className="form-group">
						<label htmlFor="date">Fecha</label>
						<input type="date" name="date" id="date" defaultValue={event.date} className="form-control" />
					</div>
					<div className="form-group">
						<label htmlFor="location">Ubicación</label>
						<input type="text" name="location" id="location" className="form-control" defaultValue={event.location} placeholder="Ubicación del evento" />
					</div>
					<div className="form-group">
						<div className="form-check form-switch">
							<label className="form-check-label" htmlFor="private">Private</label>
							<input className="form-check-input" type="checkbox" role="switch" id="private" defaultChecked={event.private} />
						</div>
					</div>
					<button className="btn btn-primary mt-2 form-control" type='submit'>Editar</button>
				</form>
			</Modal>
			<Modal isOpen={modalExit} onClose={ handleExitModal} modalTitle={'Salir de evento'}>
				{warning && <div className="alert alert-danger">{warning}</div>}
				<p>¿Estás seguro que deseas salir del evento {event.name}?</p>
				<button onClick={() => { salirEvento(event.id) }} className="btn btn-danger">Salir</button>
			</Modal>
			<MembersList getEvent={getEvent} />
		</>
	)
}

export default Event;
