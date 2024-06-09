import React, { useState } from "react";
import Modal from "../partials/Modal";
import styled from 'styled-components';

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
			<Item>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<span>{friend.username}</span>
					<i className="fa-sharp fa-solid fa-user-minus" onClick={() => { handleModal(true) }}></i>
				</div>
			</Item>
			<Modal isOpen={modalOpen} onClose={handleModal} modalTitle={'ELIMINAR AMIGO'}>
				<p>¿Estás seguro que deseas eliminar a {friend.username} de tu lista de amigos?</p>
				<button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
			</Modal>
		</>
	)
}

const Item = styled.div`
		border-radius: 10px;
		background-color: #fff;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		border: 1px solid #ccc;
		padding: 1rem;
		margin-top: 1rem;
	`;

export default Friend;