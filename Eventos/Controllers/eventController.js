const { Event, Member } = require('../Models');
const { generateUniqueCode } = require('../Utils/generateUniqueCode');

const getEvents = async (req, res) => {
	try {
		console.log(req.body);
		const { userId } = req.body;
		const eventsID = (await Member.findAll({ where: { userId } })).map(m => m.eventId);
		const events = await Event.findAll({
			where: { id: eventsID },
			attributes: ['id', 'name', 'code']
		});
		res.status(200).json(events);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const createEvent = async (req, res) => {
	try {
		var event = {};
		const { userId } = req.body;
		if (req.body.name)			event.name =		req.body.name;
		if (req.body.description)	event.description =	req.body.description;
		if (req.body.date)			event.date =		req.body.date;
		if (req.body.location)		event.location =	req.body.location;
		if (req.body.private != null)		event.private =		req.body.private;
		console.log(event);
		event.code = generateUniqueCode();
		const newEvent = await Event.create(event);
		console.log(newEvent);
		await Member.create({ userId, eventId: newEvent.id, role: 'admin' });
		res.status(201).json(newEvent);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: error.message });
	}
};

const getEvent = async (req, res) => {
	try {
		const { eventCode } = req.params;
		const { userId } = req.body;
		const event = await Event.findOne({ where: { code: eventCode }});
		if (!event) {
			return res.status(404).json({ error: 'Evento no encontrado' });
		}
		const member = await Member.findOne({ where: { eventId: event.dataValues.id, userId } });
		if (member)
			event.dataValues.isAdmin = (member.role == 'admin') ? true : false;
		res.status(200).json(event);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: error.message });
	}
};

const sendEventUpdateNotification = async (event) => {
	const URL = `http://localhost:3002/api/notifications`;
	try {
		const members = await Member.findAll({ where: { eventId: event.dataValues.id, role: 'member' } });
		members.forEach(async member => {
			const response = await fetch(URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					userId: member.dataValues.userId,
					type: 'eventUpdate',
					data: {
						event_update: {
							event_id: event.dataValues.id,
							update_info: `El evento: ${event.dataValues.name} \nHa sido actualizado`
						}
					}
				})
			});
			console.log(response);
		});
	} catch (error) {
		console.error(error);
	}
};

const updateEvent = async (req, res) => {
	try {
		const { eventId } = req.params;
		const event = await Event.findByPk(eventId);
		const userMember = await Member.findOne({ where: { eventId, userId: req.body.userId } });
		if (!userMember || userMember.role != 'admin') {
			return res.status(403).json({ error: 'Usuario no autorizado para modificar el evento' });
		}
		if (!event) {
			return res.status(404).json({ error: 'Evento no encontrado' });
		}
		if (req.body.name)			event.name =		req.body.name;
		if (req.body.description)	event.description =	req.body.description;
		if (req.body.date)			event.date =		req.body.date;
		if (req.body.location)		event.location =	req.body.location;
		if (req.body.private != null)		event.private =		req.body.private;
		if( await event.save() )
			await sendEventUpdateNotification(event);
		res.status(200).json(event);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const deleteEvent = async (req, res) => {
	try {
		const { eventId } = req.params;
		const event = await Event.findByPk(eventId);
		if (!event) {
			return res.status(404).json({ error: 'Evento no encontrado' });
		}
		const userMember = await Member.findOne({ where: { eventId, userId: req.body.userId } });
		if (!userMember || userMember.role != 'admin') {
			return res.status(403).json({ error: 'Usuario no autorizado para eliminar el evento' });
		}
		await event.destroy();
		res.status(204).json({ message: 'Evento eliminado' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getEventById = async (req, res) => {
	try {
		const { eventId } = req.params;
		const event = await Event.findByPk(eventId);
		if (!event) {
			return res.status(404).json({ error: 'Evento no encontrado' });
		}
		res.status(200).json({ eventId: event.id, name: event.name});
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getEvents,
	createEvent,
	getEvent,
	updateEvent,
	deleteEvent,
	getEventById
};