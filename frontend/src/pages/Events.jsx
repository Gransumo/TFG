import React, { useState } from "react";
import Modal from '../partials/Modal';
import SearchEvents from '../partials/SearchEvents';
import EventList from '../partials/EventList';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Events = () => {
	const [modalOpen, setModalOpen] = useState(false);

	const handleModal = (status) => {
		setModalOpen(status);
	}

	return (
		<div className="container p-5" style={{ marginTop: "50px" }}>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #FF6600" }}>
				<h1 style={{ textAlign: "left" }}>MIS EVENTOS</h1>
				<div className="d-flex">
					<Link to={'/create-event'}>
						<Button className="d-flex align-items-center btn-success" variant="primary" size="sm">
							<i className="fa-solid fa-plus p-2"></i>
							<span className="d-none d-md-inline" style={{ marginLeft: "10px" }}>CREAR EVENTO</span>
						</Button>
					</Link>
					<span style={{ marginLeft: "10px" }}></span>
					<Button className="d-flex align-items-center btn" variant="primary" size="sm" onClick={() => { handleModal(true) }}>
						<i className="fa-solid fa-magnifying-glass p-2"></i>
						<span className="d-none d-md-inline" style={{ marginLeft: "10px" }}>BUSCAR EVENTO</span>
					</Button>
				</div>
			</div>
			<Modal isOpen={modalOpen} onClose={handleModal} modalTitle={'BUSCAR EVENTO'}>
				<SearchEvents />
			</Modal>
			<EventList />
		</div>
	);
}

export default Events
