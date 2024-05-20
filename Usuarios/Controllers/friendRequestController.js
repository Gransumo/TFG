const { User, FriendRequest, Friendship } = require('../Models');

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
		res.status(201).json(request);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const acceptFriendRequest = async (req, res) => {
	try {
		const { requestId } = req.body;
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
		const { requestId } = req.body;
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

module.exports = {
	sendFriendRequest,
	acceptFriendRequest,
	rejectFriendRequest
};
