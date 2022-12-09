const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
    const token = req.headers['x-api-key'];
    if (!token) {
        return res.status(400).send('please input token')
    };
    const decodedToken = jwt.verify(token, 'xyz', (err, result) => {
        if (err) {
            return res.status(403).send('please input valid token')
        }
    });
    next();
};

module.exports = { authentication };