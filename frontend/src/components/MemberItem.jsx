import React, { useState } from 'react'
import Modal from '../partials/Modal';
import { fetchDeleteMember } from '../api/events';

export const MemberItem = ({ member, isAdmin, onDelete }) => {
	const [modalOpen, setModalOpen] = useState(false);

	const handleModal = (status) => {
		setModalOpen(status);
	}

	const handleDelete = async () => {
		onDelete(member.id);
	}
	return (
		<>
			<div className="border border-dark container p-2">
				<h3>{member.username}</h3>
				{
					isAdmin && member.role != 'admin' && <button className="btn btn-danger" onClick={() => { handleModal(true) }}>
						<i className="fa-solid fa-trash"></i>
					</button>
				}
				{
					member.role == 'admin' && <p className='btn btn-success'>Administrador</p>
				}
			</div>
			<Modal isOpen={modalOpen} onClose={handleModal} modalTitle={'Eliminar miembro'}>
				<p>¿Estás seguro que deseas eliminar a {member.username}?</p>
				<button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
			</Modal>
		</>
	)
}

export default MemberItem;
