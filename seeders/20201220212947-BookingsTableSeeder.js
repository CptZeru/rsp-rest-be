'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Bookings',
        [
          {
            user_id: 2,
            room_id: 1,
            total_person: 3,
            booking_time: '2020-12-18 01:00:00',
            noted: '',
            check_in_time: '2020-12-18 03:26:13',
            check_out_time: '2020-12-18 23:59:00',
          },
          {
            user_id: 2,
            room_id: 1,
            total_person: 3,
            booking_time: '2020-12-19 01:00:00',
            noted: '',
            check_in_time: '2020-12-19 03:26:13',
            check_out_time: '2020-12-19 23:59:00',
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
