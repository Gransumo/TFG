import React, { useState, useEffect } from "react";
import { fetchCreateEvent } from "../api/events";
const CreateEvent = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [location, setLocation] = useState("");
	const [private_value, setPrivate] = useState(false);

	const handleCreate = async (e) => {
		e.preventDefault();
		try {
			await fetchCreateEvent({name, description, date, location, private: private_value});
			window.location.href = "/events";
		} catch (error) {
			console.error("Error creating event:", error);
		}
	}

	return (
		<form onSubmit={handleCreate} style={{ width: '500px' }}>
			<div className="form-group">
				<label htmlFor="name">Nombre</label>
				<input type="text" name="name" id="name" className="form-control" placeholder="Nombre del evento" onChange={(e) => setName(e.target.value)} />
			</div>
			<div className="form-group">
				<label htmlFor="description">Descripción</label>
				<textarea name="description" id="description" className="form-control" placeholder="Descripción del evento" onChange={(e) => setDescription(e.target.value)}></textarea>
			</div>
			<div className="form-group">
				<label htmlFor="date">Fecha</label>
				<input type="date" name="date" id="date" className="form-control" onChange={(e) => setDate(e.target.value)} />
			</div>
			<div className="form-group">
				<label htmlFor="location">Ubicación</label>
				<input type="text" name="location" id="location" className="form-control" placeholder="Ubicación del evento" onChange={(e) => setLocation(e.target.value)} />
			</div>
			<div className="form-group">
				<div className="form-check form-switch">
					<label className="form-check-label" htmlFor="private">Private</label>
					<input className="form-check-input" type="checkbox" role="switch" id="private" onChange={(e) => setPrivate(e.target.checked)} />
				</div>
			</div>
			<button className="btn btn-primary mt-2 form-control" type='submit'>Crear</button>
		</form>
	);
}

export default CreateEvent;
