import React, { useState } from 'react';
import FriendList from '../partials/FriendList';
import Modal from '../partials/Modal';
import SearchUsers from '../partials/SearchUsers';

const Friends = () => {
	const [modalOpen, setModalOpen] = useState(false);

	const handleModal = (status) => {
		setModalOpen(status);
	}
	return (
		<>
			<div>AMIGOS</div>
			<div>
				<button className='btn btn-success' onClick={() => { handleModal(true) }}><i className="fa-solid fa-plus"></i>AGREGAR AMIGO</button>
			</div>
			<Modal isOpen={modalOpen} onClose={handleModal} modalTitle={'AGREGAR AMIGO'}>
				<SearchUsers action={'Request'} />
			</Modal>
			<div>LISTA DE AMIGOS</div>
			<FriendList />
		</>
	);
}

export default Friends
