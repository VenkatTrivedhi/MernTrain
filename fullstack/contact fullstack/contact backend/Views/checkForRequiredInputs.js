const checkForRequiredInputs = (req,requiredBodyInput=[],requiredParamsInput=[])=>{
    
    for(let i=0;i<requiredBodyInput.length;i++){
        if(!req.body[requiredBodyInput[i]]){
            return requiredBodyInput[i]    
        }
    }
    for(let i=0;i<requiredParamsInput.length;i++){
        if(!req.params[requiredParamsInput[i]]){
            return requiredParamsInput[i]
        }
    }
    return null 
}
module.exports = checkForRequiredInputs