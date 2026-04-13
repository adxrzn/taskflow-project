let tasks = [
  { id: 1, titulo: 'Aprender Express', completada: false },
  { id: 2, titulo: 'Configurar el servidor', completada: true }
];

const obtenerTodas = () => tasks;

const crearTarea = (datos) => {
  const nuevaTarea = {
    id: Date.now(),
    titulo: datos.titulo,
    completada: false
  };
  tasks.push(nuevaTarea);
  return nuevaTarea;
};

module.exports = { obtenerTodas, crearTarea };