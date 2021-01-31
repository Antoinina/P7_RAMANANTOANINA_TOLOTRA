const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./models/db');
const path = require('path');

const app = express(); //App Express created

// Import the router in the app
const articleRoutes = require('./routes/article');
const userRoutes = require('./routes/user');

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

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.json()); // To apply in all application

app.use('/api/auth', userRoutes);
app.use('/api/article', articleRoutes);

module.exports = app;