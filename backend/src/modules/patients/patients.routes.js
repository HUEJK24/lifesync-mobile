const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const controller = require('./patients.controller');
const { updateProfileSchema } = require('./patients.schemas');

const router = express.Router();

router.use(auth);
router.get('/', controller.getProfile);
router.put('/', validate(updateProfileSchema), controller.upsertProfile);

module.exports = router;
