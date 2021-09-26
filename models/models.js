const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

const Shows = sequelize.define('shows', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
  status: { type: DataTypes.STRING },
  genres: { type: DataTypes.ARRAY(DataTypes.STRING) },
  data: { type: DataTypes.JSON },
});

const People = sequelize.define('people', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
  data: { type: DataTypes.JSON },
});

module.exports = { User, Shows, People };
