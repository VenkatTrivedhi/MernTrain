const User = require("../../Views/user")
const JwtPayload = require("../../jwtPayLoad")
const checkForRequiredInputs = require("../../checkForRequiredInputs")
const Roles = require("../../role")
const fs =require("fs")
const path =require("path")


const createPlan = async (req, resp,img ) => {

    const [isAdmin, AdminPayload, admin] = await JwtPayload.isValidAdmin(req, resp)
    if(!isAdmin){
        return
    }
    const missingInput = checkForRequiredInputs(req, [
        "typeId","schemeId","minimumTerm", "maximumTerm", "maximumAge", "minimumAge",
        "minimumInvestment", "maximumInvestment", "profitRatio" ,"status"])
    if (missingInput) {
        resp.status(401).send({ "message": `${missingInput} is required`})
        return `${missingInput} is required`
    }
    const {typeId,schemeId,minimumTerm, maximumTerm, maximumAge, minimumAge,
        minimumInvestment, maximumInvestment, profitRatio ,status} = req.body

    const [Plan,message] = await admin.createPlan(
        typeId,schemeId,minimumTerm, maximumTerm, maximumAge, minimumAge,
        minimumInvestment, maximumInvestment, profitRatio ,status)
    if(!Plan){
            resp.status(401).send({ "message": message })
        }
    resp.status(200).send({ "data": Plan, "message": message })
}

const getAllPlans = async (req, resp) => {
    const [isLoggedIn, payload, user] = await JwtPayload.loggedInUser(req,resp)
    if(!isLoggedIn){
        return
    }
    const [list,message] = await user.getAllPlans()
    if(!list){
            resp.status(401).send({ "message": message })
        }
    resp.status(200).send({ "data": list, "message": message })
}

const deletePlan = async (req, resp) => {
    const [isAdmin, AdminPayload, admin] = await JwtPayload.isValidAdmin(req, resp)
    if(!isAdmin){
        return
    }

    const missingInput = checkForRequiredInputs(req, [],["id"])
    if (missingInput) {
        resp.status(401).send({ "message": `${missingInput} is required`})
        return `${missingInput} is required`
    }
    const {id} = req.params
    const [isUpdated,message] = await admin.deletePlan(id)
    if(!isUpdated){
            resp.status(401).send({ "message": message })
        }
    resp.status(200).send({ "data": plan, "message": message })
}

const updatePlan = async (req, resp) => {
    const [isAdmin, AdminPayload, admin] = await JwtPayload.isValidAdmin(req, resp)
    if(!isAdmin){
        return
    }

    const missingInput = checkForRequiredInputs(req, ["propertyToBeUpdated","value"],["id"])
    if (missingInput) {
        resp.status(401).send({ "message": `${missingInput} is required`})
        return `${missingInput} is required`
    }
    const {propertyToBeUpdated,value} = req.body
    const {id} = req.params
    const [isUpdated,message] = await admin.updatePlan(id,propertyToBeUpdated,value)
    if(!isUpdated){
            resp.status(401).send({ "message": message })
        }
    resp.status(200).send({ "data": plan, "message": message })
}







module.exports = {createPlan,getAllPlans,updatePlan,deletePlan} 