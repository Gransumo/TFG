'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('joinrequests', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            eventId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            user_requester_Id: {
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
        }),

            await queryInterface.addConstraint('joinrequests', {
                fields: ['eventId'],
                type: 'foreign key',
                name: 'joinrequests_eventId_fk',
                references: {
                    table: 'events',
                    field: 'id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint('joinrequests', 'joinrequests_eventId_fk');
        await queryInterface.dropTable('joinrequests');
    }
};
