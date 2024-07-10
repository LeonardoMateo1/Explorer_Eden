const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports.secret = secret;

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
        console.log("Authenticate Called");
        if (err) {
            console.log(err);
            return res.status(401).json({ verified: false, message: 'Unauthorized User' })
        } else {
            req.user = payload;
            return next();
        }
    });
}