const { Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');
const Friendship = require('./friendship');
const FriendRequest = require('./friendshipRequest');

// Asociaciones entre modelos
User.hasMany(Friendship, { as: 'friendships', foreignKey: 'userId' });
User.hasMany(FriendRequest, { as: 'friendRequestsSent', foreignKey: 'requesterId' });
User.hasMany(FriendRequest, { as: 'friendRequestsReceived', foreignKey: 'recipientId' });

Friendship.belongsTo(User, { as: 'user', foreignKey: 'userId' });
Friendship.belongsTo(User, { as: 'friend', foreignKey: 'friendId' });

FriendRequest.belongsTo(User, { as: 'requester', foreignKey: 'requesterId' });
FriendRequest.belongsTo(User, { as: 'recipient', foreignKey: 'recipientId' });

module.exports = {
	sequelize,
	User,
	Friendship,
	FriendRequest
};
