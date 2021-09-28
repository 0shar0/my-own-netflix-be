const ApiError = require('../error/apiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

const getJWT = (id, email, role, likedShows) => {
  return jwt.sign({ id, email, role, likedShows }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

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
    const token = getJWT(user.id, user.email, user.role, user.likedShows);

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
    const token = getJWT(user.id, user.email, user.role, user.likedShows);
    return res.json({ token });
  }

  async check(req, res) {
    const {
      user: { id, email, role, likedShows },
    } = req;
    return res.json({ token: getJWT(id, email, role, likedShows) });
  }

  async update(req, res) {
    const { id, email, role, likedShows } = req.body;
    await User.update({ id, email, role, likedShows }, { where: { id } });
    const user = await User.findOne({ where: { id } });
    return res.json({
      token: getJWT(user.id, user.email, user.role, user.likedShows),
    });
  }
}

module.exports = new UserControllers();
