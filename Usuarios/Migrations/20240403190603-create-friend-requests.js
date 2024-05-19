'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('FriendRequests', {
			requestId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},
			requesterId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'id'
				},
				onDelete: 'CASCADE'
			},
			recipientId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'id'
				},
				onDelete: 'CASCADE'
			},
			status: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: 'pending'
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW
			}
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('FriendRequests');
	}
};
