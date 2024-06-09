import React, { useState, useEffect } from "react";
import { fetchCreateEvent } from "../api/events";
import '../styles/general.css';

const CreateEvent = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [location, setLocation] = useState("");
	const [private_value, setPrivate] = useState(false);

	const handleCreate = async (e) => {
		e.preventDefault();
		try {
			await fetchCreateEvent({ name, description, date, location, private: private_value });
			window.location.href = "/events";
		} catch (error) {
			console.error("Error creating event:", error);
		}
	}

	return (
		<div className="d-flex justify-content-center align-items-center h-100">
			<div className="col-6">
				<div>
					<a href="/events" style={{ width: "40px", height: "40px" }} className="btn primary button d-flex justify-content-center align-items-center">
						<i class="fa-solid fa-arrow-left fa-xl" ></i>
					</a>
				</div>
				<div className="d-flex justify-content-center" style={{ borderBottom: "2px solid #FF6600" }}>
					<h1>CREAR EVENTO</h1>
				</div>
				<form onSubmit={handleCreate}>
					<div className="form-group mt-3">
						<input type="text" name="name" id="name" className="form-control" placeholder="Nombre del evento" onChange={(e) => setName(e.target.value)} required />
					</div>
					<div className="form-group  mt-3">
						<textarea name="description" id="description" className="form-control" placeholder="Descripción del evento" onChange={(e) => setDescription(e.target.value)} required></textarea>
					</div>
					<div className="form-group mt-3">
						<input type="date" name="date" id="date" className="form-control" onChange={(e) => setDate(e.target.value)} />
					</div>
					<div className="form-group mt-3">
						<input type="text" name="location" id="location" className="form-control" placeholder="Ubicación del evento" onChange={(e) => setLocation(e.target.value)} />
					</div>
					<div className="form-group mt-3">
						<div className="form-check form-switch">
							<label className="form-check-label" htmlFor="private">Private</label>
							<input className="form-check-input" type="checkbox" role="switch" id="private" onChange={(e) => setPrivate(e.target.checked)} />
						</div>
					</div>
					<button className="btn btn-primary mt-2 form-control" type='submit'>Crear</button>
				</form>
			</div>
		</div>
	);
}

export default CreateEvent;
