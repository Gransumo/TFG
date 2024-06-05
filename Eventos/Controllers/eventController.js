const { Event, Member } = require('../Models');
const { use } = require('../Routes/eventRoutes');
const { generateUniqueCode } = require('../Utils/generateUniqueCode');
const { fetchEventMembers } = require('../Utils/fetchEventMembers');

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
		const { userId, name, description, date, location, private } = req.body;
		const event = await Event.create({ name: name, code: generateUniqueCode(), description, date, location, private: private });
		await Member.create({ userId, eventId: event.id, role: 'admin' });
		res.status(201).json(event);
	} catch (error) {
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
		const member = await Member.findOne({ where: { eventId: event.id, userId } });
		if (!member) {
			return res.status(403).json({ error: 'Usuario no autorizado para acceder al evento' });
		}
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
		const { name, description, date, location, private } = req.body;
		const event = await Event.findByPk(eventId);
		const userMember = await Member.findOne({ where: { eventId, userId: req.body.userId } });
		if (!userMember || userMember.role != 'admin') {
			return res.status(403).json({ error: 'Usuario no autorizado para modificar el evento' });
		}
		if (!event) {
			return res.status(404).json({ error: 'Evento no encontrado' });
		}
		if (name)			event.name = name;
		if (description)	event.description = description;
		if (date)			event.date = date;
		if (location)		event.location = location;
		if (private)		event.private = private;
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

module.exports = {
	getEvents,
	createEvent,
	getEvent,
	updateEvent,
	deleteEvent
};