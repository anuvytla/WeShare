const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thougthRoutes');

route.use('/users', userRoutes);
route.use('/thoughts', thoughtRoutes);


module.exports = router;