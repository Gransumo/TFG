const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
	unique: true
  },
  email: {
	type: DataTypes.STRING,
	allowNull: false
  },
  passwd_hash: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
