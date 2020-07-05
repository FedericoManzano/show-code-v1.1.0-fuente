import $ from "jquery"
import numerar from "./Numeracion"

(function () {


    let indice = 0

    const CARACTER = [
        '+', '/', '='
    ]

    const CADENAS = [
        '"',
        "'"
    ]


    const esCaracter = (c) => {
        return CARACTER.indexOf(c) !== -1
    }

    const esCadena = (c) => {
        return CADENAS.indexOf(c) !== -1
    }

    const colorearEtiqueta = (codigo, resultado, pos) => {
        if(codigo[pos] === '<') {
            resultado += "<span class='show-ang'>" + codigo[pos] + "</span>"
            pos ++
        }
        while(codigo[pos] !== ' ' && codigo[pos] !== '>' && codigo[pos] !== '&gt;' && pos < codigo.length) {
            if(codigo[pos] === '/') {
                resultado += "<span class='show-ang'>" + codigo[pos] + "</span>"
            }else
                resultado += "<span class='show-eti'>" + codigo[pos] + "</span>"
            pos ++
        }

        
        if(codigo[pos] === ' ' ) 
            resultado += ' '
        indice = pos
        return resultado
    }

    const colorearAttr = (codigo, resultado, pos) => {
        while(!esCaracter(codigo[pos]) && codigo[pos] !== ' ' && codigo[pos] !== '>' && codigo[pos] !== '&gt;'){
            resultado += "<span class='show-attr'>" + codigo[pos] + "</span>"
            pos ++
        }

        if(codigo[pos] === ' ' ) 
            resultado += ' '
        indice = pos
        return resultado
    }

    const colorearCadena = (codigo, resultado, pos) => {
        let cadena = codigo[pos]
        resultado += "<span class='show-string'>" + codigo[pos] + "</span>"
        pos ++ 
        while(codigo[pos] !== cadena) {
            resultado += "<span class='show-string'>" + codigo[pos] + "</span>"
            pos ++ 
        } 
        resultado += "<span class='show-string'>" + codigo[pos] + "</span>"
        pos ++ 

        if(codigo[pos] === ' ' ) 
            resultado += ' '
        if(codigo[pos] === '\n')
            resultado += '\n'
        indice = pos
        return resultado
    }

    const esComentario = (codigo, pos) => {
        if((codigo[pos] === '<' || codigo[pos] === '&lt;') 
            && codigo[pos + 1] === '!' && codigo[pos + 2] === '-')
            return true 
        return false
    }

    const colorearComentario = (codigo, resultado, pos) => {


        resultado += "<span class='show-com'>" + codigo[pos] + "</span>"
        pos ++

        while((codigo[pos]  !== '>' &&  codigo[pos] !== '&gt;')){
            resultado += "<span class='show-com'>" + codigo[pos] + "</span>"
            pos ++
        }

        if(codigo[pos]  !== '>' ||  codigo[pos] !== '&gt;') {
            resultado += "<span class='show-com'>" + codigo[pos] + "</span>"
        }


        indice = pos
        return resultado
    } 
    
    const colorearLinea = (codigo, resultado, pos) => {
        if(codigo[pos] === '<' || codigo[pos] === '&lt;')
            resultado = colorearEtiqueta(codigo, resultado, pos)
        pos = indice 

        if(codigo[pos] === ' ') {
            resultado += ' '
            pos ++
            resultado = colorearAttr(codigo, resultado, pos)
        }
        pos = indice 

        if(esCaracter(codigo[pos])) {
            resultado += "<span class='c-negro'>" + codigo[pos] + "</span>"
            pos ++
        }
       
        if(esCadena(codigo[pos])) {
            resultado = colorearCadena(codigo, resultado, pos)
        }
        pos = indice
        if(codigo[pos] === '>' || codigo[pos] === '&gt;') {
            resultado += "<span class='show-ang'>" + codigo[pos] + "</span>"
        }
            
        pos = indice
        return resultado
    }
    
    const inicializar = ({tipo = "html", lineas = true} = {}) => {

        $(".cod-html").each((index, e) => { 
            let codigo = ""
           
            if(tipo === "html") {
                codigo = $(e).html()
                $(e).text(codigo)
            } else {
                codigo = $(e).text()
                $(e).text(codigo)
            }

            let resultado = ""
            for (let i = 0; i < codigo.length; i++) {
                if(codigo[i] === '<' || codigo[i] === "&lt;") {
                    while( !esComentario(codigo, i) && (codigo[i] !== '>' && codigo[i] !== "&gt;")) {
                        resultado = colorearLinea(codigo, resultado, i)
                        i = indice
                    }
                    if(esComentario(codigo, i)){
                        resultado = colorearComentario(codigo, resultado, i)
                        i = indice
                    }
                }else {
                    resultado += codigo[i]
                }
            }

            $(e).html(resultado)
            if(lineas) 
                numerar(e, codigo)
        })
    }

    const CodigoHtml = {
        iniciar: (config) => {
            inicializar(config)
        }
    }

    window.CodigoHtml = CodigoHtml
})()

export default CodigoHtml
     
