/*!
 * Show Code v1.1.0
 * Copyright Federico Manzano
 * Licencia MIT
 * Repositorio (https://github.com/FedericoManzano/show-code-v1.1.0-fuente)
 */

import CodigoHtml from "./modulos/CodigoHtml"
import CodigoCss from "./modulos/CodigoCss"
import CodigoJs from "./modulos/CodigoJs"
import CodigoJava from "./modulos/CodigoJava"
import CodigoC from "./modulos/CodigoC"

(function() {
    const ShowHtml = (conf) => {
        CodigoHtml.iniciar(conf)
    }

    const ShowCss = (conf) => {
        CodigoCss.iniciar(conf)
    }

    const ShowJs = (conf) => {
        CodigoJs.iniciar(conf)
    }

    const ShowJava = (conf) => {
        CodigoJava.iniciar(conf)
    }

    const ShowC = (conf) => {
        CodigoC.iniciar(conf)
    }

    const Show = {
        ShowHtmlInit: (conf) => ShowHtml(conf),
        ShowCssInit: (conf) => ShowCss(conf),
        ShowJsInit: (conf) => ShowJs(conf),
        ShowJavaInit: (conf) =>  ShowJava(conf),
        ShowCInit: (conf) => ShowC(conf)
    }

    window.Show = Show
})()

export default Show