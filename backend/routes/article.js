const express = require('express');
const router = express.Router(); // Creation of router Express
const articleCtrl = require('../controllers/article.controller');

const auth = require('../middleware/auth');
const { route } = require('./auth');

router.post('/articles', articleCtrl.create); // To publish an article

router.get('/articles', articleCtrl.findAll); // To see all articles

router.put('/articles/:id', articleCtrl.udpateOne); // To modify an article

router.delete('/articles/:id', articleCtrl.delete); // To delete an article

module.exports = router;