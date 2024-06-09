import React, { useState, useEffect } from "react";
import { fetchEventByCode } from "../api/events";
import EventSearched from "../components/EventSearched";

const SearchEvents = () => {
	const [busqueda, setBusqueda] = useState("");
	const [event, setEvent] = useState([]);


	useEffect(() => {
		async function buscarEvento() {
			try {
				if (busqueda !== "") {
					const data = await fetchEventByCode(busqueda);
					setEvent(data);
				} else setEvent([]);
			} catch (error) {
				console.error("Error buscando eventos:", error);
			}
		}

		buscarEvento();
	}, [busqueda]);

	const handleBusqueda = () => {
		const busquedaText = document.getElementById("busqueda").value;
		setBusqueda(busquedaText);
	}

	return (
		<div className="container">
			<div className='d-flex justify-content-between align-items-center'>
				<input type="text" id="busqueda" className="form-control" placeholder="Código de evento" />
				<i class="fa-solid fa-magnifying-glass m-2" onClick={handleBusqueda}></i>
			</div>
			<div>
				{event.length !== 0 && <EventSearched event={event} />}
			</div>
		</div>
	);
}

export default SearchEvents;
