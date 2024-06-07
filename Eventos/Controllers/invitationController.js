const { Invitation, Event, Member } = require('../Models');

const getMyInvitations = async (req, res) => {
	try {
		const { userId } = req.body;
		const invitations = await Invitation.findAll({ where: { user_invited_Id: userId, status: 'pending' } });
		res.status(200).json(invitations);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getInvitations = async (req, res) => {
	try {
		const { eventId } = req.params;
		const event = await Event.findByPk(eventId);
		if (!event)
			return res.status(404).json({ error: 'Evento no encontrado' });
		const invitations = await Invitation.findAll({ where: { eventId, status: 'pending' } });
		res.status(200).json(invitations);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const sendEventInvitationNotification = async (event_invitation_id, event_id, recipientId) => {
	const URL = `http://localhost:3002/api/notifications`;
	try {
		const response = await fetch(URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: recipientId,
				type: 'eventInvitation',
				data: { 
					event_invitation : { 
						event_invitation_id: event_invitation_id,
						event_id: event_id
					}
				}
			})
		});
		console.log(response);
	} catch (error) {
		console.error(error);
	}
};

const createInvitation = async (req, res) => {
	try {
		const { eventId } = req.params;
		const { recipientId, userId } = req.body;
		const event = await Event.findByPk(eventId);
		if (!event) {
			return res.status(404).json({ error: 'Evento no encontrado' });
		}
		const userMember = await Member.findOne({ where: { eventId, userId } });
		if (!userMember || userMember.role != 'admin') {
			return res.status(403).json({ error: 'Usuario no autorizado para invitar usuarios al evento' });
		}
		if (await Invitation.findOne({ where: { eventId, user_invited_Id: recipientId, status: 'pending' } }) != null) {
			return res.status(400).json({ error: 'Usuario ya invitado al evento' });
		}
		if (await Member.findOne({ where: { eventId, userId: recipientId } }) != null) {
			return res.status(400).json({ error: 'Usuario ya es miembro del evento' });
		}
		const invitation = await Invitation.create({ eventId, user_invited_Id: recipientId });
		if (invitation) await sendEventInvitationNotification(invitation.dataValues.id, eventId, recipientId);
		res.status(201).json(invitation);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getInvitation = async (req, res) => {
	try {
		const { invitationId } = req.params;
		const invitation = await Invitation.findByPk(invitationId);
		if (!invitation) {
			return res.status(404).json({ error: 'Invitación no encontrada' });
		}
		res.status(200).json(invitation);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const updateInvitation = async (req, res) => {
	try {
		const { invitationId } = req.params;
		const { status, userId } = req.body;
		const invitation = await Invitation.findByPk(invitationId);
		if (!invitation) return res.status(404).json({ error: 'Invitación no encontrada' });
		if (status !== 'accepted' && status !== 'rejected') return res.status(400).json({ error: 'Estado inválido' });
		if (invitation.status !== 'pending') return res.status(400).json({ error: 'La invitación ya fue procesada' });
		if (invitation.user_invited_Id !== userId) return res.status(403).json({ error: 'Usuario no autorizado para modificar la invitación' });
		invitation.status = status;
		await invitation.save();
		if (status === 'accepted') {
			await Member.create({ eventId: invitation.eventId, userId, role: 'member' });
			
		}
		res.status(200).json(invitation);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const deleteInvitation = async (req, res) => {
	try {
		const { invitationId } = req.params;
		const invitation = await Invitation.findByPk(invitationId);
		if (!invitation) {
			return res.status(404).json({ error: 'Invitación no encontrada' });
		}
		await invitation.destroy();
		res.status(204).json();
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getInvitations,
	createInvitation,
	getInvitation,
	updateInvitation,
	deleteInvitation,
	getMyInvitations
};
