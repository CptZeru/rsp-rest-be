'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Refactory123', salt);
    await queryInterface.bulkInsert('Users',
      [
        {
          password: hashedPassword,
          email: 'admin@admin.com'
        },
        {
          email: 'user@user.com',
          password: hashedPassword
        }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
