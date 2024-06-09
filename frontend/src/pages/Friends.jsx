import React, { useState } from 'react';
import FriendList from '../partials/FriendList';
import Modal from '../partials/Modal';
import SearchUsers from '../partials/SearchUsers';
import { Button } from 'react-bootstrap';

const Friends = () => {
	const [modalOpen, setModalOpen] = useState(false);

	const handleModal = (status) => {
		setModalOpen(status);
	}
	return (
		<div className="container p-5" style={{ marginTop: "50px" }}>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #FF6600" }}>
				<h1>AMIGOS</h1>
				<div>
					<Button className='btn btn-success' onClick={() => { handleModal(true) }}>
						<i className="fa-solid fa-plus"></i>
						<span className="d-none d-md-inline" style={{ marginLeft: "10px" }}>AÑADIR AMIGO</span>
					</Button>
				</div>
			</div>
			<Modal isOpen={modalOpen} onClose={handleModal} modalTitle={'AGREGAR AMIGO'}>
				<SearchUsers action={'Request'} />
			</Modal>
			<FriendList />
		</div>
	);
}

export default Friends
