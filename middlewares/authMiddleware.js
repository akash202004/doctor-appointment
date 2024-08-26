const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) return res.status(401).send({ success: false, message: 'Access denied' });
        jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
            if (error) return res.status(401).send({ success: false, message: 'Invalid token' });
            req.body.userId = decode.id;
            next();
        })
    } catch {
        console.log(error);
        res.status(500).send({ success: false, message: `Auth Middleware ${error.message}` })
    }
}