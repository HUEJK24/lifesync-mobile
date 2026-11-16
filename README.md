# LifeSync Mobile

## Descripción general
LifeSync Mobile es un proyecto de desarrollo móvil orientado a la gestión segura de información médica personal. La solución contempla una aplicación móvil, un backend y una base de datos relacional, organizados para trabajar por sprints hasta completar el producto final.

Este README funciona como **hoja de ruta base** del proyecto: aquí se define qué se va a crear, cómo se organizará y qué debe completarse en cada sprint. El avance del proyecto se revisará contra este documento.

## Objetivo del proyecto
Construir una aplicación móvil demostrable y segura para:
- Gestionar identidad y acceso de usuarios.
- Consultar y administrar el perfil e historial médico (alergias, medicamentos, tipo de sangre y contactos de emergencia).
- Exportar el historial médico.
- Generar alertas locales y usar capacidades del dispositivo bajo autorización.
- Consultar información local sin conexión y sincronizar cambios al recuperar conectividad.
- Asegurar calidad, seguridad y artefactos de entrega definidos para Android.

## Alcance y enfoque
- **Prioridad:** aplicación Android funcional, segura y demostrable, con backend y base de datos operativos.
- **Trabajo por sprints:** la implementación se realizará de forma incremental (Sprint 1 a Sprint 4).
- **Arquitectura y seguridad transversales:** la separación por capas, los patrones de diseño y las medidas de seguridad se incorporan progresivamente y se consolidan a lo largo del proyecto.

## Arquitectura general del sistema (cliente-servidor)

### Componentes
1. **Aplicación móvil (React Native + Expo)**
   - Presentación, navegación, validaciones, almacenamiento seguro de sesión y almacenamiento local.
2. **Backend (Node.js + Express)**
   - Rutas, middlewares, controladores, servicios y repositorios.
3. **Base de datos (PostgreSQL)**
   - Usuarios, perfiles médicos, alergias, medicamentos, contactos y registros asociados.
4. **Servicios externos previstos**
   - Gestión de imágenes, despliegue del backend y servicios de notificaciones (según integración definida en el proyecto).

### Flujo general de trabajo
1. El usuario interactúa con la aplicación móvil.
2. La aplicación valida los datos localmente.
3. El cliente envía la solicitud al backend mediante comunicación segura.
4. El backend verifica autenticación y permisos.
5. Se validan los datos recibidos.
6. La capa de servicio ejecuta la operación correspondiente.
7. La capa de repositorio consulta o modifica la base de datos.
8. El backend devuelve una respuesta.
9. La aplicación actualiza la interfaz y, cuando corresponda, su almacenamiento local/sincronización.

## Arquitectura del frontend móvil (Clean Architecture por capas)

### Capa 1 — Presentation
- Pantallas, componentes, formularios, navegación y hooks.
- Ejemplos previstos: pantallas de acceso, perfil médico, historial, contactos de emergencia y alertas.

### Capa 2 — Domain
- Entidades, contratos, reglas de negocio y casos de uso.
- Ejemplos previstos: casos de uso de autenticación, consulta/registro de historial, alergias, medicamentos y contactos.

### Capa 3 — Data
- Repositorios, fuentes remotas, almacenamiento local y sincronización.
- Ejemplos previstos: repositorios de autenticación e historial, base de datos local y servicio de sincronización.

### Capa 4 — Core / Infrastructure
- Cliente HTTP, almacenamiento seguro, configuración, manejo de errores, conectividad y servicios nativos.
- Ejemplos previstos: cliente de API, almacenamiento seguro de token, monitor de red e integración con capacidades del dispositivo.

**Regla arquitectónica:** `Presentation` no debe ejecutar consultas SQL ni contener directamente reglas de negocio; los casos de uso operan mediante contratos/repositorios y las implementaciones concretas residen en `Data`.

## Arquitectura del backend (capas y módulos)

### Capas
- **Routes:** definición de endpoints y métodos.
- **Middlewares:** autenticación, autorización, validación y manejo centralizado de errores.
- **Controllers:** recepción de solicitudes y emisión de respuestas.
- **Services:** reglas de negocio.
- **Repositories:** acceso a datos y consultas parametrizadas.
- **Database:** conexión y gestión de acceso a PostgreSQL.

### Módulos funcionales previstos
- Autenticación (`auth`)
- Pacientes/perfil (`patients`)
- Registros médicos (`medicalRecords`)
- Contactos de emergencia (`emergencyContacts`)
- Exportación (`exports`)

## Patrones de diseño previstos
| Patrón | Ubicación prevista | Sprint | Propósito |
|---|---|---:|---|
| Singleton | Backend / conexión a base de datos | 1 | Centralizar la instancia de conexión a PostgreSQL. |
| Repository | Frontend y backend | 1–2 | Separar reglas de negocio del acceso a datos. |
| Observer | Frontend / alertas | 3 | Notificar y gestionar alertas/eventos locales. |
| Strategy | Backend / exportación | 3 | Seleccionar formato de exportación (JSON/CSV). |
| State Machine | Frontend / permisos | 3 | Controlar estados de permisos de cámara y GPS. |

## Seguridad y manejo de datos (transversal)
- **Identidad y autenticación:** contraseñas con hashing fuerte, emisión y validación de tokens de sesión, y almacenamiento seguro del token en el dispositivo.
- **Comunicación:** intercambio de información mediante canales seguros y control de acceso a recursos protegidos.
- **Backend:** validación de entradas, consultas parametrizadas, autorización por propietario de los datos y manejo centralizado de errores.
- **Almacenamiento local:** protección adecuada para información sensible/médica y separación entre secretos de sesión y datos clínicos.

## Estructura general del proyecto

```text
LifeSync-Mobile/
│
├── mobile/
│   ├── src/
│   │   ├── core/
│   │   │   ├── config/
│   │   │   ├── security/
│   │   │   ├── network/
│   │   │   └── navigation/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   ├── contracts/
│   │   │   └── usecases/
│   │   ├── data/
│   │   │   ├── remote/
│   │   │   ├── local/
│   │   │   └── repositories/
│   │   ├── presentation/
│   │   │   ├── screens/
│   │   │   ├── components/
│   │   │   └── hooks/
│   │   └── patterns/
│   │       ├── observer/
│   │       └── stateMachine/
│   ├── app.json
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── database/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── patients/
│   │   │   ├── medicalRecords/
│   │   │   ├── emergencyContacts/
│   │   │   └── exports/
│   │   ├── patterns/
│   │   │   └── strategy/
│   │   ├── utils/
│   │   └── app.js
│   ├── migrations/
│   ├── tests/
│   └── package.json
│
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── security/
│   └── testing/
│
├── .github/
│   └── workflows/
│
└── README.md
```

## Plan de trabajo por sprints

### Sprint 1 — Planeación, arquitectura e identidad blindada
**Objetivo:** establecer infraestructura, arquitectura, base de datos y autenticación segura.

#### Backend
- Crear proyecto Node.js y Express.
- Configurar dependencias, scripts y variables de entorno.
- Conectar PostgreSQL y crear módulo Singleton de conexión.
- Crear migraciones iniciales de base de datos.
- Implementar registro e inicio de sesión de usuarios.
- Aplicar hashing asíncrono de contraseñas.
- Generar y validar tokens de autenticación (JWT) con clave en entorno.
- Crear middleware de autenticación.
- Validar flujo de registro/inicio de sesión.

#### Frontend móvil
- Crear proyecto Expo y configurar navegación.
- Crear estructura de carpetas por capas (core/domain/data/presentation/patterns).
- Crear pantallas de bienvenida, registro e inicio de sesión.
- Implementar servicio de autenticación y cliente HTTP.
- Integrar almacenamiento seguro del token (SecureStore).
- Implementar navegación pública y privada.

#### UI/UX y preparación funcional
- Definir identidad visual y componentes reutilizables.
- Diseñar pantallas de acceso y perfil, y flujo de navegación.
- Crear prototipos de pantallas principales.
- Definir campos del perfil médico y componentes base de formularios/validación.

#### Gestión, calidad y organización
- Configurar repositorio y flujo de trabajo con ramas.
- Definir reglas de revisión e integración.
- Crear tablero Scrum con historias y tareas.
- Configurar base de pruebas y colección inicial de validación funcional.
- Generar primera compilación de prueba.

#### Entregables del Sprint 1
- Repositorio configurado y organizado.
- Arquitectura base de frontend y backend.
- Base de datos conectada y migraciones iniciales.
- Registro e inicio de sesión funcionales.
- Contraseñas almacenadas como hash.
- Token generado/validado y almacenado de forma segura en el dispositivo.
- Navegación pública y privada.
- Tablero Scrum y flujo de trabajo definido.
- Primera compilación de prueba instalada en Android.

#### Criterios de aceptación del Sprint 1
- Usuario puede registrarse e iniciar sesión.
- La contraseña no se almacena en texto plano.
- El backend emite y valida token de sesión.
- La app guarda el token de forma segura.
- Una pantalla protegida no es accesible sin autenticación.
- Existe integración revisada en el repositorio.
- La aplicación abre en un dispositivo Android físico.

### Sprint 2 — Core de historial clínico y protección de datos
**Objetivo:** desarrollar historial médico, operaciones CRUD y comunicación segura entre app y backend.

#### Backend
- Crear tablas/estructuras para pacientes, registros médicos, alergias, medicamentos y contactos de emergencia.
- Definir claves foráneas, restricciones e índices.
- Crear endpoints protegidos para perfil médico, alergias, medicamentos y contactos de emergencia (consulta/registro/actualización según corresponda).
- Crear esquemas de validación (Zod) por solicitud.
- Implementar consultas SQL parametrizadas.
- Implementar protección contra acceso no autorizado a recursos de otros usuarios (IDOR).
- Agregar manejo centralizado de errores.
- Documentar endpoints y respuestas.

#### Frontend móvil
- Crear pantallas y formularios de perfil médico, alergias, medicamentos, tipo de sangre y contactos de emergencia.
- Implementar validación local de formularios.
- Configurar interceptor HTTP global para adjuntar token de autorización.
- Mostrar errores de validación y respuestas del servidor.
- Conectar pantallas con la API.

#### UI/UX
- Diseñar tarjetas y vistas de información médica (incluida vista de emergencia).
- Implementar estados de carga, vacío y error.
- Adaptar formularios y componentes visuales.
- Preparar componentes visuales para cámara y GPS.

#### Gestión y calidad
- Crear/ejecutar pruebas de autenticación y CRUD (positivas y negativas).
- Validar solicitudes sin token, con token inválido/vencido y accesos indebidos entre usuarios.
- Revisar exposición de secretos y dependencias.
- Actualizar tablero y criterios de aceptación.
- Generar compilación de prueba del sprint.

#### Entregables del Sprint 2
- CRUD de historial médico y perfil médico funcional.
- Registro de alergias, medicamentos, tipo de sangre y contactos de emergencia.
- Middleware de autenticación y validaciones en servidor.
- Validación de formularios en móvil.
- Interceptor HTTP global.
- Protección contra IDOR.
- Colección de pruebas funcionales con casos positivos y negativos.

#### Criterios de aceptación del Sprint 2
- Usuario puede crear/consultar/modificar/eliminar registros permitidos.
- Solicitudes protegidas requieren token válido.
- No es posible acceder o modificar datos de otro usuario alterando identificadores.
- Datos inválidos son rechazados.
- Consultas a base de datos son parametrizadas.
- Interceptor agrega token automáticamente.
- Formularios muestran errores antes de enviar datos inválidos.
- Registros se reflejan correctamente en la aplicación.

### Sprint 3 — Alertas, sensores nativos y manejo de estados
**Objetivo:** integrar capacidades del dispositivo, implementar Observer y Strategy, y asegurar funcionamiento con permisos denegados y sin conexión.

#### Backend
- Crear módulo de exportación del historial.
- Definir contrato común de exportación.
- Implementar estrategia de exportación JSON y estrategia CSV (Strategy).
- Implementar contexto/selección de estrategia según formato solicitado.
- Crear endpoint protegido de exportación.
- Verificar autorización (solo exportar historial propio).
- Validar formato solicitado y proteger integridad del contenido exportado.
- Validar exportación funcional.

#### Frontend móvil
- Implementar almacenamiento local del historial con estrategia de protección adecuada para datos médicos.
- Implementar detección de conectividad y servicio de sincronización.
- Guardar operaciones pendientes sin conexión y sincronizar al recuperar conectividad.
- Manejar errores, reintentos y respuestas del servidor.
- Implementar control de duplicados/idempotencia en sincronización.
- Integrar servicio de exportación.
- Validar flujo en ausencia de conectividad.

#### UI/UX, sensores y patrones
- Implementar Observer para alertas/notificaciones locales.
- Crear eventos para recordatorios de medicamentos y pantalla de alertas.
- Implementar máquina de estados de permisos (cámara y GPS).
- Solicitar y gestionar permisos de cámara y ubicación.
- Implementar captura/escaneo de recetas y geolocalización bajo autorización.
- Definir estados: concedido, denegado, restringido y no disponible.
- Implementar degradación gradual y mensajes claros cuando se nieguen permisos.

#### Gestión y calidad
- Probar exportación JSON/CSV y autorización asociada.
- Probar Observer, notificaciones y máquina de estados.
- Probar cámara/GPS con permisos concedidos y denegados.
- Probar funcionamiento sin conexión, recuperación y ausencia de duplicados.
- Actualizar documentación técnica.
- Generar compilación de prueba del sprint.

#### Entregables del Sprint 3
- Exportación JSON y CSV mediante Strategy.
- Alertas locales mediante Observer.
- Máquina de estados de permisos.
- Integración de cámara y GPS con permisos controlados y degradación gradual.
- Funcionamiento básico sin conexión.
- Base de datos local con protección adecuada para datos médicos.
- Cola de sincronización y sincronización al recuperar conectividad.
- Evidencia de validación de permisos, modo sin conexión y sincronización.

#### Criterios de aceptación del Sprint 3
- Usuario puede exportar su historial en JSON y CSV respetando autorización.
- Alertas locales se generan mediante Observer.
- Permisos se solicitan en tiempo de ejecución y sus estados se gestionan correctamente.
- Negar GPS o cámara no provoca cierre ni bloquea el resto de la app.
- Historial local consultable sin conexión.
- Operaciones pendientes se sincronizan al recuperar conectividad sin duplicados.
- Errores de red se manejan de forma controlada.

### Sprint 4 — Pruebas, endurecimiento (hardening) y paquetes de distribución
**Objetivo:** verificar calidad, cerrar vulnerabilidades, preparar demostración y generar artefactos de distribución Android.

#### Backend
- Revisar endpoints, autenticación, autorización y protección contra IDOR.
- Revisar validaciones, consultas parametrizadas, manejo de errores y variables de entorno.
- Corregir vulnerabilidades detectadas.
- Preparar datos de prueba para demostración.
- Documentar API final.

#### Frontend móvil
- Revisar navegación, pantallas, almacenamiento seguro de token y cliente HTTP/interceptor.
- Verificar funcionamiento sin conexión y sincronización.
- Revisar manejo de errores y evitar exposición de datos sensibles en registros.
- Corregir errores funcionales y visuales.
- Preparar compilación Release de Android y verificar instalación/funcionamiento del paquete final.

#### UI/UX y sensores
- Revisar formularios, validaciones y permisos de cámara/GPS.
- Validar degradación gradual y alertas/recordatorios.
- Corregir problemas de interfaz y adaptación a distintos tamaños de pantalla.
- Preparar recorrido de demostración.
- Documentar permisos utilizados.

#### Gestión, QA y seguridad
- Completar y ejecutar suite de pruebas (unitarias, integración y regresión).
- Ejecutar auditorías de dependencias y revisar secretos expuestos.
- Verificar configuración de comunicación segura y restricciones de red en Android.
- Verificar dependencias y estado del proyecto móvil.
- Compilar paquete Release, verificar firma digital y generar artefactos Android.
- Preparar evidencias de tablero, repositorio, pruebas y seguridad.
- Preparar estaciones de evaluación y guion de demostración.
- Elaborar documentación final del proyecto.

#### Entregables del Sprint 4
- Suite de pruebas automatizadas y evidencia de integración/regresión.
- Reportes de auditoría de dependencias y seguridad.
- Configuración de comunicación segura y restricciones de red verificadas.
- Revisión de secretos y variables de entorno.
- APK Release firmado y AAB firmado.
- Documentación de instalación y compilación.
- Tablero Scrum finalizado y repositorio con integraciones revisadas.
- Guion y evidencias para demostración.

#### Criterios de aceptación del Sprint 4
- Pruebas automatizadas finalizan correctamente.
- No quedan vulnerabilidades críticas pendientes sin documentar.
- No hay credenciales/tokens/secretos expuestos en el repositorio.
- La aplicación no realiza comunicaciones inseguras.
- APK Release se instala y funciona en dispositivo físico; AAB firmado y validable.
- Historial médico funciona con y sin conexión.
- Permisos pueden concederse/denegarse sin cierres.
- La documentación permite reproducir la compilación.

## Historias de usuario (referencia)
| ID | Historia de usuario | Sprint |
|---|---|---:|
| US-01 | Como usuario, quiero registrarme e iniciar sesión. | 1 |
| US-02 | Como usuario, quiero que mi sesión se almacene de forma segura. | 1 |
| US-03 | Como usuario, quiero consultar y actualizar mi perfil médico. | 2 |
| US-04 | Como usuario, quiero registrar alergias y medicamentos. | 2 |
| US-05 | Como usuario, quiero guardar contactos de emergencia. | 2 |
| US-06 | Como usuario, quiero exportar mi historial médico. | 3 |
| US-07 | Como usuario, quiero recibir alertas y recordatorios. | 3 |
| US-08 | Como usuario, quiero utilizar cámara y GPS cuando lo autorice. | 3 |
| US-09 | Como usuario, quiero consultar mi historial sin Internet. | 3 |
| US-10 | Como usuario, quiero que mis datos pendientes se sincronicen al recuperar conexión. | 3 |
| US-11 | Como equipo, queremos validar el sistema mediante pruebas automatizadas. | 4 |
| US-12 | Como equipo, queremos generar una compilación Release firmada. | 4 |

## Entregables finales previstos del proyecto
- Aplicación móvil funcional.
- Backend operativo.
- Base de datos PostgreSQL.
- Autenticación y gestión segura de sesión.
- Perfil e historial médico (CRUD y módulos asociados).
- Validaciones, interceptor HTTP y protección de acceso a datos.
- Exportación JSON/CSV (Strategy).
- Alertas locales (Observer) y máquina de estados de permisos.
- Cámara y GPS con permisos controlados y degradación gradual.
- Funcionamiento sin conexión y sincronización.
- Pruebas y reportes de seguridad/calidad.
- Configuración de comunicación segura y restricciones de red.
- Repositorio organizado y tablero Scrum.
- APK Release firmado y AAB firmado.
- Documentación técnica y evidencias de evaluación.

## Criterio de avance
El proyecto se considerará completo cuando se cumplan los entregables y criterios de aceptación definidos para los sprints 1 a 4, y la solución sea demostrable de extremo a extremo conforme a esta planificación.
