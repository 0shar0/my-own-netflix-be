require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const client = require('./pg');
const port = process.env.PORT;

const app = express();

/*
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    /!*await client.connect();*!/

  } catch (e) {
    console.log(e);
  }
};

/!*start();*!/
*/

app.get('/', (r) => {
  r.end(<div>response</div>);
});

app.listen(port, () => console.log('server start'));
