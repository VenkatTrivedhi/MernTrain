const Cell = require('./cell')
class Board{
    constructor(cells){
        this.cells = cells          
    }

    static createBoard(){
        let cells= []
        for (let i=0; i<9; i++) {
            cells.push(new Cell());
           }
        const board = new Board(cells)
        return board
    }

    checkWinner(symbol){
        if(this.horizontal(symbol)){
            return true    
        }
        if(this.vertical(symbol)){
            return true
        }
        if(this.daiganol(symbol)){
            return true
        }
        return false
    }
    
    horizontal(symbol){
        
        let cells = this.cells

        if(cells[0].Mark==cells[1].Mark&&cells[0].Mark==cells[2].Mark&&cells[0].Mark==symbol){
            return true
        }
        if(cells[3].Mark==cells[4].Mark&&cells[3].Mark==cells[5].Mark&&cells[3].Mark==symbol){
            return true
        }
        if(cells[6].Mark==cells[7].Mark&&cells[6].Mark==cells[8].Mark&&cells[6].Mark==symbol){
            return true
        }
        return false
    }

    vertical(symbol){
        let cells = this.cells
        if(cells[0].Mark==cells[3].Mark&&cells[0].Mark==cells[6].Mark&&cells[0].Mark==symbol){
            return true
        }
        if(cells[1].Mark==cells[4].Mark&&cells[1].Mark==cells[7].Mark&&cells[1].Mark==symbol){
            return true
        }
        if(cells[2].Mark==cells[5].Mark&&cells[2].Mark==cells[8].Mark&&cells[2].Mark==symbol){
            return true
        }
        return false
    }

    daiganol(symbol){
        let cells = this.cells
        if(cells[0].Mark==cells[4].Mark&&cells[0].Mark==cells[8].Mark&&cells[0].Mark==symbol){
            return true
        }
        if(cells[2].Mark==cells[4].Mark&&cells[2].Mark==cells[6].Mark&&cells[2].Mark==symbol){
            return true
        }
        return false
    }

    display(){
        for(let i=0;i<3;i++){
            let first_index = i*3
            let row = this.cells.slice(first_index,first_index+3)
            console.log(row)
        }
    }
}

module.exports = Board