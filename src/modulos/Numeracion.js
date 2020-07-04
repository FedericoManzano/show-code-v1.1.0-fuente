import $ from "jquery"


const numerar = (elemento, codigo) => {
    $(elemento).append("<div class='numeracion'></div>")
    let linea = 0
    for(let i = 0; i < codigo.length; i++ ) {
        if(codigo[i] === '\n') {
            linea ++
            $(elemento).children(".numeracion").append("<span>" + linea + "</span>") 
        }
    }
}


export default numerar