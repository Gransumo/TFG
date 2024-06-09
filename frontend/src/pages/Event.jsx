import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { fetchEventByCode, fetchExitEvent, fetchDeleteEvent } from '../api/events';
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

	useEffect(() => {
		async function cargarEvento() {
			try {
				const response = await fetchEventByCode(eventCode);
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
			await fetchExitEvent(id);
			window.location.href = '/events';
		} catch (error) {
			console.error("Error saliendo del evento:", error);
		}
	}

	const deleteEvent = async () => {
		try {
			await fetchDeleteEvent(event.id);
			window.location.href = '/events';
		} catch (error) {
			console.error("Error eliminando evento:", error);
		}
	}

	const handleTaskList = (status) => {
		setModalTaskList(status);
	}

	if (loading) {
		return <div>Cargando evento...</div>;
	}
	return (
		<div className="container p-5" style={{ marginTop: "50px" }}>
			<div style={{ borderBottom: "2px solid #FF6600" }}>
				<h1 className='text-center'>{event.name}</h1>
				<h4 className='text-end '><span style={{ color: "gray" }}>{event.code}</span></h4>
			</div>
			<div className="text-end">
				{event.isAdmin && <i className="fa-solid fa-pen-to-square m-2" onClick={() => { handleModal(true) }} style={{ fontSize: "1.5rem" }}></i>}
				{event.isAdmin ? (
					<i className="fa-solid fa-trash m-2" onClick={() => { handleExitModal(true) }} style={{ fontSize: "1.5rem" }}></i>
				) : (
					<i className="fa-solid fa-right-from-bracket m-2" onClick={() => { handleExitModal(true) }} style={{ fontSize: "1.5rem" }}></i>
				)}
				<i className="fa-solid fa-tasks m-2" onClick={() => { handleTaskList(true) }} style={{ fontSize: "1.5rem" }}></i>
			</div>

			<div className="row mt-4">
				<div className="col-sm-12 col-md-6">
					<h2 className="event-section">Fecha</h2>
					<p>{event.date ? formatDate(event.date) : 'No definida'}</p>
				</div>
				<div className="col-sm-12 col-md-6">
					<h2 className="event-section">Ubicacion</h2>
					<p>{event.location ? event.location : 'No definida'}</p>
				</div>
			</div>
			<h2 className="event-section">Descripción:</h2>
			<p>{event.description}</p>
			<Modal isOpen={modalTaskList} onClose={handleTaskList} modalTitle={'TAREAS'} >
				{event.isAdmin ? <TaskListAsAdmin event={event} /> : <TaskListAsMember event={event} />}
			</Modal>

			<Modal isOpen={modalOpen} onClose={handleModal} modalTitle={'EDITAR EVENTO'}>
				<UpdateEventForm event={event} />
			</Modal>
			<Modal isOpen={modalExit} onClose={handleExitModal} modalTitle={'Salir de evento'}>
				{event.isAdmin ? (
					<div>
						<p>¿Estás seguro de querer eliminar este evento? Se borrarán todos los registros del evento</p>
						<button onClick={deleteEvent} className="btn btn-danger">Eliminar</button>
					</div>
				) : (
					<div>
						<p>¿Estás seguro que deseas salir del evento {event.name}?</p>
						<button onClick={() => { salirEvento(event.id) }} className="btn btn-danger">Salir</button>
					</div>
				)}
			</Modal>
			<div>
				<MembersList getEvent={getEvent} />
			</div>
		</div>
	)
}

export default Event;
