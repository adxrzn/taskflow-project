let tareas = [];

const obtenerTodas = () => {
    return tareas;
};

const crearTarea = (datos) => {
    if (!datos.titulo || datos.titulo.trim().length < 3) {
        throw new Error('VALIDATION_ERROR');
    }

    const nuevaTarea = {
        id: Date.now(), 
        titulo: datos.titulo.trim(),
        completada: false,
        fechaCreacion: new Date()
    };
    tareas.push(nuevaTarea);
    return nuevaTarea;
};

const eliminarTarea = (id) => {
    const indice = tareas.findIndex(t => t.id === parseInt(id));
    
    if (indice === -1) {
        throw new Error('NOT_FOUND');
    }
    
    tareas.splice(indice, 1);
    return true;
};

module.exports = {
    obtenerTodas,
    crearTarea,
    eliminarTarea
};