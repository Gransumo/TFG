const Notification  = require('../Models/Notification');

const getAllNotifications = async (req, res) => {
	try {
		const { userId } = req.body;
		const notifications = await Notification.find({ userId: userId, read: false});
		res.status(200).json(notifications);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createNotification = async (req, res) => {
	const { userId, type, data } = req.body;
	console.log("1\n");
	// Check if the request has the required fields
	if (!userId || !type || !data)
		return res.status(500).json({ error: 'Missing data' });

	// Check if the type is valid
	if (type != 'friendRequest' && type != 'eventInvitation' && type != 'eventUpdate')
		return res.status(500).json({ error: 'Invalid type' });

	// Check if the data is valid
	if (type == 'friendRequest' && (!data.friendRequest || !data.friendRequest.from_user_id || !data.friendRequest.request_id))
		return res.status(500).json({ error: 'Invalid friendRequest data' });

	// Check if the data is valid
	if (type === 'eventInvitation' && (!data.event_invitation || !data.event_invitation.event_id || !data.event_invitation.event_invitation_id))
		return res.status(500).json({ error: 'Invalid invitation data' });
	
	// Check if the data is valid
	if (type === 'eventUpdate' && (!data.event_update || !data.event_update.event_id || !data.event_update.update_info))
		return res.status(500).json({ error: 'Invalid update data' });


	const notification = new Notification({
		userId,
		type,
		data
	});
	console.log(notification);

	await notification.save()
	.then(notificacion => {
		console.log(notificacion);
		res.status(201).json(notificacion);
	})
	.catch((error) => {
		console.error(error);
		res.status(400).json({ message: error.message });
	});
};

const setReadNotification = async (req, res) => {
	try {
		const { id } = req.params;
		console.log(id);
		const notification = await Notification.findById(id);
		console.log(notification);
		if (!notification)
			return res.status(404).json({ error: 'Notification not found' });
		notification.read = true;
		await notification.save();
		res.status(200).json(notification);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllNotifications,
	createNotification,
	setReadNotification
};