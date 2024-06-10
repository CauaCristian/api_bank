const express = require('express');
const router = express.Router();
const operationController = require('../api/controllers/operationController');
const externalAuthorizingController = require('../api/controllers/externalAuthorizingController');
router.use(externalAuthorizingController.Authorization)
router.use('/transfer',operationController.transfer);

module.exports = router;