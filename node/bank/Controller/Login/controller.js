const Customer = require("../../Views/customer")
const JwtPayLoad = require("../../Views/jwtPayLoad")

const login= async (req,resp)=>{
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