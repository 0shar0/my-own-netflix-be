const jwt = require('jsonwebtoken');

module.exports = {
  getJWT: (id, email, role, likedShows, friends) => {
    return jwt.sign(
      { id, email, role, likedShows, friends },
      process.env.SECRET_KEY,
      {
        expiresIn: '24h',
      },
    );
  },
};
