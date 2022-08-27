const DatabaseMongoose = require("../repository/database")

class Book{
    constructor(name,price){
        this.name = name
        this.price = price
    }

    static async createBook(name,price){
        const db = new DatabaseMongoose()
        const gottenbook = await db.getBook(name)
        
        if(gottenbook.length!=0){
            return "book already exist"
        }
        const newBook = new Book(name,price)
        const record = await db.insertBook(newBook)
        if(record.name!=newBook.name){
            return Error
        }
        console.log(record)
        return record
    }

    static async getBook(name){
        const db = new DatabaseMongoose()
        const record = await db.getBook(name)
        return record
    }

    static async updateBook(propertyToBeUpdated,value){
        const db = new DatabaseMongoose()
        if(record.length===0){
            return [true,null,"no book available with the name"]
        }

        switch(propertyToBeUpdated){
            case("price"):{
                const record = await db.updateBookPrice(name,value)
                return [true,record,"price updated successfully"]
            }
            default: {
                return [true,record,"property cannot be updated"]
            }
        }
    }

    static async deleteBook(name){
        const db = new DatabaseMongoose()
        const gotenBook = await db.getBook(name)
        if(gotenBook.length===0){
            return [true,null,"no book available with the name"]
        }
        const result = await db.deleteBook(name)
        return [true,result,"book deleted successfully"]
    }

}

module.exports = Book