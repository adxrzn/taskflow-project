// Proyecto TaskFlow con asistencia de IA

/**
 * Historial de cálculos de calorías.
 * @type {Array<{
 *   id: number,
 *   calorias: number,
 *   nombrePerfil?: string,
 *   diferenciaRespectoAnterior?: number,
 *   actividadValor?: string,
 *   actividadEtiqueta?: string
 * }>}
 */
let historialCalorias = [];

/**
 * Referencias a elementos del DOM utilizados en la interfaz.
 */
const botonCalcular = document.getElementById("btn-calcular");
const inputEdad = document.getElementById("edad");
const inputPeso = document.getElementById("peso");
const inputAltura = document.getElementById("altura");
const inputNombrePerfil = document.getElementById("nombre-perfil");
const selectGenero = document.getElementById("genero");
const selectActividad = document.getElementById("actividad");
const contenedorResultados = document.getElementById("lista-resultados");
const selectFiltroActividad = document.getElementById("filtro-actividad");
const botonLimpiarTodo = document.getElementById("btn-limpiar-todo");

/**
 * Valida los datos recibidos del formulario para asegurar que son válidos y numéricos.
 *
 * @param {number|string} edad - Edad del perfil.
 * @param {number|string} peso - Peso en kilogramos.
 * @param {number|string} altura - Altura en centímetros.
 * @returns {string|null} Mensaje de error si algo está mal, o null si pasa la validación.
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
 * Calcula la Tasa Metabólica Basal (TMB) según la fórmula de Harris-Benedict.
 *
 * @param {number} edad - Edad del perfil.
 * @param {number} peso - Peso en kilogramos.
 * @param {number} altura - Altura en centímetros.
 * @param {string} genero - Género ("hombre" o "mujer").
 * @returns {number} TMB calculada.
 */
function calcularTMB(edad, peso, altura, genero) {
    let tmb = (10 * peso) + (6.25 * altura) - (5 * edad);
    return (genero === "hombre") ? tmb + 5 : tmb - 161;
}

/**
 * Calcula las calorías de mantenimiento según la TMB y el factor de actividad.
 *
 * @param {number} tmb - Tasa Metabólica Basal.
 * @param {number} factorActividad - Factor de actividad seleccionado.
 * @returns {number} Calorías de mantenimiento redondeadas.
 */
function calcularCaloriasMantenimiento(tmb, factorActividad) {
    return Math.round(tmb * factorActividad);
}

/**
 * Renderiza una tarjeta individual con el resultado de un cálculo en el historial.
 * Permite también borrar el registro correspondiente.
 *
 * @param {Object} registro - Registro de cálculo.
 * @param {number} registro.id - Identificador único del registro.
 * @param {number} registro.calorias - Calorías de mantenimiento.
 * @param {string} [registro.nombrePerfil] - Nombre de perfil asociado.
 * @param {number} [registro.diferenciaRespectoAnterior] - Diferencia respecto al valor anterior.
 * @param {string} [registro.actividadValor] - Valor del tipo de actividad.
 * @param {string} [registro.actividadEtiqueta] - Nombre del tipo de actividad.
 */
function renderizarTarjetaResultado(registro) {
    const tarjeta = document.createElement("div");

    tarjeta.className = "flex justify-between items-center gap-4 p-4 my-2 rounded-xl bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm transition-all";

    let textoDiferencia = "—";
    if (typeof registro.diferenciaRespectoAnterior === "number") {
        if (registro.diferenciaRespectoAnterior > 0) {
            textoDiferencia = `+${registro.diferenciaRespectoAnterior} kcal`;
        } else if (registro.diferenciaRespectoAnterior < 0) {
            textoDiferencia = `${registro.diferenciaRespectoAnterior} kcal`;
        } else {
            textoDiferencia = "0 kcal";
        }
    }

    tarjeta.innerHTML = `
        <div class="flex-1 dark:text-white font-bold flex flex-col">
            <span>🔥 <span>${registro.calorias}</span> kcal</span>
            ${registro.nombrePerfil ? `<span class="mt-1 text-xs font-normal text-slate-500 dark:text-slate-300">👤 ${registro.nombrePerfil}</span>` : ""}
        </div>
        <div class="w-32 text-xs text-right text-slate-600 dark:text-slate-300">
            <span class="font-semibold">↕ ${textoDiferencia}</span><br>
            <span class="text-[0.7rem]">vs. último registro</span>
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
 * Muestra el historial filtrado por tipo de actividad seleccionado.
 * Si el filtro es "todas", muestra todos los registros.
 */
function renderizarHistorialFiltrado() {
    if (!contenedorResultados) return;

    const actividadSeleccionada = selectFiltroActividad ? selectFiltroActividad.value : "todas";
    contenedorResultados.innerHTML = "";

    historialCalorias.forEach((registro) => {
        const coincideActividad =
            actividadSeleccionada === "todas" ||
            registro.actividadValor === actividadSeleccionada;

        if (coincideActividad) {
            renderizarTarjetaResultado(registro);
        }
    });
}

/**
 * Elimina una tarjeta visual y el registro correspondiente del historial.
 * Sincroniza el cambio en LocalStorage.
 *
 * @param {number} id - ID del registro a eliminar.
 * @param {HTMLElement} tarjetaElemento - Elemento visual a eliminar.
 */
function eliminarTarjetaDeHistorial(id, tarjetaElemento) {
    tarjetaElemento.remove();
    historialCalorias = historialCalorias.filter(item => item.id !== id);
    localStorage.setItem("misCalculos", JSON.stringify(historialCalorias));
}

/**
 * Limpia todos los campos del formulario de entrada.
 */
function limpiarFormulario() {
    inputEdad.value = "";
    inputPeso.value = "";
    inputAltura.value = "";
    if (inputNombrePerfil) {
        inputNombrePerfil.value = "";
    }
}

/**
 * Controlador del evento click para calcular calorías y guardar el resultado.
 * Obtiene y valida los datos del formulario, calcula el resultado, lo almacena y actualiza la UI.
 */
botonCalcular.addEventListener("click", function () {
    const edadValor = inputEdad.value.trim();
    const pesoValor = inputPeso.value.trim();
    const alturaValor = inputAltura.value.trim();
    const nombrePerfilValor = inputNombrePerfil ? inputNombrePerfil.value.trim() : "";

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
    const actividadValor = selectActividad.value;
    const actividadEtiqueta =
        selectActividad.options[selectActividad.selectedIndex]?.text || "";

    const tmb = calcularTMB(edad, peso, altura, genero);
    const caloriasMantenimiento = calcularCaloriasMantenimiento(tmb, factorActividad);

    const ultimoRegistro = historialCalorias[historialCalorias.length - 1] || null;
    const diferenciaRespectoAnterior = ultimoRegistro
        ? caloriasMantenimiento - ultimoRegistro.calorias
        : null;

    const nuevoRegistro = {
        id: Date.now(),
        calorias: caloriasMantenimiento,
        nombrePerfil: nombrePerfilValor,
        diferenciaRespectoAnterior,
        actividadValor,
        actividadEtiqueta
    };

    historialCalorias.push(nuevoRegistro);
    localStorage.setItem("misCalculos", JSON.stringify(historialCalorias));
    renderizarHistorialFiltrado();
    limpiarFormulario();
});

/**
 * Carga y renderiza los cálculos previos almacenados en LocalStorage.
 */
function cargarHistorialDeLocalStorage() {
    const datosGuardados = localStorage.getItem("misCalculos");
    if (datosGuardados) {
        historialCalorias = JSON.parse(datosGuardados);
        renderizarHistorialFiltrado();
    }
}
cargarHistorialDeLocalStorage();

/**
 * Listener que renderiza el historial nuevamente al cambiar el filtro de actividad.
 */
if (selectFiltroActividad) {
    selectFiltroActividad.addEventListener("change", renderizarHistorialFiltrado);
}

/**
 * Permite al usuario borrar todo el historial de cálculos, previa confirmación.
 * Borra la información del array y de LocalStorage, limpiando también la UI.
 */
if (botonLimpiarTodo) {
    botonLimpiarTodo.addEventListener("click", function () {
        const confirmado = confirm("¿Seguro que quieres borrar todo el historial de cálculos? Esta acción no se puede deshacer.");
        if (!confirmado) return;

        historialCalorias = [];
        localStorage.removeItem("misCalculos");
        if (contenedorResultados) {
            contenedorResultados.innerHTML = "";
        }
    });
}

/**
 * Permite alternar entre modo oscuro y modo claro en la aplicación.
 */
document.getElementById('btn-dark').onclick = function () {
    document.documentElement.classList.toggle('dark');
};
