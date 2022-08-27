const uuid = require("uuid")
const Stack = require("./stack")
const Test = require("./test")
const Exam = require("./Exam")
const Response = require("./Response")


class User{
    constructor(id,credential,firstName,lastName,role,experience,stack,country){
        this.id  = id
        this.credential = credential
        this.firstName = firstName
        this.lastName =  lastName
        this.role = role
        this.experience = experience
        this.stack = stack
        this.county = country
        this.tests = []
        this.score = 0
        this.outoffScore = 0
        this.isActive = true
    }
    static allUsers = [];
    static #superUser =null;

    static async createSuperUser(firstname, lastname, username, password,experience,frontend,backend,database,country) {
        if (User.#superUser!=null){
            return
        }
        const id = uuid.v4()
        const newCredential = new Credential(username, password)
        await newCredential.getPasswordHashed()
        const newStack =  new Stack.createStack(frontend,backend,database)
        const newUser = new User(id,newCredential,firstname,lastname,"Admin",experience,newStack,country)
        User.#superUser = newUser
        return [newUser, "new user created success"]
    }

    async createUser( username, password, firstname, lastname,role,experience,frontend,backend,database,country) {
        let [indexOfUser, isUsernameExist] = User.findUser(username)
        if (!isUsernameExist) {
            const id = uuid.v4()
            const newCredential = new Credential(username, password)
            await newCredential.getPasswordHashed()
            const newStack =  new Stack.createStack(frontend,backend,database)
            const newUser = new User(id,newCredential, firstname, lastname,role,experience,newStack,country)
            newUser.addAllTests()
            User.allUsers.push(newUser)
            return [newUser, "new user created success"]
        }
        if(!User.allUsers[indexOfUser].isActive){
            User.allUsers[indexOfUser].isActive = true
            return [User.allUsers[indexOfUser],"user re-activated"]
        }
        return [null, "username already exist,try new one"]     
    }

    deleteUser() {
        this.isActive = false
        return true
    }

    updateUser(propertTobeUpdated, value) {
        switch (propertTobeUpdated) {
            case ("firstName"): this.firstName = value; return [true, this]
            case ("lastName"): this.lastName = value; return [true, this]
            default: return [false, null]
        }
    }
    
    static findActiveUser(username) {
        for (let index = 0; index < User.allUsers.length; index++) {
            let currentUser = User.allUsers[index]
            if (username == currentUser.credential.username && currentUser.isActive) {
                return [index, true]
            }
        }
        return [-1, false]
    }

    static findUser(username) {
        for (let index = 0; index < User.allUsers.length; index++) {
            let currentUser = User.allUsers[index]
            if (username == currentUser.credential.username) {
                return [index, true]
            }
        }
        return [-1, false]
    }
    
    isTechnologyExist(technology){
        const [isTechnologyExist,area,indexOfTechnology] = this.stack.findTechnologyInAllAreas(technology)
        return isTechnologyExist
    }

    addAllTests(){
        for (let index = 0; index < this.stack.frontend.length; index++) {
            let indexOfTest = Test.findTest(this.stack.frontend[index])
            if(indexOfTest!=-1){
                this.addTest(Test.allTests[indexOfTest])
            } 
        }

        for (let index = 0; index < this.stack.backend.length; index++) {
            let indexOfTest = Test.findTest(this.stack.backend[index])
            if(indexOfTest!=-1){
                this.addTest(Test.allTests[indexOfTest])
            }
        }

        for (let index = 0; index < this.stack.database.length; index++) {
            let indexOfTest = Test.findTest(this.stack.database[index])
            if(indexOfTest!=-1){
                this.addTest(Test.allTests[indexOfTest])
            } 
        }
    }

    addTest(test){
        const newExam = Exam.createExam(test)
        this.tests.push(newExam)
    }

    findActiveExam(technology){
        for (let index = 0; index < this.tests.length; index++) {
            if(this.tests[index].test.technology == technology && this.tests[index].test.isActive){
                return index
            }            
        }
        return -1
    }
    
    getExam(technology){
        const indexOfExam = this.findActiveExam(technology)
        if(indexOfExam<0){
            return [false,null,`${technology} exam is not there in your tests`]
        }
        return this.tests[indexOfExam].getExam()
    }

    getQuestion(technology,questionDetails){
        const indexOfExam = this.findActiveExam(technology)
        if(indexOfExam<0){
            return [false,null,`${technology} exam is not there in your tests`]
        }
        return this.tests[indexOfExam].getQuestion(questionDetails)
    }

    submitExam(technology,submittedResponse){
        const indexOfExam = this.findActiveExam(technology)
        if(indexOfExam<0){
            return [false,`${technology} exam is not there in your tests`]
        }
        if(this.tests[indexOfExam].result.isAttempted){
            return [false,`${technology} exam was already attempted`]
        }
        return this.tests[indexOfExam].submittedResponse(submittedResponse)
      
    }

    submitAnswer(technology,questionDetails,selectedAnswer){
        const indexOfExam = this.findActiveExam(technology)
        if(indexOfExam<0){
            return [false,`${technology} exam is not there in your tests`]
        }
        if(this.tests[indexOfExam].result.isAttempted){
            return [false,`${technology} exam was already attempted`]
        }
        return this.tests[indexOfExam].submitAnswer(questionDetails,selectedAnswer)    
    }

}
User.createSuperUser("super","user","admin","admin@123",["React"],["Express"],["mongoDb"],10,"India")

module.exports = User