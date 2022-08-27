const uuid = require("uuid")
const Bank = require("./bank")
const Credential = require("./credential")
const Account = require("./account")

class Customer {
   
    constructor(fullName,credential) {
        this.Id = uuid.v4()
        this.fullName = fullName
        this.credential = credential
        this.role = role
        this.accounts = []
        this.totalBalance = 0
    }
    static allCustomer = [];
    static superUser =null;

    static async createSuperUser(firstname, lastname, username, password) {
        if (Customer.#superUser!=null){
            return
        }
        const id = uuid.v4()
        const newCredential = new Credential(username, password)
        await newCredential.getPasswordHashed()
        const newUser = new Customer(`${firstname} ${lastname}`,newCredential)
        User.#superUser = newUser
        return [newUser, "new user created success"]
    }

    static async validateSuperUser(username,password){
        const isCorrectPassword = await Customer.superUser.credential.comparePassword(password)
        if(!isCorrectPassword){
            return [false,-1,"invalid password"]
        }
        return [true,indexOfCustomer,message]
    }

    async creatCustomer(firstName, lastName, username, password) {
        let fullName = `${firstName} ${lastName}`
        const newCredential = new Credential(username,password)
        newCredential.password = await newCredential.getHashedPassword() 
        const newCustomer = new Customer(fullName,newCredential)
        Customer.allCustomer.push(newCustomer)
        return newCustomer
    }
    
    static findCustomer(username) {
        if(Customer.allCustomer.length==0){
            return [-1,false,"invalid username0"]
        }
        for (let index = 0; index < Customer.allCustomer.length; index++) {
            if (Customer.allCustomer[index].credential.isUsernameExists(username)){
                return [index,true,"customer found"]
            }
        }
        return [-1,false,"invalid username2"]
    }

    static async validateCredential(username,password){
        const [indexOfCustomer,isCustomerExist,message] = Customer.findCustomer(username)
        if(!isCustomerExist){
            return [false,-1,message]
        }
        const isCorrectPassword = await Customer.allCustomer[indexOfCustomer].credential.comparePassword(password)
        if(!isCorrectPassword){
            return [false,-1,"invalid password"]
        }
        return [true,indexOfCustomer,message]
    }

    #updateTotalBalance(){
        if(this.accounts.length==0){
            return this.totalBalance
        }
        let total = 0;
        for (let index = 0; index < this.accounts.length; index++) {
            const account = this.accounts[index];
            total = total + account.balance
        }
        this.totalBalance = total
        return this.totalBalance
    }

    creatAccount(bankAbbrevation) {
        let [indexOfBank, isBankExist] = Bank.findBank(bankAbbrevation)
        if (!isBankExist) {
            return [false,null, `No bank exit with name ${bankAbbrevation}`]
        }

        let[indexOfAccount,isAccountExist] = this.#isAccountExist(bankAbbrevation)
        if(isAccountExist){
            return [false,null,`Account with ${bankAbbrevation} bank is already exist`]
        }

        let bank = Bank.allBanks[indexOfBank]
        const newAccount = new Account(bank)

        this.accounts.push(newAccount)
        this.#updateTotalBalance()
        return [true,newAccount,`Account with ${bankAbbrevation} bank is created`]
    }

    #isAccountExist(bankAbbrevation) {
        if (this.accounts.length == 0) {
            [null, false]
        }
        for (let index = 0; index < this.accounts.length; index++) {
            if (this.accounts[index].isAccountExist(bankAbbrevation)) {
                return [index, true]
            }
        }
        return [null, false]
    }

    withdraw(amount, bankAbbrevation) {
        let [indexOfAccount, isAccountexist] = this.#isAccountExist(bankAbbrevation)
        if (!isAccountexist) {
            return [false, "there is no account with that bankabbrevation"]
        }
        if (!this.accounts[indexOfAccount].isSufficientBalance(amount)) {
            return [false, "balance is insuffiecient"]
        }

        this.accounts[indexOfAccount].balance = this.accounts[indexOfAccount].balance - amount
        this.#updateTotalBalance()
        return [true, "withdraw successful"]
    }

    deposit(amount, bankAbbrevation) {
        let [indexOfAccount, isAccountexist] = this.#isAccountExist(bankAbbrevation)
        if (!isAccountexist) {
            return [false, "there is no account with that bankabbrevation"]
        }

        this.accounts[indexOfAccount].balance = this.accounts[indexOfAccount].balance + amount
        this.#updateTotalBalance()
        return [true, "deposited successfully"]
    }

    transfer(amount, debitBankAbbrevation, creditUserName, creditBankAbbrevation) {
        let [indexOfCustomer,isCustomerExist,messageOfCustomer] = Customer.findCustomer(creditUserName)

        if (!isCustomerExist) {
            return [false, messageOfCustomer]
        }
        let [isWithdrawSuccess, messageOfWithdraw] = this.withdraw(amount, debitBankAbbrevation)
        if (!isWithdrawSuccess) {
            return [false, messageOfWithdraw]
        }
        let [isDepositSuccess,messageOfDepisit] = Customer.allCustomer[indexOfCustomer].deposit(amount, creditBankAbbrevation)
        if (isDepositSuccess) {
            return [true, "transfer successfull"]
        }
        let isRedeposite = this.deposit(amount, debitBankAbbrevation)
        if (!isRedeposite) {
            return [false, "transaction has failed,amount debited will be refunded"]
        }
        return [false, "trasaction failed,no amount deducted"]
    }

    selfTransfer(amount, debitBankAbbrevation, creditBankAbbrevation) {
        const [status,message] = this.transfer(amount, debitBankAbbrevation, this.credential.username, creditBankAbbrevation)
        return [status,message]
    }
}

Customer.createSuperUser("super","user","admin","admin@123")

module.exports = Customer

