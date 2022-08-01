
const checkMissingInput=(arrayOfInputs=[])=>{

    for (let index = 0; index < arrayOfInputs.length; index++) {
        if(!arrayOfInputs[index]){
            return [true,Object.keys(arrayOfInputs[index])]
        }
        return [false,null]       
    }
}

const checkAnyNoneArray = (arrayOfInputs)=>{
    for (let index = 0; index < arrayOfInputs.length; index++) {
        if(typeof(arrayOfInputs[index])!==0){
            return [true,Object.keys(arrayOfInputs[index])]
        }
        return [false,null]       
    }    
}

const checkForRequiredInputs = (req,requiredBodyInput=[],requiredParamsInput=[])=>{
    
    for(let i=0;i<requiredBodyInput.length;i++){
        console.log(requiredBodyInput[i])
        if(!req.body[requiredBodyInput[i]]){
            return false,requiredBodyInput[i]    
        }
    }
    for(let i=0;i<requiredParamsInput.length;i++){
        if(!req.params[requiredParamsInput[i]]){
            return requiredParamsInput[i]
        }
    }
    return null 
}

module.exports = {checkAnyNoneArray,checkMissingInput,checkForRequiredInputs}