function seleccionarEmpresa(selectedButton){
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
    
    containerTarifas.classList.remove("hidden");
}

function seleccionarTarifa(selectedButton) {            
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
}

/*function seleccionarTarifa(selectedButton){            
    
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

    if (selectedButton.classList.contains("button-t2")) {        
        containerPeaje.classList.remove("hidden");        
        
        containerTension.classList.add("hidden");
        
        containerT3.classList.add("hidden");

        if (buttonT3.classList.contains("selected")) {
            buttonT3.classList.remove("selected");
        }

        //Remuevo la selección de Tensión
        if(buttonBT.classList.contains("selected")){
            buttonBT.classList.remove("selected");
        } else if( buttonMT.classList.contains("selected")){
            buttonMT.classList.remove("selected");
        }

        //selectedButton.classList.add("selected");
    } else if (selectedButton.classList.contains("button-t3")) {      
        containerPeaje.classList.add("hidden");
                
        containerTension.classList.remove("hidden");        
        containerT2.classList.add("hidden");

        if (buttonT2.classList.contains("selected")) {
            buttonT2.classList.remove("selected");
        }
        //selectedButton.classList.add("selected");
        
    } 

    selectedButton.classList.add("selected");

    //Remuevo la selección de Peaje
    if(buttonP.classList.contains("selected")){
        buttonP.classList.remove("selected");
    } else if( buttonNP.classList.contains("selected")){
        buttonNP.classList.remove("selected");
    }
    
}*/

function seleccionarTension(selectedButton){
    let containerT3 = document.querySelector(".container-t3");
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
     
    containerPeaje.classList.remove("hidden");    
    
}

function seleccionarPeaje(selectedButton){
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
    } else if (buttonT3.classList.contains("selected")){
        containerT3.classList.remove("hidden");          
    }

    selectedButton.classList.add("selected");
       
}