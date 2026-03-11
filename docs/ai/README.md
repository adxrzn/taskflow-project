## ZenMacros – Calculadora de Metabolismo

ZenMacros es una calculadora sencilla para estimar tu metabolismo basal (TMB) y las calorías de mantenimiento según edad, peso, altura, género y nivel de actividad.

### Funcionalidades

- **Cálculo de calorías de mantenimiento** a partir de TMB y factor de actividad.
- **Historial persistente**: cada cálculo se guarda en `localStorage` con:
  - Nombre del perfil.
  - Tipo de actividad usado.
  - Diferencia de kcal respecto al registro anterior.
- **Filtros por actividad**: muestra solo registros de personas sedentarias, ligeras o moderadas.
- **Borrado total elegante**: botón “Limpiar todo” con confirmación que vacía el historial y borra los datos del navegador.

### Tecnologías utilizadas

- HTML5, CSS3 y Tailwind CSS (via CDN) para la interfaz y el diseño responsivo con modo oscuro.
- JavaScript vanilla para la lógica de cálculo, manejo del DOM, filtros y `localStorage`.
- Desarrollo asistido con **Cursor** y servidores **MCP** (por ejemplo `user-filesystem`) para explorar y refinar el código de forma rápida durante el desarrollo.

### Ejemplos de uso

- **Seguimiento personal**: guarda varios cálculos con tu nombre de perfil (ej. “Adri – Semana 1”, “Adri – Semana 8”) y observa si tu metabolismo sube o baja con la comparación automática de kcal.
- **Gestión de clientes**: usa distintos nombres de perfil y filtra por actividad (Sedentario, Ligero, Moderado) para ver solo a los clientes que comparten nivel de actividad.
- **Reinicio de ciclo**: cuando quieras empezar de cero, pulsa “Limpiar todo”, confirma, y el historial y los datos guardados se eliminan por completo del navegador.
