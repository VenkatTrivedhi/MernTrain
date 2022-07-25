const uuid = require("uuid")

class Account {    
    constructor(bank) {
        this.account_no = uuid.v4()
        this.bank= bank
        this.balance = 1000
    }

    isAccountExist(bankAbbrevation){
        return this.bank.bankAbbrevation==bankAbbrevation
    }
    isSufficientBalance(amount){
        return this.balance>=amount
    }
}

module.exports = Account