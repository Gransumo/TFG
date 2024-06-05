'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('members', {
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
                allowNull: false
            },
            role: {
                type: Sequelize.STRING,
                allowNull: false
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

        await queryInterface.addConstraint('members', {
            fields: ['eventId'],
            type: 'foreign key',
            name: 'members_eventId_fk',
            references: {
                table: 'events',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint('members', 'members_eventId_fk');
        await queryInterface.dropTable('members');
    }
};
