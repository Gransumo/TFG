import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { fetchEvent, fetchIsAdmin, fetchUpdateEvent } from '../api/events';
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
	const [isAdmin, setIsAdmin] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);

	const getEvent = () => {
		return event;
	}

	const handleModal = (status) => {
		setModalOpen(status);
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
				setIsAdmin(response.isAdmin);
			} catch (error) {
				console.error('Error obteniendo administrador:', error);
			}
		}
		if (event)
			checkAdmin();
	}, [event]);

	const handlePrivate = () => {
		const private_value = document.getElementById('private');
		private_value.checked = !private_value.checked;
	}

	if (loading) {
		return <div>Cargando evento...</div>;
	}
	return (
		<>
			<div>
				<h1>{event.name}</h1>
			</div>
			<h2>Descripción:</h2>
			<p>{event.description}</p>
			<h2>Fecha</h2>
			<p>{(event.date) ? formatDate(event.date) : 'No definida'}</p>
			<h2>Ubicacion</h2>
			<p>{(event.location) ? event.location : 'No definida'}</p>
			{isAdmin && <i className="fa-solid fa-pen-to-square" onClick={() => { handleModal(true) }}></i>}
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
			<MembersList getEvent={getEvent} isAdmin={isAdmin} />
		</>
	)
}

export default Event;
