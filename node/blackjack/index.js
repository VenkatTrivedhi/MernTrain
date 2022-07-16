console.log("index running")

const deckOfCards = require("./model/deckOfCards")

const newDeskOfCards = deckOfCards.createDeckOfCards()

console.log(newDeskOfCards.cards.length)
