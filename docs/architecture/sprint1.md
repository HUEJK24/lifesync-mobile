# Arquitectura Sprint 1

## Sistema (cliente-servidor)
- App móvil (React Native + Expo) consume API del backend mediante cliente HTTP con interceptor JWT.
- Backend (Node.js + Express) expone rutas REST, valida JWT y datos, y accede a PostgreSQL.
- Base de datos PostgreSQL con tablas de usuarios y perfil base.

## Frontend (Clean Architecture)
- **Presentation:** pantallas (Welcome, Login, Register, Home y módulos), componentes y hooks (`useAuth`).
- **Core:** configuración, navegación pública/privada, cliente Axios, almacenamiento seguro de token (SecureStore).
- **Data:** clientes remotos para autenticación y recursos médicos.
- **Domain/Patterns:** estructura preparada para casos de uso y patrones.

## Backend (capas y módulos)
- **Routes:** definición de endpoints (`auth`, `profile`, `medical`, `contacts`).
- **Middlewares:** autenticación JWT, validación Zod, manejo centralizado de errores.
- **Controllers/Services/Repositories:** separación de responsabilidades por módulo.
- **Database:** conexión PostgreSQL mediante Singleton (`pg.Pool`).

## Seguridad base (Sprint 1)
- Contraseñas con hash (`bcrypt`).
- JWT firmado con secreto en variables de entorno.
- Token almacenado en SecureStore en el dispositivo.
- Validación de entradas y rutas protegidas.
