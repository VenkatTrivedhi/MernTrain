const deckOfCards = require("./deckOfCards")

class Game{
    constructor(player1){
        this.deckOfCards = deckOfCards.createDeckOfCards()
        this.player1 = player1
        this.player2 = player2  
        this.turn = 0 
        this.previousSkip = null  
    }

    play(isSkipped){
        
        if(isSkipped){
            if(this.previousSkip!=null){
                let winner = concludeWinner()
                return winner
            }
            this.turn++
            this.previousSkip = this.player1
            return null
        }
        else{
            
        }
        if (turn%2==0){

        }   
        else{
            if(isSkipped){
                if(this.previousSkip!=null){

                }
                this.turn++
                this.previousSkip = this.player2
                return false
            }
            
        }

    }
}