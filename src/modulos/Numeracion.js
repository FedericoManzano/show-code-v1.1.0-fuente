import $ from "jquery"


const numerar = (elemento, codigo) => {
    $(elemento).append("<div class='numeracion'></div>")
    let linea = 0
    for (let c of codigo) {
        if(c === '\n') {
            linea ++
            $(elemento).children(".numeracion").append("<span>" + linea + "</span>") 
        }
    }
}


export default numerar