const Customer = require("../../Views/customer")

const  creatCustomer= async (req,resp)=>{   
    const {firstName,lastName,username,password} = req.body
    const newCustomer = await Customer.creatCustomer(firstName,lastName,username,password)
    resp.status(201).send(newCustomer)   
}

module.exports = creatCustomer