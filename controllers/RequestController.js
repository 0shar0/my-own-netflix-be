const { Request } = require('../models/models');
const ApiError = require('../error/apiError');

class RequestController {
  async createRequest(req, res, next) {
    const from = req.user.id;
    const { to } = req.body;
    const check = await Request.findOne({ where: { from, to } });
    if (check) {
      return next(
        ApiError.badRequest('You have been requested this user earlier'),
      );
    }
    await Request.create({ from, to });
    res.json({ message: 'Request Created' });
  }
}

module.exports = new RequestController();
