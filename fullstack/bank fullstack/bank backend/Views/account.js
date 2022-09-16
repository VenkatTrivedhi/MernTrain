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

    async debit(amount){
        if (!this.isSufficientBalance(amount)) {
            return [false, "insuffiecient balance",this.balance,Date.now()]
        }
        const [result,messageOfResult] = await Account.db.debitAccount(this,amount)
        if(!result){
            return [false,messageOfResult,this.balance,Date.now()]
        }
        if(result.modifiedCount==0){
            return [false,"unknown error",this.balance,Date.now()]
        }
        const [fetchedAccount,message] = await Account.db.fetchAccount(this.account_no)
        return [true,`debit successful`,fetchedAccount.balance,fetchedAccount.updatedAt]
    }

    async credit(amount){
        const [result,messageOfResult] = await Account.db.creditAccount(this,amount)
        if(!result){
            return [false,messageOfResult,this.balance,Date.now()]
        }
        if(result.modifiedCount==0){
            return [false,"unknown error",this.balance,Date.now()]
        }
        const [fetchedAccount,message] = await Account.db.fetchAccount(this.account_no)
        return [true,`credit successful`,fetchedAccount.balance,fetchedAccount.updatedAt]
    }
}

module.exports = Account