'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Rooms',
        [
          {
            room_name: 'Swastika 1',
            room_capacity: '4',
            photo:'',
          },
          {
            room_name: 'Swastika 2',
            room_capacity: '4',
            photo:'',
          },
          {
            room_name: 'Narena 1',
            room_capacity: '2',
            photo:'',
          },
          {
            room_name: 'Maharana 1',
            room_capacity: '10',
            photo:'',
          }
        ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
