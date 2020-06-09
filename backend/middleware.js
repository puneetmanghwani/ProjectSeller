const jwt = require('jsonwebtoken');
const secret = 'helloworld';


const withAuth = function(req, res, next) {
    const token = req.cookies.token;

    if(!token){
        res.status(401).send('Unauthorized: No token provided');
    }
    else{
        jwt.verify(token,secret,function(err,decode){
            if(err){
                res.status(401).send('Unauthorized: Invalid token');
            }
            else{
                req.email = decode.email;
                next();
            }
        });
    }
}

module.exports = withAuth;