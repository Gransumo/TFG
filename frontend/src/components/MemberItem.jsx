import React, { useState } from 'react'
import Modal from '../partials/Modal';
import styled from 'styled-components';

export const MemberItem = ({ member, getEvent, onDelete }) => {
	const [modalOpen, setModalOpen] = useState(false);

	const handleModal = (status) => {
		setModalOpen(status);
	}

	const handleDelete = async () => {
		onDelete(member.id);
	}
	return (
		<>
			<Item className="border border-dark container p-2">
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<h3 style={{ marginRight: '1rem' }}>{member.username}</h3>
					{
						getEvent().isAdmin && member.role !== 'admin' && (
							<button className="btn btn-danger" onClick={() => { handleModal(true) }}>
								<i className="fa-solid fa-trash"></i>
							</button>
						)
					}
					{
						member.role === 'admin' && <span className='btn btn-success'>Administrador</span>
					}
				</div>
			</Item>
			<Modal isOpen={modalOpen} onClose={handleModal} modalTitle={'Eliminar miembro'}>
				<p>¿Estás seguro que deseas eliminar a {member.username}?</p>
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

export default MemberItem;
