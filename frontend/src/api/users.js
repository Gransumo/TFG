import { USUARIOS } from "./axiosConfig";


const fetchLogin = async (username, password) => {
	try {
		const response = await USUARIOS.post('/login', { username, password });
		return response.data;
	} catch (error) {
		console.log('Error en fetchLogin:', error);
		throw error;
	}
}

const fetchSignup = async (username, email, password) => {
	try {
		const response = await USUARIOS.post('/sign-up', { username, email, password });
		return response.data;
	} catch (error) {
		console.error('Error en fetchSignup:', error);
		throw error;
	}
}

const fetchGetUser = async (username) => {
	try {
		console.log(username);
		const response = await USUARIOS.post('/get-user', { username: username });
		return response.data;
	} catch (error) {
		console.error('Error en fetchGetUser:', error);
		throw error;
	}
}

const fetchWhoami = async () => {
	try {
		const response = await USUARIOS.get('/whoami');
		return response.data;
	} catch (error) {
		console.error('Error en fetchWhoami:', error);
		throw error;
	}
}

const fetchFriendList = async () => {
	try {
		const response = await USUARIOS.get('/get-friend-list');
		return response.data;
	} catch (error) {
		console.error('Error en fetchFriendList:', error);
		throw error;
	}
}

const fetchDeleteFriend = async (id) => {
	try {
		const response = await USUARIOS.delete(`/delete/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error en fetchDeleteFriend:', error);
		throw error;
	}
}

const fetchCreateFriendRequest = async (recipientUsername) => {
	try {
		const response = await USUARIOS.post(`/friend-requests`, { recipientUsername });
		return response.data;
	} catch (error) {
		console.error('Error en fetchFriendRequest:', error);
		throw error;
	}
}

const fetchListFriendRequests = async () => {
	try {
		const response = await USUARIOS.get('/friend-requests');
		return response.data;
	} catch (error) {
		console.error('Error en fetchListFriendRequests:', error);
		throw error;
	}
}

const fetchAcceptFriendRequest = async (requestId) => {
	try {
		const response = await USUARIOS.get(`/accept-friend-request/${requestId}`);
		return response.data;
	} catch (error) {
		console.error('Error en fetchAcceptFriendRequest:', error);
		throw error;
	}
}

const fetchRejectFriendRequest = async (requestId) => {
	try {
		const response = await USUARIOS.get(`/reject-friend-request/${requestId}`);
		return response.data;
	} catch (error) {
		console.error('Error en fetchRejectFriendRequest:', error);
		throw error;
	}
}

const fetchPendingRequests = async (user) => {
	try {
		const response = await USUARIOS.get(`/pending-request/${user}`);
		return response.data;
	} catch (error) {
		console.error('Error en fetchPendingRequests:', error);
		throw error;
	}
}

export {
	fetchLogin,
	fetchSignup,
	fetchWhoami,
	fetchFriendList,
	fetchDeleteFriend,
	fetchCreateFriendRequest,
	fetchListFriendRequests,
	fetchAcceptFriendRequest,
	fetchRejectFriendRequest,
	fetchGetUser,
	fetchPendingRequests
};
