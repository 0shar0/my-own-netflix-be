const Router = require('express');
const router = new Router();
const requestController = require('../controllers/RequestController');
const authMiddleware = require('../middlewear/AuthMiddleware');

router.post('/', authMiddleware, requestController.createRequest);
router.get('/', authMiddleware, requestController.getRequest);
router.post('/accept', authMiddleware, requestController.acceptRequest);
router.get('/friends', authMiddleware, requestController.getFriends);
router.delete('/friends', authMiddleware, requestController.deleteFriends);

module.exports = router;
