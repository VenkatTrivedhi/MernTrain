const uuid = require("uuid")
const Bank = require("./bank")
const Credential = require("./credential")
const Account = require("./account")
const DatabaseMongoose = require('../respository/database')
const Transaction = require("./transaction")
const paginater = require("./paginater")

class User {

    constructor(id, fullName, credential, role, isActive, account) {
        this.id = id
        this.fullName = fullName
        this.credential = credential
        this.role = role
        this.isActive = isActive
        this.account = account
    }

    static db = new DatabaseMongoose()



    static async createSuperUser(firstname, lastname, username, password) {
        const [superuserRecord, messageOfFetch] = await User.db.fetchCredential("admin")
        if (superuserRecord) {
            return [null, "cannot duplicate superuser"]
        }
        const id = uuid.v4()
        const [newCredentialObject, messageOfCredentialCreate] =
            await Credential.createCredential(username, password)
        const [newCredentialRecord, messageOfFetchCredential] = await User.db.fetchCredential(username)
        const [newAccount, message] = await Account.CreateAccount()

        const [newAccountRecord, messageOfFetchAccount] = await User.db.fetchAccount(newAccount.account_no)
        const newUser = new User(id, firstname + " " + lastname,
            newCredentialRecord._id, "Admin", true, newAccountRecord._id)
        const [newUserRecord, messageOfUser] = await User.db.insertUser(newUser)
        return [newUser, "new user created success"]
    }

    async createUser(firstname, lastname, username, password, role) {

        const [fetchedCredentialRecord, messageOfetchingCredential] =
            await User.db.fetchCredential(username)

        if (!fetchedCredentialRecord) {
            const id = uuid.v4()
            const [newCredentialObject, messageOfCreatingCredential] =
                await Credential.createCredential(username, password)
            const [newCredentialRecord, messageOfnewCredentialRecord] =
                await User.db.fetchCredential(username)
            if (!newCredentialRecord) {
                return [newCredentialRecord, messageOfCreatingCredential]
            }
            const [newAccount, message] = await Account.CreateAccount()

            const [newAccountRecord, messageOfFetchAccount] = await User.db.fetchAccount(newAccount.account_no)

            const newUserObject = new User(id, firstname + " " + lastname,
                newCredentialRecord._id, role, true, newAccountRecord._id)
            const [newUserRecord, messageOfNewUserRecord] =
                await User.db.insertUser(newUserObject)
            if (!newUserRecord) {
                return [newUserRecord, messageOfNewUserRecord]
            }
            const [fetcehdUserRecord, messageOfFetchedUserRecord] =
                await User.db.fetchUser(newCredentialRecord)
            const newUser = User.reCreateUserObject(fetcehdUserRecord)
            return [newUser, messageOfNewUserRecord]
        }

        const [fetchedUserRecord, messageOfFetchedUserRecord] = await User.db.fetchUser(fetchedCredentialRecord)

        if (!fetchedUserRecord.isActive) {
            const userObject = User.reCreateUserObject(fetchedUserRecord)
            return userObject.#reactivateUser()
        }
        return [null, "username already exist,try new one"]
    }

    async #reactivateUser() {
        this.isActive = true
        const [result, messageOfResult] = await User.db.replaceUser(this)
        if (!result) {
            return [null, messageOfResult]
        }
        if (result.modifiedCount == 0) {
            return [null, messageOfResult]
        }
        const [userRecord, messageOfUserRecord] = await User.db.fetchUser(fetchedCredentialRecord)
        const updatedUser = User.reCreateUserObject(userRecord)
        return [updatedUser, messageOfResult]
    }

    static reCreateUserObject(record) {
        const UserObject = new User(
            record.id,
            record.fullName,
            record.credential,
            record.role,
            record.isActive,
            record.account)
        return UserObject
    }

    
    static async findUser(username) {
        const [fetchedCredentialRecord, messageOfFetchCredential] = await User.db.fetchCredential(username)
        if (!fetchedCredentialRecord) {
            return [null, "user not found"]
        }
        const [fetchedUserRecord, msgOfUserFetch] = await User.db.fetchUser(fetchedCredentialRecord)
        console.log(fetchedCredentialRecord)
        if (fetchedUserRecord.isActive != true) {
            return [null, "user is not active"]
        }

        const userObject = User.reCreateUserObject(fetchedUserRecord)
        return [userObject, "user found"]
    }

    static async findUserInAll(username) {
        const [fetchedCredentialRecord, msgOfCredentialFetch] =
            await User.db.fetchCredential(username)

        if (!fetchedCredentialRecord) {
            return [null, "username not found"]
        }

        const [fetchedUserRecord, msgOfUserFetch] = User.db.fetchUser(fetchedCredentialRecord)
        const userObject = User.reCreateUserObject(fetchedUserRecord)
        return [userObject, "user found"]
    }

    static async validateCredential(username, password) {
        const [userObject, message] = await User.findUser(username)
        if (!userObject) {
            return [false, null, "invalid credential"]
        }
        console.log(userObject)
        const CredentialObject = Credential.reCreatedCredentialObject(userObject.credential)
        if (await CredentialObject.ComparePasspassword(password)) {
            return [true, userObject, "valid credential"]
        }
        return [false, null, "invalid credential"]
    }

    async #debitUser(amount,user,type,counterCustomer){
                
        const account = Account.reCreateAccount(user.account)
        const [isDebited,messageOfDebit,balance,timestamp] = await account.debit(amount)
    
        const [transactionRecord,messageTransaction] = 
            await Transaction.CreateTransaction(amount,type,"debit",isDebited,timestamp,
                balance,counterCustomer)
        
        let transaction = null
        if(transactionRecord){
            const [PushResult,messageOfPushResult] = 
                await User.db.pushTransaction(user.account,transactionRecord._id)
            transaction = Transaction.reCreateTransaction(transactionRecord)
        }

        if(!isDebited){
            return [isDebited,messageOfDebit,transaction]    
        }
        if(!transactionRecord){
            return [isDebited,`${type} of ${amount} from account number ****`+
        `${user.account.account_no.slice(-3,)} is success,but failed to store the details`,null]
        }
       
        return [isDebited,`withdrawal of ${amount} from account number ****`+
        `${user.account.account_no.slice(-3,)} is success`,
        transaction]
    
    }

    async #creditUser(amount,user,type,counterCustomer){
        const account = Account.reCreateAccount(user.account)
        const [isCredited,messageOfDebit,balance,timestamp] = await account.credit(amount)
    
        const [transactionRecord,messageTransaction] = 
            await Transaction.CreateTransaction(amount,type,"credit",isCredited,timestamp,
            balance,counterCustomer)
        
        let transaction = null
        if(transactionRecord){
            const [PushResult,messageOfPushResult] = 
                await User.db.pushTransaction(user.account,transactionRecord._id)
            transaction = Transaction.reCreateTransaction(transactionRecord)
        }

        if(!isCredited){
            return [isCredited,messageOfDebit,transaction]    
        }
        if(!transactionRecord){
            return [isCredited,`${type} of ${amount} rupees from account number ****`+
        `${user.account.account_no.slice(-3,)} is success,but failed to store the details`,null]
        }
       
        return [isCredited,`${type} of ${amount} rupees from account number  ****`+
        `${user.account.account_no.slice(-3,)} is success `,
        transaction ]
    }

    async withdraw(amount) {
        return await this.#debitUser(amount,this,"withdrawal")
    }

    async deposit(amount) {
        return await this.#creditUser(amount,this,"deposit")
    }

    async transfer(amount, creditUserName) {
        const [creditUser,messageOfCreditUser]= await User.findUser(creditUserName)
        if(!creditUser){
            return [false,`credit ${messageOfCreditUser}`,null]
        }
        const [isDebited,messageOfDebit,transactionOfDebit] = 
            await this.#debitUser(
                amount,
                this,
                "transfer",
                {name:creditUser.fullName,account_no:creditUser.account.account_no})
        if(!isDebited){
            return [false,messageOfDebit,transactionOfDebit]
        }
        if(!transactionOfDebit){
            return [false,"transaction failed, amount will be refunded",null]
        }

        const [isCredited,messageOfCredit,transactionOfCredit] = 
            await this.#creditUser(
                amount,
                creditUser,
                "transfer",
                {name:this.fullName,account_no:this.account.account_no})
        if(!isCredited){

            return [false,messageOfCredit,transactionOfDebit]
        }
        if(!transactionOfCredit){
            return [false,"transaction failed, amount will be refunded if deducted",null]
        }
        return [true,messageOfDebit,transactionOfDebit]        
    }

    async getAllTransactionsObjects(limit,page){
        const currentTransactionsRecord = paginater(this.account.transactions,limit,page)
        let currentPage = []
        for (let index = 0; index < currentTransactionsRecord.length; index++) {
            let transactionObject = Transaction.reCreateTransaction(currentTransactionsRecord[index])
            currentPage.push(transactionObject)
        }
        return [this.account.transactions.length,currentPage] 
    }
    async getAllUsernames(){
        const [listOfUsernames,message] = await User.db.fetchUsernames(this.credential.username)
        return listOfUsernames
    }
    async getBalance(){
        if(!this.isActive){
            return [null,"this user is deleted"]
        }
        return [this.account.balance,"balance fetched"]
    }
}
console.log(User.createSuperUser("super", "user", "admin", "admin@123"))
module.exports = User

