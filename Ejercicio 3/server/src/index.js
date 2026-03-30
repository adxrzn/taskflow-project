const express = require('express');
const cors = require('cors');
const env = require('./config/env'); 
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const inicio = performance.now();
  
  res.on('finish', () => { 
    const duracion = performance.now() - inicio;
    console.log(`[${req.method}] ${req.originalUrl} - Estado: ${res.statusCode} (${duracion.toFixed(2)}ms)`);
  });
  
  next();
});

app.use('/api/v1/tasks', taskRoutes); 

app.get('/', (req, res) => {
    res.send('Servidor de TaskFlow funcionando ✅');
});

app.use((err, req, res, next) => {
    console.error(`[SYSTEM ERROR]: ${err.message}`);

    if (err.message === 'NOT_FOUND') {
        return res.status(404).json({ error: 'Recurso no encontrado' });
    }

    if (err.message === 'VALIDATION_ERROR') {
        return res.status(400).json({ 
            error: 'Fallo de validación', 
            message: 'El título debe tener al menos 3 caracteres.' 
        });
    }

    res.status(500).json({ 
        error: 'Error interno del servidor',
        message: 'Algo ha fallado en el motor asíncrono, estamos en ello 🛠️'
    });
});

const PORT = env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor escuchando en: http://localhost:${PORT}`);
});