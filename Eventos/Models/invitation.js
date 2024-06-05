
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Invitation = sequelize.define('Invitation', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	eventId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	user_invited_Id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'pending'
	}
});

module.exports = Invitation;
