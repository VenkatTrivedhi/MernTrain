const uuid = require("uuid")
const DatabaseMongoose = require('../respository/database')



class Transaction {
    
    constructor(id, amount, type, effect, isSuccess, doneAt , balance, counterCustomer) {
        this.id = id
        this.amount = amount
        this.type = type
        this.effect = effect
        this.isSuccess = isSuccess
        this.doneAt = doneAt
        this.balanceAfterTransaction = balance
        this.counterCustomer = counterCustomer
    }
    static db = new DatabaseMongoose();

    static async CreateTransaction(amount, type, effect,
        isSuccess,doneAt, balanceAfterTransaction,counterCustomer) {
            const id = uuid.v4()
           
            const newTransaction = new Transaction(id,amount,type, effect,isSuccess,
                doneAt,balanceAfterTransaction,counterCustomer)

            console.log(newTransaction)
            const [newTranctionRecord, message] = await Transaction.db.insertTransaction(newTransaction)
            if (!newTranctionRecord) {
                return [null, message]
            }
            newTransaction.timestamp = newTranctionRecord.timestamp
            return [newTranctionRecord, message]
        }

    static reCreateTransaction(record) {
        const newTransaction = new Transaction(
            record.id,
            record.amount,
            record.type,
            record.effect,
            record.isSuccess,
            record.doneAt,
            record.balanceAfterTransaction,
            record.counterCustomer,
        )
        newTransaction.timestamp = record.timestamp
        return newTransaction
    }


}

module.exports = Transaction

