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

function refacturar(datosFormulario, formularioTipo){
    
    let importeAnual;       
   
    fetch('./tarifas.json')
        .then(response => response.json())
        .then(jsonData => {
            
            console.log(jsonData);
            
            //for (const i in jsonData){
            function calcularImporte(i){
                importeAnual = 0;
                console.log(jsonData[i].tarifa)

                let $cf = parseFloat(jsonData[i].cf);
                let $csc = parseFloat(jsonData[i].csc); 
                let $pa = parseFloat(jsonData[i].pa); 

                // Variables adicionales para T2
                let $ent2 = formularioTipo === 'T2' ? parseFloat(jsonData[i].ent2) : 0;

                // Variables adicionales para T3
                let $epta = formularioTipo === 'T3' ? parseFloat(jsonData[i].epta) : 0;
                let $evalle = formularioTipo === 'T3' ? parseFloat(jsonData[i].evalle) : 0;
                let $eresto = formularioTipo === 'T3' ? parseFloat(jsonData[i].eresto) : 0;

                for (const j in datosFormulario){
                    let csc = parseFloat(datosFormulario[j].csc);
                    let pa =  parseFloat(datosFormulario[j].pa); 
                    let ent2 = formularioTipo === 'T2' ? parseFloat(datosFormulario[j].ent2) : 0;

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
              
            if (formularioTipo == 'T1'){

            } else if (formularioTipo == 'T2'){
                return calcularImporte(4);
                
            } else if(formularioTipo == 'T3'){
                return calcularImporte(5);
                
            }            
             
        })
        .catch(error =>{
            console.error(error);
        }); 

        
}

function procesarFormulario(formulario, formularioTipo) {
    const datosFormulario = {};
    let importesLista = [];

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

    console.log(`Se envió el formulario ${formularioTipo}`);
    console.log(datosFormulario);
    // Convertir el objeto a una cadena de texto y mostrarlo en un alert
    //alert(JSON.stringify(datosFormulario));

    const {cscMin, cscMax} = calcularRangoSimulacion(datosFormulario);
    
    //Refacturación real
    let importeAnualReal = refacturar(datosFormulario , formularioTipo);
    console.log("asiganación de variable " + importeAnualReal);

    importesLista.push({[formularioTipo]:importeAnualReal});                    
    console.log("---------------");
   
    //Refacturación simulada

    
    //Imprimir listado de importes anuales Real y después simulados
    importesLista.forEach(importe =>{
        console.log(importe)  
    })
    
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