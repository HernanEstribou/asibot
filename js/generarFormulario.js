function generarFormulario(tipo, numPeriodos) {
    let html = `<form class="form-${tipo}" action="#" method="post">`;

    // Generar Títulos
    html += `
            <div class="row">
                <div class="col mb-3">
                    <label for="periodo" class="form-label">Factura</label>                                    
                </div>
                <div class="col mb-3">
                    <label for="periodo" class="form-label campo">Período</label>
                    <a onclick="verFactura('Período', 'Año y Mes')" class="info-icon"><i class="fa-regular fa-circle-question fa-lg"></i></a>                                                                        
                </div>`
    
    if (tipo === 'T3' || tipo ==='T2'){
        html += `                           
                <div class="col mb-3">
                    <label for="csc" class="form-label campo">CSC</label>
                    <a onclick="verFactura('CSC','Capacidad de suministro contratada')" class="info-icon"><i class="fa-regular fa-circle-question fa-lg"></i></a>                                    
                </div>
                <div class="col mb-3">
                    <label for="pa" class="form-label campo">PA</label>
                    <a onclick="verFactura('PA','Potencia adquirida')" class="info-icon"><i class="fa-regular fa-circle-question fa-lg"></i></a>                                    
                </div>`;

        if (tipo === 'T3') {
            html += `
                <div class="col mb-3">
                    <label for="epta" class="form-label campo">EPta</label>
                    <a onclick="verFactura('EPta', 'Energía en Punta')" class="info-icon"><i class="fa-regular fa-circle-question fa-lg"></i></a>                                    
                </div>
                <div class="col mb-3">
                    <label for="eValle" class="form-label campo">EValle</label>
                    <a onclick="verFactura('EValle', 'Energía en Valle')" class="info-icon"><i class="fa-regular fa-circle-question fa-lg"></i></a>                                    
                </div>                               
                <div class="col mb-3">
                    <label for="eResto" class="form-label campo">EResto</label>
                    <a onclick="verFactura('EResto','Energía en Resto')" class="info-icon"><i class="fa-regular fa-circle-question fa-lg"></i></a>                                    
                </div>`;

        } else if(tipo==='T2') {
            html += `
                <div class="col mb-3">
                    <label for="ent2" class="form-label campo">EnT2</label>
                    <a onclick="verFactura('EnT2','Energía T2')" class="info-icon"><i class="fa-regular fa-circle-question fa-lg"></i></a>                                    
                </div>`;
        }
    } else if (tipo === 'T1'){
        html += `
                <div class="col mb-3">
                    <label for="ent2" class="form-label campo">EnT1</label>
                    <a onclick="verFactura('EnT1','Energía T1')" class="info-icon"><i class="fa-regular fa-circle-question fa-lg"></i></a>                                    
                </div>`;
    }
    html += `
            <!--<div class="col mb-3">
                <label for="Importe" class="form-label">Importe</label>                                    
            </div>-->  
        </div>`;    
   
    // Generar Períodos
    for (let i = 0; i < numPeriodos; i++) {
        html += `
            <!-- Periodo ${i} -->
            <div class="row">
                <div class="col mb-3">
                    <p>${i+1}</p>
                </div>
                <div class="col mb-3">
                    <input class="form-control" id="periodo" type="text" name="periodo" placeholder="AAAAMM" pattern="[0-9]{6}" minlength="6" maxlength="6" title="La fecha debe estar en formato AAAAMM. Ej: 202403" value="" required>                    
                </div>`;                
                
        if (tipo === 'T3' || tipo === 'T2'){
            html += `
                <div class="col mb-3">
                <input class="form-control" type="number" step="0.01" min="0" name="csc" placeholder="" value="" required>                                        
                </div>
                <div class="col mb-3">
                    <input class="form-control" type="number" step="0.01" min="0" name="pa" placeholder="" value="" required>                                        
                </div>`;
        

            if (tipo === 'T3') {
                html += `
                    <div class="col mb-3 hidden">
                        <input class="form-control" type="number" step="0.01" min="0" name="ent2" placeholder="" value="0">                                       
                    </div>
                    <div class="col mb-3">
                        <input class="form-control" type="number" step="0.01" min="0" name="epta" placeholder="" value="" required>
                    </div>
                    <div class="col mb-3">
                        <input class="form-control" type="number" step="0.01" min="0" name="evalle" placeholder="" value="" required>
                    </div>
                    <div class="col mb-3">
                        <input class="form-control" type="number" step="0.01" min="0" name="eresto" placeholder="" value="" required>
                    </div>`;
            } else if(tipo==='T2') {
            html += `
                    <div class="col mb-3">
                        <input class="form-control" type="number" step="0.01" min="0" name="ent2" placeholder="" value="" required>                                       
                    </div>
                    <div class="col mb-3 hidden">
                        <input class="form-control" type="number" step="0.01" min="0" name="epta" placeholder="" value="0" disabled>
                    </div>
                    <div class="col mb-3 hidden">
                        <input class="form-control" type="number" step="0.01" min="0" name="evalle" placeholder="" value="0" disabled>
                    </div>
                    <div class="col mb-3 hidden">
                        <input class="form-control" type="number" step="0.01" min="0" name="eresto" placeholder="" value="0" disabled>
                    </div>`;
            }
        } else if (tipo ==='T1'){
            html += `
                    <div class="col mb-3 hidden">
                        <input class="form-control" type="number" step="0.01" min="0" name="csc" placeholder="" value="0" disabled>                                        
                    </div>
                    <div class="col mb-3 hidden">
                        <input class="form-control" type="number" step="0.01" min="0" name="pa" placeholder="" value="0" disabled>                                        
                    </div>
                    <div class="col mb-3">
                        <input class="form-control" type="number" step="0.01" min="0" name="ent2" placeholder="" value="" required>                                       
                    </div>
                    <div class="col mb-3 hidden">
                        <input class="form-control" type="number" step="0.01" min="0" name="epta" placeholder="" value="0" disabled>
                    </div>
                    <div class="col mb-3 hidden">
                        <input class="form-control" type="number" step="0.01" min="0" name="evalle" placeholder="" value="0" disabled>
                    </div>
                    <div class="col mb-3 hidden">
                        <input class="form-control" type="number" step="0.01" min="0" name="eresto" placeholder="" value="0" disabled>
                    </div>`;
        }

        html += `
            <!--<div class="col mb-3">
                <input class="form-control" type="number" step="0.01" min="0" name="importe${i}" placeholder="Importe">
            </div>-->
        </div>`;
    }

    html += `<button type="submit" class="btn btn-primary" tabindex="5">Calcular</button></form>`;

    return html;
}

const cantidadPeriodos = 12;

// Generar los formularios T2 y T3 con 2 periodos cada uno
const formularioT1HTML = generarFormulario('T1', cantidadPeriodos); 
const formularioT2HTML = generarFormulario('T2', cantidadPeriodos); 
const formularioT3HTML = generarFormulario('T3', cantidadPeriodos); 

// Insertar los formularios en los contenedores correspondientes
document.getElementById('formulario-t1-container').innerHTML = formularioT1HTML;
document.getElementById('formulario-t2-container').innerHTML = formularioT2HTML;
document.getElementById('formulario-t3-container').innerHTML = formularioT3HTML;