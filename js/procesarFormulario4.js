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

function calcularRangoSimulacion(datosFormulario){
    let paValues = [];
    let cscMin = 0;
    let cscMax = 0;
    
    for (const key in datosFormulario){
        paValues.push(datosFormulario[key].pa);
    }

    // Ordenar de mayor a menor
    paValues.sort((a,b) =>b - a);
    console.log("Pa Values " + paValues);

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

     
                 
//for (const i in jsonData){
function calcularImporte(i, datosFormulario, formularioTipo, jsonData){
    
    
    importeAnual = 0;   
        
    console.log(jsonData);
    console.log(jsonData[i].tarifa)
    
    let $cf = parseFloat(jsonData[i].cf);
    let $csc = parseFloat(jsonData[i].csc); 
    let $pa = parseFloat(jsonData[i].pa);   
    
    // Variables adicionales para T2
    let $ent2 = formularioTipo === 'T2' || formularioTipo === 'T1' ? parseFloat(jsonData[i].ent2) : 0;

    // Variables adicionales para T3
    let $epta = formularioTipo === 'T3' ? parseFloat(jsonData[i].epta) : 0;
    let $evalle = formularioTipo === 'T3' ? parseFloat(jsonData[i].evalle) : 0;
    let $eresto = formularioTipo === 'T3' ? parseFloat(jsonData[i].eresto) : 0;

    for (const j in datosFormulario){
        let csc = parseFloat(datosFormulario[j].csc);
        let pa =  parseFloat(datosFormulario[j].pa); 

        ///acá preguntas si es T1, el valor de Ent2 para asignar la categoría correcta
       

        let ent2 = formularioTipo === 'T2' || formularioTipo ==='T1' ? parseFloat(datosFormulario[j].ent2) : 0;
        
        if (formularioTipo === 'T1'){
            if (ent2 <= 800) $ent2 = jsonData[1].ent2;                          //G1
            else if (ent2 > 800 && ent2 <= 2000 )$ent2 = jsonData[2].ent2;      //G2      
            else if (ent2 > 2000) $ent2 = jsonData[3].ent2;                     //G3
        }        

        let epta = formularioTipo === 'T3' ? parseFloat(datosFormulario[j].epta) : 0;
        let evalle = formularioTipo === 'T3' ? parseFloat(datosFormulario[j].evalle) : 0;
        let eresto = formularioTipo === 'T3' ? parseFloat(datosFormulario[j].eresto) : 0;                    
        
        let auxExc = pa - csc;
        console.log("auxExc:" + auxExc);     
                            
        if (auxExc > 0) {                       
            exc = formularioTipo === 'T3' ? (auxExc < 0.5 * csc ? auxExc * 1.5 : auxExc * 2) : auxExc * 1.5; // Calculo de excedente para T2 y T3
        } else {
            exc = 0;
        }
        console.log("excedente:" + exc);

        // Calcular el importe
        let importe = $cf + $csc * (csc + exc) + pa * $pa + ent2 * $ent2 + epta * $epta + evalle * $evalle + eresto * $eresto;                    
        
        console.log(`Fila:${j} = $cf=${$cf} + $csc=${$csc} * (csc=${csc} + exc=${exc}) + pa=${pa} * $pa=${$pa} + ent2=${ent2} * $ent2=${$ent2} + epta=${epta} * $epta=${$epta} + evalle=${evalle} * $evalle=${$evalle} + eresto=${eresto} * $eresto=${$eresto}`);                                                                                   
        console.log("Periodo " + j + " - importe: " + importe); 
        console.log("////////////");

        importeAnual += importe;
    }                            
    
    console.log("importe Anual " + importeAnual); 
    return importeAnual; 
                         
    
}
    
function refacturar(datosFormulario, formularioTipo, jsonData){

    let importeAnual;
    

    for (let key = 1; key <= Object.keys(jsonData).length; key++) {
        if (jsonData[key].tarifa.startsWith(formularioTipo)){
            importeAnual = calcularImporte(key, datosFormulario, formularioTipo, jsonData);
            break;
        }
    }
              
    /*if (formularioTipo == 'T1'){

    } else if (formularioTipo == 'T2'){
        importeAnual = calcularImporte(4, datosFormulario, formularioTipo, jsonData);
        
    } else if(formularioTipo == 'T3'){
        importeAnual = calcularImporte(5, datosFormulario, formularioTipo, jsonData);
        
    }*/ 
    
    return importeAnual;
    
}

function procesarFormulario(formulario, formularioTipo) {
    const datosFormulario = {};
    let importesLista = [];

    const jsonData = loadJSONSync('./tarifas.json');    

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
     
    const {cscMin, cscMax} = calcularRangoSimulacion(datosFormulario);
    
    console.log(`Se envió el formulario ${formularioTipo}`);
    console.log(datosFormulario);

    //////////////////////////////////
    //Refacturación real
    let importeAnualReal = refacturar(datosFormulario , formularioTipo, jsonData);
    console.log("asiganación de variable " + importeAnualReal);

    importesLista.push({[formularioTipo]:importeAnualReal});                    
    console.log("---------------");
    
    ////////////////////////////////////
    //Refacturación simulada
    console.log("Refacturación simulada");
    //let importeAnualSimulado = refacturar(datosFormulario, 'T1', jsonData);
    //console.log("Importe Anual Simulado: " + importeAnualSimulado);
    let importeAnualSimulado;


    for (let i = cscMin; i <= cscMax; i++){

        // Hacer una copia profunda de datosFormulario en cada iteración
        let datosFormularioCopia = JSON.parse(JSON.stringify(datosFormulario));
       
        for (let j in datosFormularioCopia){            
            datosFormularioCopia[j].csc = i;            
        }
        console.log("Valor de i: " + i);
        console.log("Formulario con CSC modificada");
        console.log(datosFormularioCopia);
       

        if (i <= 10 ) {
            importeAnualSimulado = refacturar(datosFormularioCopia, 'T1', jsonData);
            formularioTipo = 'T1';
        } else if (i >10 && i <= 50) {
            importeAnualSimulado = refacturar(datosFormularioCopia, 'T2', jsonData);
            formularioTipo = 'T2';
        }
        else if (i >50 ) {
            importeAnualSimulado = refacturar(datosFormularioCopia, 'T3', jsonData);
            formularioTipo = 'T3';
        }

        importesLista.push({[formularioTipo]:importeAnualSimulado});
    }

    
    //Imprimir listado de importes anuales Real y después simulados
    console.log("Importes lista:")
    console.log(importesLista);
    /*importesLista.forEach(importe =>{
        console.log(importe);  
    })*/
    
    //Sweet Alert
    /*Swal.fire({
        title: "Resultado",
        text: "El resultado es...",
        imageUrl: "https://unsplash.it/400/200",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
    });*/
}

document.addEventListener('DOMContentLoaded', function() {
    const formularios = document.querySelectorAll('.form-T2, .form-T3');

    formularios.forEach(formulario => {
        formulario.addEventListener('submit', function(event) {
            event.preventDefault();
            let formularioTipo = formulario.classList.contains('form-T2') ? 'T2' : 'T3';
            procesarFormulario(formulario, formularioTipo);
        });
    });
});