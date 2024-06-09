const { JoinRequest, Member, Event } = require('../Models');
const { fetchEventMembers } = require('../Utils/fetchEventMembers');

const getJoinRequests = async (req, res) => {
	try {
		const { eventId } = req.params;
		const { userId } = req.body;
		
		const event = await Event.findByPk(eventId);
		if (!event) return res.status(404).json({ error: 'Evento no encontrado' });

		const member = await Member.findOne({ where: { eventId, userId } });

		const joinRequests = await JoinRequest.findAll({ where: { eventId, status: 'pending' } });
		console.log(joinRequests);
		if (joinRequests.length === 0) return res.status(404).json({ error: 'No hay solicitudes de unión pendientes' });
		const userNames = await fetchEventMembers(joinRequests.map(joinRequest => joinRequest.user_requester_Id));

		joinRequests.forEach(joinRequest => {
			joinRequest.dataValues.user_requester = userNames.find(u => u.id == joinRequest.user_requester_Id).username;
		});

		res.status(200).json(joinRequests);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const createJoinRequest = async (req, res) => {
	try {
		const { eventId } = req.params;
		const { userId } = req.body;
		const event = await Event.findByPk(eventId);
		// Check if event exists
		if (!event) return res.status(404).json({ error: 'Evento no encontrado' });
		const member = await Member.findOne({ where: { eventId, userId } });
		// Check if user is already a member
		if (member) return res.status(403).json({ error: 'Usuario ya es miembro del evento' });
		// Check if there is a pending join request
		if (await JoinRequest.findOne({ where: { eventId, user_requester_Id: userId, status: 'pending' } }))
			return res.status(400).json({ error: 'Ya existe una solicitud de unión pendiente' });
		// Create join request
		const joinRequest = await JoinRequest.create({ eventId, user_requester_Id: userId, status: 'pending' });
		res.status(201).json(joinRequest);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getJoinRequest = async (req, res) => {
	try {
		const { eventId } = req.params;
		const { userId } = req.body;
		const joinRequest = await JoinRequest.findOne({ where: { eventId, user_requester_Id: userId } });
		if (!joinRequest) {
			return res.status(404).json({ error: 'Solicitud de unión no encontrada' });
		}
		res.status(200).json(joinRequest);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const updateJoinRequest = async (req, res) => {
	try {
		console.log(req.body);
		const { joinRequestId, eventId } = req.params;
		const { status, userId } = req.body;
		console.log(req.body);
		const joinRequest = await JoinRequest.findByPk(joinRequestId);
		if (!joinRequest)
			return res.status(404).json({ error: 'Solicitud de unión no encontrada' });
		if((await Member.findOne({ where: { eventId, userId } })).role != 'admin')
			return res.status(403).json({ error: 'Usuario no autorizado para modificar la solicitud de unión' });
		if (status !== 'accepted' && status !== 'rejected')
			return res.status(400).json({ error: 'Estado inválido' });
		if (joinRequest.status !== 'pending')
			return res.status(400).json({ error: 'La solicitud de unión ya fue procesada' });
		joinRequest.status = status;
		await joinRequest.save();
		if (status === 'accepted') {
			await Member.create({ eventId, userId: joinRequest.user_requester_Id, role: 'member' });
		}
		res.status(200).json(joinRequest);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const deleteJoinRequest = async (req, res) => {
	try {
		const { joinRequestId } = req.params;
		const joinRequest = await JoinRequest.findByPk(joinRequestId);
		if (!joinRequest) {
			return res.status(404).json({ error: 'Solicitud de unión no encontrada' });
		}
		await joinRequest.destroy();
		res.status(200).json(joinRequest);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getJoinRequests,
	createJoinRequest,
	getJoinRequest,
	updateJoinRequest,
	deleteJoinRequest
};