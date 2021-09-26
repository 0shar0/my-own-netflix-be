const { Sequelize } = require('sequelize');

/*module.exports = new Sequelize(
  'dblv6jgnvpgcbg',
  'postgres',
  'Altec_Lansing01',
  {
    dialect:'postgres',
    host:'localhost',
    port:'5432'
  }
)*/

module.exports = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

