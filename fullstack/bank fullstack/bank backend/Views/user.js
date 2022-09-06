const uuid = require("uuid")
const Bank = require("./bank")
const Credential = require("./credential")
const Account = require("./account")
const DatabaseMongoose = require('../respository/database')

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
            userObject.isActive = true
            const [result, messageOfResult] = await User.db.replaceUser(userObject)
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
        return [null, "username already exist,try new one"]
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

    async creatUser(firstName, lastName, username, password) {
        let fullName = `${firstName} ${lastName}`
        const newCredential = new Credential(username, password)
        newCredential.password = await newCredential.getHashedPassword()
        const newUser = new User(fullName, newCredential)
        User.allUser.push(newUser)
        return newUser
    }


    static async findUser(username) {
        const [fetchedCredentialRecord, messageOfFetchCredential] = await User.db.fetchCredential(username)
        if (!fetchedCredentialRecord) {
            return [null, "username already exist,try new one"]
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
            return [null, "username already exist,try new one"]
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


    withdraw(amount) {
        const account = Account.reCreateAccount(this.account)
        return account.deduct("withdraw", amount)

    }

    deposit(amount) {
        const account = Account.reCreateAccount(this.account)
        return account.add("deposit", amount)
    }

    transfer(amount, debitBankAbbrevation, creditUserName, creditBankAbbrevation) {
        let [indexOfCustomer, isCustomerExist, messageOfCustomer] = Customer.findCustomer(creditUserName)

        if (!isCustomerExist) {
            return [false, messageOfCustomer]
        }
        let [isWithdrawSuccess, messageOfWithdraw] = this.withdraw(amount, debitBankAbbrevation)
        if (!isWithdrawSuccess) {
            return [false, messageOfWithdraw]
        }
        let [isDepositSuccess, messageOfDepisit] = Customer.allCustomer[indexOfCustomer].deposit(amount, creditBankAbbrevation)
        if (isDepositSuccess) {
            return [true, "transfer successfull"]
        }
        let isRedeposite = this.deposit(amount, debitBankAbbrevation)
        if (!isRedeposite) {
            return [false, "transaction has failed,amount debited will be refunded"]
        }
        return [false, "trasaction failed,no amount deducted"]
    }
}
console.log(User.createSuperUser("super", "user", "admin", "admin@123"))
module.exports = User

