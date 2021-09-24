require('dotenv').config();
const express = require('express');
const sequelize = require('./db');

const app = express();

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(process.env.PORT, () => console.log('server start'));
  } catch (e) {
    console.log(e);
  }
};

start();
