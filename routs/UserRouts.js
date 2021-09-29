const Router = require('express');
const authMiddleware = require('../middlewear/AuthMiddleware');
const updateMiddleware = require('../middlewear/UpdateMiddlewear');
const userController = require('../controllers/UserControllers');
const router = new Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.put('/', updateMiddleware, userController.update);

module.exports = router;
