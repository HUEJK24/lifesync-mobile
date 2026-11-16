const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const controller = require('./auth.controller');
const { registerSchema, loginSchema } = require('./auth.schemas');

const router = express.Router();

router.post('/register', validate(registerSchema), controller.register);
router.post('/login', validate(loginSchema), controller.login);
router.get('/me', auth, controller.me);

module.exports = router;
