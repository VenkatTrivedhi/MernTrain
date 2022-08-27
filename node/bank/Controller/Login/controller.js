const Customer = require("../../Views/customer")
const JwtPayLoad = require("../../Views/jwtPayLoad")
const checkForRequiredInputs = require("../../Views/checkForRequiredInputs")

const login= async (req,resp)=>{
    const missingInput = checkForRequiredInputs(req,["username","contactName"])
    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }
    const {username,password} = req.body
    const [isValidCustomer ,indexOfCustomer, message] = await Customer.validateCredential(username,password)
    if(!isValidCustomer){
        resp.status(401).send(message)
        return
    }
    const newPayLoad= new JwtPayLoad(Customer.allCustomer[indexOfCustomer])
    const newToken = newPayLoad.createToken()
    resp.cookie("myBankToken",newToken).status(200).send("Successfully logged in")
}

module.exports = login