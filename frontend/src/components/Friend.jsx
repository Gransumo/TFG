import React, { useState } from "react";
import Modal from "../partials/Modal";


const Friend = ({ friend, onDelete }) => {
	const [modalOpen, setModalOpen] = useState(false);

	const handleDelete = () => {
		onDelete(friend.id);
	}

	const handleModal = (status) => {
		setModalOpen(status);
	}

	return (
		<>
			<div className="container border border-dark">
				<p>{friend.username}</p>
				<i className="fa-sharp fa-solid fa-user-minus" onClick={() => { handleModal(true) }}></i>
			</div>
			<Modal isOpen={modalOpen} onClose={handleModal} modalTitle={'ELIMINAR AMIGO'}>
				<p>¿Estás seguro que deseas eliminar a {friend.username} de tu lista de amigos?</p>
				<button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
			</Modal>
		</>
	)
}

export default Friend;