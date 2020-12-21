'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Users, { as: 'users' })
      this.hasMany(models.Rooms, { as: 'rooms'})
    }
  }

  Bookings.init({
    user_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    total_person: DataTypes.INTEGER,
    booking_time: DataTypes.DATE,
    noted: DataTypes.TEXT,
    check_in_time: DataTypes.DATE,
    check_out_time: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Bookings',
  });
  return Bookings;
};
