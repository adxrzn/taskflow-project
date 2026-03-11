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

# Ingeniería de Prompts en TaskFlow (Paso 6)

En este paso he experimentado con diferentes técnicas para obtener mejores resultados de la IA de Cursor.

## 1. Prompts con Definición de Rol
* **Prompt:** "Actúa como un Desarrollador Senior de Frontend experto en accesibilidad. Revisa mi `index.html` y dime qué etiquetas ARIA faltan."
* **Por qué funciona:** Al darle un rol, la IA prioriza estándares profesionales y buenas prácticas sobre soluciones rápidas.

## 2. Prompts con Razonamiento Paso a Paso (Chain of Thought)
* **Prompt:** "Analiza la función de cálculo de calorías. Piensa paso a paso cómo podríamos optimizarla para que sea más modular y explícame tu lógica antes de escribir el código."
* **Por qué funciona:** Obliga a la IA a verificar su propia lógica antes de generar código, evitando errores de cálculo.

## 3. Prompts con Restricciones Claras
* **Prompt:** "Refactoriza el botón de borrar en `app.js`. Restricción: No uses librerías externas, mantén el código por debajo de 10 líneas y usa solo Vanilla JavaScript."
* **Por qué funciona:** Las restricciones limitan la creatividad innecesaria de la IA y fuerzan soluciones eficientes.

## 4. Few-Shot Prompting (Con ejemplos)
* **Prompt:** "Genera comentarios JSDoc para esta función siguiendo este ejemplo: [EJEMPLO]. Ahora haz lo mismo para mi función `calcularMacros()`."
* **Por qué funciona:** Los ejemplos ayudan a la IA a entender exactamente el formato y el tono que esperamos.

## 5. Prompt de Debugging Experto
* **Prompt:** "Actúa como un Ingeniero de QA. Encuentra 3 posibles fallos críticos en la persistencia de datos de mi `localStorage` y propón soluciones."
* **Por qué funciona:** Cambia el enfoque de la IA de 'crear' a 'criticar/mejorar', encontrando errores que antes ignoraba.

## 6. Prompt de Documentación Técnica
* **Prompt:** "Genera un archivo README.md profesional para este proyecto. Incluye secciones de Instalación, Tecnologías y una guía de contribución."
* **Por qué funciona:** Contextualiza el proyecto globalmente para terceros.

## 7. Optimización de Rendimiento
* **Prompt:** "Identifica cuellos de botella en el renderizado de la tabla de historial y optimiza el DOM para que sea más rápido."
* **Por qué funciona:** Se enfoca en la eficiencia técnica del navegador.

## 8. Adaptación de Estilo Visual
* **Prompt:** "Aplica estilos CSS siguiendo una paleta de colores minimalista (blancos, grises y un color de acento azul). No uses degradados."
* **Por qué funciona:** Define una estética cerrada para evitar diseños caóticos.

## 9. Explicación de Código para Principiantes
* **Prompt:** "Explícame cómo funciona el Event Listener del modo noche como si yo fuera un estudiante de primer día de programación."
* **Por qué funciona:** Útil para entender conceptos complejos de forma sencilla.

## 10. Generación de Casos de Prueba
* **Prompt:** "Crea una lista de 5 valores de prueba (edge cases) para la calculadora que podrían romper la lógica (ej: letras, números gigantes, campos vacíos)."
* **Por qué funciona:** Ayuda a blindar la aplicación contra entradas de usuario inesperadas.