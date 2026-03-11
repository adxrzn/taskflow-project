// Proyecto TaskFlow con asistencia de IA

/**
 * Arreglo para almacenar el historial de cálculos de calorías.
 * @type {Array<{id: number, calorias: number}>}
 */
let historialCalorias = [];

/**
 * Obtiene referencias a los elementos del DOM relacionados con el formulario.
 */
const botonCalcular = document.getElementById("btn-calcular");
const inputEdad = document.getElementById("edad");
const inputPeso = document.getElementById("peso");
const inputAltura = document.getElementById("altura");
const selectGenero = document.getElementById("genero");
const selectActividad = document.getElementById("actividad");
const contenedorResultados = document.getElementById("lista-resultados");

/**
 * Valida los datos del formulario para asegurarse de que sean numéricamente válidos.
 * @param {number} edad 
 * @param {number} peso 
 * @param {number} altura 
 * @returns {string|null} Mensaje de error si hay fallo, o null si todo está bien
 */
function validarFormulario(edad, peso, altura) {
    if (
        edad === "" || peso === "" || altura === "" ||
        isNaN(edad) || isNaN(peso) || isNaN(altura)
    ) {
        return "Te falta algún dato para seguir tu camino Zen.";
    }
    if (
        Number(edad) < 3 || Number(edad) > 95 ||
        Number(peso) < 30 || Number(peso) > 200 ||
        Number(altura) < 115 || Number(altura) > 210
    ) {
        return "Introduce datos reales, por favor. ¡Sé un verdadero Zen!";
    }
    if (
        Number(edad) < 0 || Number(peso) < 0 || Number(altura) < 0
    ) {
        return "No se permiten valores negativos.";
    }
    return null;
}

/**
 * Calcula la Tasa Metabólica Basal (TMB) en base a los datos obtenidos.
 * @param {number} edad 
 * @param {number} peso 
 * @param {number} altura 
 * @param {string} genero 
 * @returns {number} TMB calculada
 */
function calcularTMB(edad, peso, altura, genero) {
    let tmb = (10 * peso) + (6.25 * altura) - (5 * edad);
    return (genero === "hombre") ? tmb + 5 : tmb - 161;
}

/**
 * Calcula las calorías de mantenimiento en función de la TMB y el factor de actividad.
 * @param {number} tmb 
 * @param {number} factorActividad 
 * @returns {number} Calorías de mantenimiento redondeadas
 */
function calcularCaloriasMantenimiento(tmb, factorActividad) {
    return Math.round(tmb * factorActividad);
}

/**
 * Renderiza una tarjeta de resultados en el DOM y añade los listeners para eliminación.
 * @param {{id: number, calorias: number}} registro 
 */
function renderizarTarjetaResultado(registro) {
    const tarjeta = document.createElement("div");

    tarjeta.className = "flex justify-between items-center p-4 my-2 rounded-xl bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm transition-all";
    tarjeta.innerHTML = `
        <div class="dark:text-white font-bold">
            🔥 <span>${registro.calorias}</span> kcal
        </div>
        <button class="btn-borrar bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg transition-colors text-xs font-bold uppercase">
            Eliminar
        </button>
    `;
    tarjeta.querySelector(".btn-borrar").addEventListener("click", function () {
        eliminarTarjetaDeHistorial(registro.id, tarjeta);
    });

    contenedorResultados.appendChild(tarjeta);
}

/**
 * Elimina una tarjeta de la UI y del historial (con actualización de LocalStorage).
 * @param {number} id 
 * @param {HTMLElement} tarjetaElemento 
 */
function eliminarTarjetaDeHistorial(id, tarjetaElemento) {
    tarjetaElemento.remove();
    historialCalorias = historialCalorias.filter(item => item.id !== id);
    localStorage.setItem("misCalculos", JSON.stringify(historialCalorias));
}

/**
 * Limpia los campos de entrada del formulario.
 */
function limpiarFormulario() {
    inputEdad.value = "";
    inputPeso.value = "";
    inputAltura.value = "";
}

/**
 * Evento click para calcular calorías, validar, guardar y mostrar el registro.
 */
botonCalcular.addEventListener("click", function () {
    const edadValor = inputEdad.value.trim();
    const pesoValor = inputPeso.value.trim();
    const alturaValor = inputAltura.value.trim();

    const edad = Number(edadValor);
    const peso = Number(pesoValor);
    const altura = Number(alturaValor);

    const mensajeError = validarFormulario(edadValor, pesoValor, alturaValor);

    if (mensajeError) {
        alert(mensajeError);
        return;
    }

    const genero = selectGenero.value;
    const factorActividad = parseFloat(selectActividad.value);

    const tmb = calcularTMB(edad, peso, altura, genero);
    const caloriasMantenimiento = calcularCaloriasMantenimiento(tmb, factorActividad);

    const nuevoRegistro = {
        id: Date.now(),
        calorias: caloriasMantenimiento
    };

    historialCalorias.push(nuevoRegistro);
    localStorage.setItem("misCalculos", JSON.stringify(historialCalorias));
    renderizarTarjetaResultado(nuevoRegistro);
    limpiarFormulario();
});

/**
 * Carga el historial de registros guardados en LocalStorage y los renderiza al cargar la página.
 */
function cargarHistorialDeLocalStorage() {
    const datosGuardados = localStorage.getItem("misCalculos");
    if (datosGuardados) {
        historialCalorias = JSON.parse(datosGuardados);
        historialCalorias.forEach(registro => renderizarTarjetaResultado(registro));
    }
}
cargarHistorialDeLocalStorage();

/**
 * Permite cambiar el modo oscuro/claro en la aplicación.
 */
document.getElementById('btn-dark').onclick = function () {
    document.documentElement.classList.toggle('dark');
};
