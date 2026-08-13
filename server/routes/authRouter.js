const {Router} = require('express');
const authController = require('../controllers/authController');
const limiter = require('../middleware/rateLimit')
const authRouter = Router();

authRouter.get('/', authController.getCurrentUser);
authRouter.post('/sign-up',limiter,authController.signUp);
authRouter.post('/log-in',limiter,authController.logIn);
authRouter.post('/log-out',authController.logOut);
module.exports = authRouter;