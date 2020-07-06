import $ from "jquery"
import numerar from "./Numeracion"

(function () {

    const colorearCadenas = (codigo) => {
        let resultado = ""
        for(let i = 0; i < codigo.length; i ++ ){
            if(codigo[i] === '"' || codigo[i] === "'" || codigo[i] === "`") {
                let car = codigo[i] 
                resultado += "<span class='show-string'>" + codigo[i] + "</span>"
                i ++ 
                while(i < codigo.length && codigo[i] !== car) {
                    if(car === '`') {
                        if(codigo[i] === '$') {
                            while(i < codigo.length && codigo[i] !== '}') {
                                resultado += "<span class='show-res'>" + codigo[i] + "</span>"
                                i ++
                            }
                            if(codigo[i] === '}') {
                                resultado += "<span class='show-res'>" + codigo[i] + "</span>"
                                i ++
                            }
                        } else {
                            resultado += "<span class='show-string'>" + codigo[i] + "</span>"
                            i ++
                        }
                    } else {
                        resultado += "<span class='show-string'>" + codigo[i] + "</span>"
                        i ++
                    }
                }
                if(codigo[i] === car) {
                    resultado += "<span class='show-string'>" + codigo[i] + "</span>"
                    i ++
                }
                resultado += codigo[i]
            }else {
                resultado +=  codigo[i] 
            }
        }

        return resultado
    }


    const colorearComentarios = (codigo) => {
        let resultado = ""
        for(var i = 0; i < codigo.length; i ++ ){ 
            if(codigo[i] === '/' && codigo[i + 1] === '/') {
                resultado += "<span class='show-com'>" + codigo[i] + "</span>"
                i ++ 
                while(codigo[i] !== '\n' && i < codigo.length) {
                    resultado += "<span class='show-com'>" + codigo[i] + "</span>"
                    i ++ 
                }
                resultado +=  codigo[i] 
            } else if(codigo[i] === '/' && codigo[i + 1] === '*') {
                resultado += "<span class='show-com'>" + codigo[i] + "</span>"
                i ++ 
                while(codigo[i] !== '/' && i < codigo.length) {
                    resultado += "<span class='show-com'>" + codigo[i] + "</span>"
                    i ++ 
                }
                if(codigo[i] === '/' ) {
                    resultado += "<span class='show-com'>" + codigo[i] + "</span>"
                    i ++ 
                }
                resultado +=  codigo[i] 
            }
            else {
                resultado +=  codigo[i] 
            }
        }
        return resultado
    }


    const colrearMetodo = (codigo) => {
        let met = /[a-zA-Z]+ +[a-zA-Z0-9]+ *\( *.* *\)\n* */
        let bus = codigo.search(met)
        let pal = ""
        let aux = codigo.substring(bus, codigo.length)
        let i = 0
        
        let retorno = ""

        while(bus !== -1) { 
            pal = ""
            retorno = ""
            while(aux[i] !== ' ' && i < aux.length) {
                retorno += aux[i]
                i ++
            }
                
            while(aux[i] === ' ' && i < aux.length)
                i ++
            while(aux[i] !== '(' && i < aux.length) {
                pal += aux[i]
                i ++
            }
            codigo = codigo.replace(retorno + " " + pal, `<span class='show-control'>${retorno}</span> <span class='show-c'>${pal}</span>`)
            aux = aux.substring(i + 1, aux.length)
            bus = aux.search(met)
            i = bus
        }

        
        return codigo
    }

    const colrearInc = (codigo) => {
        let met = /#include +</
        let bus = codigo.search(met)
        let aux = codigo.substring(bus, codigo.length)
        let i = 0
    

        while(bus !== -1) { 
            let pal = ""
            let lib = ""
            while(aux[i] !== '<' && i < aux.length) {
                pal += aux[i]
                i ++
            }

            i ++ 
            while(aux[i] !== '>' && i < aux.length) {
                lib += aux[i]
                i ++
            }

            if(lib !== "span class='show-string'")
                codigo = codigo.replace(pal, `<span class='show-inc'>${pal}</span> <span class='show-inc'>&lt;${lib}&gt;</span>`)
            aux = aux.substring(i + 1, aux.length)
            bus = aux.search(met)
            i = bus
        }

        
        return codigo
    }

    const colorearDefine = (codigo) => {
        let met = /#define/
        let bus = codigo.search(met)
        let aux = codigo.substring(bus, codigo.length)
        let i = 0
    

        while(bus !== -1) { 
            let pal = ""
            while(aux[i] !== '\n' && i < aux.length) {
                pal += aux[i]
                i ++
            }
            codigo = codigo.replace(pal, `<span class='show-inc'>${pal}</span>`)
            aux = aux.substring(i + 1, aux.length)
            bus = aux.search(met)
            i = bus
        }

        
        return codigo
    }

    const colorearIfndef = (codigo) => {
        let met = /#ifndef/
        let bus = codigo.search(met)
        let aux = codigo.substring(bus, codigo.length)
        let i = 0
    

        while(bus !== -1) { 
            let pal = ""
            while(aux[i] !== '\n' && i < aux.length) {
                pal += aux[i]
                i ++
            }
            codigo = codigo.replace(pal, `<span class='show-inc'>${pal}</span>`)
            aux = aux.substring(i + 1, aux.length)
            bus = aux.search(met)
            i = bus
        }

        
        return codigo
    }


    const inicializar = ({lineas=true}={}) => {
        $(".cod-c").each((index, e) => {
            let codigo = $(e).html()
            $(e).text(codigo)


            let resultado = colorearCadenas(codigo)
            resultado = colrearMetodo(resultado)
            resultado = colrearInc(resultado)
            resultado = colorearComentarios(resultado)
            resultado = colorearDefine(resultado)
            resultado = colorearIfndef(resultado)

            resultado = resultado.replace(/-&gt;/g, "<span class='show-c'>-></span>")


            resultado = resultado.replace(/\*/g, "<span class='show-c'>*</span>")
            resultado = resultado.replace(/&amp;/g, "<span class='show-c'>&</span>")
            resultado = resultado.replace(/\|/g, "<span class='show-c'>|</span>")
            resultado = resultado.replace(/int[\t ]+/g, "<span class='show-control'>int </span>")
            resultado = resultado.replace(/return[\t ]+/g, "<span class='show-control'>return </span>")
            resultado = resultado.replace(/long[\t ]+/g, "<span class='show-control'>long </span>")
            resultado = resultado.replace(/short[\t ]+/g, "<span class='show-control'>short </span>")
            resultado = resultado.replace(/const[\t ]+/g, "<span class='show-control'>const </span>")
            resultado = resultado.replace(/byte[\t ]+/g, "<span class='show-control'>byte </span>")
            resultado = resultado.replace(/char[\t ]+/g, "<span class='show-control'>char </span>")
            resultado = resultado.replace(/void[\t ]+/g, "<span class='show-control'>void </span>")
            resultado = resultado.replace(/double[\t ]+/g, "<span class='show-control'>double </span>")
            resultado = resultado.replace(/#include/g, "<span class='show-inc'>#include</span>")
            resultado = resultado.replace(/#endif/g, "<span class='show-inc'>#endif</span>")
            resultado = resultado.replace(/#ifndef/g, "<span class='show-inc'>#ifndef</span>")
            resultado = resultado.replace(/if[\t ]*\(/g, "<span class='show-res'>if </span><span class='show-neutro'>(</span>")
            
            resultado = resultado.replace(/switch[\t ]*\(/g, "<span class='show-res'>switch </span></span><span class='show-neutro'>(</span>")
            resultado = resultado.replace(/while[\t ]*\(/g, "<span class='show-res'>while </span></span><span class='show-neutro'>(</span>")
            resultado = resultado.replace(/for[\t ]*\(/g, "<span class='show-res'>for </span></span><span class='show-neutro'>(</span>")
            resultado = resultado.replace(/do[\t\n ]*{/g, "<span class='show-res'>do </span></span><span class='show-neutro'>{</span>")
            resultado = resultado.replace(/else /g, "<span class='show-res'>else </span>")
            
            resultado = resultado.replace(/case/g, "<span class='show-res'>case</span>")
            resultado = resultado.replace(/break/g, "<span class='show-res'>break</span>")
            resultado = resultado.replace(/sizeof/g, "<span class='show-res'>sizeof</span>")
            resultado = resultado.replace(/typedef/g, "<span class='show-res'>typedef</span>")
            resultado = resultado.replace(/struct/g, "<span class='show-res'>struct</span>")
            
        
            $(e).html(resultado)

            if(lineas) 
                numerar(e, codigo)
        })
    }

    const CodigoC = {
        iniciar: (config) => {
            inicializar(config)
        }
    }

    window.CodigoC = CodigoC
})()

export default CodigoC
     
