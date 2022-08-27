const Test = require("../../Views/test")
const {checkForRequiredInputs} = require("../../Views/inputValidaters")
const paginater = require("../../Views/paginater")

const createTest = (req,resp) => {
    const [isAdmin,Payload,indexOfAdmin] = JwtPayload.isValidAdmin(req, resp)
    if (!isAdmin) {
        return "unauthorized access"
    }
    
    const missingInput = checkForRequiredInputs(req,["technology"])
    
    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }
    const {technology} = req.body
    const [newTest,messageOfCreateTest]= Test.createTest(technology)
    
    if(!newTest){
        resp.status(500).send(messageOfCreateTest)
        return messageOfCreateTest 
    }
    resp.status(200).send(messageOfCreateTest)
    return messageOfCreateTest
}

const getAllTest = (req,resp) => {
    const [isAdmin,Payload,indexOfAdmin] = JwtPayload.isValidAdmin(req, resp)
    if (!isAdmin) {
        return "unauthorized access"
    }
    const missingInput = checkForRequiredInputs(req,[],["limit","page"])
    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }
    const {limit,page} =  req.params
    let currentPage = paginater(Test.allTests,limit,page)
    resp.status(200).send(currentPage)
    return "page returned"
}

const updateTest = (req,resp) => {
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

const deleteTest = (req,resp) => {
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

module.exports = {createTest,getAllTest,updateTest,deleteTest}