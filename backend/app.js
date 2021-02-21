const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./models/db');
const path = require('path');
const session = require('express-session'); // To made a session
const app = express(); //App Express created
const ESAPI = require('node-esapi');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit'); // To stop brute force

  

// Import the router in the app
const articleRoutes = require('./routes/article');
const userRoutes = require('./routes/auth');
const commentRoutes = require('./routes/comment');

connection.connect((err) => {
    if (err) throw err;
    console.log('Successfully connected to the database.');
});  

/* Permit to connect from all origin */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(ESAPI.middleware()); // To encode url and JS code to block injection attack

app.use(helmet()); // To stop XSS

app.use(session({
    secret: 'JlkjdLKJD25dzajk@zjDz',
    resave: true,
    saveUninitialized: true
}));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.json()); // To apply in all application
app.use(bodyParser.urlencoded({extended : true}));

app.use('/api/auth', userRoutes);
app.use('/api', articleRoutes);
app.use('/api', commentRoutes);

module.exports = app;