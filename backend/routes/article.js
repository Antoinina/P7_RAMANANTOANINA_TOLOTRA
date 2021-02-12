const express = require('express');
const router = express.Router(); // Creation of router Express
const articleCtrl = require('../controllers/article.controller');

const auth = require('../middleware/auth');
const { route } = require('./auth');

router.post('/articles', auth, articleCtrl.create); // To publish an article

router.get('/articles', auth, articleCtrl.findAll); // To see all articles

router.put('/articles/:id', auth, articleCtrl.udpateOne); // To modify an article

router.delete('/articles/:id', auth, articleCtrl.delete); // To delete an article

module.exports = router;