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
Esta carta tendrá que extraerse del arreglo deck, ya que una vez sacada
la carta ya no se puede emplear de nuevo
Hay que tener en cuenta que cuando no queden cartas en la baraja ya no se
pueden extraer más cartas
*/

const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    console.log(carta);
    return carta;
}
// Comprobamos el condicional
// deck = [];
pedirCarta();
console.log(deck);