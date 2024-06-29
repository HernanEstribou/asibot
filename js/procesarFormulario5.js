import { loadJSONSync, formatearCSV, descargarCSV } from './manejoDeArchivos.js';
import { obtenerFechaHoy, generarPdf } from './generarPdf2.js';


function calcularRangoSimulacion(datosFormulario, tarifaOriginal){
    let values = [];
    let cscMin = 0;
    let cscMax = 0;
    let limiteInferior = 0.85;
    let limiteSuperior = 1.5;

    console.log("Tarifa Original en calcularRangosSimulacion: " + tarifaOriginal);
    
    for (const key in datosFormulario){

        if (tarifaOriginal === 'T1') values.push(datosFormulario[key].ent2);    //Para T1 calculo los limites con valores de Energía
        else values.push(datosFormulario[key].pa);                              //Para T2 y T3 calculo los limites con valores de PA
    }

    // Ordenar de mayor a menor
    values.sort((a,b) =>b - a); 
    
    
    if (tarifaOriginal === 'T1'){
        cscMin = Math.trunc(values[0] / 720);
        cscMax = 49;
        
    } else if((tarifaOriginal === 'T2') || (tarifaOriginal === 'T3')) {

        if (values[0] === values[1]){
            cscMin = Math.trunc(values[2] * limiteInferior); 
            cscMax = Math.trunc(values[2] * limiteSuperior); 
        } else {
            cscMin = Math.trunc(values[1] * limiteInferior);
            cscMax = Math.trunc(values[1] * limiteSuperior);
        }
    
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
        } else if (tarifaOriginal === 'T1'){ //Simulando T2 cuando ingresan T1
            exc=0;
            return [1,cscNuevo,cscNuevo,exc,ent2,0,0,0];
        } else if (tarifaOriginal === 'T2'){ //Simulando T2 cuando ingresan T2
            exc = penalidad(pa, cscNuevo, 'T2');
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
  
    let cf = parseFloat(fila.cf);
    let csc = parseFloat(fila.csc);
    let pa = parseFloat(fila.pa);
    let exc;
    let ent2 = parseFloat(fila.ent2);
    let epta = parseFloat(fila.epta);
    let evalle = parseFloat(fila.evalle);
    let eresto = parseFloat(fila.eresto);

    if (calculoTipo == 'real'){
        exc = penalidad(pa, csc, tarifaOriginal); 
    } else if (calculoTipo == 'simulado'){
        exc = fila.exc;
    }        

    console.log("Fila del formulario a multiplicar:");
    console.log(fila);

    //Calcular el importe
    let importe = $cf + $csc * (csc + exc) + pa * $pa + ent2 * $ent2 + epta * $epta + evalle * $evalle + eresto * $eresto;
    console.log(`$cf=${$cf} + $csc=${$csc} * (csc=${csc} + exc=${exc}) + pa=${pa} * $pa=${$pa} + ent2=${ent2} * $ent2=${$ent2} + epta=${epta} * $epta=${$epta} + evalle=${evalle} * $evalle=${$evalle} + eresto=${eresto} * $eresto=${$eresto}`);                                                                                   
    
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
    let hayCamposVacios = false; // Flag para verificar campos vacíos    

    for (let i = 1; i < filas.length; i++) {
        const fila = filas[i];
        const campos = fila.querySelectorAll('input');
        const objetoCampos = {};        

        campos.forEach(campo => {
            
            if (!campo.value) {
                
                hayCamposVacios = true; // Si hay un campo vacío, activa la flag
                return; // Detiene la iteración de la columna del formulario
            }

            objetoCampos[campo.name] = campo.value;            
        });
        
        if (hayCamposVacios) {            
            return; // Detiene la iteración de las filas del formulario
        }

        
        diccionario[i] = objetoCampos;
    }     
        
    return diccionario;
}

function obtenerResolucion(cuadroTarifario){

    for (const i in cuadroTarifario){
        if (cuadroTarifario[i].resolucion) {            
            return cuadroTarifario[i].resolucion;            
        }
    }     
}


function procesarFormulario(empresa, tarifaOriginal, tension, peaje, formulario, rutaJson) {    
    
    let importeRealAcumulado = 0;
    let importeAnualRealProyectado;
    let importeAnualSimuladoProyectado;
    let cuadroTarifario;
    let min = Infinity;
    let potenciaOptima;
    let categoriaOptima;
    let ultimoPeriodo = 0;
    let resolucion; 
    
    const datosFormulario = recuperarDatosFormulario(formulario);
    console.log(`Se envió el formulario ${tarifaOriginal}`);
    console.log(datosFormulario);

    if (!datosFormulario){
        const errorCamposVacios = "Si Ud. no cuenta con 12 facturas o cree que las mismas no representan su consumo próximo, comuniquese con la DGPEN para un anaálisis personzalizado";
        const titulo = "Todos los campos son obligatorios"
        
        popupResultado(titulo, errorCamposVacios)
        return;
    }
                
    cuadroTarifario = loadJSONSync(rutaJson);     
    
    console.log("Empresa seleccionada " + empresa);
    console.log(`Las tarifas son: `);
    console.log(cuadroTarifario);    

    //Obtener número de resolución
    resolucion = obtenerResolucion(cuadroTarifario);
    console.log("Resolucion: " + resolucion);      

    //----------------------- 
    //Calculo de importe Real
    //-----------------------

    for (const i in datosFormulario){
        console.log("Período " + i);
        let tarifaFila = obtenerTarifa(datosFormulario[i], cuadroTarifario, tension, peaje);        
        console.log("Fila de la tarifa");
        console.log(tarifaFila);
                
        //Me fijo cual es el valor de mes y año de la factura más reciente para poder averiguar la cscContratada
        if ((parseInt(datosFormulario[i].periodo)) > ultimoPeriodo) ultimoPeriodo = parseInt(datosFormulario[i].periodo);        

        let importeMensualReal = refacturar(datosFormulario[i], tarifaFila, tarifaOriginal, "real");
         
        importeMensualReal = Math.round(importeMensualReal * 100) / 100;
        
        console.log("Importe mensual real: " + importeMensualReal);
        console.log("--------------------");
        importeRealAcumulado = importeRealAcumulado + importeMensualReal;
    }
    
    importeRealAcumulado = Math.round(importeRealAcumulado * 100) / 100;
    
    ultimoPeriodo = ultimoPeriodo.toString();
    
    //Convierto el objeto en array para poder filtrarlo
    const datosFormularioArray = Object.values(datosFormulario);

    //Filtro el item del ultimo periodo
    const objetoUltimoPeriodo = datosFormularioArray.find(item => item.periodo === ultimoPeriodo);

    //Extraigo la cscContratada del ultimo periodo
    const cscContratada = objetoUltimoPeriodo.csc; 
   
    console.log("Ultimo periodo: " + ultimoPeriodo);
    console.log("cscContratada: " + cscContratada);

    let cantidadDePeriodos = Object.keys(datosFormulario).length;
    importeAnualRealProyectado = (importeRealAcumulado / cantidadDePeriodos) * 12;
    importeAnualRealProyectado = Math.round(importeAnualRealProyectado * 100) / 100;

    console.log("/////////////////////")
    console.log("Importe REAL ACUMULADO: " + importeRealAcumulado);
    console.log("Cantidad de períodos: " + cantidadDePeriodos);
    console.log("Importe anual real proyectado: " + importeAnualRealProyectado);
    console.log("/////////////////////");
    console.log("SIMULACIÓN");
    console.log("************************************");

    //-------------- 
    //Simulación
    //---------------
    const {cscMin, cscMax} = calcularRangoSimulacion(datosFormulario, tarifaOriginal);

    // Definir las claves del objeto
    const campos = ['cf', 'csc', 'pa', 'exc', 'ent2', 'epta', 'evalle', 'eresto'];

    let listaImportesSimulados = [];
    let datosPeriodos = [];    

    for (let csc = cscMin; csc <= cscMax; csc++){
        
        let importeSimuladoAcumulado = 0;

        // Hacer una copia de datosFormulario en cada iteración para poder sobreescribirla porque javascript no deja modificar objeto original
        let formularioSimulado = JSON.parse(JSON.stringify(datosFormulario));
        let tarifaSimulada;
        
        console.log("csc simulado: " + csc);
        console.log("************************");

        for (let fila in formularioSimulado){           
            
            console.log("Período simulado " + fila);
            console.log("Fila del formulario original");
            console.log(formularioSimulado[fila])            

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
                                             
            
            tarifaSimulada = obtenerTarifa(formularioSimulado[fila], cuadroTarifario, tension, peaje);        
            console.log("Fila de la tarifa simulada");
            console.log(tarifaSimulada);

            let importeMensualSimulado = refacturar(formularioSimulado[fila], tarifaSimulada, "", "simulado");
           
            datosPeriodos.push({
                ["empresa"]: empresa,
                ["tarifa"]:tarifaSimulada.tarifa,
                ["tension"]: tension,
                ["peaje"]: peaje,
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
                ["$importe"]: importeMensualSimulado 
            })
                        
            console.log("Importe simulado mensual: " + importeMensualSimulado);
            console.log("--------------------");

            importeSimuladoAcumulado = importeSimuladoAcumulado + importeMensualSimulado;
           
        }
        importeSimuladoAcumulado = Math.round(importeSimuladoAcumulado * 100) / 100;

        listaImportesSimulados.push({["csc"]:csc, [tarifaSimulada.tarifa] : importeSimuladoAcumulado});        
        
        console.log("///////////////////////////////////////////////////")
        console.log("Importe SIMULADO ACUMULADO : " + importeSimuladoAcumulado);
        console.log("///////////////////////////////////////////////////")
        console.log("*******************************")
        
        if (importeSimuladoAcumulado < min){
            min = importeSimuladoAcumulado;
            potenciaOptima = csc;
            categoriaOptima = tarifaSimulada.tarifa;
        } 
    }
    importeAnualSimuladoProyectado = (min / cantidadDePeriodos) * 12;
    importeAnualSimuladoProyectado = Math.round(importeAnualSimuladoProyectado * 100) / 100;

    console.log("Importe anual Real Acumulado: " + importeRealAcumulado);
    console.log("Importe anual Real Proyectado: " + importeAnualRealProyectado)
    console.log("--------------------------------------------------------------")     
    console.log("Minimo importe Simulado Acumulado: " + min + " | Csc optima: " + potenciaOptima + "| Categoría optima:" + categoriaOptima);
    console.log("Minimo importe Simulado Proyectado: " + importeAnualSimuladoProyectado)  
    console.log("Lista de importes anuales por tarifa:");
    console.log(listaImportesSimulados);    
    
    const [titulo, mensaje, oportunidad, ahorro] = generarMensaje(tarifaOriginal, importeAnualSimuladoProyectado, importeAnualRealProyectado, cscMin, cscMax, cantidadDePeriodos, cscContratada, potenciaOptima)   
    
    popupResultado(titulo, mensaje, oportunidad, tarifaOriginal, categoriaOptima, potenciaOptima, ahorro, datosFormulario, empresa, resolucion);    

    let contenidoCSV = formatearCSV(datosPeriodos);    
    descargarCSV(contenidoCSV, "datos_periodos.csv");
    
}

function generarMensaje(tarifaOriginal, importeAnualSimuladoProyectado, importeAnualRealProyectado, cscMin, cscMax, cantidadDePeriodos, cscContratada, potenciaOptima){
    let ahorro = 0;
    let titulo = "";
    let oportunidad = false;
    let mensaje = `Limite inferior: ${cscMin}<br>
                   Limite superior: ${cscMax}<br>
                   Se utilizaron ${cantidadDePeriodos} facturas significativas<br><br>
                   La potencia contratada actual es: ${cscContratada}<br>
                   Generando un importe anual proyectado de: <br>
                   <b>$${importeAnualRealProyectado}</b><br><br>
                   La potencia optima calculada es: ${potenciaOptima}<br>                  
                   ` 
    if (importeAnualSimuladoProyectado < importeAnualRealProyectado){
        oportunidad = true;
        ahorro = importeAnualRealProyectado - importeAnualSimuladoProyectado;
        //ahorro = parseFloat(Math.round(ahorro * 100) / 100);
        ahorro = parseFloat(Math.trunc(ahorro));        
        titulo = "Se detectó posibilidad de ahorro";
        mensaje += `Generando un importe anual proyectado de <br>
                    <b>$${importeAnualSimuladoProyectado}</b><br><br>                    
                    Esto genera un ahorro de: <b>${ahorro}</b>
                    `       
    } else {
        oportunidad = false;
        console.log("No se detectó oportunidad de ahorro");
        titulo = "No se detectó oportunidad de ahorro";
        //mensaje +=`No se detectó oportunidad de ahorro`
    }

    // Enviar el valor de 'ahorro' como un evento a Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'valor_ahorro', {
            'event_category': 'Calculo',
            'event_label': `Ahorro ${tarifaOriginal}`,
            'value': ahorro
        });
    
        gtag('event', 'calculo_click', {
            'event_category': 'Interacción',
            'event_label': 'calcular_click',
            'value': 1
        });
      } else {
        console.error('gtag is not defined');
      }
    
    
    return [titulo, mensaje, oportunidad, ahorro];
}


function popupResultado(titulo, mensaje, oportunidad, tarifaOriginal, categoriaOptima, potenciaOptima, ahorro, datosFormulario, empresa, resolucion){
    const fecha = obtenerFechaHoy();

    //Sweet Alert
    Swal.fire({
        title: titulo,
        html: mensaje,
        showDenyButton: true,        
        denyButtonText: "Descargar",               
    }).then((result) =>{
        if (result.isDenied){
            generarPdf(fecha, tarifaOriginal, categoriaOptima, potenciaOptima, oportunidad, ahorro, datosFormulario, empresa, resolucion);
        }
    });
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
    const tarifas = document.querySelectorAll('.button-t1, .button-t2, .button-t3');
    const tensiones = document.querySelectorAll('.button-BT, .button-MT');
    const peajes = document.querySelectorAll('.button-P, .button-NP');
    const formularios = document.querySelectorAll('.form-T1, .form-T2, .form-T3');     
    
    formularios.forEach(formulario => {
        formulario.addEventListener('submit', function(event) {
            event.preventDefault();           
                        
            let empresa = parsearBotonSeleccionado(empresas);     
            let tarifaOriginal = parsearBotonSeleccionado(tarifas);                  
            let tension = parsearBotonSeleccionado(tensiones);
            let peaje = parsearBotonSeleccionado(peajes);                       

            if (tarifaOriginal === 'T1'){
                tension = 'BT';
                peaje = 'NO';
            }

            if (tarifaOriginal === 'T2'){
                tension = 'BT';            
            }
           
            let rutaJson = `./${empresa}.json`;            
            
            procesarFormulario(empresa, tarifaOriginal, tension, peaje, formulario, rutaJson);            
        });
    });
});