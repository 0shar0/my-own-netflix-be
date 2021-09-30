require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const model = require('./models/models');
const router = require('./routs/index');
const errorHandler = require('./middlewear/ErrorHandlingMidldewear');

const app = express();

app.use(cors({ origin: 'https://my-own-netflix-shar.herokuapp.com/' }));
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (e) {
    console.log(e);
  }
};

start().then(() =>
  app.listen(process.env.PORT, () => console.log('server start')),
);
