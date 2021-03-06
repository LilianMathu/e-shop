const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
        req.userDate = decoded;
        next();
    }catch (error) {
        res.status(401).json({
            message: "Auth failed"
        });
    }
};