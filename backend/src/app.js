const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./modules/auth/auth.routes');
const patientsRoutes = require('./modules/patients/patients.routes');
const medicalRoutes = require('./modules/medicalRecords/medicalRecords.routes');
const contactsRoutes = require('./modules/emergencyContacts/emergencyContacts.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profile', patientsRoutes);
app.use('/api/v1/medical', medicalRoutes);
app.use('/api/v1/contacts', contactsRoutes);

app.use(errorHandler);

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`LifeSync API en entorno ${env.nodeEnv}`);
  });
}

module.exports = app;
