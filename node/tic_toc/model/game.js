const Player = require('./player')
const Board = require('./board')

class Game{
    constructor(player1,player2,symbol1="X",symbol2="O"){
        this.player1 = new Player(player1,symbol1)
        this.player2 = new Player(player2,symbol2)
        this.board = Board.createBoard()
        this.turns = 0
        this.winner = null
    }

    isGameOver(){
        return this.turns>=9||this.winner!=null

    }

    play(cellNumber){

        if(cellNumber<1||cellNumber>9){
            return [false,this.winner,"cellnumber must between 1-9"]
        }
        if(this.isGameOver()){
            return [false,this.winner,"GameOver"]  
        }
        let isWon;
        if(this.turns%2==0){
            console.log("turn")
            let isMarked = this.board.cells[cellNumber-1].markCell(this.player1.symbol)
            this.board.display()
            if(!isMarked){
                return [false,this.winner,"position already marked"]
            }
            this.turns++
            isWon = this.board.checkWinner(this.player1.symbol)
            if(isWon){
                this.winner = this.player1
                console.log(this.winner.name)
            }
        }
        else{
            let isMarked = this.board.cells[cellNumber-1].markCell(this.player2.symbol)
            this.board.display()
            if(!isMarked){
                return [false,null,"position already marked"]
            }
            this.turns++
            isWon = this.board.checkWinner(this.player2.symbol)
            if(isWon){
                this.winner = this.player2
                console.log(this.winner.name)
            }
        }

        if(isWon){
            return [true,this.winner,"is won"]
        }
        if(this.isGameOver()){
            return [true,this.winner,"Gameover"]
        }
        return [true,this.winner,"position is marked"]
    }
}

module.exports = Game