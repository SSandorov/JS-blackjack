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
Creamos una función que nos crea una baraja de cartas completa
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
    console.log(deck);
    // Empleamos la librería underscore para barajar las cartas
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

crearDeck();