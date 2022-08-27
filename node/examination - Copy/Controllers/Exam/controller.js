const JwtPayload = require("../../Views/JwtPayload")
const User = require("../../Views/user")

const attemptExam = (req,resp) =>{
    const missingInput = checkForRequiredInputs(req,["technology"],["username"])

    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }

    const [isSelfUser,Payload,indexOfSelfUser] = JwtPayload.isValidSelfUser(req, resp)
    if (!isSelfUser) {
        return "unauthorized access"
    }

    const [isExamFetched,exam,messageOfFetch] = User.allUsers[indexOfSelfUser].getExam(technology)
    if(!isExamFetched){
        resp.status(404).send(messageOfFetch)
        return messageOfAttempt
    }
    resp.status(200).send(exam)
    return messageOfFetch
}

const submitExam = (req,resp) => {
    const missingInput = checkForRequiredInputs(req,["technology","response"],["username"])

    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }

    const [isSelfUser,Payload,indexOfSelfUser] = JwtPayload.isValidSelfUser(req, resp)
    if (!isSelfUser) {
        return "unauthorized access"
    }
    const {technology,response} = req.body
    if(!response.length){
        resp.status(401).send(`response must be an list`)
        return `response must be an list`
    }

    for (let index = 0; index < response.length; index++) {
        if(!response[index].length){
            resp.status(401).send(`${response[index]} must be an list`)
            return `${response[index]} must be an list`
        }

        if(response[index].length!=2){
        resp.status(401).send(`${response[index]} must be an list with two items`)
        return `${response[index]} must be an list with two items`
        }

        if(typeof(response[index][0])!="string"||typeof(response[index][1])!="string"){
            resp.status(401).send(`${response[index]} items must be strings`)
            return `${response[index]} items must be strings`
        }
    }
    const [isSubmbited,messageOfSubmition] = User.allUsers[indexOfSelfUser].submitExam(technology,response)
    if(!isSubmbited){
        resp.status(504).send(messageOfSubmition)
        return messageOfSubmition
    }
    resp.status(200).send(messageOfSubmition)
    return messageOfSubmition
}

const submitAnswer = (req ,resp) => {
    const missingInput = checkForRequiredInputs(req,["technology","questiondetails","selectedAnswer"],["username"])

    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }

    const [isSelfUser,Payload,indexOfSelfUser] = JwtPayload.isValidSelfUser(req, resp)
    if (!isSelfUser) {
        return "unauthorized access"
    }

    const {technology,questiondetails,selectedAnswer} = req.body
    const [isSubmited,messageOfSubmition] = User.allUsers[indexOfSelfUser].submitAnswer(technology,questiondetails,selectedAnswer)
    if(!isSubmited){
        resp.status(401).send(messageOfSubmition)
        return messageOfSubmition
    }
    resp.status(200).send(messageOfSubmition)
    return messageOfSubmition

}

module.exports = {attemptExam , submitExam , submitAnswer}