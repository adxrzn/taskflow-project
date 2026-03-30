Glosario técnico del backend
Este documento resume las herramientas clave analizadas para la arquitectura de este proyecto.

Axios
Librería para peticiones HTTP. Aunque usamos fetch, Axios es mejor para proyectos grandes porque convierte datos a JSON automáticamente y permite usar interceptores para gestionar la seguridad de forma centralizada.

Postman / Thunder Client
Herramientas fundamentales para probar la API sin el frontend. Me han servido para forzar errores (400, 404, 500) y comprobar que el servidor responde con los códigos de estado correctos.

Sentry
Plataforma de monitoreo de errores. Su función es avisar al desarrollador en tiempo real si el servidor falla en producción, enviando el detalle exacto del error para poder arreglarlo rápido.

Swagger
Es el estándar para documentar APIs. Genera una página visual donde cualquier programador puede ver qué datos pide cada ruta y qué respuestas esperar sin tener que leer todo el código fuente.