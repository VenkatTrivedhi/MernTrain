const Suite = require("./suite")

class DeckOfCards {
    constructor(cards){
        this.cards = cards  
    }
    
    static createDeckOfCards(){
        const aceSuite = new Suite("club")
        const heartSuite = new Suite("heart")
        const spadeSuite = new Suite("spade")
        const daimondSuite = new Suite("daimond")

        let cards = []
        cards = cards.concat(aceSuite.suite)
        cards = cards.concat(heartSuite.suite)
        cards = cards.concat(spadeSuite.suite)
        cards = cards.concat(daimondSuite.suite)
     
        let jumnledCards = DeckOfCards.jumbleCards(cards)
        const newDeskOfCards = new DeckOfCards(jumnledCards)
        return newDeskOfCards
    }

    static jumbleCards(cards){
        for (let index = 0; index < cards.length; index++) {
            let randonNumber = Math.random()*cards.length
            let randomNumber2 = Math.random()*cards.length
            let randomIndex  = Math.floor(randonNumber)
            let randomIndex2 = Math.floor(randomNumber2)
            //randomSwap
            let temparary = cards[randomIndex]
            cards[randomIndex] = cards[randomIndex2]
            cards[randomIndex2] = temparary
        }
        return cards
    }

}

module.exports = DeckOfCards