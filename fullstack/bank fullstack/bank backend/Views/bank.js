const uuid = require("uuid")

class Bank {
    static allBanks = []

    constructor(bankName, bankAbbrevation) {
        this.bankId = uuid.v4()
        this.bankName = bankName
        this.bankAbbrevation = bankAbbrevation
    }

    createBank(bankName, bankAbbrevation) {
        let [indexOfBank, isBankexist, bankproperty] = Bank.#findBank(bankName, bankAbbrevation)
        if(isBankexist) {
            return [false,null,`${bankproperty} already exist`]         
        }
        const newBank = new Bank(bankName, bankAbbrevation)
        Bank.allBanks.push(newBank)
        return [true,newBank,"bankName"]
    }

    static #findBank(bankName, bankAbbrevation) {
        if (Bank.allBanks.length == 0) {
            return [null, false, "no bank"]
        }
        for (let index = 0; index < Bank.allBanks.length; index++) {

            let bank = Bank.allBanks[index];
            if (bank.bankName == bankName) {
                return [index, true, "bankName"]
            }
            if (bank.bankAbbrevation == bankAbbrevation) {
                return [index, true, "bankAbbrevation"]
            }
        }
        return [null, false, "No bank"]
    }

    static findBank(bankAbbrevation) {
        if (this.allBanks.length == 0) {
            return [null, false,"no bank"]
        }
        for (let index = 0; index < Bank.allBanks.length; index++) {
            const element = Bank.allBanks[index];
            if (element.bankAbbrevation == bankAbbrevation) {
                return [index, true,"bankAbbrevation"]
            }
        }
        return [null, false,"no bank"]
    }
}

module.exports = Bank