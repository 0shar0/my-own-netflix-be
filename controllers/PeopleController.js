const fetch = require('node-fetch');
const { People } = require('../models/models');

class PeopleControllers {
  async createPerson(req, res) {
    fetch('https://api.tvmaze.com/people')
      .then((r) => r.json())
      .then((r) =>
        r.forEach((el) => {
          const { id } = el;
          People.create({ id, data: el });
        }),
      );
  }

  async currentPerson(req, res) {
    const { id } = req.body;
    const person = await People.findOne({ where: { id } });
    return res.json(person);
  }

  async allPeople(req, res) {
    const people = await People.findAll();
    return res.json(people);
  }
}

module.exports = new PeopleControllers();
