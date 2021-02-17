const express = require('express');
const router = express.Router(); // Creation of router Express
const commentCtrl = require('../controllers/comment.controller');

const auth = require('../middleware/auth');

router.post('/comments', auth, commentCtrl.create); // To publish an comments

router.get('/comments',  auth, commentCtrl.findAll); // To see all comments

router.put('/comments/:id',  auth, commentCtrl.udpateOne); // To modify an comments

router.delete('/comments/:id',  auth, commentCtrl.delete); // To delete an comments

module.exports = router;