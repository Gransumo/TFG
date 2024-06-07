import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { fetchEvent, fetchUpdateEvent, fetchExitEvent } from '../api/events';
import MembersList from '../partials/MembersList';
import Modal from '../partials/Modal';
import { UpdateEventForm } from '../components/UpdateEventForm';
import TaskListAsMember from '../components/TaskListAsMember';
import TaskListAsAdmin from '../components/TaskListAsAdmin';

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
	const [modalTaskList, setModalTaskList] = useState(false);

	const [warning, setWarning] = useState(null);

	useEffect(() => {
		async function cargarEvento() {
			try {
				const response = await fetchEvent(eventCode);
				console.log(response);
				setEvent(response);
				setLoading(false);
			} catch (error) {
				console.error('Error obteniendo evento:', error);
			}
		}
		cargarEvento();
	}, [eventCode]);

	const getEvent = () => {
		return event;
	}

	const handleModal = (status) => {
		setModalOpen(status);
	}

	const handleExitModal = (status) => {
		setModalExit(status);
	}

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

	const handleTaskList = (status) => {
		setModalTaskList(status);
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
			{<i className="fa-solid fa-tasks" onClick={() => { handleTaskList(true) }}></i>}
			<Modal isOpen={modalTaskList} onClose={handleTaskList} modalTitle={'TAREAS'}>
				{event.isAdmin ? (<TaskListAsAdmin event={event} />) : (<TaskListAsMember event={event} />)}
			</Modal>
			{event.isAdmin && <i className="fa-solid fa-pen-to-square" onClick={() => { handleModal(true) }}></i>}
			<i className="fa-solid fa-right-from-bracket" onClick={() => { handleExitModal(true) }}></i>
			<Modal isOpen={modalOpen} onClose={handleModal} modalTitle={'EDITAR EVENTO'}>
				<UpdateEventForm event={event} />
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
