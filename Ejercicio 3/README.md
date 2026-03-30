Así está organizado el servidor:
- **Rutas:** Aquí defino las URLs de la API (para pedir datos, guardar y borrar).
- **Controladores:** Esta parte recibe los datos que envío desde la web y se asegura de que estén bien antes de pasarlos al servicio. También envía los códigos de estado (como el 200 si va bien o el 400 si hay error).
- **Servicios:** Aquí es donde está el array con los datos y las funciones para manejarlos (guardar, borrar, etc.).

Cosas que he añadido:
- Un **Logger** que me dice por la consola qué petición se está haciendo y cuánto tarda.
- Un **Manejador de Errores** para que el servidor no se caiga si pasa algo raro y para enviar mensajes de error claros (como el 404 si no encuentra algo o el 400 si los datos están mal).
- He usado un archivo **.env** para guardar cosas como el puerto del servidor y que no se suban a GitHub.
