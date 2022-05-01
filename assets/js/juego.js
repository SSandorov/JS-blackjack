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

Esto hace que el patrón módulo sea muy seguro. No es imposible acceder al código desde 
fuera, pero sí es muy difícil

Si además añadimos el 'use strict', JS evaluará la función de manera estricta

Luego añadimos todo nuestro código de JS dentro del módulo y así lo protegemos
*/

(() => {
    'use strict' // es buena práctica ponerlo siempre

    // Nuestra baraja de cartas
    let deck = [];
    // Tipos de cartas
    const tipos = ['C', 'D', 'H', 'S'];
    // Cartas superiores a 10
    const especiales = ['A', 'J', 'Q', 'K'];

    // Suma de las cartas del jugador y el ordenador
    let puntosJugador = 0,
        puntosOrdenador = 0;

    // Aquí ponemos las referencias del HTML (manipulación del DOM)
    const btnNuevo = document.querySelector('#btnNuevo');
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');

    // Si algún día quiero mejorar este juego, ya tengo creado el id para los contadores
    const sumaCartas = document.querySelectorAll('small');

    const mostrarCartasJugador = document.querySelector('#jugador-cartas');
    const mostrarCartasOrdenador = document.querySelector('#ordenador-cartas');

    // console.log(btnDetener, btnNuevo, btnPedir);

    /*
    Creamos una función que nos crea una baraja de cartas completa y las 
    barajea aleatoriamente
    Para barajear aleatoriamente emplearemos una librería de teceros muy famosa
    llamada underscore
    */
    const crearDeck = () => {
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
        deck = _.shuffle(deck);
        // console.log(deck);
        return deck;
    };

    crearDeck();

    /*
    Creamos una función que nos sacará una carta de la baraja mezclada
    - Esta carta tendrá que extraerse del arreglo deck, ya que una vez sacada
    la carta ya no se puede emplear de nuevo
    - Hay que tener en cuenta que cuando no queden cartas en la baraja ya no se
    pueden extraer más cartas
    */

    const pedirCarta = () => {
        // Condicional de seguridad para cuando no queden cartas en la baraja
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        // extraemos la última carta de la baraja y la devolvemos
        const carta = deck.pop();
        // console.log(carta);
        return carta;
    };
    // Comprobamos el condicional
    // deck = [];
    pedirCarta();
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
    const valor = valorCarta(pedirCarta());
    // console.log({valor});

    // Eventos

    // Creamos las funciones para el ordenador

    const turnoOrdenador = (puntosMinimos) => {
        // Como siempre sacará una carta por lo menos, el bucle do-while es el que debemos empelar
        do {
            // En principio deberíamos tener una función por separado que englobe el uso de
            // mostrar las cartas y sumar en el contador, pero bueno, ahora duplicaremos el código
            const carta = pedirCarta();
            puntosOrdenador = puntosOrdenador + valorCarta(carta);
            sumaCartas[1].innerText = puntosOrdenador;

            const imgCarta = document.createElement('img');
            imgCarta.src =`assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            mostrarCartasOrdenador.append(imgCarta);
            console.log(imgCarta);
            /*
            En este caso el crupier seguirá sacando cartas mientras sus cartas sean menores
            que la nuestra y además sea menor de 21
            */

            // Por seguridad añadimos el condicional de si el jugador supera 21 ya nos salimos
            // del do while

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosOrdenador < puntosMinimos) && (puntosMinimos <= 21));

        // Como se ejecutan las cosas de manera secuencia, debemos esperar para que este código
        // se ejecute después de que salgan las imágenes

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
        }, 500 /*milésimas de segundo */)
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
        puntosJugador = puntosJugador + valorCarta(carta);

        // Añadimos la sumatoria al texto del jugador
        sumaCartas[0].innerText = puntosJugador;

        // Mostramos las cartas en pantalla
        // Para ello debemos mostrar en pantalla lo siguiente
        // <img class="carta" src="assets/cartas/10C.png" alt="cartas-baraja">
        // Cuando creamos un elemento está guardado en memoria, no se muestra en ningún lado
        const imgCarta = document.createElement('img');
        // Ahora añadimos la ubicación de la carta sacada de la baraja
        imgCarta.src =`assets/cartas/${carta}.png`;
        // Añadimos la clase para que aplique los estilos
        imgCarta.classList.add('carta');
        // añadimos esa carta al HTML
        mostrarCartasJugador.append(imgCarta);
        console.log(imgCarta);

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
    btnNuevo.addEventListener('click', () => {
        // reseteamos la consola
        console.clear();

        // Reseteamos la baraja
        deck = [];
        crearDeck();
        // Reseteamos el contador y quitamos las imágenes
        sumaCartas[0].innerText = 0;
        sumaCartas[1].innerText = 0;

        mostrarCartasJugador.innerHTML = '';
        mostrarCartasOrdenador.innerHTML = '';

        // Reseteamos las puntuaciones
        puntosJugador = 0;
        puntosOrdenador = 0;

        // Habilitamos los botones de pedir y detener
        if(btnDetener.disabled && btnPedir.disabled) {
            btnDetener.disabled = false;
            btnPedir.disabled = false;
        }

    });
})();
