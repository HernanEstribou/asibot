function seleccionarEmpresa(selectedButton){
    let containerTarifas = document.querySelector(".container-tarifas");
    let edenor = document.querySelector(".button-edenor");
    let edesur = document.querySelector(".button-edesur"); 

    if (selectedButton.classList.contains("button-edenor")) {
        edenor.classList.add("selected");
        if (edesur.classList.contains("selected")){
            edesur.classList.remove("selected");
        }
    } else if(selectedButton.classList.contains("button-edesur")){
        edesur.classList.add("selected");
        if (edenor.classList.contains("selected")){
            edenor.classList.remove("selected");
        }
    }

    containerTarifas.classList.add("show");
}

function seleccionarTarifa(selectedButton){            
    
    let containerT2 = document.querySelector(".container-t2");
    let containerT3 = document.querySelector(".container-t3");
    let containerTension = document.querySelector(".container-tension"); 
    let buttonT2 = document.querySelector(".button-t2");
    let buttonT3 = document.querySelector(".button-t3");
    let buttonBT = document.querySelector(".button-BT");
    let buttonMT = document.querySelector(".button-MT");

    if (selectedButton.classList.contains("button-t2")) {
        containerT2.classList.remove("hidden");
        containerT2.classList.add("show");
        containerTension.classList.remove("show");
        containerTension.classList.add("hidden");

        containerT3.classList.remove("show");
        containerT3.classList.add("hidden");

        if (buttonT3.classList.contains("selected")) {
            buttonT3.classList.remove("selected");
        }

        if(buttonBT.classList.contains("selected")){
            buttonBT.classList.remove("selected");
        } else if( buttonMT.classList.contains("selected")){
            buttonMT.classList.remove("selected");
        }

        selectedButton.classList.add("selected");
    } else if (selectedButton.classList.contains("button-t3")) {
        //containerT3.classList.remove("hidden");
        //containerT3.classList.add("show");

        containerTension.classList.remove("hidden");
        containerTension.classList.add("show");
        containerT2.classList.remove("show");
        containerT2.classList.add("hidden");

        if (buttonT2.classList.contains("selected")) {
            buttonT2.classList.remove("selected");
        }
        selectedButton.classList.add("selected");
        
    }
    
}



function seleccionarTension(selectedButton){
    let containerT3 = document.querySelector(".container-t3");
    let buttonBT = document.querySelector(".button-BT");
    let buttonMT = document.querySelector(".button-MT");

    if (selectedButton.classList.contains("button-BT")) {
        

        if (buttonMT.classList.contains("selected")) {
            buttonMT.classList.remove("selected");
        }
        selectedButton.classList.add("selected");

    } else if (selectedButton.classList.contains("button-MT")){
        if (buttonBT.classList.contains("selected")) {
            buttonBT.classList.remove("selected");
        }
        selectedButton.classList.add("selected");
    }

    containerT3.classList.remove("hidden");
    containerT3.classList.add("show");    
    
}