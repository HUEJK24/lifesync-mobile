---
name: Emil Kowalski UI/Animation
description: Buenas prácticas de animación e interacción de UI web inspiradas en emilkowal.ski (propósito, frecuencia, velocidad, easing, microinteracciones).
---

# Animación e interacción UI (Emil Kowalski)

Principios prácticos para que las animaciones mejoren la experiencia (predecible, rápida, agradable) en lugar de estorbar.

## 1. Propósito antes de animar
- Pregunta: **¿para qué sirve esta animación?** (explicar, dar feedback, continuidad espacial, o un toque de deleite).
- No animes por decorar: si no aporta claridad o respuesta, sobra.

## 2. Frecuencia de uso
- **Acciones muy frecuentes o iniciadas por teclado**: evita animaciones; prioriza respuesta inmediata (p. ej. menús/comandos usados cientos de veces).
- El deleite funciona cuando la interacción es poco frecuente; en uso diario se vuelve fricción.

## 3. Velocidad y percepción
- Las animaciones de UI deben ser **rápidas** (regla general: < 300 ms). Las rápidas se sienten más responsivas y mejoran la percepción de rendimiento.
- Tooltips: retrasa la primera aparición para evitar activaciones accidentales; una vez abierto un grupo, los siguientes deben aparecer **sin delay ni animación**.

## 4. Easing adecuado
- **Entradas/salidas**: usa `ease-out` (arranque rápido = sensación de respuesta). Evita `ease-in` para UI.
- Las curvas por defecto suelen ser débiles; prefiere curvas `ease-out` personalizadas más enérgicas cuando haga falta.

## 5. Microinteracciones y forma
- **Botones**: feedback inmediato con un leve `scale` en `:active` (p. ej. `0.97`).
- **No animar desde `scale(0)`**: inicia desde ~`0.9+` para que el movimiento sea más natural.
- **Origen consciente** (`transform-origin`): los popovers/menús deben escalar desde su disparador, no desde el centro por defecto.
- **Blur como último recurso**: un poco de `filter: blur()` puede suavizar transiciones difíciles (crossfades) cuando ajustar easing/duración no basta; no es la primera opción.

## 6. Regla de oro
- El objetivo es construir grandes interfaces: **a veces la mejor animación es ninguna**. Optimiza para el uso real del usuario.
