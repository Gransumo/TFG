import React, { useState, useEffect } from 'react'
import { fetchMembers, fetchDeleteMember, fetchJoinRequests, fetchAcceptFriendRequest, fetchRejectFriendRequest } from '../api/events';
import MemberItem from '../components/MemberItem';
import Modal from '../partials/Modal';
import SearchUsers from '../partials/SearchUsers';
import JoinRequestItem from '../components/JoinRequestItem';

export const MembersList = ({ getEvent }) => {
	const [modalOpenAdd, setModalOpenAdd] = useState(false);
	const [modalOpenRequest, setModalOpenRequest] = useState(false);
	const [requests, setRequests] = useState([]);
	const [members, setMembers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [render, setRender] = useState(0);

	const forceUpdate = () => {
		setRender(render + 1);
	};

	useEffect(() => {
		async function cargarMiembros() {
			try {
				const response = await fetchMembers(getEvent().id);
				const adminMember = response.find(member => member.role === 'admin');
				const filteredMembers = response.filter(member => member.role !== 'admin');
				const sortedMembers = [adminMember, ...filteredMembers];
				setMembers(sortedMembers);
				setLoading(false);
			} catch (error) {
				console.error("Error obteniendo miembros:", error);
			}
		};

		async function cargarSolicitudes() {
			try {
				if (!getEvent().private) return;
				if (!getEvent().isAdmin) return;
				const response = await fetchJoinRequests(getEvent().id);
				setRequests(response);
			} catch (error) {
				console.error("Error obteniendo solicitudes:", error);
			}
		}
		cargarMiembros();
		cargarSolicitudes();
	}, [render]);

	const deleteMember = async (memberId) => {
		try {
			const response = await fetchDeleteMember(getEvent().id, memberId);
			console.log(response);
			const newMembers = members.filter((member) => member.id !== memberId);
			setMembers(newMembers);
		} catch (error) {
			console.error("Error eliminando miembro:", error);
		}
	}

	const handleModalAdd = (status) => {
		setModalOpenAdd(status);
	}

	const handleModalRequest = (status) => {
		setModalOpenRequest(status);
	}

	const handleAcceptRequest = async (requestId) => {
		try {
			const response = await fetchAcceptFriendRequest(getEvent().id, requestId);
			console.log(response);
			const newRequests = requests.filter(request => request.id !== requestId);
			setRequests(newRequests);
			forceUpdate();
		} catch (error) {
			console.error("Error aceptando solicitud:", error);
		}
	}

	const handleRejectRequest = async (requestId) => {
		try {
			const response = await fetchRejectFriendRequest(getEvent().id, requestId);
			console.log(response);
			const newRequests = requests.filter(request => request.id !== requestId);
			setRequests(newRequests);
			forceUpdate();
		} catch (error) {
			console.error("Error rechazando solicitud:", error);
		}
	}

	if (loading) {
		return <div>Cargando miembros...</div>;
	}
	return (
		<div>
			<div className='row'>
				<div className='col-6'>
					<h2 style={{display: 'flex', alignItems: 'center', height: 'auto' }}>Participantes</h2>
				</div>
				<div style={{ display: 'flex', justifyContent: 'end' }} className='col-md-6'>
					{getEvent().isAdmin && <button className="btn btn-primary" onClick={() => { handleModalAdd(true) }}>Agregar miembro</button>}
					<div className="m-2"></div>
					{getEvent().isAdmin && getEvent().private && <button className="btn btn-primary" onClick={() => { handleModalRequest(true) }}>Ver Solicitudes de Union</button>}
				</div>
			</div>
			<Modal isOpen={modalOpenAdd} onClose={handleModalAdd} modalTitle={'Invitar Miembro'}>
				<SearchUsers action={'Invitation'} event={getEvent()} />
			</Modal>
			<Modal isOpen={modalOpenRequest} onClose={handleModalRequest} modalTitle={"Solicitudes de Union"}>
				{
					(requests.length === 0) ?
						('No hay solicitudes de union pendientes') :
						requests.map((request) => (
							<JoinRequestItem key={request.id} request={request} onAccept={handleAcceptRequest} onReject={handleRejectRequest} />
						))
				}
			</Modal>
			<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} className='container'>
				{members.map((member) => (
					<MemberItem key={member.id} member={member} onDelete={deleteMember} getEvent={getEvent} />
				))}
			</div>
		</div>
	)
}

export default MembersList;
