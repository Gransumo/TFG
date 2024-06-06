const { Member, Event } = require('../Models');
const { fetchEventMembers } = require('../Utils/fetchEventMembers');

const getMembers = async (req, res) => {
    try {
        const { eventId } = req.params;
		const { userId } = req.body;
		const members = await Member.findAll({ where: { eventId } });
		if (members.find(m => m.userId == userId) == null) return res.status(403).json({ error: 'Usuario no autorizado para acceder a los miembros del evento' });
		const membersID = members.map(m => m.userId);
		const users = await fetchEventMembers(membersID);
		members.forEach(member => {
			member.dataValues.username = users.find(u => u.id == member.userId).username;
		});
        res.status(200).json(members);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createMember = async (req, res) => {
    try {
		const { eventId } = req.params;
        const { userId } = req.body;
		const member = await Member.findOne({ where: { eventId, userId } });
		const event = await Event.findByPk(eventId);
		if (!event) return res.status(404).json({ error: 'Evento no encontrado' });
		if (member) return res.status(403).json({ error: 'Usuario ya es miembro del evento' });
		if (event.private == true) return res.status(403).json({ error: 'Evento privado' });
        const newMember = await Member.create({ eventId, userId, role: 'member'});
        res.status(201).json(newMember);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getMember = async (req, res) => {
    try {
        const { memberId } = req.params;
        const member = await Member.findByPk(memberId);
        if (!member) {
            return res.status(404).json({ error: 'Miembro no encontrado' });
        }
        res.status(200).json(member);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateMember = async (req, res) => {
    try {
        const { memberId } = req.params;
        const { eventId, userId } = req.body;
        const member = await Member.findByPk(memberId);
        if (!member) {
            return res.status(404).json({ error: 'Miembro no encontrado' });
        }
        member.eventId = eventId;
        member.userId = userId;
        await member.save();
        res.status(200).json(member);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteMember = async (req, res) => {
    try {
        const { memberId, eventId } = req.params;
		const { userId } = req.body;
        const member = await Member.findByPk(memberId);
		const userMember = await Member.findOne({ where: { eventId, userId } });
        if (!member) {
			return res.status(404).json({ error: 'Miembro no encontrado' });
        }
		if (!member || member.userId != userId && userMember.role != 'admin') {
			return res.status(403).json({ error: 'Usuario no autorizado para eliminar el miembro' });
		}
		if (member.userId == userId && member.role == 'admin') 
			return res.status(403).json({ error: 'No puedes salirte del evento, eres el administrador' });
        await member.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const exitEvent = async (req, res) => {
	try {
		const { eventId } = req.params;
		const { userId } = req.body;
		const member = await Member.findOne({ where: { eventId, userId } });
		if (!member) {
			return res.status(404).json({ error: 'Miembro no encontrado' });
		}
		if (member.role == 'admin') {
			return res.status(403).json({ error: 'No puedes salirte del evento, eres el administrador' });
		}
		await member.destroy();
		res.status(204).json();
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getAdmins = async (req, res) => {
	try {
		const { eventId } = req.params;
		const { userId } = req.body;
		const member = await Member.findOne({ where: { eventId, userId } });
		if (member.role != 'admin') return res.status(200).json({ isAdmin: false });
		res.status(200).json({ isAdmin: true});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
    getMembers,
    createMember,
    getMember,
    updateMember,
    deleteMember,
	exitEvent,
	getAdmins
};
