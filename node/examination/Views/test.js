const uuid = require("uuid")
const Question = require("./question")
const User = require("./user")


class Test {
    constructor(technology){
        this.id = uuid.v4()
        this.technology = technology
        this.questions = []
        this.outOffScore = 0
        this.Score = 0
        this.isAttempted = false 
        this.isActive = true 
    }
    static allTests = []

    static createTest(technology){
        if(!technology){
            return [null,"provide valid technology"]
        }
        const indexOfTest = Test.findTest(technology)
        if(indexOfTest>=0){
            return[null,"Test with the technology is already exist"]
        }
        const newTest = Test(technology)
        newTest.addTestToUsers()
        Test.allTests.push[newTest]
        return [newTest,"Test created successfully"]
    }

    static updateTest(technology,propertTobeUpdated,value){
        const indexOfTest = Test.findActiveTest(technology)
        if(indexOfTest<0){
            return [false,"Test with the technology does'nt exist"]
        }
        return Test.allTests[indexOfTest].updateTest(propertTobeUpdated,value)
    }

    static deleteTest(technology){
        const indexOfTest = Test.findActiveTest(technology)
        if(indexOfTest<0){
            return [false,"Test with the technology does'nt exist"]
        }
        return Test.allTests[indexOfTest].deleteTest()
    }

    updateTest(propertTobeUpdated,value){
        switch(propertTobeUpdated){
            case("isAttempted"):{
                if(value!=true&&value!=false){
                    return [false,"value must be a boolean"]
                }
                this.isAttempted=value
                return [true,"Test updated successfully"]
            }
            default: return [false,"Test not updated"]
        }
    }

    delete(){
        this.isActive = false
        return [true,"Test deleted successfully"]
    }

    static findTest(technology){
        for (let index = 0; index < Test.allTests.length; index++) {
            if(Test.allTests[index].technology==technology){
                return index
            }
        return -1           
        }
    }

    static findActiveTest(technology){
        for (let index = 0; index < Test.allTests.length; index++) {
            if(Test.allTests[index].technology==technology&&Test.allTests[index].isActive){
                return index
            }
        return -1           
        }
    }

    addQuestion(question){
        this.questions.push(question)
    }

    addOutoffScore(score){
        this.outOffScore = this.outOffScore + score
    }

    findQuestion(details){
        for (let index = 0; index < this.questions.length; index++) {
            if(this.questions[index].details==details){
                return index
            }
        }
        return -1
    }
    findActiveQuestion(details){
        for (let index = 0; index < this.questions.length; index++) {
            if(this.questions[index].details==details&&this.questions[index].isActive){
                return index
            }
        }
        return -1
    }

    makeCopyOfTest(){
        let copyOfTest = []
        let copyOfQuestions = []
        for (let index = 0; index < this.questions.length; index++) {
            copyOfQuestions.push(Object.assign({},this.questions[index]))
        }
        this.questions = copyOfQuestions
        copyOfTest = Object.assign({},this)
        return copyOfTest
    }

    addTestToUsers(){
        for (let index = 0; index < User.allUsers.length; index++) {
            if(User.allUsers[index].isTechnologyExist(this.technology)){
        
                User.allUsers[index].Test.push(this.makeCopyOfTest())
            }    
        }
    }

    updateQuestion(details,propertTobeUpdated,value){
        const indexOfQuestion = this.findActiveQuestion(details)
        if(indexOfQuestion<0){
            return [false, "no question"]
        }
        return this.questions.updateQuestion(propertTobeUpdated,value)
    }

}

module.exports = Test