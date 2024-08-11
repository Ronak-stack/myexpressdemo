const jwt = require('jsonwebtoken');
const jwtKey = 'my-first-jwt-token';
module.exports = function verifyAuthToken(req, res, next) {
    let token = req.headers['authorization'];    
    let message = 'Token missing!';
    if(token) {
        token = token.split(' ')[1];        
        jwt.verify(token, jwtKey, (err,success) => {
            if(success) {
                next();
            }
        });
    }
    res.send(JSON.stringify({success:false, message:message, data:""}))
}