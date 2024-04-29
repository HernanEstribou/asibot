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

// Función para formatear números con dos decimales utilizando Math.round()
function formatearNumero(numero) {
    // Redondear el número a dos decimales
    let numeroRedondeado = Math.round(numero * 100) / 100;
    // Devolver el número redondeado como string
    return numeroRedondeado.toString();
}

function calcularRangoSimulacion(datosFormulario){
    let paValues = [];
    let cscMin = 0;
    let cscMax = 0;
    
    for (const key in datosFormulario){
        paValues.push(datosFormulario[key].pa);
    }

    // Ordenar de mayor a menor
    paValues.sort((a,b) =>b - a);
    //console.log("Pa Values " + paValues);

    if (paValues[0] === paValues[1]){
        cscMin = Math.trunc(paValues[2] * 0.85); 
        cscMax = Math.trunc(paValues[2] * 1.5); 
    } else {
        cscMin = Math.trunc(paValues[1] * 0.85);
        cscMax = Math.trunc(paValues[1] * 1.5);
    } 
    console.log("cscMin:" + cscMin);
    console.log("cscMax: " + cscMax);
    return {cscMin, cscMax}
}


function completarCampos(cf,csc,pa,exc,ent2,epta,evalle,eresto,cscNuevo,tarifaOriginal){    
    
    if (cscNuevo < 10){         //Simulando T1 cuando ingresan T3 
        if (tarifaOriginal === 'T3'){
            ent2 = epta + evalle + eresto            
        }
        return [1,0,0,0,ent2,0,0,0];

    } else if (cscNuevo < 50){  //Simulando T2 cuando ingresan T3
        if (tarifaOriginal === 'T3'){
            exc = penalidad(pa, cscNuevo, 'T2');
            ent2 = epta + evalle + eresto;
            return [1,cscNuevo,pa,exc,ent2,0,0,0]
        }
    }
                     
    if(tarifaOriginal === 'T2'){    //Simulando T3 cuando ingresan T2
        exc = penalidad(pa, cscNuevo, 'T3');
        epta = ent2/3;
        evalle = ent2/3; 
        eresto = ent2/3; 

        return[1,cscNuevo,pa,exc,0,epta,evalle,eresto];

    } else if (tarifaOriginal === 'T3') {                        //Simulando T3 cuando ingresan T3
        exc = penalidad(pa, cscNuevo, 'T3');
        return[1,cscNuevo,pa,exc,0,epta,evalle,eresto];
    }
    
   
}

function penalidad(pa, csc, formularioTipo){
    let auxExc = pa - csc;        
    
    let exc = 0; 
    
    if (auxExc > 0) {                       
        exc = formularioTipo === 'T3' ? (auxExc < 0.5 * csc ? auxExc * 1.5 : auxExc * 2) : auxExc * 1.5; // Calculo de excedente para T2 y T3
    } else {
        exc = 0;
    }

    // Redondear a dos decimales         
    exc = Math.round(exc * 100) / 100;
    
    return exc;
}

function refacturar(fila, tarifa, tarifaOriginal, calculoTipo){
   
    let $cf = parseFloat(tarifa.cf);
    let $csc = parseFloat(tarifa.csc);
    let $pa = parseFloat(tarifa.pa);
    let $ent2 = parseFloat(tarifa.ent2);
    let $epta = parseFloat(tarifa.epta);
    let $evalle = parseFloat(tarifa.evalle);
    let $eresto = parseFloat(tarifa.eresto);

    let csc;
    let pa;
    let ent2;
    let epta;
    let evalle;
    let eresto;
    let exc;
  
    if (calculoTipo == 'real'){

        csc = parseFloat(fila.csc);
        pa = parseFloat(fila.pa);
        if (tarifaOriginal == 'T2'){                       
            ent2 = parseFloat(fila.ent2);  
            epta = 0;
            evalle = 0;
            eresto = 0;          
        } else if(tarifaOriginal = 'T3'){
            epta = parseFloat(fila.epta);
            evalle = parseFloat(fila.evalle);
            eresto = parseFloat(fila.eresto);
            ent2 = 0;
        } 
        exc = penalidad(pa, csc, tarifaOriginal);

    } else if (calculoTipo == 'simulado'){
        cf = fila.cf;
        csc = fila.csc;
        pa = fila.pa;
        exc = fila.exc;
        ent2 = fila.ent2;
        epta = fila.epta;
        evalle = fila.evalle;
        eresto = fila.eresto;
    }        

    //Calcular el importe
    let importe = $cf + $csc * (csc + exc) + pa * $pa + ent2 * $ent2 + epta * $epta + evalle * $evalle + eresto * $eresto;
    //console.log(`$cf=${$cf} + $csc=${$csc} * (csc=${csc} + exc=${exc}) + pa=${pa} * $pa=${$pa} + ent2=${ent2} * $ent2=${$ent2} + epta=${epta} * $epta=${$epta} + evalle=${evalle} * $evalle=${$evalle} + eresto=${eresto} * $eresto=${$eresto}`);                                                                                   
    
    return importe;
}

//devuelve un objeto con los valores de tarifa que le corresponden a la fila que se le pasa de parámetro
function obtenerTarifa(fila, cuadroTarifario){

    let ent2 = parseFloat(fila.ent2);
    let csc = parseFloat(fila.csc);
    let tarifaTipo;
           
    if (csc < 10){
        if (ent2 <= 800) tarifaTipo = "T1G1";                         //T1G1                                         
        else if (ent2 > 800 && ent2 <= 2000 ) tarifaTipo = "T1G2"     //T1G2
        else if (ent2 > 2000) tarifaTipo = "T1G3"                     //T1G3          
        
    } else if( csc < 50 ) {                                               
        tarifaTipo = "T2"                                             //T2
    }                         
    else {        
        tarifaTipo = "T3BT"                                             //T3
    }
    
    for (const i in cuadroTarifario){
        if (cuadroTarifario[i].tarifa == tarifaTipo) return cuadroTarifario[i];
    }
    
}

function procesarFormulario(formulario, tarifaOriginal) {
    const datosFormulario = {};
    let importesLista = [];
    let importeAnualReal = 0;

    const filas = formulario.querySelectorAll('.row');
    for (let i = 1; i < filas.length; i++) {
        const fila = filas[i];
        const campos = fila.querySelectorAll('input');
        const objetoCampos = {};

        campos.forEach(campo => {
            objetoCampos[campo.name] = campo.value;
        });

        datosFormulario[i] = objetoCampos;
    }  
    
    console.log(`Se envió el formulario ${tarifaOriginal}`);
    console.log(datosFormulario);

    const cuadroTarifario = loadJSONSync('./edesur.json'); 
    console.log(`Las tarifas son: `);
    console.log(cuadroTarifario);

    for (const i in datosFormulario){
        console.log("Período " + i);
        let tarifaFila = obtenerTarifa(datosFormulario[i], cuadroTarifario);        
        //console.log("Fila de la tarifa");
        //console.log(tarifaFila);

        let importe = refacturar(datosFormulario[i], tarifaFila, tarifaOriginal, "real");
         
        importe = Math.round(importe * 100) / 100;
        
        console.log("Importe mensual real: " + importe);
        console.log("--------------------");
        importeAnualReal = importeAnualReal + importe;
    }

    importeAnualReal = Math.round(importeAnualReal * 100) / 100;
    console.log("/////////////////////")
    console.log("Importe anual real: " + importeAnualReal);
    console.log("/////////////////////");
    console.log("SIMULACIÓN");
    console.log("************************************");

    //-------------- 
    //Simulación
    //---------------
    const {cscMin, cscMax} = calcularRangoSimulacion(datosFormulario);

    // Definir las claves del objeto
    const campos = ['cf', 'csc', 'pa', 'exc', 'ent2', 'epta', 'evalle', 'eresto'];

    let listaImportesSimulados = [];
    let datosPeriodos = [];    

    for (let csc = cscMin; csc <= cscMax; csc++){
        
        let importeAnualSimulado = 0;

        // Hacer una copia de datosFormulario en cada iteración para poder sobreescribirla porque javascript no deja modificar objeto original
        let formularioSimulado = JSON.parse(JSON.stringify(datosFormulario));
        let tarifaSimulada;

        for (let fila in formularioSimulado){           
            
            console.log("Período simulado " + fila);

            let filaNueva = completarCampos(
                parseFloat(formularioSimulado[fila].cf),
                parseFloat(formularioSimulado[fila].csc),
                parseFloat(formularioSimulado[fila].pa),
                parseFloat(formularioSimulado[fila].exc),
                parseFloat(formularioSimulado[fila].ent2),
                parseFloat(formularioSimulado[fila].epta),
                parseFloat(formularioSimulado[fila].evalle),
                parseFloat(formularioSimulado[fila].eresto),
                csc,
                tarifaOriginal
            )
            
            campos.forEach((campo, i) => {
                formularioSimulado[fila][campo] = filaNueva[i];
            });
            
            //console.log("Formulario simulado de fila");
            //console.log(formularioSimulado[fila]);            
            
            tarifaSimulada = obtenerTarifa(formularioSimulado[fila], cuadroTarifario);        
            //console.log("Fila de la tarifa simulada");
            //console.log(tarifaSimulada);

            let importeSimulado = refacturar(formularioSimulado[fila], tarifaSimulada, "", "simulado");
           
            datosPeriodos.push({
                ["csc"]:formularioSimulado[fila].csc,
                ["pa"]:formularioSimulado[fila].pa,
                ["penalidad"]: formularioSimulado[fila].exc,
                ["ent2"]:formularioSimulado[fila].ent2,
                ["epta"]:formularioSimulado[fila].epta,
                ["evalle"]:formularioSimulado[fila].evalle,
                ["eresto"]:formularioSimulado[fila].eresto,                
                ["tarifa"]:tarifaSimulada.tarifa,
                ["$cf"]:tarifaSimulada.cf,
                ["$csc"]:tarifaSimulada.cf,
                ["$pa"]:tarifaSimulada.pa,
                ["$ent2"]:tarifaSimulada.ent2,
                ["$epta"]:tarifaSimulada.epta,
                ["$evalle"]:tarifaSimulada.evalle,
                ["$resto"]:tarifaSimulada.eresto,
                ["$importe"]: importeSimulado 
            })
                        
            console.log("Importe simulado mensual: " + importeSimulado);
            console.log("--------------------");

            importeAnualSimulado = importeAnualSimulado + importeSimulado;
           
        }
        importeAnualSimulado = Math.round(importeAnualSimulado * 100) / 100;

        listaImportesSimulados.push({["csc"]:csc, [tarifaSimulada.tarifa] : importeAnualSimulado});        
        
        console.log("///////////////////////////////////////////////////")
        console.log("Importe simulado ANUAL : " + importeAnualSimulado);
        console.log("///////////////////////////////////////////////////")
        console.log("*******************************")        
    }
    console.log("Importe anual Real");
    console.log(importeAnualReal);   
    console.log("Lista de importes anuales por tarifa:");
    console.log(listaImportesSimulados);
      
    let contenidoCSV = formatearCSV(datosPeriodos);    
    descargarCSV(contenidoCSV, "datos_periodos.csv");
}

//Main
document.addEventListener('DOMContentLoaded', function() {
    const formularios = document.querySelectorAll('.form-T2, .form-T3');

    formularios.forEach(formulario => {
        formulario.addEventListener('submit', function(event) {
            event.preventDefault();
            let tarifaOriginal = formulario.classList.contains('form-T2') ? 'T2' : 'T3';            
            procesarFormulario(formulario, tarifaOriginal);            
        });
    });
});