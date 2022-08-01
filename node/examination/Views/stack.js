const uuid = require("uuid")
const { ChoiceStack } = require("..")
const {checkMissingInput,checkEmptyArray}= require("./inputValidaters")  
class Stack{

    constructor(frontend,backend,database){
        this.frontend  = frontend
        this.backend = backend
        this.database = database
    }
    //ChoiceStact
    static ChoiceStack= null;

    static #createChoiceStack(){
        if(Stack.ChoiceStack!=null){
            return false
        }
        const newChoiceStack = new Stack([],[],[])
        Stack.ChoiceStack = newChoiceStack
        return true
    }

    static isChoiceCreated = Stack.#createChoiceStack()

    static getAllFrontendChoices(){                             
        return Stack.ChoiceStack.frontend
    }
    static getAllBackendChoices(){
        return Stack.ChoiceStack.backend
    }
    static getAllDatabaseChoices(){
        return Stack.ChoiceStack.database
    }

    //UserStack
  
    findTechnology(area,technology){
        for (let index = 0; index < this[area].length; index++) {
            if(this[area][index]==technology){
                return [true,index]
            }            
        }
        return [false,-1]
    }

    findTechnologyInAllAreas(technology){
        const [isTechExistInFrontend,indexOfTechOfFE] = this.findTechnology("frontend",technology)
        if(isTechExistInFront){
            return [true,"frontend",indexOfTechOfFE]
        }
        const [isTechExistInBackend,indexOfTechOfBE] = this.findTechnology("backend",technology)
        if(isTechExistInBackend){
            return [true,"backend",indexOfTechOfBE]
        }
        const [isTechExistInDatabase,indexOfTechOfDB] = this.findTechnology("database",technology)
        if(isTechExistInDatabase){
            return [true,"database",indexOfTechOfDB]
        }
        return [false,"no where",-1]
    }

    addTechnology(area,technology){
        switch(area){
            case("frontend"):{
                const [isTechExist,indexOfTechnology] = this.findTechnology("frontend",technology)
                if(isTechExist){
                    return [false,"technology already exist"]
                }
                Stack.ChoiceStack.frontend.push(technology)
                return [true,`${technology} added successfully in ${this}`]
            }
            case("backend"):{
                const [isTechExist,indexOfTechnology] = this.#findTechnology("backend",technology)
                if(isTechExist){
                    return [false,"technology already exist"]
                }
                Stack.ChoiceStack.backend.push(technology)
                return [true,`${technology} added successfully in ${this}`]
            }
            case("database"):{
                const [isTechExist,indexOfTechnology] = this.#findTechnology("database",technology)
                if(isTechExist){
                    return [false,"technology already exist"]
                }
                Stack.ChoiceStack.database.push(technology)
                return [true,`${technology} added successfully in ${this}`]
            }
            default: return [false,`${area} can not be added`]  
        }
    }

    static createStack(frontend,backend,database){
        const arrayOfInputs =  [frontend,backend,database]   
        const [isMissing,missingInput] = checkMissingInput(arrayOfInputs)
        
        if (isMissing) {
            return [null,`${missingInput} is missing`]
        }

        const [isEmptyArray,emptyInput] = checkEmptyArray(arrayOfInputs)
        if(isEmptyArray){
            return [null,`${emptyInput} is empty`]
        }
        
        
        const newStack =  Stack(frontend,backend,database)
        return [newStack,`stack created successfully`]
    }

/*checkeAllTechnologiesExist(frontend,backend,database){
        const [isFrontendExist,indexOfFrontendTechnology]= this.#findTechnology("frontend",frontend)
        if(isFrontendExist){
            return [true,"frontend",frontend[indexOfFrontendTechnology]]
        }
        const [isBackendExist,indexOfBackendTechnology]= this.#findTechnology("Backend",backend)
        if(isBackendExist){
            return [true,"backend",backend[indexOfBackendTechnology]]
        }
        const [isDatabaseExist,indexOfDatabaseTechnology]= this.#findTechnology("frontend",database)
        if(isDatabaseExist){
            return [true,"database",database[indexOfDatabaseTechnology]]
        }
        return [false,"",null]
    }
*/
    
    
}

module.exports = Stack