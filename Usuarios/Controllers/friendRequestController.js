const { request } = require('express');
const { User, FriendRequest, Friendship } = require('../Models');

const sendFriendRequestNotification = async (requesterId, recipientId, request_id) => {
	const URL = `http://localhost:3002/api/notifications`;
	try {
		const response = await fetch(URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: recipientId,
				type: 'friendRequest',
				data: { 
					friendRequest : { 
						from_user_id: requesterId,
						request_id: request_id
					} 
				}
			})
		});
		console.log(response);
	} catch (error) {
		console.error(error);
	}
};

const sendFriendRequest = async (req, res) => {
	try {
		const { userId, recipientUsername } = req.body;
		const recipientUser = await User.findOne({where: { username: recipientUsername } });
		const recipientId = recipientUser.id;

		if (!recipientUser)
			return res.status(404).json({ error: 'Usuario no encontrado' });
		if (recipientId === userId)
			return res.status(400).json({ error: 'No puedes enviarte solicitud de amistad a ti mismo' });
		if (await Friendship.findOne({ where: { userId, friendId: recipientId } }) != null)
			return res.status(400).json({ error: 'Ya eres amigo de este usuario' });
		if (await FriendRequest.findOne({ where: { requesterId: userId, recipientId: recipientId, status: 'pending' } })) 
			return res.status(400).json({ error: 'Ya hay una solicitud en curso' });
		const request = await FriendRequest.create({ requesterId: userId, recipientId });
		await sendFriendRequestNotification(userId, recipientId, request.dataValues.requestId);
		res.status(201).json(request);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const acceptFriendRequest = async (req, res) => {
	try {
		const { requestId } = req.params;
		const request = await FriendRequest.findOne({ where: { requestId } });
		if (request.recipientId != req.body.userId) 
			res.status(403).json({ error: 'Request Unauthorized' });
		else if (request && request.status === 'pending') {
			request.status = 'accepted';
			await request.save();
			await Friendship.create({ userId: request.requesterId, friendId: request.recipientId });
			await Friendship.create({ userId: request.recipientId , friendId: request.requesterId });
			res.status(200).json({ message: 'Request Accepted' });
		} else {
			res.status(404).json({ error: 'Friend request not found or already processed.' });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const rejectFriendRequest = async (req, res) => {
	try {
		const { requestId } = req.params;
		const request = await FriendRequest.findOne({ where: { requestId } });
		if (request.recipientId != req.body.userId) 
			res.status(403).json({ error: 'Request Unauthorized' });
		else if (request && request.status === 'pending') {
			request.status = 'rejected';
			await request.save();
			res.status(200).json(request);
		} else {
			res.status(404).json({ error: 'Friend request not found or already processed.' });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

const getFriendRequests = async (req, res) => {
	try {
		const userId = req.body.userId;
		const requests = await FriendRequest.findAll({ where: { recipientId: userId, status: 'pending' } });
		res.status(200).json(requests);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getPendingRequests = async (req, res) => {
	try {
		const userId = req.body.userId;
		const user = req.params.user;
		const request = await FriendRequest.findOne({ where: { requesterId: userId, recipientId: user, status: 'pending' } });
		if (!request)
			return res.status(404).json({ error: 'No request found' });
		res.status(200).json(request);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

module.exports = {
	sendFriendRequest,
	acceptFriendRequest,
	rejectFriendRequest,
	getFriendRequests,
	getPendingRequests
};
