# Show Code (v1.0.0)

Librería para resaltar el código fuente en páginas web.

## Código

Para esta primera versión podemos resartar el código de `html`, `js` y `css`. 
En versiones posteriores vamos a agregar más lenguajes.


## Descarga 

Para disponer de la librería podemos hacerlo a través del CDN de los archivos correspondientes a 
los temas y al archivo `sintax.min.js` que contiene la lógica para el funcionamiento.

#### CDN Tema Claro

[https://ghcdn.rawgit.org/FedericoManzano/show-code-v1.0.0-fuente/master/dist/css/tema-claro.min.css](https://ghcdn.rawgit.org/FedericoManzano/show-code-v1.0.0-fuente/master/dist/css/tema-claro.min.css)

#### CDN Tema Oscuro

[https://ghcdn.rawgit.org/FedericoManzano/show-code-v1.0.0-fuente/master/dist/css/tema-oscuro.min.css](https://ghcdn.rawgit.org/FedericoManzano/show-code-v1.0.0-fuente/master/dist/css/tema-oscuro.min.css)

#### CDN de show.min.js

[https://ghcdn.rawgit.org/FedericoManzano/show-code-v1.0.0-fuente/master/dist/js/sintax.min.js](https://ghcdn.rawgit.org/FedericoManzano/show-code-v1.0.0-fuente/master/dist/js/sintax.min.js)

### Plantilla

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Tema oscuro -->
    <link rel="stylesheet" href="https://ghcdn.rawgit.org/FedericoManzano/show-code-v1.0.0-fuente/master/dist/css/tema-claro.min.css">

    <!-- Tema claro -->
    <link rel="stylesheet" href="https://ghcdn.rawgit.org/FedericoManzano/show-code-v1.0.0-fuente/master/dist/css/tema-oscuro.min.css">


    <title>Plantilla Show V1.0.0</title>
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

    <script src="https://ghcdn.rawgit.org/FedericoManzano/show-code-v1.0.0-fuente/master/dist/js/sintax.min.js"></script>
    
</body>
</html>
```
En esta plantilla tenemos que decidir que tema utilizar, el tema claro o el tema oscuro.

#### Inicializar

Lo que debemos hacer después es inicializar los módulos correspondientes a cada lenguaje a utilizar. 
(Si solo utilizamos `html` solo inicializamos el módulo de html). 

```html
<!-- Código que va debajo del CDN de sixtax.js -->
<script> 
    // En este caso inicializamos los tres módulos pero no es necesario. 
    Show.ShowHtmlInit()
    Show.ShowCssInit()
    Show.ShowJsInit()
</script>
```

### Precompilado

Podemos disponer de los archivos de la librería sin necesidad de utilizar su CDN descargando 
el archivo pre-compilado a través del siguiente enlace.

[https://github.com/FedericoManzano/show-code-v1.0.0-precompilado/archive/master.zip](https://github.com/FedericoManzano/show-code-v1.0.0-precompilado/archive/master.zip)

## Node js

Podemos disponenr de la librería a través de los gestores de paquetes de NodeJs a través de los siguientes comandos.

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
CodigoHtml.iniciar("texto")
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

Utilizamos las clases cod-[lenguale] donde lenguaje son (html, css, js) respectivamente.

Enjoy.




