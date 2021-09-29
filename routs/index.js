const Router = require('express');
const router = new Router();
const userRouter = require('./UserRouts');
const showsRouter = require('./ShowsRouts');
const requestRouter = require('./RequestRouts');

router.use('/user', userRouter);
router.use('/shows', showsRouter);
router.use('/request', requestRouter);
module.exports = router;
