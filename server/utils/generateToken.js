const jwt = require('jsonwebtoken');

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.ACCESS_EXPIRES,
    });

    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.REFRESH_EXPIRES,
    });

    return { accessToken, refreshToken };
};

module.exports = generateTokens;
