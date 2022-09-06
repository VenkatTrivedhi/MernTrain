const uuid = require("uuid")
const DatabaseMongoose = require('../respository/database')


class Account {    
    constructor(id,balance,isActive,transactions) {
        this.account_no = id
        this.balance = balance
        this.isActive = isActive
        this.transactions = transactions
    }
    static db = new DatabaseMongoose();

    static  async CreateAccount(){
        const id = uuid.v4()
        console.log(id)
        const newAccount = new Account(id,1000,true,[])
        const [newAccountRecord,message] = await Account.db.insertAccount(newAccount)
        const newAccountObject = Account.reCreateAccount(newAccountRecord)
        if(!newAccountRecord){
            return [null,message]
        }

        return [newAccountObject,message]
    }

    static reCreateAccount(record){
        const newAccount = new Account(
            record.account_no,
            record.balance,
            record.isActive)
        return newAccount
    }

    isAccountExist(){
        return this.isActive
    }
    isSufficientBalance(amount){
        return this.balance>=amount
    }

    deduct(typeOftransaction,amount){
        if (this.isSufficientBalance(amount)) {
            return [false, "balance is insuffiecient"]
        }
        this.balance = this.balance - amount
        const [result,messageOfResult] = Account.db.replaceAccount(this)
        if(!result){
            return [false,messageOfResult]
        }
        if(result.modifiedCount==0){
            return [false,"transaction failed"]
        }
        return [true, "withdraw successful"]
    }

    add(typeOftransaction,amount){
        
        this.balance = this.balance + amount
        const [result,messageOfResult] = Account.db.replaceAccount(this)
        if(!result){
            return [false,messageOfResult]
        }
        if(result.modifiedCount==0){
            return [false,"transaction failed"]
        }
        return [true, "withdraw successful"]
    }
}

module.exports = Account