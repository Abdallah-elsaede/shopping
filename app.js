require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.DATABASE_URL_LIVE, {useNewUrlParser: true , useUnifiedTopology : true});

const DB = mongoose.connection;

const port = process.env.PORT || 5000;

// set cors for outside access
app.use(cors());

DB.once('open' , () => {
    
    
    app.use(bodyParser.json({limit : '50mb'}));
    app.use(bodyParser.urlencoded({limit : '50mb' , extended : true}));
    // set user controller
    app.use('/user' , require('./controlers/user.controller'));
    app.use('/page' , require('./controlers/pages.controller'));
    app.use('/product' , require('./controlers/proudcts.controller'));
    
    app.listen(port , (error) => {
        if(error) console.error(`app listen error : ${error}`);
        else console.log(`check --> http://localhost:${port}`);
    })
});
