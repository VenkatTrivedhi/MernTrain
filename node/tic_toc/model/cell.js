class Cell{
    constructor(){
        this.Mark =""
    }

    markCell(symbol){
        if(this.Mark!=""){
            return false
        }
        this.Mark=symbol
        return true
    }
}

module.exports = Cell