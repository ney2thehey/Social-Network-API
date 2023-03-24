const router = require('express').Router();
const thoughtRoute = require('./thoughtRoutes');
const userRoute = require('./userRoutes');


router.use('/users', userRoute)
router.use('/thoughts', thoughtRoute)

module.exports=router;
