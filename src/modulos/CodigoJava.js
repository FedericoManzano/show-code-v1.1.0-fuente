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
                    resultado += "<span class='show-string'>" + codigo[i] + "</span>"
                    i ++
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


    const colorearVarClases = (codigo) => {
        let met = /private *[a-zA-Z]+ *[a-zA-Z]+;/
        let bus = codigo.search(met)
        let pal = ""
        let aux = codigo.substring(bus, codigo.length)
        let i = 0
        


        while(bus !== -1) { 
            pal = ""
            while(aux[i] !== ' ' && i < aux.length)
                i ++
            while(aux[i] === ' ' && i < aux.length)
                i ++
            while(aux[i] !== ' ' && i < aux.length)
                i ++
            while(aux[i] === ' ' && i < aux.length)
                i ++
            while(aux[i] !== ' ' && aux[i] !== ';' && aux[i] !== '='  && i < aux.length) {
                pal += aux[i]
                i ++
            }
    
            codigo = codigo.replace(pal, "<span class='show-ajava'>"+ pal + "</span>")
            
            aux = aux.substring(i + 1, aux.length)
           
            bus = aux.search(met)
            i = bus
    
        }

        
        return codigo
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

    const colorearAttr = (codigo) => {
        let met = /this\.[a-zA-Z]+[ =;]+/
        let bus = codigo.search(met)
        let pal = ""
        let aux = codigo.substring(bus, codigo.length)
        let i = 0
        


        while(bus !== -1) { 
            pal = ""
            while(aux[i] !== '.' && i < aux.length)
                i ++
            while(aux[i] === '.' && i < aux.length)
                i ++
            while(aux[i] !== ' ' && aux[i] !== ';' && aux[i] !== '='  && i < aux.length) {
                pal += aux[i]
                i ++
            }
    
            codigo = codigo.replace(new RegExp("this\." +pal,"g"), "<span class='show-ajava'>"+ "this." + pal + "</span>")
            
            aux = aux.substring(i + 1, aux.length)
           
            bus = aux.search(met)
            i = bus
    
        }

        
        return codigo
    }


    const colorearSobre = (codigo) => {
        let met = /@[a-zA-Z]+/
        let bus = codigo.search(met)
        let pal = ""
        let aux = codigo.substring(bus, codigo.length)
        let i = 0
        


        while(bus !== -1) { 
            pal = ""
            while(aux[i] !== ' ' && aux[i] !== ';' && aux[i] !== '='  && i < aux.length) {
                pal += aux[i]
                i ++
            }
    
            codigo = codigo.replace(new RegExp(pal,"g"), "<span class='show-sobre'>"+  pal + "</span>")
            
            aux = aux.substring(i + 1, aux.length)
           
            bus = aux.search(met)
            i = bus
    
        }

        
        return codigo
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

            if(retorno !== "new" && retorno !== "public")
                codigo = codigo.replace(retorno + " " + pal, `<span class='show-control'>${retorno}</span> <span class='show-met'>${pal}</span>`)
            else {
                codigo = codigo.replace(pal, `<span class='show-met'>${pal}</span>`)
            }
               
            aux = aux.substring(i + 1, aux.length)
           
            bus = aux.search(met)
            i = bus
    
        }

        
        return codigo
    }


    const colorearLlamadas = (codigo) => {
        let met = /\.[a-zA-Z0-9]+[\t ]*\(.*\)/
        let bus = codigo.search(met)
        let aux = codigo.substring(bus, codigo.length)
        let i = 0
       
        while(bus !== -1) { 
            let pal = ""
            i++
            while(aux[i] !== '(') {
                pal += aux[i]
                i ++
            }
        
            codigo = codigo.replace(new RegExp(`${pal}`, "g"), `<span class='show-llamadas'>${pal}</span>`)
            aux = aux.substring(i + 1, aux.length)
            bus = aux.search(met)
            i = bus
        }

        return codigo
    }

    const inicializar = ({lineas = true}={}) => {

        $(".cod-java").each((index, e) => {
            let codigo = $(e).html()
            $(e).text(codigo)
            let resultado = codigo
            
            
            
            resultado = colorearCadenas(resultado)
            resultado = colorearComentarios(resultado)
            resultado = colrearMetodo(resultado)
            resultado = colorearLlamadas(resultado)
            resultado = colorearAttr(resultado)
            resultado = colorearVarClases(resultado)
            resultado = colorearSobre(resultado)


            resultado = resultado.replace(/=&gt;/g, "<span class='show-res'>=></span>")
            resultado = resultado.replace(/class /g, "<span class='show-res'>class </span>")
            resultado = resultado.replace(/public /g, "<span class='show-res'>public </span>")
            resultado = resultado.replace(/private /g, "<span class='show-res'>private </span>")
            resultado = resultado.replace(/protected /g, "<span class='show-res'>protected </span>")
            resultado = resultado.replace(/package /g, "<span class='show-res'>package </span>")
            resultado = resultado.replace(/final /g, "<span class='show-res'>final </span>")
            resultado = resultado.replace(/static /g, "<span class='show-res'>static </span>")
            resultado = resultado.replace(/function /g, "<span class='show-res'>function </span>")
            resultado = resultado.replace(/constructor /g, "<span class='show-res'>constructor </span>")
            resultado = resultado.replace(/this/g, "<span class='show-res'>this</span>")
            resultado = resultado.replace(/typeof/g, "<span class='show-res'>typeof</span>")
            resultado = resultado.replace(/import /g, "<span class='show-res'>import </span>")
            resultado = resultado.replace(/export /g, "<span class='show-res'>export </span>")
            resultado = resultado.replace(/from /g, "<span class='show-res'>from </span>")
            resultado = resultado.replace(/true /g, "<span class='show-res'>true </span>")
            resultado = resultado.replace(/false /g, "<span class='show-res'>false </span>")
            resultado = resultado.replace(/new /g, "<span class='show-res'>new </span>")
            resultado = resultado.replace(/interface/g, "<span class='show-control'>interface</span>")
            

            resultado = resultado.replace(/try/g, "<span class='show-control'>try</span>")
            resultado = resultado.replace(/catch/g, "<span class='show-control'>catch</span>")
            resultado = resultado.replace(/if/g, "<span class='show-control'>if</span>")
            resultado = resultado.replace(/int[\t ]+/g, "<span class='show-control'>int </span>")
            resultado = resultado.replace(/double [\t ]+/g, "<span class='show-control'>double </span>")
            resultado = resultado.replace(/boolean [\t ]+/g, "<span class='show-control'>boolean </span>")
            resultado = resultado.replace(/long [\t ]+/g, "<span class='show-control'>long </span>")
            resultado = resultado.replace(/void/g, "<span class='show-control'>void </span>")
            resultado = resultado.replace(/extends /g, "<span class='show-control'>extends </span>")
            resultado = resultado.replace(/implements /g, "<span class='show-control'>implements </span>")

            resultado = resultado.replace(/println/g, "<span class='show-llamadas'>println</span>")
            resultado = resultado.replace(/print/g, "<span class='show-llamadas'>print</span>")

            resultado = resultado.replace(/true/g, "<span class='show-control'>true</span>")
            resultado = resultado.replace(/false/g, "<span class='show-control'>false</span>")
            resultado = resultado.replace(/else/g, "<span class='show-control'>else</span>")
            resultado = resultado.replace(/while/g, "<span class='show-control'>while</span>")
            resultado = resultado.replace(/switch/g, "<span class='show-control'>switch</span>")
            resultado = resultado.replace(/case/g, "<span class='show-control'>case</span>")
            resultado = resultado.replace(/default/g, "<span class='show-control'>default</span>")
            resultado = resultado.replace(/return /g, "<span class='show-control'>return </span>")
            resultado = resultado.replace(/^do /g, "<span class='show-control'>do </span>")
            resultado = resultado.replace(/forEach/g, "<span class='show-control'>forEach</span>")
            resultado = resultado.replace(/for /g, "<span class='show-control'>for </span>")
            resultado = resultado.replace(/break/g, "<span class='show-control'>break</span>")

            

            resultado = resultado.replace(/!/g, "<span class='show-res'>!</span>")
            

            resultado = resultado.replace(/console\./g, "<span class='show-sistema'>console</span><span class='show-neutro'>.</span>")
            resultado = resultado.replace(/window\./g, "<span class='show-sistema'>window</span><span class='show-neutro'>.</span>")
            resultado = resultado.replace(/\( *window *\)/g, "<span class='show-neutro'>( </span><span class='show-sistema'>window</span><span class='show-neutro'> )</span>")
            resultado = resultado.replace(/document\./g, "<span class='show-sistema'>document</span><span class='show-neutro'>.</span>")
            resultado = resultado.replace(/\( *document *\)/g, "<span class='show-neutro'>( </span><span class='show-sistema'>document</span><span class='show-neutro'> )</span>")
            resultado = resultado.replace(/alert\./g, "<span class='show-sistema'>alert</span><span class='show-neutro'>.</span>")
            resultado = resultado.replace(/\(/g, "<span class='show-neutro'>(</span>")
            resultado = resultado.replace(/\)/g, "<span class='show-neutro'>)</span>")
            resultado = resultado.replace(/\+/g, "<span class='show-neutro'>+</span>")
            resultado = resultado.replace(/{/g, "<span class='show-neutro'>{</span>")
            resultado = resultado.replace(/}/g, "<span class='show-neutro'>}</span>")
            resultado = resultado.replace(/&amp;&amp;/g, "<span class='show-res'>&&</span>")
            resultado = resultado.replace(/\|/g, "<span class='show-res'>|</span>")
            resultado = resultado.replace(/===/g, "<span class='show-neutro'>===</span>")
            resultado = resultado.replace(/[^show-]\-/g, "<span class='show-neutro'>-</span>")
            resultado = resultado.replace(/[^class=]=/g, "<span class='show-neutro'>=</span>")
            




            resultado = resultado.replace(/0/g, "<span class='show-numeros'>0</span>")
            resultado = resultado.replace(/1/g, "<span class='show-numeros'>1</span>")
            resultado = resultado.replace(/2/g, "<span class='show-numeros'>2</span>")
            resultado = resultado.replace(/3/g, "<span class='show-numeros'>3</span>")
            resultado = resultado.replace(/4/g, "<span class='show-numeros'>4</span>")
            resultado = resultado.replace(/5/g, "<span class='show-numeros'>5</span>")
            resultado = resultado.replace(/6/g, "<span class='show-numeros'>6</span>")
            resultado = resultado.replace(/7/g, "<span class='show-numeros'>7</span>")
            resultado = resultado.replace(/8/g, "<span class='show-numeros'>8</span>")
            resultado = resultado.replace(/9/g, "<span class='show-numeros'>9</span>")

            $(e).html(resultado)
            if(lineas)
                numerar(e, codigo)
        })
    }

    

    const CodigoJava = {
        iniciar: (config) => {
            inicializar(config)
        }
    }

    window.CodigoJava = CodigoJava
})()

export default CodigoJava
     
