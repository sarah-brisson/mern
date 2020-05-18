const jwt = require('jsonwebtoken')

// use of a token for authentification
const auth = (req, res, next) => {
    if(req.header && req.header.authorization && req.header.authorization.split(' ')[0] === 'JWT') {
        const isValidToken = jwt.verify(req.header.authorization.split(' ')[1], process.env.JWT_SECRET);
        if (isValidToken) {
            next();
        } else {
            res.status(401).json({error: "Authorization Required"});
        }
    } else {
        res.status(401).send();
    }
};

module.exports = auth;