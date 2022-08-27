const Response = require("./response")
const Result = require("./result")


class Exam{
    constructor(test,response,result){
        this.test = test
        this.response = response
        this.result = result
    }

    static createExam(test){
        const testResponse =[]
        for (let index = 0; index < test.questions.length; index++) {
            const newResponse = new Response.createResponse(test.questions[index]);
            testResponse.push(newResponse)
        }

        const newResult = new Result()
        const newExam = new Exam(test,testResponse,newResult)        
        return newExam
    }

    getExam(){
        if(this.result.isAttempted){
            return [false,null,`${this.test.technology} exam was already attempted`]
        }
        const  exam = []
        for (let index = 0; index < this.response.length; index++) {
            let response = this.response[index]
            if(response.question.isActive && response.answer.selectedAnswer==null){
                exam.push(this.response[index])
            } 
        }
        return [true,exam,`exam fetched successfully`]
    }

    getQuestion(questionDetails){
        if(this.result.isAttempted){
            return [false,null,`${this.test.technology} exam was already attempted`]
        }
        const indexOfQuestion = this.findActiveQuestion(questionDetails)
        if(!indexOfQuestion){
            return [false,null,`No question exist with the details ${questionDetails} in your ${this.test.technology} test`]
        }
        if(this.response[indexOfQuestion].answer.selectedAnswer!=null){
            return [false,null,`question is already is attempted`]
        }
        return [true,this.response[indexOfQuestion],`question fetched successfully`]
    }

    submitExam(submittedResponse){
        for (let index = 0; index < submittedResponse.length; index++) {
            const isSubmbited = this.submitAnswer(submittedResponse[index][0],this.submittedResponse[index][1])
            if(!isSubmbited){
                return [false,`Response at index number ${[index]} could not be submitted`]
            }    
        }
        this.result.isAttempted = true
        return [true,`Response submitted successfully`]
    }

    submitAnswer(questionDetails,selectedAnswer){
        const indexOfResponse = this.findActiveQuestion(questionDetails)

        
        if(!indexOfQuestion){
            return [false,`No question exist with the details ${questionDetails} in your ${this.test.technology} test`]
        }
        if(this.response[indexOfQuestion].answer.selectedAnswer!=null){
            return [false,`question is already is attempted`]
        }
        this.response[indexOfResponse].submitAnswer(selectedAnswer)
        this.addScoreToResult[this.response[indexOfResponse]]
        return [true,`answer submitted successfully`]
    }

    addScoreToResult(response){
        this.result.score = this.result.score + response.answer.score 
        this.result.isAttempted = true
    }
    
    updateResult(){
        for (let index = 0; index < this.response.length; index++) {
            this.addScoreToResult(this.response[index])   
        }
    }

    findActiveQuestion(details){
        for (let index = 0; index < this.response.length; index++) {
            if(this.response[index].question.details==details&&this.response[index].question.isActive){
                return index
            }          
        }
        return -1 
    }

}

module.exports = Exam