const router = require('express')();
const Page = require('../models/page.model');
const verifyToken = require('../verifying');

router.post('/new' , verifyToken , ( req, res ) => {
    let page = new Page(req.body);
    page.save((err) => {
        if(err) {
            console.error(`save error : ${err}`);
            res.json({status : 'save error' , error : err.errmsg || err.message});
        } else {
            res.json({status : 'done'});
        }
    });
});

router.post('/update' , verifyToken , ( req, res ) => {
    Page.updateOne({ _id : req.body._id} , req.body , (err , data) => {
        if(err) {
            console.log(`updating error : ${err}`);
            res.json({status : 'updating error' , error : err.errmsg || err.message});
        } else {
            res.json({status : 'done'});
        }
    });
});

router.get('/all' , ( req, res ) => {
    Page.find( {deleted : false} , (err , data) => {
        console.log(data , 'data');
        if(err) {
            console.error(`save error : ${err}`);
            res.json({status : 'save error' , error : err.errmsg || err.message});
        } else {
            res.json({status : 'done' , data : data});
        }
    });
});


module.exports = router;