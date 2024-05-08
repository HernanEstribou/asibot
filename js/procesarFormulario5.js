import { loadJSONSync, formatearCSV, descargarCSV } from './manejoDeArchivos.js';


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

    let cf;
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
function obtenerTarifa(fila, cuadroTarifario, tension, peaje){

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
        //tarifaTipo = "T3BT"                                             //T3        
        tarifaTipo = "T3"
    }
    
    /*for (const i in cuadroTarifario){
        if (cuadroTarifario[i].tarifa == tarifaTipo) return cuadroTarifario[i];
    }*/

    /*for (const i in cuadroTarifario){
        if (cuadroTarifario[i].tarifa == tarifaTipo && tarifaTipo != "T3") return cuadroTarifario[i];

        else if (cuadroTarifario[i].tarifa == tarifaTipo && tarifaTipo == "T3"){
            if (cuadroTarifario[i].tension == tension){                
                return cuadroTarifario[i];
            } 
        }
    }*/
    
    for (const i in cuadroTarifario){
        if (tarifaTipo == "T2" && cuadroTarifario[i].tarifa == tarifaTipo ) {            
            if(cuadroTarifario[i].peaje == peaje)  return cuadroTarifario[i];                   
        
        } else if (tarifaTipo == "T3" && cuadroTarifario[i].tarifa == tarifaTipo){            
            if (cuadroTarifario[i].tension == tension && cuadroTarifario[i].peaje == peaje) return cuadroTarifario[i];

        } else if (tarifaTipo != "T2" && tarifaTipo !="T3" && cuadroTarifario[i].tarifa == tarifaTipo){            
            return cuadroTarifario[i];
        }
    }    
    
}

function recuperarDatosFormulario(formulario){
    const diccionario = {}
    const filas = formulario.querySelectorAll('.row');

    for (let i = 1; i < filas.length; i++) {
        const fila = filas[i];
        const campos = fila.querySelectorAll('input');
        const objetoCampos = {};

        campos.forEach(campo => {
            objetoCampos[campo.name] = campo.value;
        });

        diccionario[i] = objetoCampos;
    }     
        
    return diccionario;
}

function procesarFormulario(empresa, tarifaOriginal, tension, peaje, formulario, rutaJson) {    
    
    let importeAnualReal = 0;
    let cuadroTarifario;
    
    const datosFormulario = recuperarDatosFormulario(formulario);
    console.log(`Se envió el formulario ${tarifaOriginal}`);
    console.log(datosFormulario); 
        
    cuadroTarifario = loadJSONSync(rutaJson);     
    
    console.log("Empresa seleccionada " + empresa);
    console.log(`Las tarifas son: `);
    console.log(cuadroTarifario);

    //----------------------- 
    //Calculo de importe Real
    //-----------------------

    for (const i in datosFormulario){
        console.log("Período " + i);
        let tarifaFila = obtenerTarifa(datosFormulario[i], cuadroTarifario, tension, peaje);        
        console.log("Fila de la tarifa");
        console.log(tarifaFila);

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
        
        console.log("csc simulado: " + csc);
        console.log("************************");

        for (let fila in formularioSimulado){           
            
            console.log("Período simulado " + fila);
            //console.log(formularioSimulado[fila])            

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
            
            tarifaSimulada = obtenerTarifa(formularioSimulado[fila], cuadroTarifario, tension, peaje);        
            console.log("Fila de la tarifa simulada");
            console.log(tarifaSimulada);

            let importeSimulado = refacturar(formularioSimulado[fila], tarifaSimulada, "", "simulado");
           
            datosPeriodos.push({
                ["empresa"]: empresa,
                ["tarifa"]:tarifaSimulada.tarifa,
                ["tension"]: tension,
                ["periodo"]: fila,
                ["csc"]:formularioSimulado[fila].csc,
                ["pa"]:formularioSimulado[fila].pa,
                ["penalidad"]: formularioSimulado[fila].exc,
                ["ent2"]:formularioSimulado[fila].ent2,
                ["epta"]:formularioSimulado[fila].epta,
                ["evalle"]:formularioSimulado[fila].evalle,
                ["eresto"]:formularioSimulado[fila].eresto,               
                ["$cf"]:tarifaSimulada.cf,
                ["$csc"]:tarifaSimulada.csc,
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

function parsearBotonSeleccionado(buttons){
    let selectedButton
    buttons.forEach(btn =>{
        if (btn.classList.contains('selected')){                    
            selectedButton = btn.value;                        
        }
    });
    return selectedButton;
}

//Main
document.addEventListener('DOMContentLoaded', function() {
    
    const empresas = document.querySelectorAll('.button-edenor, .button-edesur');
    const tarifas = document.querySelectorAll('.button-t2, .button-t3');
    const tensiones = document.querySelectorAll('.button-BT, .button-MT');
    const peajes = document.querySelectorAll('.button-P, .button-NP');
    const formularios = document.querySelectorAll('.form-T2, .form-T3');     
    
    formularios.forEach(formulario => {
        formulario.addEventListener('submit', function(event) {
            event.preventDefault();            
            
            let empresa = parsearBotonSeleccionado(empresas);     
            let tarifaOriginal = parsearBotonSeleccionado(tarifas);                  
            let tension;
            let peaje = parsearBotonSeleccionado(peajes);
            
            if (tarifaOriginal === 'T2'){
                tension = 'BT';
            } else if (tarifaOriginal =='T3'){
                tension = parsearBotonSeleccionado(tensiones);                
            } 
           
            let rutaJson = `./${empresa}.json`;
            
            procesarFormulario(empresa, tarifaOriginal, tension, peaje, formulario, rutaJson);            
        });
    });
});