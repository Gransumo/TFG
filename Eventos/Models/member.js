const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Member = sequelize.define('Member', {
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
	role: {
		type: DataTypes.STRING,
		allowNull: false
	}
});



module.exports = Member;
