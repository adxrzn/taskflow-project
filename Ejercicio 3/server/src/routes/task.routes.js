const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// GET http://localhost:3000/api/v1/tasks
router.get('/', taskController.obtenerTareas);

// POST http://localhost:3000/api/v1/tasks
router.post('/', taskController.crearTarea);

// DELETE http://localhost:3000/api/v1/tasks/:id
router.delete('/:id', taskController.eliminarTarea);

module.exports = router;