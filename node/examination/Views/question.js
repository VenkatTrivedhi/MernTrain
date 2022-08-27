const uuid = require("uuid")
const Test = require("./test")
class Question{
    constructor(technology,details,options,correctAnswer,complexity){
        this.id = uuid.v4()
        this.technology = technology
        this.details = details
        this.options = options
        this.selectedAnswer = null
        this.correctAnswer = correctAnswer
        this.complexity = complexity 
        this.outOffMark = 5*this.complexity 
        this.negativeMark = 0.25*this.outOffMark
        this.isActive = true
    }

    static createQuestion(technology,details,options,correctAnswer,complexity){
        const indexOfTest = Test.findTest(technology)
        if(indexOfTest>=0){
            const newQuestion = new Question(technology,details,options,correctAnswer,complexity)
            Test.allTests[indexOfTest].addQuestion(newQuestion)
            Test.allTests[indexOfTest].addOutoffScore(newQuestion.outOffMark)
            return [true,newQuestion,"Question created successfully"]
        }
        const [newTest,messageOfCreateTest] = Test.createTest(technology)
        if(!newTest){
            return [false,null,messageOfCreateTest]
        }
        const newQuestion = new Question(technology,details,options,correctAnswer,plexity)
        newTest.addQuestion(newQuestion)
        newTest.addOutoffScore(newQuestion.outOffMark)
        return [true,newQuestion,"Question created successfully"]
    }

    updateQuestion(propertTobeUpdated,value){
        switch(propertTobeUpdated){
            case("selectedAnswer"):{
                this.selectedAnswer = value
                return [true,"question updated successfully"]
            }
            default:return [false]
        }
    }


    
}

module.exports = Question