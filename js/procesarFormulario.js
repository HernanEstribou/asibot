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
    alert(JSON.stringify(datosFormulario)); 
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