import { EVENTOS } from "./axiosConfig";

// Events Controller
const fetchEventByCode = async (eventCode) => {
	try {
		const response = await EVENTOS.get(`/events/${eventCode}`);
		return response.data;
	} catch (error) {
		console.error('Error en fetchEventByCode:', error);
		throw error;
	}
}

const fetchcreateEvent = async (eventData) => {
	try {
		const response = await EVENTOS.post('/events', eventData);
		return response.data;
	} catch (error) {
		console.error('Error en createEvent:', error);
		throw error;
	}
}

const fetchMyEvents = async () => {
	try {
		const response = await EVENTOS.get('/events');
		return response.data;
	} catch (error) {
		console.error('Error en fetchMyEvents:', error);
		throw error;
	}
}

const fetchEvent = async (eventId) => {
	try {
		const response = await EVENTOS.get(`/events/${eventId}`);
		return response.data;
	} catch (error) {
		console.error('Error en fetchEvent:', error);
		throw error;
	}
}

const fetchUpdateEvent = async (eventId, eventData) => {
	try {
		const response = await EVENTOS.put(`/events/${eventId}`, eventData);
		return response.data;
	} catch (error) {
		console.error('Error en fetchUpdateEvent:', error);
		throw error;
	}
}

const fetchDeleteEvent = async (eventId) => {
	try {
		const response = await EVENTOS.delete(`/events/${eventId}`);
		return response.data;
	} catch (error) {
		console.error('Error en fetchDeleteEvent:', error);
		throw error;
	}
}


// Invitations Controller
const fetchCreateInvitation = async (eventId, recipientId) => {
	try {
		const response = await EVENTOS.post(`/events/${eventId}/invitations`, { recipientId: recipientId });
		return response.data;
	} catch (error) {
		console.error('Error en fetchCreateInvitation:', error);
		throw error;
	}
}

const fetchMyInvitations = async () => {
	try {
		const response = await EVENTOS.get('/invitations');
		return response.data;
	} catch (error) {
		console.error('Error en fetchInvitations:', error);
		throw error;
	}
}

const fetchPendingInvitations = async (eventId) => {
	try {
		const response = await EVENTOS.get(`/events/${eventId}/invitations`);
		return response.data;
	} catch (error) {
		console.error('Error en fetchInvitations:', error);
		throw error;
	}
}

const fetchInvitationSingle = async (eventId, invitationId) => {
	try {
		const response = await EVENTOS.get(`/events/${eventId}/invitations/${invitationId}`);
		return response.data;
	} catch (error) {
		console.error('Error en fetchInvitation:', error);
		throw error;
	}
}

const fetchAcceptInvitation = async (eventId, invitationId) => {
	try {
		const response = await EVENTOS.put(`/events/${eventId}/invitations/${invitationId}`, { status: 'accepted' });
		return response.data;
	} catch (error) {
		console.error('Error en fetchAcceptInvitation:', error);
		throw error;
	}
}

const fetchRejectInvitation = async (eventId, invitationId) => {
	try {
		const response = await EVENTOS.put(`/events/${eventId}/invitations/${invitationId}`, { status: 'rejected' });
		return response.data;
	} catch (error) {
		console.error('Error en fetchRejectInvitation:', error);
		throw error;
	}
}

const fetchDeleteInvitation = async (eventId, invitationId) => {
	try {
		const response = await EVENTOS.delete(`/events/${eventId}/invitations/${invitationId}`);
		return response.data;
	} catch (error) {
		console.error('Error en fetchDeleteInvitation:', error);
		throw error;
	}
}

// Join Requests Controller
const fetchCreateJoinRequest = async (eventId) => {
	try {
		const response = await EVENTOS.post(`/events/${eventId}/join-requests`);
		return response.data;
	} catch (error) {
		console.error('Error en fetchCreateJoinRequest:', error);
		throw error;
	}
}

const fetchJoinRequests = async (eventId) => {
	try {
		const response = await EVENTOS.get(`/events/${eventId}/join-requests`);
		return response.data;
	} catch (error) {
		console.error('Error en fetchJoinRequests:', error);
		throw error;
	}
}

const fetchAcceptFriendRequest = async (eventId, requestId) => {
	try {
		const response = await EVENTOS.put(`/events/${eventId}/join-requests/${requestId}`, { status: 'accepted' });
		return response.data;
	} catch (error) {
		console.error('Error en fetchAcceptFriendRequest:', error);
		throw error;
	}
}

const fetchRejectFriendRequest = async (eventId, requestId) => {
	try {
		const response = await EVENTOS.put(`/events/${eventId}/join-requests/${requestId}`, { status: 'rejected' });
		return response.data;
	} catch (error) {
		console.error('Error en fetchRejectFriendRequest:', error);
		throw error;
	}
}

// Members Controller
const fetchMembers = async (eventId) => {
	try {
		const response = await EVENTOS.get(`/events/${eventId}/members`);
		return response.data;
	} catch (error) {
		console.error('Error en fetchMembers:', error);
		throw error;
	}
}

const fetchCreateMember = async (eventId, memberId) => {
	try {
		const response = await EVENTOS.post(`/events/${eventId}/members`, { memberId });
		return response.data;
	} catch (error) {
		console.error('Error en fetchCreateMember:', error);
		throw error;
	}
}

const  fetchDeleteMember = async (eventId, memberId) => {
	try {
		const response = await EVENTOS.delete(`/events/${eventId}/members/${memberId}`);
		return response.data;
	} catch (error) {
		console.error('Error en fetchDeleteMember:', error);
		throw error;
	}
}

const fetchExitEvent = async (eventId) => {
	try {
		const response = await EVENTOS.get(`/events/exit-event/${eventId}`);
		return response.data;
	} catch (error) {
		console.error('Error en fetchExitEvent:', error);
		throw error;
	}
}

const fetchIsAdmin = async (eventId) => {
	try {
		const response = await EVENTOS.get(`/events/admin/${eventId}`);
		return response.data;
	} catch (error) {
		console.error('Error en fetchIsAdmin:', error);
		throw error;
	}
}

// Tasks Controller
const fetchAllTasks = async (eventId) => {
	try {
		const response = await EVENTOS.get(`/events/${eventId}/tasks`);
		return response.data;
	} catch (error) {
		console.error('Error en fetchTasks:', error);
		throw error;
	}
}

const fetchTask = async (eventId, userTaskId) => {
	try {
		const response = await EVENTOS.get(`/events/${eventId}/tasks/${userTaskId}`);
		return response.data;
	} catch (error) {
		console.error('Error en fetchTask:', error);
		throw error;
	}
}

const fetchCreateTask = async (eventId, taskData) => {
	try {
		const response = await EVENTOS.post(`/events/${eventId}/tasks`, taskData);
		return response.data;
	} catch (error) {
		console.error('Error en fetchCreateTask:', error);
		throw error;
	}
}

const fetchUpdateTask = async (eventId, taskId, taskData) => {
	try {
		const response = await EVENTOS.put(`/events/${eventId}/tasks/${taskId}`, taskData);
		return response.data;
	} catch (error) {
		console.error('Error en fetchUpdateTask:', error);
		throw error;
	}
}

const fetchDeleteTask = async (eventId, taskId) => {
	try {
		const response = await EVENTOS.delete(`/events/${eventId}/tasks/${taskId}`);
		return response.data;
	} catch (error) {
		console.error('Error en fetchDeleteTask:', error);
		throw error;
	}
}

export {
	fetchcreateEvent,
	fetchMyEvents,
	fetchEvent,
	fetchUpdateEvent,
	fetchDeleteEvent,
	fetchCreateInvitation,
	fetchMyInvitations,
	fetchPendingInvitations,
	fetchInvitationSingle,
	fetchAcceptInvitation,
	fetchRejectInvitation,
	fetchDeleteInvitation,
	fetchCreateJoinRequest,
	fetchJoinRequests,
	fetchAcceptFriendRequest,
	fetchRejectFriendRequest,
	fetchMembers,
	fetchCreateMember,
	fetchDeleteMember,
	fetchAllTasks,
	fetchTask,
	fetchCreateTask,
	fetchUpdateTask,
	fetchDeleteTask,
	fetchExitEvent,
	fetchIsAdmin,
	fetchEventByCode
};
