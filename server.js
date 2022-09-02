
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
require('dotenv').config();

// Initialize express app.
const app = express();

const PORT = process.env.PORT || 3001;

// Setup Express middle-ware.
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);

// establishing connection to the mongo DB
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Success!!');
    }).catch (err => console.log(err));

// Start server. 
app.listen(PORT, () => console.log('server started successfully'));