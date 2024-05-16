function generarFormulario(tipo, numPeriodos) {
    let html = `<form class="form-${tipo}" action="#" method="post">`;

    html += `
            <div class="row">
                <div class="col mb-3">
                    <label for="periodo" class="form-label">Factura</label>                                    
                </div>
                <div class="col mb-3">
                    <label for="periodo" class="form-label campo">Período</label>
                    <a onclick="verFactura('Período', 'Año y Mes')" class="info-icon"><i class="fa-regular fa-circle-question fa-lg"></i></a>                                                                        
                </div>`

    // Titulos
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

    let datosT2 = [
        {csc:40, pa:56,    ent2:19440, epta:0 , evalle:0 , eresto:0},
        {csc:40, pa:62.40, ent2:21480, epta:0 , evalle:0 , eresto:0},
        {csc:40, pa:65.60, ent2:23920, epta:0 , evalle:0 , eresto:0},
        {csc:40, pa:68.40, ent2:23400, epta:0 , evalle:0 , eresto:0},
        {csc:40, pa:68.80, ent2:16000, epta:0 , evalle:0 , eresto:0},
        {csc:40, pa:18,    ent2:5240,  epta:0 , evalle:0 , eresto:0},
        {csc:40, pa:15.8,  ent2:4280,  epta:0 , evalle:0 , eresto:0},
        {csc:40, pa:15.6,  ent2:4320,  epta:0 , evalle:0 , eresto:0},
        {csc:40, pa:15.6,  ent2:4160,  epta:0 , evalle:0 , eresto:0},
        {csc:40, pa:15.6,  ent2:4200,  epta:0 , evalle:0 , eresto:0},
        {csc:40, pa:15.6,   ent2:4320, epta:0 , evalle:0 , eresto:0}
    ]

    let datosT3 = [
        {csc:55, pa:56,    ent2:0, epta:6480 , evalle:6480 , eresto:6480},
        {csc:55, pa:62.40, ent2:0, epta:7160 , evalle:7160 , eresto:7160},
        {csc:55, pa:65.60, ent2:0, epta:7973 , evalle:7973 , eresto:7973},
        /*{csc:55, pa:68.40, ent2:0, epta:7800 , evalle:7800 , eresto:7800},
        {csc:55, pa:68.80, ent2:0, epta:5333 , evalle:5333 , eresto:5333},
        {csc:55, pa:18,    ent2:0, epta:1746 , evalle:1746 , eresto:1746},
        {csc:55, pa:15.8,  ent2:0, epta:1426 , evalle:1426 , eresto:1426},
        {csc:55, pa:15.6,  ent2:0, epta:1440 , evalle:1440 , eresto:1440},
        {csc:55, pa:15.6,  ent2:0, epta:1386 , evalle:1386 , eresto:1386},
        {csc:55, pa:15.6,  ent2:0, epta:1400 , evalle:1400 , eresto:1400},
        {csc:55, pa:15.6,  ent2:0, epta:1440 , evalle:1440 , eresto:1440}*/
    ]

    let datosT3Dai = [
        {csc:86, pa:52, ent2:0, epta:5339 , evalle:12953 , eresto:4991},
        {csc:86, pa:56, ent2:0, epta:3812 , evalle:8929 ,  eresto:3684},
        {csc:86, pa:55, ent2:0, epta:6235 , evalle:15018 , eresto:6359},
        {csc:86, pa:52, ent2:0, epta:5273 , evalle:12840 , eresto:5254},
        {csc:86, pa:50, ent2:0, epta:4942 , evalle:11750 , eresto:4705},
        {csc:86, pa:47, ent2:0, epta:3399 , evalle:8638 ,  eresto:3591},
        {csc:86, pa:35, ent2:0, epta:3043 , evalle:7007 ,  eresto:2839},
        {csc:86, pa:34, ent2:0, epta:2784 , evalle:6855 ,  eresto:2889},
        {csc:86, pa:36, ent2:0, epta:174  , evalle:441 ,   eresto:168},
        {csc:86, pa:37, ent2:0, epta:2803 , evalle:7184 ,  eresto:2879},
        {csc:86, pa:40, ent2:0, epta:194  , evalle:520 ,   eresto:198},
        {csc:86, pa:42, ent2:0, epta:3279 , evalle:9523 ,  eresto:3274},
    ]

    let datos = datosT2;
    // Generar los periodos
    for (let i = 0; i < numPeriodos; i++) {
        html += `
            <!-- Periodo ${i} -->
            <div class="row">
                <div class="col mb-3">
                    <p>${i+1}</p>
                </div>
                <div class="col mb-3">
                    <input class="form-control" id="periodo" type="text" name="periodo" placeholder="AAAAMM" pattern="[0-9]{6}" minlength="6" maxlength="6" title="La fecha debe estar en formato AAAAMM. Ej: 202403" required>
                </div>`;                
                
        if (tipo === 'T3' || tipo === 'T2'){
            html += `
                <div class="col mb-3">
                <input class="form-control" type="number" step="0.01" min="0" name="csc" placeholder="" value="${datos[i].csc}" required>                                        
                </div>
                <div class="col mb-3">
                    <input class="form-control" type="number" step="0.01" min="0" name="pa" placeholder="" value="${datos[i].pa}" required>                                        
                </div>`;
        

            if (tipo === 'T3') {
                html += `
                    <div class="col mb-3 hidden">
                        <input class="form-control" type="number" step="0.01" min="0" name="ent2" placeholder="" value="0">                                       
                    </div>
                    <div class="col mb-3">
                        <input class="form-control" type="number" step="0.01" min="0" name="epta" placeholder="" value="${datos[i].epta}" required>
                    </div>
                    <div class="col mb-3">
                        <input class="form-control" type="number" step="0.01" min="0" name="evalle" placeholder="" value="${datos[i].evalle}" required>
                    </div>
                    <div class="col mb-3">
                        <input class="form-control" type="number" step="0.01" min="0" name="eresto" placeholder="" value="${datos[i].eresto}" required>
                    </div>`;
            } else if(tipo==='T2') {
            html += `
                    <div class="col mb-3">
                        <input class="form-control" type="number" step="0.01" min="0" name="ent2" placeholder="" value="${datos[i].ent2}" required>                                       
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
                        <input class="form-control" type="number" step="0.01" min="0" name="ent2" placeholder="" value="${datos[i].ent2}" required>                                       
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

const cantidadPeriodos = 11;

// Generar los formularios T2 y T3 con 2 periodos cada uno
const formularioT1HTML = generarFormulario('T1', cantidadPeriodos); 
const formularioT2HTML = generarFormulario('T2', cantidadPeriodos); 
const formularioT3HTML = generarFormulario('T3', cantidadPeriodos); 

// Insertar los formularios en los contenedores correspondientes
document.getElementById('formulario-t1-container').innerHTML = formularioT1HTML;
document.getElementById('formulario-t2-container').innerHTML = formularioT2HTML;
document.getElementById('formulario-t3-container').innerHTML = formularioT3HTML;