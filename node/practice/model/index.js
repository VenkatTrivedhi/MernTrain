const uuid = require('uuid')
class Employee{
    constructor(name){
        this.EmployeeId =  uuid.v4()
        this.name = name
        this.subordinate = null
    }

    createSubordinate(name){
        this.subordinate = new Employee(name)
        return this.subordinate
    }

    getSubordinate(){
        return this.subordinate
    }
}

const Ankith = new Employee("ankith")
let venky = Ankith.createSubordinate("venky")
let avisha =venky.createSubordinate("avisha")

console.log(Ankith)
