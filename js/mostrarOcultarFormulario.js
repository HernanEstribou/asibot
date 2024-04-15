function selection(selectedButton){
            
    
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

    /*if (selectedButton.className == "button-t2"){

        let containerT2 = document.querySelector(".container-t2");
        let containerT3 = document.querySelector(".container-t3");
        let buttonT3 = document.querySelector(".button-t3");

        containerT2.classList.remove("hidden");
        containerT2.classList.add("show"); 

        containerT3.classList.remove("show");
        containerT3.classList.add("hidden");                

        if (buttonT3.classList.contains("selected")){
            buttonT3.classList.remove("selected");               
        }                
        selectedButton.classList.add("selected");     
        
        
    } else if (selectedButton.className == "button-t3"){
        let containerT3 = document.querySelector(".container-t3");
        let containerT2 = document.querySelector(".container-t2");
        let buttonT2 = document.querySelector(".button-t2");

        containerT3.classList.remove("hidden");
        containerT3.classList.add("show");
        
        containerT2.classList.remove("show");
        containerT2.classList.add("hidden");
                        
        if (buttonT2.classList.contains("selected")){
            buttonT2.classList.remove("selected")
        };
        
        selectedButton.classList.add("selected");      
        
    }*/
}