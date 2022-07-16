
class Card{
    constructor(suitType,type,value){
        this.suitType = suitType   
        this.type = type
        this.value = value
        this.isPulledBy = null
    }
}
module.exports = Card