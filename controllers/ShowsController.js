const fetch = require('node-fetch');
const { Shows } = require('../models/models');
const { Op } = require('sequelize');

class ShowsControllers {
  async createShow(req, res) {
    fetch('https://api.tvmaze.com/shows')
      .then((r) => r.json())
      .then((r) =>
        r.forEach((el) => {
          const { id, status, genres } = el;
          Shows.create({ id, status, genres, data: el });
        }),
      );
  }

  async currentShow(req, res) {
    const { id } = req.body;
    const show = await Shows.findOne({ where: { id } });
    return res.json(show);
  }

  async allShows(req, res) {
    const { status, genres } = req.body;
    let shows;
    if (!status && !genres) {
      shows = await Shows.findAll();
    }
    if (status && !genres) {
      shows = await Shows.findAll({ where: { status } });
    }
    if (!status && genres) {
      shows = await Shows.findAll({
        where: { genres: { [Op.contains]: [...genres] } },
      });
    }
    if (status && genres) {
      shows = await Shows.findAll({ where: { genres, status } });
    }
    return res.json(shows);
  }
}

module.exports = new ShowsControllers();
