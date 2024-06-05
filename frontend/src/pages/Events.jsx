import React, { useState } from "react";
import Modal from '../partials/Modal';
import SearchEvents from '../partials/SearchEvents';
import EventList from '../partials/EventList';
import { Link } from 'react-router-dom';


const Events = () => {
	const [modalOpen, setModalOpen] = useState(false);

	const handleModal = (status) => {
		setModalOpen(status);
	}

	return (
		<div className="container">
			<div>EVENTOS</div>
			<div>
				<Link to={'/create-event'} className="btn btn-success"><i className="fa-solid fa-plus"></i>CREAR EVENTO</Link>
			</div>
			<div>
				<button className='btn border border-dark' onClick={() => {handleModal(true)}}><i className="fa-solid fa-magnifying-glass"></i>BUSCAR EVENTO</button>
			</div>
			<Modal isOpen={modalOpen} onClose={handleModal} modalTitle={'BUSCAR EVENTO'}>
				<SearchEvents />
			</Modal>
			<div>LISTA DE EVENTOS</div>
			<EventList />
		</div>
	);
}

export default Events
