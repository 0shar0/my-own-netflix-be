const Router = require('express');
const router = new Router();
const showsController = require('../controllers/ShowsController');

router.post('/', showsController.createShow);
router.get('/:id', showsController.currentShow);
router.get('/', showsController.allShows);

module.exports = router;
