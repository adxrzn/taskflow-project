const taskService = require('../services/task.service');

const obtenerTareas = (req, res) => {
    const tareas = taskService.obtenerTodas();
    res.status(200).json(tareas);
};

const crearTarea = (req, res) => {
    const { titulo } = req.body;

    if (!titulo || typeof titulo !== 'string' || titulo.trim().length < 3) {
        return res.status(400).json({ 
            error: "El título es obligatorio y debe tener al menos 3 caracteres." 
        });
    }

    const nuevaTarea = taskService.crearTarea({ titulo });
    res.status(201).json(nuevaTarea);
};

const eliminarTarea = (req, res) => {
    const { id } = req.params;

    try {
        taskService.eliminarTarea(id);
        res.status(204).send();
    } catch (error) {
        if (error.message === 'NOT_FOUND') {
            return res.status(404).json({ error: "Tarea no encontrada" });
        }
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = {
    obtenerTareas,
    crearTarea,
    eliminarTarea
};