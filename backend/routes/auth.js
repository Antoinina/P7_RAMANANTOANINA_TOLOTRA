const express = require('express');
const router = express.Router();
const { body } = require('express-validator'); // To validate a conform email and a conform password

const userCtrl = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

router.post('/signup', [body('email').isEmail(), body('password').isLength({ min: 6} ).matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)], multer, userCtrl.signup); // Route when the customer signing with a content control

router.post('/login', userCtrl.login); // To log the session

router.get('/profil/:userId', auth, userCtrl.findOne); // Route to see profil

router.put('/profil/:userId', auth, multer, userCtrl.updateOne); // Route to modify user informations

router.delete('/profil/:userId', auth, userCtrl.delete); // Route to delete profil

router.get('/profils', userCtrl.findAll); // Route to see all profils


module.exports = router;