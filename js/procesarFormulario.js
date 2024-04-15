function refacturar(datosFormulario, formularioTipo){
    
    let importeAnual;
    let importesReales = [];
    /*let paValues = [];
    let paDesde = 0;
    let paHasta = 0;

    for (const key in datosFormulario){
        paValues.push(datosFormulario[key].pa);
    }

    // Ordenar de mayor a menor
    paValues.sort((a,b) =>b - a);
    console.log("Pa Values " + paValues);

    if (paValues[0] === paValues[1]){
        paDesde = paValues[2] 
        paHasta = paValues[2] 
    } else {
        paDesde = paValues[1];
    } 
    console.log(paDesde)*/
    fetch('./tarifas.json')
        .then(response => response.json())
        .then(jsonData => {
            
            console.log(jsonData);

            if (formularioTipo == 'T2'){
                for (const i in jsonData){
                    
                    let $cf = parseFloat(jsonData[i].cf);
                    let $csc = parseFloat(jsonData[i].csc); 
                    let $pa = parseFloat(jsonData[i].pa);
                    let $ent2 = parseFloat(jsonData[i].ent2);

                    importeAnual = 0;
                    console.log(jsonData[i].tarifa)

                    for (const j in datosFormulario){
                        let csc = parseFloat(datosFormulario[j].csc);
                        let pa =  parseFloat(datosFormulario[j].pa);
                        let ent2 = parseFloat(datosFormulario[j].ent2);
                        
                        let exc = pa - csc;

                        if (exc > 0) {
                            exc = exc * 1.5;
                        } else exc = 0;

                        let importe = $cf + csc * ($csc + exc) + pa * $pa + ent2 * $ent2;                        
                        
                        console.log(`Fila:${j} = $cf=${$cf} + csc=${csc} * ($csc=${$csc} + exc=${exc}) + pa=${pa} * $pa=${$pa} + ent2=${ent2} * $ent2=${$ent2}`);                        
                        
                        console.log("importe "+ j + ": " + importe); 
                        console.log("////////////");
                        importeAnual = importeAnual + importe;
                    }
                    console.log("importe Anual " + importeAnual);

                    importesReales.push({[jsonData[i].tarifa]:importeAnual});                    
                    console.log("---------------");
                    
                }                
                importesReales.forEach(importe =>{
                  console.log(importe)  
                })
            } 
        })
        .catch(error =>{
            console.error(error);
        });
        
        //Sweet Alert
        Swal.fire({
            title: "Resultado",
            text: "El resultado es...",
            imageUrl: "https://unsplash.it/400/200",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image"
        });

}

function procesarFormulario(formulario, formularioTipo) {
    const datosFormulario = {};

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
    
    refacturar(datosFormulario , formularioTipo);
    
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