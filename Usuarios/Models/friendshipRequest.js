const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');

const FriendRequest = sequelize.define('FriendRequest', {
	requestId : {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	requesterId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: User,
			key: 'id'
		}
	},
	recipientId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: User,
			key: 'id'
		}
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'pending'
	}
});

module.exports = FriendRequest;
