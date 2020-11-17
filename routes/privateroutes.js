const jwt = require('jsonwebtoken');
module.exports = function(req,res,next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('access denied');
    try{
        const varified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = varified;
        next();
    }catch(error){
        res.send('Invalid token');
    }
}