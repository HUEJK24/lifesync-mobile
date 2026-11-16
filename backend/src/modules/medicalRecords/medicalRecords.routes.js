const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const controller = require('./medical.controller');
const { allergySchema, allergyUpdateSchema, medicationSchema, medicationUpdateSchema } = require('./medical.schemas');

const router = express.Router();
router.use(auth);

router.get('/allergies', controller.listAllergies);
router.post('/allergies', validate(allergySchema), controller.createAllergy);
router.put('/allergies/:id', validate(allergyUpdateSchema), controller.updateAllergy);
router.delete('/allergies/:id', controller.deleteAllergy);

router.get('/medications', controller.listMedications);
router.post('/medications', validate(medicationSchema), controller.createMedication);
router.put('/medications/:id', validate(medicationUpdateSchema), controller.updateMedication);
router.delete('/medications/:id', controller.deleteMedication);

module.exports = router;
