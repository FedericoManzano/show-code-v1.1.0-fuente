# Show Code (v1.1.0)

Librería para resaltar el código fuente en páginas web.

## Código

En esta versión se incorparan los lenguajes `c`, `java`.
Los lenguajes incluidos son `html`, `js`, `css`, `java`, `c`. 


## GetStarted 

La forma más rápida de disponer de la librería es a través del CDN de los archivos de estilos `css` y
el archivo con la lógica `js`.

### Archivos de stilos (CSS)

Debemos elegir uno de los dos archivos de estilos para añadir a la cabecera de nuestro documento html.
Disponemos de dos temas con colores claros y oscuros.

#### CDN Tema Claro

[https://ghcdn.rawgit.org/FedericoManzano/show-code-v1.1.0-fuente/master/dist/css/tema-claro.min.css](https://ghcdn.rawgit.org/FedericoManzano/show-code-v1.1.0-fuente/master/dist/css/tema-claro.min.css)

#### CDN Tema Oscuro

[https://ghcdn.rawgit.org/FedericoManzano/show-code-v1.1.0-fuente/master/dist/css/tema-oscuro.min.css](https://ghcdn.rawgit.org/FedericoManzano/show-code-v1.1.0-fuente/master/dist/css/tema-oscuro.min.css)

### Archivos JS

Luego debemos agregar el CDN del archivos sintax.js encima de la etiqueta de cierre del `</body>` en 
nuestro documento html.

[https://ghcdn.rawgit.org/FedericoManzano/show-code-v1.1.0-fuente/master/dist/js/sintax.min.js](https://ghcdn.rawgit.org/FedericoManzano/show-code-v1.1.0-fuente/master/dist/js/sintax.min.js)

### Plantilla

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Tema oscuro -->
    <link rel="stylesheet" href="https://ghcdn.rawgit.org/FedericoManzano/show-code-v1.1.0-fuente/master/dist/css/tema-claro.min.css">

    <!-- Tema claro -->
    <link rel="stylesheet" href="https://ghcdn.rawgit.org/FedericoManzano/show-code-v1.1.0-fuente/master/dist/css/tema-oscuro.min.css">


    <title>Plantilla Show V1.1.0</title>
</head>
<body>

    <pre class="cod-html">
        <!-- Aca va lo que queremos resaltar html --->
    </pre>
    
    <pre class="cod-css">
        <!-- Aca va lo que queremos resaltar css --->
    </pre>

     <pre class="cod-js">
        <!-- Aca va lo que queremos resaltar js --->
    </pre>

    <script src="https://ghcdn.rawgit.org/FedericoManzano/show-code-v1.1.0-fuente/master/dist/js/sintax.min.js"></script>
    <script>

        // Sólo inicializamos los lenguajes que queremos utilizar 
        // En este caso inicializa todos.
        Show.ShowHtmlInit()
        Show.ShowCssInit()
        Show.ShowJsInit()
        Show.ShowCInit()
        Show.ShowJavaInit()
    </script>
</body>
</html>
```
En esta plantilla tenemos que decidir que tema utilizar, el tema claro o el tema oscuro.


### Precompilado

Podemos disponer de los archivos de la librería sin necesidad de utilizar su CDN descargando 
el archivo pre-compilado a través del siguiente enlace.

[https://github.com/FedericoManzano/show-code-v1.1.0-precompilado/archive/master.zip](https://github.com/FedericoManzano/show-code-v1.1.0-precompilado/archive/master.zip)

## Node js

Podemos disponer de la librería a través de los gestores de paquetes de NodeJs a través de los siguientes comandos.

### NPM

```js
npm i show-sintax
```

### yarn 

```js
yarn add show-sintax
```

## Proyectos SPA

Cuando trabajamos con librería como `react`, `angular` o `vue` es necesario importar los módulos 
correspondientes a cada lenguaje e inicializarlo.

```js
import CodigoHtml from "show-code/src/modulos/CodigoHtml";
import CodigoCss from "show-code/src/modulos/CodigoCss";
import CodigoJs from "show-code/src/modulos/CodigoJs";
import CodigoJava from "show-code/src/modulos/CodigoJava";
import CodigoC from "show-code/src/modulos/CodigoC";
```

Luego de esto lo inicializamos donde corresponda llamando a la función iniciar. 


```js
CodigoHtml.iniciar()
CodigoCss.iniciar()
CodigoJs.iniciar()
```

### Interpolación

en proyectos SPA trabajamos con la interpolación de contenedo a través de la sintaxis de 
{{ contenido }} donde contenido es texto interpolado. Ahora bién en estos casos es necesario 
inicializar el módulo de html de la siguiente manera.

```js
// Solo en proyectos SPA. Que utiliza interpolación
CodigoHtml.iniciar({tipo: "texto"})
```

Le añadimos el parámetro texto a la función de inicialización.

## Utilización 

Es bastante simple la utilización una vez que disponemos de todos los elementos inicializados 
de las formas antes descriptas.

Simplemente declaramos una etqueta de html `pre` y le agregamos la clase `cod-html` o `cod-css` o `cod-js` dependiendo del lenguaje a mostrar.

### Ejemplo

```html
<pre class="cod-html">
    <div>
        <h1>Esto es una muestra de código.</h1>
    </div>
</pre>
```

Las clases agregadas a la etiqueta `pre` sin cod-[lenguaje] => `html` `js` `css` `java` `c`.

## Inicialización

Hasta el momento vimos como inicializar los módulos por defecto. Contamos desde la versión 1.1.0 la posibilidad de añadir la numeración a las lineas de código (por defecto aparacen) pero si queremos 
retirarlas los hacemos de la siguiente manera. 

```html
<script>
    // Con esto deshabilitamos números de linea de la parte izquierda.
    Show.ShowHtmlInit({lineas: false})
    Show.ShowCssInit({lineas: false})
    Show.ShowJsInit({lineas: false})
    Show.ShowCInit({lineas: false})
    Show.ShowJavaInit({lineas: false})
</script>
```


