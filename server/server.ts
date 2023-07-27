import {RequestHandler} from "express";
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
require("dotenv").config();

const app = express();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error: any) => {
        console.error('Error connecting to MongoDB:', error);
    });

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '2mb'}));
app.use(cors());

// routes middleware
// app.use('/api', authCheck);
fs.readdirSync('./routes').map((route: string) => app.use('/api', require('./routes/' + route) as RequestHandler))

// port
const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on ${port}`));
