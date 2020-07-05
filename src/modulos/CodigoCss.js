import $ from "jquery"
import numerar from "./Numeracion"

(function () {
    let indice = 0
    


    const esClave = (codigo, pos) => {
        return codigo[pos] === '@'
    }

    const esCadena = (codigo, pos) => {
        return codigo[pos] === '"' || codigo[pos] === "'"
    }

    const esProp = (codigo, pos) => {
        return codigo[pos] === '{'
    }

    const esSelector = (codigo, pos) => {
        if(codigo[pos] === ' ' || codigo[pos] === '\t') return false
        return /(\.*\#*[^ @ ][a-zA-Z0-9-_\(\)\[\])]+ *\n*{)/.test(codigo.substring(pos, codigo.length))
    }

    const colorearClave = (codigo, resultado, pos) => {
        while(codigo[pos] !== ' ' && pos < codigo.length ) {
            resultado += "<span class='show-claves'>" + codigo[pos] + "</span>"
            pos ++
        }
        resultado += codigo[pos]
        indice = pos
        return resultado
    }

    const colorearPop = (codigo, resultado, pos) => {
        resultado += "<span class='show-llaves'>" + codigo[pos] + "</span>"
        pos ++

        while(codigo[pos] !== '}' && pos < codigo.length ) {
            while(!esComentario(codigo, pos) && codigo[pos] !== ':' && codigo[pos] !== '}' &&pos < codigo.length ) {
                resultado += "<span class='show-prop'>" + codigo[pos] + "</span>"
                pos ++    
            }
            
            while( !esComentario(codigo, pos) && codigo[pos] !== '\n' && codigo[pos] !== '}' && pos < codigo.length ) {
                if(codigo[pos] === '!') {
                    while(codigo[pos] !== ';' && codigo[pos] !== '\n' && codigo[pos] !== ' ' && pos < codigo.length){
                        resultado += "<span class='show-res'>" + codigo[pos] + "</span>"
                        pos ++
                    }
                }else {
                    resultado += "<span class='show-valor'>" + codigo[pos] + "</span>"
                    pos ++
                }
            }

            if( esComentario(codigo, pos) ) {
                resultado = colorearComentario(codigo, resultado, pos) 
                pos = indice
            }
        }
        
        resultado += codigo[pos]
        indice = pos
        return resultado
    }


    const colorearCadena = (codigo, resultado, pos) => {
        let caracterFin = codigo[pos]
        resultado += "<span class='show-string'>" + codigo[pos] + "</span>"
        pos ++
        while(codigo[pos] !== caracterFin && pos < codigo.length ) {
            resultado += "<span class='show-string'>" + codigo[pos] + "</span>"
            pos ++
        }
        if(codigo[pos] === caracterFin) 
            resultado += "<span class='show-string'>" + codigo[pos] + "</span>"
        else 
            resultado += codigo[pos]

        if(codigo[pos] === '}') {
            resultado += "<span class='show-llaves'>" + codigo[pos] + "</span>"
            pos ++
        }

        indice = pos
        return resultado
    }

    const esComentario = (codigo, pos) => {
        return codigo[pos] === '/' && codigo[pos + 1] === '*'
    } 

    const colorearComentario = (codigo, resultado, pos) => {
        resultado += "<span class='show-com'>" + codigo[pos] + "</span>"
        pos ++ 
        resultado += "<span class='show-com'>" + codigo[pos] + "</span>"
        pos ++ 
        while(codigo.substring(pos, pos+2) !== "*/" && pos < codigo.length ) {
            resultado += "<span class='show-com'>" + codigo[pos] + "</span>"
            pos ++ 
        }

        if(codigo[pos] === '*' && codigo[pos + 1] === '/') {
            resultado += "<span class='show-com'>" + codigo[pos] + "</span>"
            pos ++ 
            resultado += "<span class='show-com'>" + codigo[pos] + "</span>"
            pos ++ 
        }

        resultado += codigo[pos]
        indice = pos

        return resultado
    }


    const colorearSelector = (codigo, resultado, pos) => {
        while(!esComentario(codigo, pos) && codigo[pos] !== '}' && !esProp(codigo, pos) && !esClave(codigo, pos) && !esCadena(codigo, pos) && codigo[pos] !== '{' && pos < codigo.length ) {
            resultado += "<span class='show-selectores'>" + codigo[pos] + "</span>"
            pos ++
        }

        if(esComentario(codigo, pos)) {
            indice = pos
            return resultado
        }
        if(esCadena(codigo, pos) ) {
            indice = pos
            return resultado
        } 

        if(esClave(codigo, pos) ) {
            indice = pos
            return resultado
        } 

        if(esProp(codigo, pos) ) {
            indice = pos
            return resultado
        }

        
        resultado += codigo[pos]
        indice = pos
        return resultado
    }



    const inicializar = ({lineas=true}={}) => {
        $(".cod-css").each((index, e) => {
            let codigo = $(e).html()
            $(e).text(codigo)

            let resultado = ""
            for (let i = 0; i < codigo.length; i++) {

                if(esSelector(codigo, i)) {
                    resultado = colorearSelector(codigo, resultado, i)
                    i = indice
                    if(esCadena(codigo, i)) {
                        resultado = colorearCadena(codigo, resultado, i) 
                        i = indice
                    }
                    if(esClave(codigo, i)) {
                        resultado = colorearClave(codigo, resultado, i) 
                        i = indice
                    }

                    if(esProp(codigo, i)) {
                        resultado = colorearPop(codigo, resultado, i) 
                        i = indice
                    }

                    if(esComentario(codigo, i)) {
                        resultado = colorearComentario(codigo, resultado, i) 
                        i = indice
                    }
                }
                else {
                    resultado += codigo[i]
                }
            }

            resultado = resultado.replace(/!important/g, "<span class='show-res'>!important</span>")
            $(e).html(resultado)

            if(lineas) 
                numerar(e, codigo)
        })
    }

    const CodigoCss = {
        iniciar: (config) => {
            inicializar(config)
        }
    }

    window.CodigoCss = CodigoCss
})()

export default CodigoCss
     
