var express = require('express');
var appRoutes = require('./appcontroller.js');
var router = express.Router();

router.get('/', appRoutes);

module.exports = router;