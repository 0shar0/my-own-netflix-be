const fetch = require('node-fetch');
const { Shows } = require('../models/models');
const { Op } = require('sequelize');

const fetchShows = (page) => {
  fetch(`https://api.tvmaze.com/shows?page=${page}`)
    .then((r) => r.json())
    .then((r) => {
      if (r.length) {
        r.forEach(async (el) => {
          const { id, status, genres } = el;
          const search = await Shows.findOne({ where: { id } });
          if (!search) {
            await Shows.create({ id, status, genres, data: el });
          }
        });
      }
      return r;
    });
};

class ShowsControllers {
  async createShow(req, res) {
    let count = 0;
    const interval = setInterval(() => {
      fetchShows(count);
      count++;
      if (count >= 231) {
        clearInterval(interval);
      }
    }, 5_000);
  }

  async currentShow(req, res) {
    const { id } = req.query;
    const show = await Shows.findOne({ where: { id } });
    return res.json(show);
  }

  async allShows(req, res) {
    let { status, genres, limit, page: page } = req.query;
    page = page || 1;
    limit = limit || 12;
    const offset = limit * page - limit;
    let shows;
    if (!status && !genres) {
      shows = await Shows.findAndCountAll({
        limit,
        offset,
        order: [['id', 'ASC']],
      });
    }
    if (status && !genres) {
      shows = await Shows.findAndCountAll({ where: { status }, limit, offset });
    }
    if (!status && genres) {
      shows = await Shows.findAndCountAll({
        where: { genres: { [Op.contains]: [...genres] }, limit, offset },
      });
    }
    if (status && genres) {
      shows = await Shows.findAndCountAll({
        where: { genres: { [Op.contains]: [...genres] }, status },
        limit,
        offset,
      });
    }
    return res.json(shows);
  }
}

module.exports = new ShowsControllers();
