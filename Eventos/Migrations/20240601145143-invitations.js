'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('invitations', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            eventId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            user_invited_Id: {
                type: Sequelize.INTEGER,
                allowNull: false
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

        await queryInterface.addConstraint('invitations', {
            fields: ['eventId'],
            type: 'foreign key',
            name: 'invitations_eventId_fk',
            references: {
                table: 'events',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint('invitations', 'invitations_eventId_fk');
        await queryInterface.dropTable('invitations');
    }
};
