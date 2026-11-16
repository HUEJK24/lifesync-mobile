---
name: Mobile First UI
description: Diseño mobile-first y UX móvil: objetivos táctiles, zonas de pulgar, gestos, convenciones iOS/Material, formularios y breakpoints responsivos.
---

# Mobile-first UI / UX móvil

Usar al diseñar o revisar interfaces móviles o responsivas, formularios en móvil, navegación con una mano, o convenciones de plataforma iOS/Android.

## Objetivos táctiles (touch targets)
| Plataforma | Mínimo | Recomendado | Espaciado mín. |
|---|---:|---:|---:|
| iOS | 44×44 pt | 48×48 pt | 8 pt |
| Android | 48×48 dp | 56×56 dp | 8 dp |
| Web | 44×44 px | 48×48 px | 8 px |

- Enlaces de texto: ampliar área clicable con padding (no solo el texto visible).
- Controles en bordes: padding extra (el agarre reduce precisión).
- No depender solo del tamaño visual: usar `min-height`/`min-width` + padding.

## Zona del pulgar (uso con una mano)
- **Primaria (abajo-centro):** acciones principales, barra de pestañas, CTA principal.
- **Secundaria (medio/lados):** contenido y acciones menos frecuentes.
- **Terciaria (esquinas superiores):** ajustes/controles raros. En teléfonos grandes evitar nav arriba-izquierda.

## Convenciones de plataforma
- **iOS (HIG):** tab bar inferior máx. 5 ítems; back/swipe-back; títulos grandes que colapsan; bottom sheets para menús contextuales; grid base 8pt, márgenes 16pt; respetar safe areas (notch/Dynamic Island/home indicator); tipografía SF Pro y Dynamic Type obligatorio; haptics en selección/confirmación/error.
- **Android (Material 3):** bottom nav 3–5 destinos o drawer para 5+; un FAB por pantalla; grid base 4dp, márgenes 16dp; edge-to-edge respetando insets; Roboto/Material Type Scale y color dinámico; soporte de gesto back predictivo.

## Formularios móviles
- **Una sola columna**; etiquetas arriba (o flotantes) funcionan mejor en pantallas pequeñas.
- Teclado por tipo: `type="email|tel|number|search"`; `autocomplete` adecuado.
- Campos de longitud fija con auto-avance (OTP/tarjeta); máscara de entrada; toggle de visibilidad de contraseña.
- Validar **al perder foco** (no en cada tecla); mostrar éxito además de error; errores inline vinculados al campo.
- Reducir fricción: mínimo necesario, login social si aplica, pickers/toggles en lugar de texto libre cuando hay valores conocidos.

## Breakpoints responsivos (mobile-first)
Escribir estilos base para móvil y escalar hacia arriba:
```css
/* Base: móvil */
/* 320px  small phone  */
/* 375px  phone        */ @media (min-width: 375px) { }
/* 428px  large phone  */ @media (min-width: 428px) { }
/* 768px  tablet       */ @media (min-width: 768px) { }
/* 1024px small desktop*/ @media (min-width: 1024px) { }
/* 1440px desktop      */ @media (min-width: 1440px) { }
```
- Tipografía fluida y base **≥ 16px** (evita auto-zoom en iOS), p. ej. `font-size: clamp(1rem, 2.5vw, 1.125rem)`.
- Container queries para componentes cuando aporte.

## Lista antes de entregar UI móvil
- [ ] Interactivos cumplen tamaño táctil mínimo (≥44px/pt).
- [ ] Acciones principales en zona primaria (abajo-centro).
- [ ] Formularios: una columna, teclado correcto por campo, validación en blur.
- [ ] Convenciones de la plataforma objetivo respetadas y safe areas consideradas.
- [ ] Fuente base ≥ 16px.
- [ ] `prefers-reduced-motion` respetado si hay animaciones.
