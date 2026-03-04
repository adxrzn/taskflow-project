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
        if (genero === "hombre") {
            tmb += 5;
        } else {
            tmb -= 161;
        }

        const mantenimiento = Math.round(tmb * factorActividad);
        const nuevoDato = {
            id: Date.now(),
            calorias: mantenimiento
        };

        historialCalculos.push(nuevoDato);
        localStorage.setItem("misCalculos", JSON.stringify(historialCalculos));
        const lista = document.getElementById("lista-resultados");
        const tarjeta = document.createElement("div");

        tarjeta.style.background = "#f4f4f4";
        tarjeta.style.margin = "10px 0";
        tarjeta.style.padding = "15px";
        tarjeta.style.borderRadius = "8px";
        tarjeta.style.display = "flex";
        tarjeta.style.justifyContent = "space-between";
        
        tarjeta.innerHTML = `
            <div>
                <strong>🔥 ${mantenimiento} kcal</strong> 
            </div>
            <button class="btn-borrar" style="background:#ff4444; color:white; border:none; border-radius:4px; cursor:pointer;">Eliminar</button>`;
        
        tarjeta.querySelector(".btn-borrar").addEventListener("click", function() {
            tarjeta.remove(); 
            historialCalculos = historialCalculos.filter(item => item.id !== nuevoDato.id);
            localStorage.setItem("misCalculos", JSON.stringify(historialCalculos));
        });

        lista.appendChild(tarjeta);
        document.getElementById("edad").value = "";
        document.getElementById("peso").value = "";
        document.getElementById("altura").value = "";
    }
});

const datosGuardados = localStorage.getItem("misCalculos");

if (datosGuardados) {
    historialCalculos = JSON.parse(datosGuardados);
    
    historialCalculos.forEach(dato => {
        const lista = document.getElementById("lista-resultados");
        const tarjeta = document.createElement("div");

        tarjeta.style.background = "#f4f4f4";
        tarjeta.style.margin = "10px 0";
        tarjeta.style.padding = "15px";
        tarjeta.style.borderRadius = "8px";
        tarjeta.style.display = "flex";
        tarjeta.style.justifyContent = "space-between";
        
        tarjeta.innerHTML = `
            <div>
                <strong>🔥 ${dato.calorias} kcal</strong> 
            </div>
            <button class="btn-borrar" style="background:#ff4444; color:white; border:none; border-radius:4px; cursor:pointer;">Eliminar</button>`;

        tarjeta.querySelector(".btn-borrar").addEventListener("click", function() {
            tarjeta.remove();
            historialCalculos = historialCalculos.filter(item => item.id !== dato.id);
            localStorage.setItem("misCalculos", JSON.stringify(historialCalculos));
        });

        lista.appendChild(tarjeta);
    });
}