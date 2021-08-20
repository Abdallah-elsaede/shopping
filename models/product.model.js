const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name : {
        type : String ,
        required : [true , 'name is required field']
    } ,
    image : {
        type : String ,
        required : [true , 'image is required field'],
    } ,
    page : {
        type : mongoose.Types.ObjectId,
        ref : 'Page'
    },
    price : {
        type : String ,
        required : [true , 'price is required field'],
    } ,
    description : {
        type : String ,
        required : [true , 'description is required field'],
    } ,
    url : {
        type : String ,
        required : [true , 'url is required field'],
    } ,
    date : {
        type : Date ,
        default : Date.now()
    },
    deleted : {
        type : Boolean ,
        default : false
    }
});
let Product = mongoose.model('Product' , productSchema);

module.exports = Product;