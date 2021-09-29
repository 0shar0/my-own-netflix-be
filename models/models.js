const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING, allowNull: true },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
  likedShows: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: [] },
  friends: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: [] },
});

const Shows = sequelize.define('shows', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
  status: { type: DataTypes.STRING },
  genres: { type: DataTypes.ARRAY(DataTypes.STRING) },
  data: { type: DataTypes.JSON },
});

module.exports = { User, Shows };
