const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    fullname : {
        type : String ,
        required : [true , 'fullname is required field']
    } ,
    email : {
        type : String ,
        required : [true , 'email is required field'],
        unique : true,
        validate : {
            validator : (val) => /[a-zA-Z0-9\-\._]+\@[a-zA-Z0-9\-\._]{4,10}\.[a-zA-Z0-9\-\._]{2,6}/.test(val) ,
            message : prope => `${prope.value} : is not email`
        }
    } ,
    password : {
        type : String ,
        required : [true , 'password is required field'],
    } ,
    date : {
        type : Date ,
        default : Date.now()
    } 
});

userSchema.pre('save' , function (next) {
    bcrypt.genSalt(10 , (err , salt) => {
        if(err) next(err);
        bcrypt.hash(this.password , salt , (error ,hash) => {
            if(error) next(error);
            this.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (hash , plane , cb) {
    bcrypt.compare(plane , hash , (err , res) => {
        if(res) cb(null , true);
        else cb(true , false);
    });
};

let User = mongoose.model('User' , userSchema);

module.exports = User;