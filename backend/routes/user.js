const express = require('express');
const router = express.Router();
const { body } = require('express-validator'); // To validate a conform email and a conform password

const userCtrl = require('../models/User');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

router.post('/signup', [body('email').isEmail(), body('password').isLength({ min: 8} ).matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)], multer, userCtrl.create); // Route when the customer signing with a content control

router.post('/login', userCtrl.login); // Route when the user logging

router.get('/user/:id', auth, userCtrl.getUser); // Route to see profile

router.delete('/user/:id', auth, userCtrl.remove); // Route to delete profile

router.put('/user/:id', auth, multer, userCtrl.udpateById); // Route to modify user informations

module.exports = router;