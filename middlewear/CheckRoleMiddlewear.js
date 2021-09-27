const jwt = require('jsonwebtoken');

module.exports = (role) => (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'User not Authorized' });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.role !== role) {
      return res.status(403).json({ message: 'Don`t have permission' });
    }
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: 'User not Authorized' });
  }
};
