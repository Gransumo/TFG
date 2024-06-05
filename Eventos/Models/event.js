const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Event = sequelize.define('Event', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	code: {
		type: DataTypes.STRING,
		allowNull: false,
        unique: true
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false
	},
	date: {
		type: DataTypes.DATE,
		allowNull: true
	},
	location: {
		type: DataTypes.STRING,
		allowNull: true
	},
	private: {
		type: DataTypes.BOOLEAN,
        defaultValue: false
	}
});

module.exports = Event;
