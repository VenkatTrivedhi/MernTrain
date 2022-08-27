const Answer = require("./answer")

class Response{
    constructor(question,answer){
        this.question = question
        this.answer = answer
    }

    static createResponse(question){
        const newAnswer = new Answer() 
        const newResponse = new Response(question,newAnswer)
        return newResponse
    }

    submitAnswer(selectedAnswer){
        this.answer.selectAnswer(selectedAnswer)
        if(this.answer.selectedAnswer == this.question.correctAnswer){
            this.answer.updateScore(this.question.outOffMark)
            return
        }
        this.answer.updateScore(0)
        return
    }
}

module.exports = Response