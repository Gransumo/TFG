
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Task = sequelize.define('Task', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	eventId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

module.exports = Task;
