const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const controller = require('./emergencyContacts.controller');
const { createContactSchema, updateContactSchema } = require('./emergencyContacts.schemas');

const router = express.Router();
router.use(auth);

router.get('/', controller.list);
router.post('/', validate(createContactSchema), controller.create);
router.put('/:id', validate(updateContactSchema), controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
