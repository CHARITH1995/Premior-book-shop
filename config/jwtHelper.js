const jwt = require('jsonwebtoken');

module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    if ('Authorization' in req.headers)
        token = req.headers['Authorization'].split(' ')[1];
    if (!token)
        return res.json({ success: false, message: 'No token provided.' });
    else {
        jwt.verify(token,'secretkey',
            (err, decoded) => {
                if (err)
                    return res.json({ success: false, message: 'Token authentication failed.' });
                else {
                    req._id = decoded._id;
                    next();
                }
            }
        )
    }
}