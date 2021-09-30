const { User, Request } = require('../models/models');
const ApiError = require('../error/apiError');
const { getJWT } = require('../helpers/constants');

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
  async getRequest(req, res) {
    const { id } = req.query;
    const request = await Request.findAll({ where: { to: id } });
    Promise.all(
      request
        .map((r) => {
          return r.from;
        })
        .map(async (id) => {
          return await User.findOne({ where: { id } });
        }),
    )
      .then((users) =>
        users.map((user) => {
          const { dataValues } = user;
          return { ...dataValues, password: null };
        }),
      )
      .then((users) => {
        res.json(users);
      });
  }

  async acceptRequest(req, res) {
    const currentUser = req.user;
    const user = await User.findOne({ where: { id: req.body.id } });

    await User.update(
      { friends: [...user?.friends, currentUser.id] },
      { where: { id: user.id } },
    );
    await User.update(
      { friends: [...currentUser?.friends, user.id] },
      { where: { id: currentUser.id } },
    );
    await Request.destroy({ where: { from: user.id, to: currentUser.id } });
    const token = getJWT(
      currentUser.id,
      currentUser.email,
      currentUser.role,
      currentUser.likedShows,
      [...currentUser.friends, user.id],
    );
    return res.json({ token, message: 'You add the friend' });
  }

  async getFriends(req, res) {
    const { friends } = req.query;
    Promise.all(
      friends.map(async (friend) => {
        return await User.findOne({ where: { id: friend } });
      }),
    ).then((r) => res.json(r));
  }
  async deleteFriends(req, res) {
    const currentUser = req.user;
    const userId = Number(req.query.id);
    const user = await User.findOne({ where: { id: userId } });
    await User.update(
      {
        friends: currentUser.friends.filter((f) => f !== userId),
      },
      { where: { id: currentUser.id } },
    );
    await User.update(
      {
        friends: user.friends.filter((f) => f !== currentUser.id),
      },
      { where: { id: userId } },
    );
    const token = getJWT(
      currentUser.id,
      currentUser.email,
      currentUser.role,
      currentUser.likedShows,
      [...currentUser.friends].filter((f) => f !== userId),
    );
    res.json({ token, message: 'You deleted the friend' });
  }
}

module.exports = new RequestController();
