const Router = require('express');
const authMiddleware = require('../middlewear/AuthMiddleware');
const userController = require('../controllers/UserControllers');
const router = new Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.put('/', authMiddleware, userController.update);

module.exports = router;
