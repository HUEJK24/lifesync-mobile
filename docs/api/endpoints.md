# Documentación de API (Sprint 1 y 2)

## Autenticación (`/api/v1/auth`)
- `POST /register` — Registro de usuario.
  - Body: `{ name, email, password }`
  - 201: `{ user: { id, name, email, created_at }, token }`
  - 409: correo ya registrado. 400: datos inválidos.
- `POST /login` — Inicio de sesión.
  - Body: `{ email, password }`
  - 200: `{ user, token }`
  - 401: credenciales inválidas.
- `GET /me` — Usuario autenticado (Bearer JWT).
  - 200: `{ user: { id, email } }`

## Perfil médico (`/api/v1/profile`, protegido)
- `GET /` — Consultar perfil.
  - 200: `{ profile: { id, user_id, blood_type, birth_date, notes, updated_at } }`
- `PUT /` — Crear/actualizar perfil (tipo de sangre, fecha, notas).
  - Body: `{ blood_type?, birth_date?, notes? }`
  - 200: `{ profile }`

## Historial médico (`/api/v1/medical`, protegido)
### Alergias
- `GET /allergies` — 200 `{ allergies: [] }`
- `POST /allergies` — Body `{ allergen, severity?, reaction?, notes? }` → 201 `{ allergy }`
- `PUT /allergies/:id` — Body igual a POST → 200 `{ allergy }` (solo propietario)
- `DELETE /allergies/:id` — 204 (solo propietario)

### Medicamentos
- `GET /medications` — 200 `{ medications: [] }`
- `POST /medications` — Body `{ name, dosage?, frequency?, notes? }` → 201 `{ medication }`
- `PUT /medications/:id` — 200 `{ medication }` (solo propietario)
- `DELETE /medications/:id` — 204 (solo propietario)

## Contactos de emergencia (`/api/v1/contacts`, protegido)
- `GET /` — 200 `{ contacts: [] }`
- `POST /` — Body `{ name, relationship?, phone, is_primary? }` → 201 `{ contact }`
- `PUT /:id` — 200 `{ contact }` (solo propietario)
- `DELETE /:id` — 204 (solo propietario)

## Seguridad y validación
- Rutas protegidas requieren `Authorization: Bearer <JWT>`.
- Validación de entrada con Zod (400 en datos inválidos).
- Consultas parametrizadas y verificación de propiedad por `user_id` (protección IDOR).
- Manejo centralizado de errores.
