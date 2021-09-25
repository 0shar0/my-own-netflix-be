const Router = require('express');
const router = new Router();
const userRouter = require('./UserRouts');
const showsRouter = require('./ShowsRouts');
const peopleRouter = require('./PeopleRouts');

router.use('/user', userRouter);
router.use('/shows', showsRouter);
router.use('/people', peopleRouter);

module.exports = router;
