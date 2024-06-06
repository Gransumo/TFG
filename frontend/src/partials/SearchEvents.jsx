import React, { useState, useEffect } from "react";
import { fetchEventByCode, fetchMembers, fetchCreateMember, fetchCreateJoinRequest, fetchJoinRequests } from "../api/events";

const SearchEvents = () => {
	const [busqueda, setBusqueda] = useState("");
	const [event, setEvent] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isMember, setIsMember] = useState(false);
	const [isRequested, setIsRequested] = useState(false);
	const [isPrivate, setIsPrivate] = useState(false);

	useEffect(() => {
		async function buscarEvento() {
			try {
				if (busqueda !== "") {
					const data = await fetchEventByCode(busqueda);
					setIsPrivate(data.private);
					setEvent(data);
				} else setEvent([]);
				setLoading(false);
			} catch (error) {
				console.error("Error buscando eventos:", error);
			}
		}

		async function checkMember() {
			try {
				if (event.length === 0) return;
				const response = await fetchMembers(event.id);
				console.log(response);
				setIsMember(true);
			} catch (error) {
				setIsMember(false);
				console.error("Error checking members:", error);
			}
		}

		async function checkRequested() {
			try {
				if (event.length === 0) return;
				if (isPrivate) return;
				const response = await fetchJoinRequests(event.id);
				setIsRequested(true);
			} catch (error) {
				setIsMember(false);
				console.error("Error checking requests:", error);
			}
		}
		
		buscarEvento();
		checkMember();
		checkRequested();
	}, [busqueda]);

	const handleBusqueda = (e) => {
		e.preventDefault();
		setLoading(true);
		const busqueda = document.getElementById("busqueda").value;
		setBusqueda(busqueda);
	}

	const handleJoinRequest = async () => {
		try {
			await fetchCreateJoinRequest(event.id);
			setIsRequested(true);
		} catch (error) {
			console.error("Error sending join request:", error);
		}
	}

	const handleJoin = async () => {
		try {
			await fetchCreateMember(event.id);
			window.location.href = '/events';
		} catch (error) {
			console.error("Error joining event:", error);
		}
	}

	return (
		<div className="container">
			<div>
				<div>Buscar Eventos</div>
				<form onSubmit={(e) => { handleBusqueda(e) }}>
					<input type="text" id="busqueda" className="form-control" placeholder="Nombre de usuario" />
					<button type="submit" className="btn btn-primary">Buscar</button>
				</form>
			</div>
			<div>
				{loading && <div>Cargando eventos...</div>}
				{event.length !== 0 && (
					<div className="container border border-dark">
					<p>{event.name}</p>

					{isMember && <i className="fa-solid fa-user-group"></i>}
					{!isMember && isPrivate && !isRequested &&  (<i className="fa-solid fa-lock"></i> && <i className="fa-solid fa-user-plus" onClick={handleJoinRequest}></i>)}
					{!isMember && !isPrivate && <i className="fa-solid fa-user-plus" onClick={handleJoin}></i>}
					{!isMember && isRequested && <i className="fa-solid fa-user-check"></i>}
				</div>)
				}
			</div>
		</div>
	);
}

export default SearchEvents;
