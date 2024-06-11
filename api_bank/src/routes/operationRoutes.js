const express = require('express');
const router = express.Router();
const operationController = require('../api/controllers/operationController');
const externalAuthorizingMiddleware = require('../middlewares/externalAuthorizingMiddleware');
router.use(externalAuthorizingMiddleware.authorization)
router.use('/transfer',operationController.transfer);

module.exports = router;