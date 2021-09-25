const Router = require('express');
const router = new Router();
const peopleController = require('../controllers/PeopleController');

router.post('/', peopleController.createPerson);
router.get('/:id', peopleController.currentPerson);
router.get('/', peopleController.allPeople);

module.exports = router;
