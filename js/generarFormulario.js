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
        {csc:55, pa:68.40, ent2:0, epta:7800 , evalle:7800 , eresto:7800},
        {csc:55, pa:68.80, ent2:0, epta:5333 , evalle:5333 , eresto:5333},
        {csc:55, pa:18,    ent2:0, epta:1746 , evalle:1746 , eresto:1746},
        {csc:55, pa:15.8,  ent2:0, epta:1426 , evalle:1426 , eresto:1426},
        {csc:55, pa:15.6,  ent2:0, epta:1440 , evalle:1440 , eresto:1440},
        {csc:55, pa:15.6,  ent2:0, epta:1386 , evalle:1386 , eresto:1386},
        {csc:55, pa:15.6,  ent2:0, epta:1400 , evalle:1400 , eresto:1400},
        {csc:55, pa:15.6,  ent2:0, epta:1440 , evalle:1440 , eresto:1440}
    ]

    let datos = datosT3;
    // Generar los periodos
    for (let i = 0; i < numPeriodos; i++) {
        html += `
            <!-- Periodo ${i} -->
            <div class="row">
                <div class="col mb-3">
                    <p>${i+1}</p>
                </div>
                <div class="col mb-3">
                    <input class="form-control" type="text" name="periodo" placeholder="AAAAMM">
                </div>`;                
                
        if (tipo === 'T3' || tipo === 'T2'){
            html += `
                <div class="col mb-3">
                <input class="form-control" type="text" name="csc" placeholder="" value="${datos[i].csc}">                                        
                </div>
                <div class="col mb-3">
                    <input class="form-control" type="text" name="pa" placeholder="" value="${datos[i].pa}">                                        
                </div>`;
        

            if (tipo === 'T3') {
                html += `
                    <div class="col mb-3">
                        <input class="form-control" type="text" name="epta" placeholder="" value="${datos[i].epta}">
                    </div>
                    <div class="col mb-3">
                        <input class="form-control" type="text" name="evalle" placeholder="" value="${datos[i].evalle}">
                    </div>
                    <div class="col mb-3">
                        <input class="form-control" type="text" name="eresto" placeholder="" value="${datos[i].eresto}">
                    </div>`;
            } else if(tipo==='T2') {
            html += `
                    <div class="col mb-3">
                        <input class="form-control" type="text" name="ent2" placeholder="" value="${datos[i].ent2}">                                       
                    </div>`;
            }
        } else if (tipo ==='T1'){
            html += `
                    <div class="col mb-3">
                        <input class="form-control" type="text" name="ent1" placeholder="" value="${datos[i].ent2}">                                       
                    </div>`;
        }

        html += `
            <!--<div class="col mb-3">
                <input class="form-control" type="text" name="importe${i}" placeholder="Importe">
            </div>-->
        </div>`;
    }

    html += `<button type="submit" class="btn btn-primary" tabindex="5">Calcular</button></form>`;

    return html;
}

// Generar los formularios T2 y T3 con 2 periodos cada uno
const formularioT1HTML = generarFormulario('T1', 11);
const formularioT2HTML = generarFormulario('T2', 11);
const formularioT3HTML = generarFormulario('T3', 11);

// Insertar los formularios en los contenedores correspondientes
document.getElementById('formulario-t1-container').innerHTML = formularioT1HTML;
document.getElementById('formulario-t2-container').innerHTML = formularioT2HTML;
document.getElementById('formulario-t3-container').innerHTML = formularioT3HTML;