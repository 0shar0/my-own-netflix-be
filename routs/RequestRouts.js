const Router = require('express');
const router = new Router();
const requestController = require('../controllers/RequestController');
const authMiddleware = require('../middlewear/AuthMiddleware');

router.post('/', authMiddleware, requestController.createRequest);

module.exports = router;
