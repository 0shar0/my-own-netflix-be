const Router = require('express');
const router = new Router();
const showsController = require('../controllers/ShowsController');
const checkRole = require('../middlewear/CheckRoleMiddlewear');

router.post('/', checkRole('ADMIN'), showsController.createShow);
router.get('/:id', showsController.currentShow);
router.get('/', showsController.allShows);

module.exports = router;
