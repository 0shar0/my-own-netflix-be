require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const model = require('./models/models');

const app = express();
app.use(cors);
app.use(express.json);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'message' });
});

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
