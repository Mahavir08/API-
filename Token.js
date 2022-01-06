require('dotenv').config();
const jwt = require('jsonwebtoken');

const Token = (email) => {

    const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
        expiresIn: '120s'
    });
    return token;
}

module.exports = Token;