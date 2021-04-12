const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');

    if(!token) {
        res.status(401).json({ msg: "Cannot find token, Unauthorized ! " })
    }
    
    try {
        const decodedToken = jwt.verify(token, config.get('jwtSecretToken'));

        req.user = decodedToken.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Invalid token" })        
    }
}