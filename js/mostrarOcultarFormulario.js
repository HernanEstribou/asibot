function seleccionarTarifa(selectedButton){            
    
    let containerT2 = document.querySelector(".container-t2");
    let containerT3 = document.querySelector(".container-t3");
    let buttonT2 = document.querySelector(".button-t2");
    let buttonT3 = document.querySelector(".button-t3");

    if (selectedButton.classList.contains("button-t2")) {
        containerT2.classList.remove("hidden");
        containerT2.classList.add("show");
        containerT3.classList.remove("show");
        containerT3.classList.add("hidden");

        if (buttonT3.classList.contains("selected")) {
            buttonT3.classList.remove("selected");
        }
        selectedButton.classList.add("selected");
    } else if (selectedButton.classList.contains("button-t3")) {
        containerT3.classList.remove("hidden");
        containerT3.classList.add("show");
        containerT2.classList.remove("show");
        containerT2.classList.add("hidden");

        if (buttonT2.classList.contains("selected")) {
            buttonT2.classList.remove("selected");
        }
        selectedButton.classList.add("selected");
    }
    
}

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