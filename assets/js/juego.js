/*
Referencias de las cartas
2C = Two of clubs (Tréboles)
2D = Two of diamonds (Diamantes)
2H = Two of hearts (Corazones)
2S = Two of spades (Picas)
*/

/*
En el blackjack se cuenta hasta 21. El que más cerca esté de este número gana
*/

/*
Para encapsular nuestro código y protegerlo emplearemos el patrón módulo. Este patrón
de diseño es el más común que existe y funciona con cualquier versión a partir del ECMAScript5
(por encima del año 2000)

Se codifica de varias formas, esta es una de ellas. 
Creamos una función anónima autoinvocada. Para ello metemos nuestra función entre 
paréntesis y la llamamos inmediatamente después. Los paréntesis hacen que la función este en
otro scope, no el global, y no se puede acceder a la función directamente, porque no está
definida por un nombre.

Podemos definir la función por un nombre para poder devolver un valor de la función
(este return lo podemos encontrar al final de la función), y que acceda la persona 
que nosotros permitamos

Esto hace que el patrón módulo sea muy seguro. No es imposible acceder al código desde 
fuera, pero sí es muy difícil

Si además añadimos el 'use strict', JS evaluará la función de manera estricta

Luego añadimos todo nuestro código de JS dentro del módulo y así lo protegemos
*/

const miModulo = (() => {
    'use strict' // es buena práctica ponerlo siempre

    // Nuestra baraja de cartas
    let deck = [];

    // Optimización1 --> Cuando tenemos varias variables iguales, podemos ordenarlas con una sola llamada
    // al primitivo, esto nos ahorra memoria
    // Tipos de cartas
    const   tipos      = ['C', 'D', 'H', 'S'],
    // Cartas superiores a 10
            especiales = ['A', 'J', 'Q', 'K'];

    // Suma de las cartas del jugador y el ordenador
    // let puntosJugador   = 0,
       // puntosOrdenador = 0;
    // Optimización 5.1. --> creamos un arreglo con la puntuación de los juagores
    let puntosJugadores = [],
        puntosJugador = 0,
        puntosOrdenador = 0;

    // Aquí ponemos las referencias del HTML (manipulación del DOM)
    const   btnNuevo    = document.querySelector('#btnNuevo'),
            btnPedir    = document.querySelector('#btnPedir'),
            btnDetener  = document.querySelector('#btnDetener');

    // Si algún día quiero mejorar este juego, ya tengo creado el id para los contadores
    const   sumaCartas = document.querySelectorAll('small');
    
    // Optimización 5.2
    // Como no hay un número definido de jugadores, debemos seleccionar por clase, no
    // por id
    const imagenesJugadores = document.querySelectorAll('.contenedorCartas')
    // const    mostrarCartasJugador    = document.querySelector('#jugador-cartas'),
    //          mostrarCartasOrdenador  = document.querySelector('#ordenador-cartas');

    // console.log(btnDetener, btnNuevo, btnPedir);
    // Optimización3 --> Llamamos la función crearDeck() con la siguiente función
    // Optimización 5.1. --> Añadimos jugadores al arreglo de puntosJugadores
    // OPtimización 5.2.
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        // Optimización 5.1
        puntosJugadores = [];

        for(let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        // Optimización 5.1 5.2
        // Bucle forEach
        sumaCartas.forEach(elem => elem.innerText = 0);
        imagenesJugadores.forEach(elem => elem.innerHTML = '');

        // Optimización 5.4
        if(btnDetener.disabled && btnPedir.disabled) {
            btnDetener.disabled = false;
            btnPedir.disabled = false;
        }
    };
    /*
    Creamos una función que nos crea una baraja de cartas completa y las 
    barajea aleatoriamente
    Para barajear aleatoriamente emplearemos una librería de teceros muy famosa
    llamada underscore
    */
    const crearDeck = () => {
        // Optimización2 --> En el evento btnNuevo creamos un arreglo vacío de la baraja,
        // pero no es una buena práctica añadir lógica al evento, por eso lo ponemos aquí
        deck = [];
        // Bucle que nos crea las cartas del 2 al 10
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        // Bucle que nos crea las cartas especiales
        for (let tipo of tipos) {
            for(let especial of especiales) {
                deck.push(especial + tipo);
            }
        }
        // console.log(deck);
        // Empleamos la librería underscore para barajar las cartas
        // console.log(deck);
        return _.shuffle(deck);
    };

    //crearDeck(); Optimización3 --> si queremos llamar a una función no se hace de esta
    // manera. Se debe llamar con otra función

    /*
    Creamos una función que nos sacará una carta de la baraja mezclada
    - Esta carta tendrá que extraerse del arreglo deck, ya que una vez sacada
    la carta ya no se puede emplear de nuevo
    - Hay que tener en cuenta que cuando no queden cartas en la baraja ya no se
    pueden extraer más cartas
    */

    const pedirCarta = () => {
        // Condicional de seguridad para cuando no queden cartas en la baraja
        /*
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        // extraemos la última carta de la baraja y la devolvemos 
        // console.log(carta);
        return deck.pop();
        */
       // Optimización4 --> cambiamos el condicional por un condicional terciario
       return (deck.length === 0) ? 
       (alert('No hay cartas, inicie un nuevo juego'))
       : deck.pop();
    };
    // Comprobamos el condicional
    // deck = [];
    // pedirCarta();
    // console.log(deck);

    /*
    Creamos una función que nos compruebe el valor de una carta
    - Todas las cartas, sin importar el tipo valen lo mismo, por lo que tenemos
    que extraer el número, no la letras
    - El As es la única carta que tiene dos valores, 1 u 11, dependiendo de
    cuando la recibimos
    */
    const valorCarta = ( carta ) => {
        /* 
        - extraemos la primera o las dos primeras posiciones del string, dependiendo
        de si son igaules o menores a 10. Para ello empleamos el método substring(), que
        nos coge todos los elementos de un string menos el último. Se podrían emplear
        expresiones regulares, pero aun no las conocemos
        - Las posiciones de un string son las mismas que un arreglo
        */
        const valor = carta.substring(0, carta.length - 1);
        /*
        Debemos extraer el valor dependiendo del tipo de carta
        1. Del 2 al 10 equivale a su propio número
        2. El AS vale 11 cuando pedimos dos cartas y 1 cuando pedimos 3 cartas
        3. J, Q, K valen 10
        */
        /*
        Para evaluar estas condiciones empleamos un método llamada isNan(). Este
        método nos devuelve true si su argumento no es un número
        */

        // Inicializamos la variable que nos suma los puntos de las cartas
        // Let puntos = 0;
        /*
        if (isNaN(valor)) {
            console.log('No es un número');
            // Debemos añadir condicionales para los valores de las cartas mayores
            puntos = (valor === 'A') ? 11 : 10;
        } else {
            console.log('Sí es un número');
            /*
            Al carecer de tipado estricto, nos encontramos con el problema de tener
            que comprobar en ejecución que tipo de primitiva nos está devolviendo la
            función. Como nos devuelve un string, si aplicamos la operación de sumar,
            nos concatena los valores, por ello multiplicamos el valor por 1 y así
            el resultado se vuelvde de tipo number, no string.
            Es uno de los mayores problemas que tiene JS, por ello es mucho mejor emplear
            Typescript para evitar esta clase de problemas
            */
            // puntos = valor * 1;
        // }
        // Vamos a simplificar el código que vemos arriba
        return (isNaN(valor)) ?
                (valor === 'A') ? 11 : 10 // condición en caso de que isNan sea true
                : valor * 1;
    };
    // Comprobamos si el valor se cumple en todos los casos
    // const valor = valorCarta(pedirCarta());
    // console.log({valor});

    // Eventos

    // Optimización5 --> todo el código repetido puede ir en funciones distintas
    // Añadimos las funciones optimizadas a continuación
    // OPtimización 5.1. Sumatoria de las puntuaciones
    
    const acumularPuntos = (carta, turno) => {
        /*
        La última posición del arreglo puntosJugadores es del ordenador, el resto es de los
        jugadores, por lo que necesitamos un argumento que nos elija el índice correcto
        */
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        // Manipulamos el DOM para mostrar la puntuación en todos los casos
        sumaCartas[turno].innerText = puntosJugadores[turno];
        // Devolvemos este valor para poder utilizarlo en la lógica ya porgramada
        return puntosJugadores[turno];
    };

    // Optimización 5.2.
    // Mostrar en pantalla las imágenes de las cartas
    const mostrarImg = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src =`assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        imagenesJugadores[turno].append(imgCarta);
    }

    // Optimización 5.3.
    // Añadimos la función setTimeOut() con los condicionales de la partida
    const ganadorPartida = () => {
        setTimeout(() => {
            if (puntosJugador === puntosOrdenador) {
                alert('Empate :)');
            } else if (puntosJugador > 21) {
                alert('Perdiste :(')
            } else if (puntosOrdenador > 21) {
                alert('Ganaste!');
            } else {
                alert('Ordenador Gana');
            }
        }, 500 /*milésimas de segundo */)
    }

    // Creamos las funciones para el ordenador

    const turnoOrdenador = (puntosMinimos) => {
        // Como siempre sacará una carta por lo menos, el bucle do-while es el que debemos empelar
        do {
            // En principio deberíamos tener una función por separado que englobe el uso de
            // mostrar las cartas y sumar en el contador, pero bueno, ahora duplicaremos el código
            const carta = pedirCarta();
            // puntosOrdenador = puntosOrdenador + valorCarta(carta); 
            // sumaCartas[1].innerText = puntosOrdenador; Optimización 5.1.
            puntosOrdenador = acumularPuntos(carta, puntosJugadores.length -1);

            
            /*
            const imgCarta = document.createElement('img');
            imgCarta.src =`assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            mostrarCartasOrdenador.append(imgCarta);
            console.log(imgCarta);
            */
            // Optimización 5.2
            mostrarImg(carta, puntosJugadores.length -1);

            /*
            En este caso el crupier seguirá sacando cartas mientras sus cartas sean menores
            que la nuestra y además sea menor de 21
            */

            // Por seguridad añadimos el condicional de si el jugador supera 21 ya nos salimos
            // del do while
            /*
            No es necesaria ya que está evaluada en la condicón while
            if (puntosMinimos > 21) {
                break;
            }
            */

        } while ((puntosOrdenador < puntosMinimos) && (puntosMinimos <= 21));

        // Como se ejecutan las cosas de manera secuencia, debemos esperar para que este código
        // se ejecute después de que salgan las imágenes
         
        /*
        setTimeout(() => {
            if (puntosMinimos === puntosOrdenador) {
                alert('Empate :)');
            } else if (puntosMinimos > 21) {
                alert('Perdiste :(')
            } else if (puntosOrdenador > 21) {
                alert('Ganaste!');
            } else {
                alert('Ordenador Gana');
            }
        }, 500 /*milésimas de segundo *//*)
        */
       // Optimización 5.3 --> creamos una función externa para el setTimeOut()
       ganadorPartida();
    };

    /*
    Ahora vamos a manipular el DOM, haciendo que cuando cliquemos en el boton
    pedir nos devuelva la carta
    */
    // Para que un elemento espere un evento
                            // Evento click, hay muchos más
    btnPedir.addEventListener('click', () => { // el segundo argumento es conocido como callback
        // Pedimos la carta
        const carta = pedirCarta();

        // Sumamos los puntos
        // puntosJugador = puntosJugador + valorCarta(carta);

        // Añadimos la sumatoria al texto del jugador
        // sumaCartas[0].innerText = puntosJugador;

        // Optimización 5.1.
        puntosJugador = acumularPuntos(carta, 0);

        // Mostramos las cartas en pantalla
        // Para ello debemos mostrar en pantalla lo siguiente
        // <img class="carta" src="assets/cartas/10C.png" alt="cartas-baraja">
        // Cuando creamos un elemento está guardado en memoria, no se muestra en ningún lado
        // const imgCarta = document.createElement('img');
        // Ahora añadimos la ubicación de la carta sacada de la baraja
        // imgCarta.src =`assets/cartas/${carta}.png`;
        // Añadimos la clase para que aplique los estilos
        // imgCarta.classList.add('carta');
        // añadimos esa carta al HTML
        // mostrarCartasJugador.append(imgCarta);
        
        // Optimización 5.2
        mostrarImg(carta, 0);

        // Ahora creamos la lógica del juego
        // Si el contador supera 21 puntos se pierde y se bloque el botón de pedir carta
        if (puntosJugador > 21) {
            alert('Lo siento mucho, perdiste la partida');
            // Bloqueamos el botón de pedir carta
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            // Añadimos la función del ordenador
            turnoOrdenador(puntosJugador);
        // Si llegamos a 21 ya no se puede pedir cartas
        } else if (puntosJugador === 21) {
            alert('Blackjack!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            // Aquí también añadimos la función del ordenador
            turnoOrdenador(puntosJugador);
        }
    }); 


    // Cuando clicamos en el botón detener, bloqueamos los botones detener y pedir
    // y le toca el turno al ordenador
    btnDetener.addEventListener('click', () => {
        // Cuando la acción de pinchar en el botón detener se lleva a cabo, bloqueamos
        // ambos botones
        btnDetener.disabled = true;
        btnPedir.disabled = true;

        // Contamos los puntos como en el btnPedir
        // Pedimos la carta
        turnoOrdenador(puntosJugador);
    });

    // Por último tenemos el botón de nuevo juego. Cuando lo pinchamos reinicia todo al principio
    // OPtimización 6 --> No nos hace falta porque ya lo inicializamos con un script externo
    /*
    btnNuevo.addEventListener('click', () => {
        // reseteamos la consola
        console.clear();

        // Reseteamos la baraja
        // deck = []; Optimización2 --> lo subimos a la función crearDeck()
        inicializarJuego();

        // Reseteamos las puntuaciones
        // Optimización 5.1 --> movemos el arreglo a la funcion inicializarJuego

        // Reseteamos el contador y quitamos las imágenes
        // sumaCartas[0].innerText = 0;
        // sumaCartas[1].innerText = 0;
        // Optimización 5.1 --> movemos a la función inicializarJuego
        

        // mostrarCartasJugador.innerHTML = '';
        // mostrarCartasOrdenador.innerHTML = '';
        // Optimización 5.2 --> movemos a la función inicializarJuego
        

        // Habilitamos los botones de pedir y detener
        // Optimización 5.4 lo movemos a la función inicializarJuego

    });
    */

    /* 
    La última parte del patrón módulo puede tener un return como cualquier función.
    Lo interesante es que podemos emplear este return para permitir el uso de una 
    parte del código por un sujeto ajeno.

    Todo lo que se encuentre dentro del return será público y visible fuera del módulo,
    pero el resto seguirá siendo privado.

    En el caso particular de este juego se podría externalizar la función de 
    inicializarJuego para que sea el crupier el que elija cuando se inicia un nuevo juego
    p.e. cuando los jugadores hayan pagado la ronda
    Lo bueno de este método es que protegemos la lógica del programa para que nadie pueda
    manipularla, y sólo la persona que nosotros queremos podrá modificar las acciones del
    juego, no los datos del mismo
    */
    return {
        nuevoJuego: inicializarJuego
    };
})();
