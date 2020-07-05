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


    const colorearNombre = (codigo) => {


        let met = /[a-z]+ *[a-zA-Z0-9\$-_]+ *= *\(.*\) *=&gt; *\n*{/
        let bus = codigo.search(met)
        let aux = codigo.substring(bus, codigo.length)
        let i = 0
       
        while(bus !== -1) { 
            let pal = ""
          
            while(aux[i] !== ' ' && i < aux.length) 
                i ++
            while(aux[i] === ' ' && i < aux.length) 
                i ++
            while(aux[i] !== '=') {
                pal += aux[i]
                i ++
            }

            codigo = codigo.replace(pal, `<span class='show-met'>${pal}</span>`)
            aux = aux.substring(i + 1, aux.length)
            bus = aux.search(met)
            i = bus
        }

        return codigo
    }


    const colorearNombreFuncion = (codigo) => {
        let met = /function[\t ]+[a-zA-Z0-9-_\$]+[\t ]*\([\t ]*.*[\t ]*\)[\t ]*{/
        let bus = codigo.search(met)
        let aux = codigo.substring(bus, codigo.length)
        let i = 0
       
        while(bus !== -1) { 
            let pal = ""
          
            while(aux[i] !== ' ' && i < aux.length) 
                i ++
            while(aux[i] === ' ' && i < aux.length) 
                i ++
            while(aux[i] !== '(') {
                pal += aux[i]
                i ++
            }

            codigo = codigo.replace(pal, `<span class='show-met'>${pal}</span>`)
            aux = aux.substring(i + 1, aux.length)
            bus = aux.search(met)
            i = bus
        }

        return codigo
    }


    const colorearLlamadas = (codigo) => {
        let met = /[a-zA-Z0-9_]+[\t ]*\([\n\t ]*[ a-zA-Z0-9_\:{}"=#,\t\n-]*,*\)[\t\n ]*{/
        let bus = codigo.search(met)
        let aux = codigo.substring(bus, codigo.length)
        let i = 0
       
        while(bus !== -1) { 
            let pal = ""
            while(aux[i] !== '(') {
                pal += aux[i]
                i ++
            }
            codigo = codigo.replace(new RegExp(`${pal}`), `<span class='show-var'>${pal}</span>`)
            aux = aux.substring(i + 1, aux.length)
            bus = aux.search(met)
            i = bus
        }

        return codigo
    }


    const inicializar = ({lineas=true}={}) => {
        $(".cod-js").each((index, e) => {
            let codigo = $(e).html()
            $(e).text(codigo)

            
            let resultado = colorearCadenas(codigo)
            resultado = colorearComentarios(resultado)
            
            resultado = colorearNombre(resultado)
            resultado = colorearNombreFuncion(resultado)
            resultado = colorearLlamadas(resultado)
           

            resultado = resultado.replace(/=&gt;/g, "<span class='show-res'>=></span>")
            resultado = resultado.replace(/undefined/g, "<span class='show-res'>undefined</span>")
            resultado = resultado.replace(/const /g, "<span class='show-res'>const </span>")
            resultado = resultado.replace(/let /g, "<span class='show-res'>let </span>")
            resultado = resultado.replace(/var /g, "<span class='show-res'>var </span>")
            resultado = resultado.replace(/class /g, "<span class='show-res'>class </span>")
            resultado = resultado.replace(/function/g, "<span class='show-res'>function</span>")
            resultado = resultado.replace(/constructor/g, "<span class='show-res'>constructor</span>")
            resultado = resultado.replace(/this/g, "<span class='show-res'>this</span>")
            resultado = resultado.replace(/typeof/g, "<span class='show-res'>typeof</span>")
            resultado = resultado.replace(/import /g, "<span class='show-res'>import </span>")
            resultado = resultado.replace(/export /g, "<span class='show-res'>export </span>")
            resultado = resultado.replace(/from /g, "<span class='show-res'>from </span>")
            resultado = resultado.replace(/true/g, "<span class='show-res'>true </span>")
            resultado = resultado.replace(/false/g, "<span class='show-res'>false </span>")
            resultado = resultado.replace(/new /g, "<span class='show-res'>new </span>")
            resultado = resultado.replace(/interface/g, "<span class='show-res'>interface</span>")
            resultado = resultado.replace(/require/g, "<span class='show-met'>require</span>")
            resultado = resultado.replace(/if[\n ]*\(/g, "<span class='show-control'>if</span>&nbsp;<span class='show-neutro'>(</span>")
            resultado = resultado.replace(/else/g, "<span class='show-control'>else</span>")
            resultado = resultado.replace(/while[\n ]*\(/g, "<span class='show-control'>while</span>&nbsp;<span class='show-neutro'>(</span>")
            resultado = resultado.replace(/switch/g, "<span class='show-control'>switch</span>")
            resultado = resultado.replace(/case/g, "<span class='show-control'>case</span>")
            resultado = resultado.replace(/default/g, "<span class='show-control'>default</span>")
            resultado = resultado.replace(/extends/g, "<span class='show-control'>extends</span>")
            resultado = resultado.replace(/static/g, "<span class='show-control'>static</span>")
            resultado = resultado.replace(/return/g, "<span class='show-control'>return </span>")
            resultado = resultado.replace(/do[\n ]*{/g, "<span class='show-control'>do</span>&nbsp;<span class='show-neutro'>{</span>")
            resultado = resultado.replace(/forEach/g, "<span class='show-control'>forEach</span>")
            resultado = resultado.replace(/for[\n ]*\(/g, "<span class='show-control'>for</span>&nbsp;<span class='show-neutro'>(</span>")
            resultado = resultado.replace(/break/g, "<span class='show-control'>break</span>")


            resultado = resultado.replace(/!/g, "<span class='show-op'>!</span>")
            
            resultado = resultado.replace(/console\.log/g, "<span class='show-sistema'>console</span><span class='show-neutro'>.</span><span class='show-control'>log</span>")
            resultado = resultado.replace(/console\.error/g, "<span class='show-sistema'>console</span><span class='show-neutro'>.</span><span class='show-error'>error</span>")
            resultado = resultado.replace(/console\./g, "<span class='show-sistema'>console</span><span class='show-neutro'>.</span>")
            resultado = resultado.replace(/window\./g, "<span class='show-sistema'>window</span><span class='show-neutro'>.</span>")
            resultado = resultado.replace(/\( *window *\)/g, "<span class='show-neutro'>( </span><span class='show-sistema'>window</span><span class='show-neutro'> )</span>")
            resultado = resultado.replace(/document\./g, "<span class='show-sistema'>document</span><span class='show-neutro'>.</span>")
            resultado = resultado.replace(/\( *document *\)/g, "<span class='show-neutro'>( </span><span class='show-sistema'>document</span><span class='show-neutro'> )</span>")
            resultado = resultado.replace(/alert\./g, "<span class='show-sistema'>alert</span><span class='show-neutro'>.</span>")
            
            
            $(e).html(resultado)

            if(lineas) 
                numerar(e, codigo)
        })
    }

    const CodigoJs = {
        iniciar: (config) => {
            inicializar(config)
        }
    }

    window.CodigoJs = CodigoJs
})()

export default CodigoJs
     
