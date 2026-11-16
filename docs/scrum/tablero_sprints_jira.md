# Tablero Scrum / Jira — LifeSync Mobile

## Configuración del tablero (Scrum)
- **Columnas:** Product Backlog | Sprint Backlog | To Do | In Progress | Code Review | Testing | Done
- **Campos por tarea:** Responsable, Sprint, Historia de usuario, Criterio de aceptación, Evidencia de prueba, Pull Request.
- **Ceremonias base:** planeación de sprint, seguimiento, revisión de avance y retrospectiva; integración continua de cambios y revisión por pares.

## Roles del equipo
| Rol | Integrante | Enfoque principal |
|---|---|---|
| Backend Engineer y seguridad del servidor | Integrante 1 | API, BD, autenticación, validación, seguridad y exportación |
| Frontend Engineer e integración móvil | Integrante 2 | App Expo, navegación, integración API, sesión segura, offline/sync |
| UI/UX Engineer y sensores | Integrante 3 | Flujos/pantallas, formularios, alertas, permisos, cámara y GPS |
| Scrum Master, QA y DevSecOps | Integrante 4 | Gestión Scrum, calidad, pruebas, seguridad, compilaciones y evidencias |

## Estado general por sprint
| Sprint | Objetivo | Estado | Evidencia en repositorio |
|---|---|---|---|
| Sprint 1 | Infraestructura, arquitectura e identidad blindada | **Completado (implementación base en repositorio)** | Backend auth/JWT/Singleton/migraciones, app móvil con navegación y SecureStore, pruebas y colecciones Postman S1, docs arquitectura S1 |
| Sprint 2 | Historial clínico y protección de datos | **Completado (implementación base en repositorio)** | CRUD perfil/alergias/medicamentos/contactos, Zod + IDOR + consultas parametrizadas, pantallas y formularios conectados, Postman/pruebas/docs S2 |
| Sprint 3 | Alertas, sensores y manejo de estados/offline | **Pendiente (planificado)** | Estructura/patrones previstos (`observer`, `stateMachine`, `exports/strategy`) |
| Sprint 4 | Pruebas, hardening y distribución | **Pendiente (planificado)** | Base de pruebas y documentación; cierre de auditorías/artefactos en fase final |

## Historias de usuario y avance
| ID | Historia | Sprint | Responsable principal | Estado |
|---|---|---:|---|---|
| US-01 | Registrarme e iniciar sesión | 1 | Int. 1, Int. 2 | Done (base) |
| US-02 | Sesión almacenada de forma segura | 1 | Int. 2 | Done (base) |
| US-03 | Consultar y actualizar perfil médico | 2 | Int. 1, Int. 2, Int. 3 | Done (base) |
| US-04 | Registrar alergias y medicamentos | 2 | Int. 1, Int. 2, Int. 3 | Done (base) |
| US-05 | Guardar contactos de emergencia | 2 | Int. 1, Int. 2, Int. 3 | Done (base) |
| US-06 | Exportar historial médico | 3 | Int. 1, Int. 2 | To Do |
| US-07 | Recibir alertas y recordatorios | 3 | Int. 3 | To Do |
| US-08 | Usar cámara y GPS con autorización | 3 | Int. 2, Int. 3 | To Do (componentes visuales preparados) |
| US-09 | Consultar historial sin Internet | 3 | Int. 2 | To Do |
| US-10 | Sincronizar al recuperar conexión | 3 | Int. 2 | To Do |
| US-11 | Validar sistema con pruebas automatizadas | 4 | Int. 4 (+equipo) | In Progress (base S1-S2) / To Do (suite completa) |
| US-12 | Generar compilación Release firmada | 4 | Int. 4, Int. 2 | To Do |

## Tablero por sprint y rol (qué hizo, qué hará y avance)

### Sprint 1 — Planeación, arquitectura e identidad blindada
| Rol | Qué hizo (avance realizado) | Qué hará / siguiente foco | Estado |
|---|---|---|---|
| **Integrante 1 — Backend/Seguridad** | Configuró proyecto Express, variables de entorno (`.env.example`), conexión PostgreSQL con Singleton (`pool`), migraciones iniciales, registro/login, hash `bcrypt`, emisión/validación JWT, middleware de autenticación y manejo centralizado de errores. | Mantener endurecimiento de seguridad en S2-S4, soporte a CRUD/IDOR y módulo de exportación (Strategy) en S3. | **Done (base)** |
| **Integrante 2 — Frontend/Integración** | Configuró proyecto Expo y estructura Clean por capas, navegación pública/privada, pantallas de bienvenida/registro/login, servicio de autenticación, almacenamiento de token en SecureStore y cliente Axios con interceptor JWT. | Conectar y ampliar módulos clínicos, almacenamiento local y sincronización offline en S3. | **Done (base)** |
| **Integrante 3 — UI/UX y sensores** | Definió componentes reutilizables y flujo de acceso/perfil, implementó formularios y pantallas base con estados de carga/error/vacío y preparación de campos del perfil médico. | Diseñar/implementar alertas, máquina de estados de permisos y experiencia de cámara/GPS en S3. | **Done (base)** |
| **Integrante 4 — Scrum/QA/DevSecOps** | Configuró base de pruebas (Jest/Supertest), estructura de documentación y colección Postman inicial S1; dejó lineamientos de organización Scrum/GitFlow en planificación. | Completar evidencias de integración, auditorías, pipeline de compilaciones y gestión de tablero/PRs en entorno colaborativo. | **Done (base técnica) / In Progress (gestión operativa)** |

### Sprint 2 — Core de historial clínico y protección
| Rol | Qué hizo (avance realizado) | Qué hará / siguiente foco | Estado |
|---|---|---|---|
| **Integrante 1 — Backend/Seguridad** | Implementó tablas y migraciones de historial (perfil, alergias, medicamentos, contactos) con FK/restricciones/índices; endpoints protegidos CRUD/registro-consulta; validación Zod; consultas parametrizadas; control de propiedad por usuario (IDOR); documentación de endpoints. | Implementar exportación JSON/CSV con patrón Strategy y controles de autorización/formato en S3. | **Done (base)** |
| **Integrante 2 — Frontend/Integración** | Implementó pantallas de perfil, alergias, medicamentos y contactos; integró servicios remotos; mantuvo interceptor JWT; mostró errores de validación/servidor y estados de UI. | Integrar exportación, BD local cifrada, detección de conectividad y sincronización con idempotencia en S3. | **Done (base)** |
| **Integrante 3 — UI/UX y sensores** | Desarrolló componentes de visualización (tarjetas/listados), formularios adaptables, vista de emergencia y componentes visuales preparados para cámara/GPS. | Implementar Observer de alertas, flujo de permisos (State Machine), cámara, GPS y degradación gradual en S3. | **Done (base)** |
| **Integrante 4 — Scrum/QA/DevSecOps** | Añadió colección Postman S2 (positivos/negativos: sin JWT, JWT inválido, datos inválidos) y pruebas de seguridad/validación de módulos médicos; actualizó documentación de arquitectura. | Ejecutar pruebas de integración/regresión en entorno completo, auditorías (npm audit/Snyk), revisión de secretos y compilación de prueba S2/S3. | **In Progress** |

### Sprint 3 — Alertas, sensores nativos y manejo de estados (planificado)
| Rol | Qué hará | Criterio de avance esperado | Estado |
|---|---|---|---|
| **Integrante 1 — Backend/Seguridad** | Crear módulo de exportación con contrato y estrategias JSON/CSV (Strategy), endpoint protegido, validación de formato y protección de contenido exportado. | Exportación autorizada por usuario, segura y validada. | **To Do** |
| **Integrante 2 — Frontend/Integración** | Implementar almacenamiento local protegido, conectividad, cola/sincronización con reintentos e idempotencia, e integración de exportación. | Funcionamiento offline y sincronización sin duplicados. | **To Do** |
| **Integrante 3 — UI/UX y sensores** | Implementar Observer para alertas, pantalla de recordatorios, máquina de estados de permisos, cámara/GPS y degradación gradual ante permisos denegados. | Sensores y permisos controlados sin cierres de la app. | **To Do** |
| **Integrante 4 — Scrum/QA/DevSecOps** | Probar exportación, alertas, permisos, modo avión y recuperación; documentar evidencias y generar compilación de prueba. | Evidencias funcionales y de resiliencia del sprint. | **To Do** |

### Sprint 4 — Pruebas, hardening y distribución (planificado)
| Rol | Qué hará | Criterio de avance esperado | Estado |
|---|---|---|---|
| **Integrante 1 — Backend/Seguridad** | Revisar endpoints/autorización/IDOR/validaciones/errores/entorno, corregir hallazgos y cerrar documentación API final. | Backend seguro y demostrable. | **To Do** |
| **Integrante 2 — Frontend/Integración** | Revisar navegación, sesión segura, interceptor, offline/sync, manejo de errores y preparar compilación Release Android. | App estable, segura y lista para entrega. | **To Do** |
| **Integrante 3 — UI/UX y sensores** | Validar formularios, permisos, degradación gradual, alertas y adaptación visual; preparar recorrido de demostración. | Experiencia consistente y demostrable. | **To Do** |
| **Integrante 4 — Scrum/QA/DevSecOps** | Completar suite de pruebas, auditorías (npm audit/Snyk), verificación de seguridad/comunicación, firma y artefactos (APK/AAB), evidencias y cierre Scrum. | Entregables finales verificados y documentados. | **To Do** |

## Notas de seguimiento Scrum
- El avance "Done (base)" indica implementación y documentación base en repositorio para Sprint 1 y 2; las validaciones en entorno integrado (BD real, dispositivo, auditorías externas, compilaciones firmadas y gestión colaborativa en Jira/GitHub) se registrarán como evidencias al ejecutarse.
- La priorización y paso a `Done` de cada tarea se realiza con criterio de aceptación cumplido, evidencia de prueba y revisión (PR) según la estrategia de trabajo definida.
