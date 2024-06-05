const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');

const Friendship = sequelize.define('Friendship', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: User,
			key: 'id'
		}
	},
	friendId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: User,
			key: 'id'
		}
	}
});

module.exports = Friendship;
