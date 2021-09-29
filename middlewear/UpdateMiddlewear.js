const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'User not Authorized' });
    }
    const authUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = req.body;
    if (user.id !== authUser.id) {
      return res.status(401).json({ message: 'User not Authorized' });
    }
    next();
  } catch (e) {
    res.status(401).json({ message: 'User not Authorized' });
  }
};
