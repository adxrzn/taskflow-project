// Proyecto TaskFlow con asistencia de IA
let historialCalculos = [];

const boton = document.getElementById("btn-calcular");

boton.addEventListener("click", function() {
    const edad = document.getElementById("edad").value;
    const peso = document.getElementById("peso").value;
    const altura = document.getElementById("altura").value;

    if (edad === "" || peso === "" || altura === "") {
        alert("Te falta algún dato para seguir tu camino Zen.");
    } 
    else if (edad < 3 || edad > 95 || peso < 30 || peso > 200 || altura < 115 || altura > 210) {
        alert("Introduce datos reales, por favor. ¡Sé un verdadero Zen!");
    } 
    else {
        const genero = document.getElementById("genero").value;
        const factorActividad = parseFloat(document.getElementById("actividad").value);

        let tmb = (10 * peso) + (6.25 * altura) - (5 * edad);
        tmb = (genero === "hombre") ? tmb + 5 : tmb - 161;

        const mantenimiento = Math.round(tmb * factorActividad);
        const nuevoDato = {
            id: Date.now(),
            calorias: mantenimiento
        };

        historialCalculos.push(nuevoDato);
        localStorage.setItem("misCalculos", JSON.stringify(historialCalculos));
        
        renderizarTarjeta(nuevoDato);

        document.getElementById("edad").value = "";
        document.getElementById("peso").value = "";
        document.getElementById("altura").value = "";
    }
});

function renderizarTarjeta(dato) {
    const lista = document.getElementById("lista-resultados");
    const tarjeta = document.createElement("div");
    
    tarjeta.className = "flex justify-between items-center p-4 my-2 rounded-xl bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-sm transition-all";
    
    tarjeta.innerHTML = `
        <div class="dark:text-white font-bold">
            🔥 <span>${dato.calorias}</span> kcal
        </div>
        <button class="btn-borrar bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg transition-colors text-xs font-bold uppercase">
            Eliminar
        </button>`;

    tarjeta.querySelector(".btn-borrar").addEventListener("click", function() {
        tarjeta.remove();
        historialCalculos = historialCalculos.filter(item => item.id !== dato.id);
        localStorage.setItem("misCalculos", JSON.stringify(historialCalculos));
    });
    lista.appendChild(tarjeta);
}
const datosGuardados = localStorage.getItem("misCalculos");
if (datosGuardados) {
    historialCalculos = JSON.parse(datosGuardados);
    historialCalculos.forEach(dato => renderizarTarjeta(dato));
}
document.getElementById('btn-dark').onclick = () => {
    document.documentElement.classList.toggle('dark');
};
