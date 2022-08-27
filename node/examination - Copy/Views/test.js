const uuid = require("uuid")
const Question = require("./question")
const User = require("./user")

class Test{
    constructor(technology){
        this.id = uuid.v4()
        this.technology = technology
        this.questions = []
        this.outOffScore = 0
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
        const newTest = new Test(technology)
        newTest.addTestToUsers()
        Test.allTests.push[newTest]
        return [newTest,"Test created successfully"]
    }

    addTestToUsers(){
        for (let index = 0; index < User.allUsers.length; index++) {
            if(User.allUsers[index].isTechnologyExist(this.technology)){
                User.allUsers[index].addTest(this)
            } 
        }
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
    
    updateQuestion(questionDetails,propertTobeUpdated,value){
        const indexOfQuestion = this.findActiveQuestion(questionDetails)
        if(!indexOfQuestion<0){
            return [false,"no question exist with th details"]
        }
        const isUpdated = this.questions[indexOfQuestion].update(propertTobeUpdated,value)
        if(!isUpdated){
            return [false,"question could not  be updated"]
        }
        return [false,"question updated successfully"]
    }
    deleteQuestion(){
        const indexOfQuestion = this.findActiveQuestion(questionDetails)
        if(!indexOfQuestion<0){
            return [false,"no question exist with th deleted"]
        }
        const isDeleted = this.questions[indexOfQuestion].delete()
        if(!isDeleted){
            return [false,"question could not  be deleted"]
        }
        return [false,"question deleted successfully"]
    }
}
module.exports = Test