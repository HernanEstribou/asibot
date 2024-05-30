function iniciarTest(){
    let containerEmpresas = document.querySelector(".container-empresas");
    let buttonReset = document.querySelector(".reiniciar");

    containerEmpresas.classList.remove('hidden');
    
    buttonReset.classList.remove('hidden');
    buttonReset.classList.remove('selected');
}

function reiniciarTest(){
    
    const selectedButtons = document.querySelectorAll('.selected');
    const historicalButtons = document.querySelectorAll('.historical-btn');
    const containerMenu = document.querySelectorAll('.container-menu');
    
    selectedButtons.forEach(button => {
        button.classList.remove('selected');
    });

    historicalButtons.forEach(button => {
        button.classList.add('hidden');
        button.classList.add('selected');
    });

    containerMenu.forEach(container => {
        container.classList.add('hidden');
    });

}

function seleccionarEmpresa(selectedButton){
    let reiniciar = document.querySelector(".reiniciar");
    let empresaSelected = document.querySelector(".empresa-selected");
    //let containerHome = document.querySelector(".container-home");
    let containerTarifas = document.querySelector(".container-tarifas");
    let edenor = document.querySelector(".button-edenor");
    let edesur = document.querySelector(".button-edesur"); 

    if (selectedButton.classList.contains("button-edenor")) {        
        if (edesur.classList.contains("selected")){
            edesur.classList.remove("selected");
        }
    } else if(selectedButton.classList.contains("button-edesur")){        
        if (edenor.classList.contains("selected")){
            edenor.classList.remove("selected");
        }
    }

    selectedButton.classList.add("selected");
    empresaSelected.classList.remove("hidden");
    empresaSelected.textContent = selectedButton.textContent; 
    
    containerTarifas.classList.remove("hidden");
    
    reiniciar.classList.remove("hidden");
}

function seleccionarTarifa(selectedButton) { 
    let tarifaSelected = document.querySelector(".tarifa-selected");           
    let containerT1 = document.querySelector(".container-t1");
    let containerT2 = document.querySelector(".container-t2");
    let containerT3 = document.querySelector(".container-t3");
    let containerTension = document.querySelector(".container-tension");
    let containerPeaje = document.querySelector(".container-peaje");
    
    let buttonT1 = document.querySelector(".button-t1");
    let buttonT2 = document.querySelector(".button-t2");
    let buttonT3 = document.querySelector(".button-t3");
    let buttonBT = document.querySelector(".button-BT");
    let buttonMT = document.querySelector(".button-MT");
    let buttonP = document.querySelector(".button-P");
    let buttonNP = document.querySelector(".button-NP");

    // Remover selección de todos los botones
    [buttonT1, buttonT2, buttonT3, buttonBT, buttonMT, buttonP, buttonNP].forEach(button => {
        if (button.classList.contains("selected")) {
            button.classList.remove("selected");
        }
    });

    if (selectedButton.classList.contains("button-t1")) {
        //Muestro el contenedor de T1
        containerT1.classList.remove("hidden");        
        
        //Oculto todos los contenedores que no son containerT1
        containerT2.classList.add("hidden");
        containerT3.classList.add("hidden");
        containerTension.classList.add("hidden");
        containerPeaje.classList.add("hidden");
        
    } else if (selectedButton.classList.contains("button-t2")) {
        //Muestro el contenedor de peaje        
        containerPeaje.classList.remove("hidden"); 

        //Oculto todos los contenedores que no son containerPeaje
        containerT1.classList.add("hidden");
        containerT3.classList.add("hidden");
        containerTension.classList.add("hidden");       
        
    } else if (selectedButton.classList.contains("button-t3")) {      
        //Muestro el contenedor de Tensión
        containerTension.classList.remove("hidden");

        //Oculto los contenedores que no son containerTension
        containerT1.classList.add("hidden");
        containerT2.classList.add("hidden");
        containerPeaje.classList.add("hidden");          
                       
    }
    //Aplico la clase selected al botón clickeado
    selectedButton.classList.add("selected");

    tarifaSelected.classList.remove("hidden");
    tarifaSelected.textContent = selectedButton.textContent;    
    
}


function seleccionarTension(selectedButton){
    //let containerT3 = document.querySelector(".container-t3");
    let tensionSelected = document.querySelector(".tension-selected");
    let containerPeaje = document.querySelector(".container-peaje");
    let buttonBT = document.querySelector(".button-BT");
    let buttonMT = document.querySelector(".button-MT");

    if (selectedButton.classList.contains("button-BT")) {
        

        if (buttonMT.classList.contains("selected")) {
            buttonMT.classList.remove("selected");
        }        

    } else if (selectedButton.classList.contains("button-MT")){
        if (buttonBT.classList.contains("selected")) {
            buttonBT.classList.remove("selected");
        }        
    }

    selectedButton.classList.add("selected");

    tensionSelected.classList.remove("hidden");
    tensionSelected.textContent = selectedButton.textContent;
     
    containerPeaje.classList.remove("hidden");    
    
}

function seleccionarPeaje(selectedButton){
    let peajeSelected = document.querySelector(".peaje-selected");
    let containerT2 = document.querySelector(".container-t2");
    let containerT3 = document.querySelector(".container-t3");
    let buttonP = document.querySelector(".button-P");
    let buttonNP = document.querySelector(".button-NP");
    let buttonT2 = document.querySelector(".button-t2");
    let buttonT3 = document.querySelector(".button-t3");    

    if (selectedButton.classList.contains("button-P")) {        

        if (buttonNP.classList.contains("selected")) {
            buttonNP.classList.remove("selected");
        }        

    } else if (selectedButton.classList.contains("button-NP")){
        if (buttonP.classList.contains("selected")) {
            buttonP.classList.remove("selected");
        }        
    }   
    
    if (buttonT2.classList.contains("selected")){
        containerT2.classList.remove("hidden");
        containerT2.scrollIntoView({ behavior: 'smooth' })        
    } else if (buttonT3.classList.contains("selected")){
        containerT3.classList.remove("hidden");
        containerT3.scrollIntoView({ behavior: 'smooth' })          
    }

    selectedButton.classList.add("selected");

    peajeSelected.classList.remove("hidden");
    peajeSelected.textContent = selectedButton.textContent;
    
       
}

function cargarFormulario(){
    let historicalButtons = document.querySelector(".historical-buttons");
    historicalButtons.classList.add("hidden");
    
}