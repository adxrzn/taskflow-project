# Configuración y Uso de Servidores MCP (Paso 5)

## ¿Qué es el Model Context Protocol?
Es un estándar que permite a la IA de Cursor conectar con herramientas externas. He instalado el servidor "filesystem" para que la IA pueda leer, buscar y analizar los archivos de mi proyecto TaskFlow en tiempo real.

## Proceso de Instalación Paso a Paso
1. **Acceso**: Abrí Cursor Settings > Tools & MCP.
2. **Configuración**: Añadí un nuevo servidor personalizado.
3. **Código de servidor**: Configuré el servidor `filesystem` usando el comando `npx -y @modelcontextprotocol/server-filesystem` apuntando a la ruta de mi proyecto.
4. **Validación**: Verifiqué que apareciera el indicador verde de "Connected" en los ajustes.
5. **Autorización**: En el chat, autoricé la ejecución de herramientas mediante el botón "Run" para que la IA leyera los archivos.

## Consultas Realizadas
He verificado el funcionamiento con estas consultas:
* Listado de archivos en la carpeta `ejercicio3`.
* Búsqueda de la palabra 'localStorage' en el código.
* Conteo de funciones con JSDoc en app.js.
* Resumen de la estructura de carpetas de TaskFlow.
* Verificación de enlaces en index.html.

## Utilidad de MCP en Proyectos Reales
Es fundamental para que la IA tenga contexto completo del proyecto. Permite realizar refactorizaciones que afectan a varios archivos y asegurar que la documentación siempre esté sincronizada con el código real sin tener que abrir cada archivo manualmente.