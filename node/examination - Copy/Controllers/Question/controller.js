const Question = require("../../Views/question")
const {checkForRequiredInputs} = require("../../Views/inputValidaters")

const createQuestion = (req,resp) => {
    const [isAdmin,Payload,indexOfAdmin] = JwtPayload.isValidAdmin(req, resp)
    if (!isAdmin) {
        return "unauthorized access"
    }
    
    const missingInput = checkForRequiredInputs(req,["technology","details","options","correctAnswer","complexity"])
    
    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }
    const {technology,details,options,correctAnswer,complexity} = req.body
    const [newQuestion,messageOfCreateQuestion]= Question.createQuestion(technology,details,options,correctAnswer,complexity)
    if(!newQuestion){
        resp.status(500).send(messageOfCreateQuestion)
        return messageOfCreateQuestion 
    }
    resp.status(200).send(messageOfCreateQuestion)
    return messageOfCreateQuestion
}

const updateQuestion = (req,resp) => {
    const [isAdmin,Payload,indexOfAdmin] = JwtPayload.isValidAdmin(req, resp)
    if (!isAdmin) {
        return "unauthorized access"
    }

    const missingInput = checkForRequiredInputs(req,["propertyTobeUpdated","value"],["technology"])

    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }

    const {propertTobeUpdated,value} = req.body
    const {technology} = req.params

    const [isUpdated,messageOfUpdateTest] = Test.updateTest(technology,propertTobeUpdated,value)
    if(!isUpdated){
        resp.status(500).send(messageOfUpdateTest)
        return messageOfUpdateTest 
    }
    resp.status(200).send(messageOfUpdateTest)
    return messageOfUpdateTest
}

const deleteQuestion = (req,resp) => {
    const [isAdmin,Payload,indexOfAdmin] = JwtPayload.isValidAdmin(req, resp)
    if (!isAdmin) {
        return "unauthorized access"
    }

    const missingInput = checkForRequiredInputs(req,[],["technology"])
    
    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }

    const {technology} = req.params

    const [isDeleted,messageOfDeleteTest] = Test.deleteTest(technology)
    if(!isDeleted){
        resp.status(500).send(messageOfDeleteTest)
        return messageOfDeleteTest 
    }

    resp.status(200).send(messageOfDeleteTest)
    return messageOfDeleteTest
}

module.exports = {createQuestion,updateQuestion,deleteQuestion}