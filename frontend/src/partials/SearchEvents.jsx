import React, { useState, useEffect } from "react";
import { fetchEventByCode, fetchMembers, fetchCreateMember, fetchCreateJoinRequest, fetchJoinRequests } from "../api/events";
import EventSearched from "../components/EventSearched";

const SearchEvents = () => {
	const [busqueda, setBusqueda] = useState("");
	const [event, setEvent] = useState([]);
	const [loading, setLoading] = useState(false);


	useEffect(() => {
		async function buscarEvento() {
			try {
				if (busqueda !== "") {
					const data = await fetchEventByCode(busqueda);
					setEvent(data);
				} else setEvent([]);
				setLoading(false);
			} catch (error) {
				console.error("Error buscando eventos:", error);
			}
		}

		buscarEvento();
	}, [busqueda]);

	const handleBusqueda = () => {
		setLoading(true);
		const busquedaText = document.getElementById("busqueda").value;
		if (busquedaText !== "")
			setBusqueda(busquedaText);
	}

	return (
		<div className="container">
			<div>
				<div>Buscar Eventos</div>
				<input type="text" id="busqueda" className="form-control" placeholder="Nombre de usuario" />
				<button type="submit" className="btn btn-primary" onClick={handleBusqueda}>Buscar</button>
			</div>
			<div>
				{loading && <div>Cargando eventos...</div>}
				{event.length !== 0 && <EventSearched event={event} />}
			</div>
		</div>
	);
}

export default SearchEvents;
