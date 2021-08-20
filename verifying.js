const jwt = require('jsonwebtoken');
function verifyToken ( req , res , next) {
    // get authorization from requst
    let auth = req.headers['authorization'];
    // check if it exitor not
    if(auth){
        // split token to bearer and token
        auth = auth.split(' ');
        // check if it set 
        if(auth[0] === 'Bearer' && auth[1]){
            // verifying the token to check it status
            jwt.verify(auth[1] , process.env.SECRET_KEY , (err , data) => {
                // the token is expired
                if(err) res.json({status : "auth error" , error : "token expired"});
                else{
                    // the token is verifyed
                    req.auth = data._id;
                    next();
                }
            });
        } else {
            // wronge token
            res.json({status : 'token not allowed'});
        }
    } else {
        // token not exist
        res.json({status : 'token not found'});
    }
}


module.exports = verifyToken;