const ApiError = require('../error/apiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

const getJWT = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
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
    const token = getJWT(user.id, user.email, user.role);

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
    const token = getJWT(user.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req, res, next) {
    const {
      user: { id, email, role },
    } = req;
    return res.json({ token: getJWT(id, email, role) });
  }
}

module.exports = new UserControllers();
