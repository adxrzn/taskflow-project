function mostrarFeedback(mensaje, tipo = 'info') {
    const contenedor = document.getElementById('feedback-sistema') || document.createElement('div');
    contenedor.id = 'feedback-sistema';
    contenedor.className = `fixed bottom-5 right-5 p-4 rounded-lg shadow-lg text-white transition-all ${
        tipo === 'error' ? 'bg-red-600' : tipo === 'loading' ? 'bg-blue-600' : 'bg-green-600'
    }`;
    contenedor.innerHTML = mensaje;
    document.body.appendChild(contenedor);

    if (tipo !== 'loading') {
        setTimeout(() => contenedor.remove(), 3000);
    }
}

async function cargarDesdeServidor() {
    mostrarFeedback('Conectando con el servidor...', 'loading');
    try {
        const respuesta = await fetch(API_URL);
        
        if (!respuesta.ok) throw new Error('Error en la respuesta del servidor');

        historialCalorias = await respuesta.json();
        renderizarHistorialFiltrado();
        
        document.getElementById('feedback-sistema')?.remove();
    } catch (error) {
        mostrarFeedback('Error de red: No se pudo obtener el historial', 'error');
    }
}

async function guardarEnServidor(nuevoRegistro) {
    mostrarFeedback('Guardando...', 'loading');
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo: JSON.stringify(nuevoRegistro) })
        });

        const datos = await respuesta.json();

        if (respuesta.status === 201) {
            mostrarFeedback('Registro guardado en el servidor');
            await cargarDesdeServidor();
        } else if (respuesta.status === 400) {
            mostrarFeedback(`⚠️ ${datos.message}`, 'error');
        }
    } catch (error) {
        mostrarFeedback('Error crítico al guardar', 'error');
    }
}