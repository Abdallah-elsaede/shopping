const router = require('express')();
const Product = require('../models/product.model');
const verifyToken = require('../verifying');
const mongoose = require('mongoose');

router.post('/new' , verifyToken , ( req, res ) => {
    let product = new Product(req.body);
    console.log(req.body , 'req.body');
    product.save((err) => {
        console.log(err , 'err');
        if(err) {
            console.error(`save error : ${err}`);
            res.json({status : 'save error' , error : err.errmsg || err.message});
        } else {
            res.json({status : 'done'});
        }
    });
});

router.post('/update' , verifyToken , ( req, res ) => {
    Product.updateOne({ _id : req.body._id} , req.body , (err , data) => {
        if(err) {
            console.log(`updating error : ${err}`);
            res.json({status : 'updating error' , error : err.errmsg || err.message});
        } else {
            res.json({status : 'done'});
        }
    });
});

router.get('/all/:pageId' , ( req, res ) => {
    const {pageId} = req.params;
    Product.find( {deleted : false , page : pageId} , (err , data) => {
        if(err) {
            console.error(`save error : ${err}`);
            res.json({status : 'save error' , error : err.errmsg || err.message});
        } else {
            res.json({status : 'done' , data : data});
        }
    });
});


module.exports = router;