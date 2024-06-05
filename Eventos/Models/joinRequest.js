
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const JoinRequest = sequelize.define('JoinRequest', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	eventId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	user_requester_Id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'pending'
	}
});

module.exports = JoinRequest;
