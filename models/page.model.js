const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
    name : {
        type : String ,
        required : [true , 'name is required field']
    } ,
    image : {
        type : String ,
        required : [true , 'image is required field'],
    } ,
    description : {
        type : String ,
        required : [true , 'description is required field'],
    } ,
    date : {
        type : Date ,
        default : Date.now()
    } ,
    deleted : {
        type : Boolean ,
        default : false
    }
});
let Page = mongoose.model('Page' , pageSchema);

module.exports = Page;