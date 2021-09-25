class PeopleControllers {
  async createPerson(req, res) {}

  async currentPerson(req, res) {
    const { id } = req.query;
  }

  async allPeople(req, res) {}
}

module.exports = new PeopleControllers();
