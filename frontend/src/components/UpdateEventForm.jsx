import React from 'react'
import { fetchUpdateEvent } from '../api/events';

export const UpdateEventForm = ({ event }) => {

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
		window.location.reload();
	}

	return (
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
	)
}

export default UpdateEventForm;
