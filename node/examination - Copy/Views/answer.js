

class Answer{
    constructor(){
        this.score = null
        this.selectedAnswer = null
    }

    selectAnswer(selectedAnswer){
        this.selectedAnswer = selectedAnswer
    }
    
    updateScore(score){
        this.score = score 
    }
}

module.exports = Answer