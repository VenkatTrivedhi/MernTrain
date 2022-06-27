
function showinfo(str){

    const elmt = document.querySelector(str)

    if (elmt.style.display=="block") {

        elmt.setAttribute('style', 'display: none');
    }
    else{ 
        elmt.setAttribute('style', 'display: block');
    }

    }