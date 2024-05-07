function loadJSONSync(filename) {
    const request = new XMLHttpRequest();
    request.open('GET', filename, false); // El tercer parámetro indica que la solicitud es sincrónica
    request.send(null);

    if (request.status === 200) {
        return JSON.parse(request.responseText);
    } else {
        throw new Error(`Failed to load JSON file ${filename}: ${request.status}`);
    }
}

// Función para formatear números con dos decimales utilizando Math.round()
function formatearNumero(numero) {
    // Redondear el número a dos decimales
    let numeroRedondeado = Math.round(numero * 100) / 100;
    // Devolver el número redondeado como string
    return numeroRedondeado.toString();
}

function formatearCSV(datosPeriodos){
    // Extraer las claves del primer objeto en la matriz datosPeriodos
    let columnasCSV = Object.keys(datosPeriodos[0]);    

    // Agregar nombres de las columnas como la primera fila del contenido del CSV
    let contenidoCSV = columnasCSV.join(",") + "\n";    

    // Agregar el contenido de los datos de los periodos
    contenidoCSV += datosPeriodos.map(periodo => 
        columnasCSV.map(columna => {
            // Formatear números con dos decimales
            return typeof periodo[columna] === 'number' ? formatearNumero(periodo[columna]) : periodo[columna];
        }).join(",")
    ).join("\n");
    return contenidoCSV;
}

function descargarCSV(contenidoCSV, nombreArchivo) {
    const blob = new Blob([contenidoCSV], { type: "text/csv;charset=utf-8;" });

    if (navigator.msSaveBlob) {
        // Para IE 10 y versiones anteriores
        navigator.msSaveBlob(blob, nombreArchivo);
    } else {
        const enlace = document.createElement("a");
        if (enlace.download !== undefined) {
            // Crear un enlace y descargar
            const url = URL.createObjectURL(blob);
            enlace.setAttribute("href", url);
            enlace.setAttribute("download", nombreArchivo);
            enlace.style.visibility = "hidden";
            document.body.appendChild(enlace);
            enlace.click();
            document.body.removeChild(enlace);
        }
    }
}

export { loadJSONSync, formatearCSV, descargarCSV };