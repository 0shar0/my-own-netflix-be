const { Sequelize } = require('sequelize');

module.exports = new Sequelize(process.env.HEROKU_POSTGRESQL_CRIMSON_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

