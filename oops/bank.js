class Bank {
    static bankId = 0;
    static all_banks = []

    constructor(bankname, bankAbbrevation) {
        this.bankId = ++Bank.bankId
        this.bankname = bankname
        this.bankAbbrevation = bankAbbrevation
    }

    static createBank(bankname, bankAbbrevation) {
        let [indexOfBank, isBankexist, bankproperty] = this.#findBankAndAbbrevation(bankname, bankAbbrevation)
        if (isBankexist) {
            return `${bankproperty} already exist`
        }
        const newBank = new Bank(bankname, bankAbbrevation)
        Bank.all_banks.push(newBank)
        return newBank
    }

    static #findBankAndAbbrevation(bankname, bankAbbrevation) {
        if (Bank.all_banks.length == 0) {
            return [null, false, "no bank"]
        }
        for (let index = 0; index < Bank.all_banks.length; index++) {

            let bank = Bank.all_banks[index];
            if (bank.bankname == bankname) {
                return [index, true, "bankname"]
            }
            if (bank.bankAbbrevation == bankAbbrevation) {
                return [index, true, "bankAbbrevation"]
            }
        }
        return [null, false, "No bank"]
    }

    static findBank(bankAbbrevation) {
        if (this.all_banks.length == 0) {
            return [null, false]
        }
        for (let index = 0; index < Bank.all_banks.length; index++) {
            const element = Bank.all_banks[index];
            if (element.bankAbbrevation == bankAbbrevation) {
                return [index, true]
            }
        }
        return [null, false]
    }
}

class Account {
    static account_no = 1000;
    constructor(bankname) {
        this.account_no = Account.account_no++
        this.bankAbbrevation = bankname
        this.balance = 1000
    }
}


class Customer {
    static all_customer = [];
    static customerId = 0;
    constructor(fullname) {
        this.customerId = ++Customer.customerId
        this.fullname = fullname
        this.accounts = []
        this.totalBalance = 0
    }
    static creatCustomer(firstname, lastname) {
        let fullname = `${firstname} ${lastname}`
        const newCustomer = new Customer(fullname)
        Customer.all_customer.push(newCustomer)
        return newCustomer
    }

    static #findCustomer(customerId) {
        for (let index = 0; index < Customer.all_customer.length; index++) {
            const customer = Customer.all_customer[index];
            if (customer.customerId == customerId) {
                return [index, true]
            }
        }
        return ["no custemer exist with that id", false]
    }

    #updateTotalBalance() {
        if(this.accounts.length==0){
            return
        }
        let total = 0;
        for (let index = 0; index < this.accounts.length; index++) {
            const account = this.accounts[index];
            total = total + account.balance
        }
        this.totalBalance = total
    }

    creatAccount(bankAbbrevation) {
        let [index, isBankexist] = Bank.findBank(bankAbbrevation)
        if (!isBankexist) {
            return [null, `No bank exit with name ${bankAbbrevation}`]
        }
        let bank = Bank.all_banks[index].bankAbbrevation
        const newAccount = new Account(bank)
        console.log(newAccount)
        this.accounts.push(newAccount)
        this.#updateTotalBalance()
    }

    #isAccountExist(bankAbbrevation) {
        if (this.accounts.length == 0) {
            [null, false]
        }
        for (let index = 0; index < this.accounts.length; index++) {
            const account = this.accounts[index];
            if (account.bankAbbrevation == bankAbbrevation) {
                return [index, true]
            }
        }
        return [null, false]
    }

    withdraw(amount, bankAbbrevation) {
        let [index, isAccountexist] = this.#isAccountExist(bankAbbrevation)
        if (!isAccountexist) {
            return [false, "there is no account with that bankabbrevation"]
        }
        if (this.accounts[index].balance < amount) {
            return [false, "balance is insuffiecient"]
        }

        this.accounts[index].balance = this.accounts[index].balance - amount
        this.#updateTotalBalance()
        return [true, "withdraw successful"]
    }

    deposit(amount, bankAbbrevation) {
        let [index, isAccountexist] = this.#isAccountExist(bankAbbrevation)
        if (!isAccountexist) {
            return [false, "there is no account with that bankabbrevation"]
        }

        this.accounts[index].balance = this.accounts[index].balance + amount
        this.#updateTotalBalance()
        return [true, "deposited successfully"]
    }

    transfer(amount, debitBankAbbrevation, creditCustomerID, creditcreditBankAbbrevation) {
        let [custemerinfo, isCustomerExist] = Customer.#findCustomer(creditCustomerID)

        if (!isCustomerExist) {
            return [false, custemerinfo]
        }
        let [isWithdrawSuccess, message] = this.withdraw(amount, debitBankAbbrevation)
        if (!isWithdrawSuccess) {
            return [false, message]
        }
        let isDepositSuccess = Customer.all_customer[custemerinfo].deposit(amount, creditcreditBankAbbrevation)
        if (isDepositSuccess) {
            return [true, "transaction is successfull"]
        }
        let isRedeposite = this.deposit(amount, debitBankAbbrevation)
        if (!isRedeposite) {
            return [false, "transaction has failed,amount debited will be refunded"]
        }
        return [false, "trasaction failed,no amount deducted"]
    }


    selfTransfer(amount, debitBankAbbrevation, creditBankAbbrevation) {
        let [status,message] = this.transfer(amount, debitBankAbbrevation, this.customerId, creditBankAbbrevation)
        return message
    }

}

const sbi = Bank.createBank("state bank of india", "sbi")

console.log(sbi)

const boi = Bank.createBank("Bank of india", "boi")

console.log(boi)

const venkatesh = Customer.creatCustomer("koppisetti", "venkatesh")
console.log(venkatesh)

venkatesh.creatAccount("boi")
venkatesh.creatAccount("sbi")
venkatesh.withdraw(200,"boi")
venkatesh.deposit(600,"boi")
venkatesh.selfTransfer(200,"boi","sbi")
const tendulkar = Customer.creatCustomer("sachin", "Tendulkar")
console.log(tendulkar)

tendulkar.creatAccount("sbi")


venkatesh.transfer(200,'boi',2,"sbi")




