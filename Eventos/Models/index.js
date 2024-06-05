const { Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize');
const Event = require('./event');
const Task = require('./task');
const Member = require('./member');
const Invitation = require('./invitation');
const JoinRequest = require('./joinrequest');


Event.hasMany(Task, { as: 'tasks', foreignKey: 'eventId' });
Event.hasMany(Member, { as: 'members', foreignKey: 'eventId' });
Event.hasMany(Invitation, { as: 'invitations', foreignKey: 'eventId' });
Event.hasMany(JoinRequest, { as: 'joinRequests', foreignKey: 'eventId' });

Task.belongsTo(Event, { as: 'event', foreignKey: 'eventId' });

Member.belongsTo(Event, { as: 'event', foreignKey: 'eventId' });

Invitation.belongsTo(Event, { as: 'event', foreignKey: 'eventId' });

JoinRequest.belongsTo(Event, { as: 'event', foreignKey: 'eventId' });

module.exports = {
	sequelize,
	Event,
	Task,
	Member,
	Invitation,
	JoinRequest
};

