/**

 * Historial de cálculos de calorías.

 */

let historialCalorias = [];



/**

 * Referencias a elementos del DOM.

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

const seccionExtras = document.getElementById("seccion-extras");



/**

 * Valida los datos del formulario.

 */

function validarFormulario(edad, peso, altura) {

    if (edad === "" || peso === "" || altura === "" || isNaN(edad) || isNaN(peso) || isNaN(altura)) {

        return "Te falta algún dato para seguir tu camino Zen.";

    }

    const e = Number(edad), p = Number(peso), a = Number(altura);

    if (e < 3 || e > 95 || p < 30 || p > 200 || a < 115 || a > 210) {

        return "Introduce datos reales, por favor. ¡Sé un verdadero Zen!";

    }

    return null;

}



/**

 * Crea el elemento HTML de la tarjeta.

 */

function crearTarjetaHTML(registro) {

    const tarjeta = document.createElement("div");

    tarjeta.className = "flex justify-between items-center gap-4 p-4 my-2 rounded-xl bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm transition-all animate-fade-in";



    let textoDif = "—";

    if (registro.diferenciaRespectoAnterior !== null) {

        textoDif = registro.diferenciaRespectoAnterior > 0 ? `+${registro.diferenciaRespectoAnterior} kcal` : `${registro.diferenciaRespectoAnterior} kcal`;

    }



    tarjeta.innerHTML = `

        <div class="flex-1 dark:text-white font-bold flex flex-col">

            <span>🔥 <span>${registro.calorias}</span> kcal</span>

            ${registro.nombrePerfil ? `<span class="mt-1 text-xs font-normal text-slate-500 dark:text-slate-300">👤 ${registro.nombrePerfil}</span>` : ""}

        </div>

        <div class="w-32 text-xs text-right text-slate-600 dark:text-slate-300">

            <span class="font-semibold">↕ ${textoDif}</span><br>

            <span class="text-[0.7rem]">vs. último registro</span>

        </div>

        <button class="btn-borrar bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg transition-colors text-xs font-bold uppercase">Borrar</button>

    `;



    tarjeta.querySelector(".btn-borrar").onclick = () => {

        tarjeta.remove();

        historialCalorias = historialCalorias.filter(item => item.id !== registro.id);

        localStorage.setItem("misCalculos", JSON.stringify(historialCalorias));

        if (historialCalorias.length === 0) seccionExtras.classList.add('hidden');

    };



    return tarjeta;

}



/**

 * Renderiza el historial.

 * Recorremos el array y usamos PREPEND para que el último del array (el más nuevo)

 * quede el primero en el HTML.

 */

function renderizarHistorialFiltrado() {

    if (!contenedorResultados) return;

    const filtro = selectFiltroActividad ? selectFiltroActividad.value : "todas";

    contenedorResultados.innerHTML = "";



    historialCalorias.forEach(reg => {

        if (filtro === "todas" || reg.actividadValor === filtro) {

            const tarjeta = crearTarjetaHTML(reg);

            contenedorResultados.prepend(tarjeta); // Lo pone arriba

        }

    });



    if (seccionExtras) {

        historialCalorias.length > 0 ? seccionExtras.classList.remove('hidden') : seccionExtras.classList.add('hidden');

    }

}



botonCalcular.addEventListener("click", () => {

    const edadV = inputEdad.value.trim();

    const pesoV = inputPeso.value.trim();

    const alturaV = inputAltura.value.trim();

   

    const error = validarFormulario(edadV, pesoV, alturaV);

    if (error) return alert(error);



    const tmb = (10 * Number(pesoV)) + (6.25 * Number(alturaV)) - (5 * Number(edadV));

    const finalTmb = selectGenero.value === "hombre" ? tmb + 5 : tmb - 161;

    const cals = Math.round(finalTmb * parseFloat(selectActividad.value));

   

    const ultimo = historialCalorias[historialCalorias.length - 1] || null;



    const nuevo = {

        id: Date.now(),

        calorias: cals,

        nombrePerfil: inputNombrePerfil.value.trim(),

        diferenciaRespectoAnterior: ultimo ? cals - ultimo.calorias : null,

        actividadValor: selectActividad.value

    };



    historialCalorias.push(nuevo);

    localStorage.setItem("misCalculos", JSON.stringify(historialCalorias));

   

    renderizarHistorialFiltrado();

   

    // Limpiar inputs

    inputEdad.value = ""; inputPeso.value = ""; inputAltura.value = ""; inputNombrePerfil.value = "";

});



// Carga inicial

(function() {

    const datos = localStorage.getItem("misCalculos");

    if (datos) {

        historialCalorias = JSON.parse(datos);

        renderizarHistorialFiltrado();

    }

})();



if (selectFiltroActividad) selectFiltroActividad.onchange = renderizarHistorialFiltrado;



if (botonLimpiarTodo) {

    botonLimpiarTodo.onclick = () => {

        if (!confirm("¿Borrar todo el historial?")) return;

        historialCalorias = [];

        localStorage.removeItem("misCalculos");

        contenedorResultados.innerHTML = "";

        seccionExtras.classList.add('hidden');

    };

}



document.getElementById('btn-dark').onclick = () => document.documentElement.classList.toggle('dark');