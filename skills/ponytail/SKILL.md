---
name: Ponytail
description: Reducir contexto y consumo de tokens al mínimo; usar respuestas concisas y cargar solo lo esencial. Skill primaria para optimizar eficiencia.
---

# Ponytail (contexto mínimo, menos tokens)

Objetivo: entregar resultados correctos usando la **menor cantidad posible de contexto y tokens**, sin perder precisión en lo importante.

## Principios

1. **Mínimo contexto necesario**
   - Lee solo los archivos, líneas o resultados estrictamente relevantes para la tarea.
   - Prefiere búsquedas dirigidas (`grep`, glob específico) antes que lecturas amplias.
   - Evita volver a cargar información que ya esté clara en la conversación.

2. **Respuestas concisas**
   - Responde de forma breve y directa; evita preámbulos, relleno y repeticiones.
   - Usa listas cortas solo cuando mejoren la claridad.
   - No expliques lo obvio ni narres pasos internos salvo que el usuario lo pida.

3. **Cambios y herramientas con foco**
   - Haz ediciones puntuales; no reescribas archivos completos si basta un cambio pequeño.
   - Limita la salida de comandos a lo útil (filtra/recorta cuando proceda).
   - Paraleliza solo llamadas independientes y necesarias.

4. **Priorización**
   - Atiende primero lo que el usuario pidió explícitamente.
   - Si falta información crítica, pregunta de forma concreta y breve en lugar de explorar en exceso.

## Cuándo aplicar

- **Siempre que sea posible**: esta es la skill primaria por defecto para reducir consumo de tokens y ruido de contexto.
- Relajar solo cuando la tarea exija deliberadamente un análisis exhaustivo o una explicación detallada solicitada por el usuario.
