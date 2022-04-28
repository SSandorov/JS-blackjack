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

// Nuestra baraja de cartas
let deck = [];
// Tipos de cartas
const tipos = ['C', 'D', 'H', 'S'];
// Cartas superiores a 10
const especiales = ['A', 'J', 'Q', 'K'];

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
            deck.push(tipo + especial);
        }
    }
    // console.log(deck);
    // Empleamos la librería underscore para barajar las cartas
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

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
    console.log(carta);
    return carta;
}
// Comprobamos el condicional
// deck = [];
pedirCarta();
console.log(deck);

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
}
// Comprobamos si el valor se cumple en todos los casos
const valor = valorCarta(pedirCarta());
console.log({valor});