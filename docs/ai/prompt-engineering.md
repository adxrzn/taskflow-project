# Prompt Engineering. 
Registro de experimentos con diferentes tipos de prompts para mejorar mi código.

# Refactorización de TaskFlow (Paso 4)

## Estrategia de Refactorización
Se ha utilizado Cursor para realizar una limpieza profunda del código de la calculadora nutricional, enfocándose en la legibilidad y la robustez.

## Mejoras implementadas
* **Validaciones:** Ahora el formulario impide cálculos con valores incoherentes (pesos o alturas negativas).
* **JSDoc:** Se ha añadido documentación técnica en formato JSDoc a todas las funciones principales para facilitar el mantenimiento.
* **Simplificación:** Se han reducido funciones repetitivas de manipulación del DOM en una única función de renderizado.
* **Nomenclatura:** Se han cambiado nombres genéricos por términos descriptivos (ej. de `val` a `valorCalorico`).

## Ejemplo de Prompt
"Refactoriza este archivo: mejora nombres de variables, añade validaciones al formulario, simplifica funciones largas y añade comentarios JSDoc."