# Arquitectura y alcance Sprint 2

## Backend
- **Módulos:** `patients` (perfil/tipo de sangre), `medicalRecords` (alergias, medicamentos), `emergencyContacts`.
- **Capas:** rutas → auth/validación (Zod) → controladores → repositorios → PostgreSQL.
- **Seguridad:** endpoints protegidos con JWT, consultas parametrizadas, autorización por propietario (`user_id`) para evitar IDOR.
- **Datos:** tablas con claves foráneas, restricciones e índices (`migrations/002_medical.sql`).

## Frontend móvil
- **Pantallas:** Perfil médico, Alergias, Medicamentos, Contactos de emergencia, Vista de emergencia.
- **Integración:** cliente Axios con interceptor JWT, servicios remotos por recurso, manejo de respuestas/errores.
- **Formularios y UX:** validación local (Zod), estados de carga/vacío/error, tarjetas/componentes de visualización.
- **Preparación sensores:** componentes visuales base para cámara y GPS (`SensorPlaceholders`).

## Evidencias en repositorio
- Documentación de endpoints: `docs/api/endpoints.md`.
- Colección Postman Sprint 2 (casos positivos y negativos): `docs/testing/postman_sprint2_collection.json`.
- Pruebas de validación/seguridad: `backend/tests/medical.validation.test.js`.
