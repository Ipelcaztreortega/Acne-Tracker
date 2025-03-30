const jwt = require('jsonwebtoken');
require('dotenv').config() // Access to the dotenv variables

// Before it hits the routes, it will get access to the request res, then continue to the process of next
module.exports = async (req, res, next) => {
    try {
        // we need to get the token from the fetch request
        const jwtToken = req.header("token");
        if (!jwtToken) {
            return res.status(403).json('Not Authorizedz')
        }

        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET) // The idea is that if this is verified, it will return to us a payload, from jwtGenerator.js
        req.user = payload.user;

        next();
    } catch (err) {
        console.log(err.message);
        return res.status(403).json('Not Authorized')
    }
}

// Checks if the token being checked is valid