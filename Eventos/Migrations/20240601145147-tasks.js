'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tasks', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            eventId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true
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

        await queryInterface.addConstraint('tasks', {
            fields: ['eventId'],
            type: 'foreign key',
            name: 'tasks_eventId_fk',
            references: {
                table: 'events',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint('tasks', 'tasks_eventId_fk');
        await queryInterface.dropTable('tasks');
    }
};
