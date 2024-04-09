function generarFormulario(tipo, numPeriodos) {
    let html = `<form class="form-${tipo}" action="#" method="post">`;

    // Titulos
    html += `
        <div class="row">
            <div class="col-sm-1 mb-3">
                <label for="periodo" class="form-label"></label>                                    
            </div>
            <div class="col-sm-1 mb-3">
                <label for="año" class="form-label">Año</label>                                                                        
            </div>
            <div class="col-sm-1 mb-3">
                <label for="mes" class="form-label">Mes</label>                                    
            </div>
            <div class="col-sm-1 mb-3">
                <label for="csc" class="form-label">CSC</label>                                    
            </div>
            <div class="col-sm-1 mb-3">
                <label for="pa" class="form-label">PA</label>                                    
            </div>`;

    if (tipo === 'T3') {
        html += `
            <div class="col-sm-1 mb-3">
                <label for="epta" class="form-label">EPta</label>                                    
            </div>
            <div class="col-sm-1 mb-3">
                <label for="eValle" class="form-label">EValle</label>                                    
            </div>                               
            <div class="col-sm-1 mb-3">
                <label for="eResto" class="form-label">EResto</label>                                    
            </div>`;

    } else if(tipo==='T2') {
        html += `
            <div class="col-sm-1 mb-3">
                <label for="ent2" class="form-label">EnT2</label>                                    
            </div>`;
    }

    html += `
            <div class="col-sm-${tipo === 'T3' ? '4' : '6'} mb-3">
                <label for="Importe" class="form-label">Importe</label>                                    
            </div>  
        </div>`;

    // Generar los periodos
    for (let i = 1; i <= numPeriodos; i++) {
        html += `
            <!-- Periodo ${i} -->
            <div class="row">
                <div class="col-sm-1 mb-3">
                    <p>${i}</p>
                </div>
                <div class="col-sm-1 mb-3">
                    <input class="form-control" type="text" name="anio" placeholder="AAAA">
                </div>
                <div class="col-sm-1 mb-3">
                    <input class="form-control" type="text" name="mes" placeholder="MM">
                </div>
                <div class="col-sm-1 mb-3">
                    <input class="form-control" type="text" name="csc" placeholder="">
                </div>
                <div class="col-sm-1 mb-3">
                    <input class="form-control" type="text" name="pa" placeholder="">
                </div>`;

        if (tipo === 'T3') {
            html += `
                <div class="col-sm-1 mb-3">
                    <input class="form-control" type="text" name="epta" placeholder="">
                </div>
                <div class="col-sm-1 mb-3">
                    <input class="form-control" type="text" name="eValle" placeholder="">
                </div>
                <div class="col-sm-1 mb-3">
                    <input class="form-control" type="text" name="eResto" placeholder="">
                </div>`;
        } else if(tipo==='T2') {
        html += `
                <div class="col-sm-1 mb-3">
                    <input class="form-control" type="text" name="enT2" placeholder="">
                </div>`;
        }

        html += `
            <div class="col-sm-${tipo === 'T3' ? '4' : '6'} mb-3">
                <input class="form-control" type="text" name="importe${i}" placeholder="Importe">
            </div>
        </div>`;
    }

    html += `<button type="submit" class="btn btn-primary" tabindex="5">Calcular</button></form>`;

    return html;
}

// Generar los formularios T2 y T3 con 2 periodos cada uno
const formularioT2HTML = generarFormulario('T2', 12);
const formularioT3HTML = generarFormulario('T3', 12);

// Insertar los formularios en los contenedores correspondientes
document.getElementById('formulario-t2-container').innerHTML = formularioT2HTML;
document.getElementById('formulario-t3-container').innerHTML = formularioT3HTML;