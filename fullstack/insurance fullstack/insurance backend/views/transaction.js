const uuid = require("uuid")
const DatabaseMongoose = require("../repository/database")


class Transaction{
    constructor(id,cardNumber,cvv,amount,doneAt,status){
        this.id =  id
        this.cardNumber = cardNumber
        this.cvv = cvv
        this.amount =  amount 
        this.doneAt =  doneAt
        this.status = status
    }
    static db =  new DatabaseMongoose()

    static async createTransaction(cardNumber,cvv,amount){
        const id = uuid.v4()
        const newTransaction = new Transaction(id,cardNumber,cvv,amount,new Date.now(),"success")
        const transactionRecord = await Transaction.db.insertTransaction(newTransaction)
        return transactionRecord
    }
}



module.exports = Transaction