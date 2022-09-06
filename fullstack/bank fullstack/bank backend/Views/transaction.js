const uuid = require("uuid")
const DatabaseMongoose = require('../respository/database')



class Transaction{
    constructor(id,type,effect,amount){
        this.id=id
        this.type = type
        this.effect = effect
        this.amount = amount
    }
    static db = new DatabaseMongoose();

    static async CreateTransaction(type,effect,amount){
        const id = uuid.v4()
        const newTransaction= new Transaction(id,type,effect,amount)
        const [newTranctionRecord,message] =await Transaction.db.insertTransaction()
        if(!newTranctionRecord){
            return [null,message]
        }
        newTransaction.timestamp =  newTranctionRecord.timestamp
        return [newTransaction,message]
    }

    static  reCreateTransaction(record){
        const newTransaction= new Transaction(
            record.id,
            record.type,
            record.effect,
            record.amount
        )
        return newTransaction
    }

    
}


