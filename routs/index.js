const Router = require('express');
const router = new Router();
const userRouter = require('./UserRouts');
const showsRouter = require('./ShowsRouts');

router.use('/user', userRouter);
router.use('/shows', showsRouter);

module.exports = router;
