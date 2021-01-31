const express = require('express');
const router = express.Router(); // Creation of router Express
const articleCtrl = require('../models/Article');

const auth = require('../middleware/auth');



module.exports = router;