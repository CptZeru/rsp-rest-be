'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      room_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Rooms',
          key: 'id'
        }
      },
      total_person: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      booking_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      noted: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      check_in_time: {
        allowNull: true,
        type: Sequelize.DATE
      },
      check_out_time: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: 'TIMESTAMP',
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  }
};
