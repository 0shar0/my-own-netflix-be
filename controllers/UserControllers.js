const ApiError = require('../error/apiError');
const bcrypt = require('bcrypt');
const { User } = require('../models/models');
const { getJWT } = require('../helpers/constants');

class UserControllers {
  async register(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('No E-mail or Password'));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('User with this name has already exist'));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const token = getJWT(
      user.id,
      user.email,
      user.role,
      user.likedShows,
      user.friends,
    );

    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal('User not Found'));
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.forbidden('Incorrect Password'));
    }
    const token = getJWT(
      user.id,
      user.email,
      user.role,
      user.likedShows,
      user.friends,
    );
    return res.json({ token });
  }

  async check(req, res) {
    const {
      user: { id, email, role, likedShows, friends },
    } = req;
    return res.json({ token: getJWT(id, email, role, likedShows, friends) });
  }

  async update(req, res) {
    const { id, email, role, likedShows, friends } = req.body;
    await User.update(
      { id, email, role, likedShows, friends },
      { where: { id } },
    );
    const user = await User.findOne({ where: { id } });
    return res.json({
      token: getJWT(
        user.id,
        user.email,
        user.role,
        user.likedShows,
        user.friends,
      ),
    });
  }

  async getAll(req, res) {
    let { limit, page: page, id } = req.query;
    page = page || 1;
    limit = limit || 20;
    const offset = limit * page - limit;
    const { friends } = await User.findOne({ where: { id } });
    const users = await User.findAll({
      limit,
      offset,
      order: [['email', 'ASC']],
    });
    const mapedUsers = users
      .filter((user) => !friends.includes(user.id))
      .map((user) => {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          friend: user.friends,
          /*img:user.img,*/
        };
      });
    return res.json(mapedUsers);
  }
}

module.exports = new UserControllers();
