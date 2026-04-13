const taskService = require('../services/task.service');

const getTasks = (req, res) => {
  const tasks = taskService.obtenerTodas();
  res.json(tasks);
};

const createTask = (req, res) => {
  const { titulo } = req.body;
  if (!titulo) {
    return res.status(400).json({ error: "Falta el título" });
  }
  const nueva = taskService.crearTarea({ titulo });
  res.status(201).json(nueva);
};

module.exports = { getTasks, createTask };