const router = require('express')();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const verifyToken = require('../verifying');

// make sure tha user is allowable
router.post('/login' , ( req, res ) => {
    // search for email in database
    User.findOne({ email : req.body.email } , (err , data) => {
        if(err){
            // this will be work if some error happen until fetch data
            console.error(`save error : ${err}`);
            res.json({status : 'save error' , error : err.errmsg || err.message});
        } else if(!data){
            // this will be work if no email like that
            res.json({status : 'user not found'});
        } else {
            data.comparePassword(data.password , req.body.password , (err , result) => {
                if(err || !result){
                    // this will be work if password not match
                    res.json({status : 'password not correct'});
                } else {
                    // this will be work if email and password is exist in database
                    // generate token
                    jwt.sign({_id : data._id} , process.env.SECRET_KEY , {expiresIn : 60 * 60 * 24} , async (err , token) => {
                        if(err) {
                            // this is nu-expexted error
                            res.json({status : 'token gen-error'});
                        } else {
                            data = data.toObject();
                            delete data['password'];
                            delete data['__v'];
                            res.json({status : 'done', data , token});
                        }
                    });
                }
            });
        }
    });
});

// create new user acount 
router.post('/signup' , ( req, res ) => {
    // create instance of user and set data it
    console.log(req.body , 'req.body');
    let user = new User(req.body);
    // save user data in database
    user.save((err) => {
        if(err) {
            // this will be work if some error happen until save data
            // error may be data missing or connection broken or some thing didn't expectd
            console.error(`save error : ${err}`);
            res.json({status : 'save error' , error : err.errmsg || err.message});
        } else {
            // this will be work if data saved successfully
            res.json({status : 'done'});
        }
    });
});


module.exports = router;