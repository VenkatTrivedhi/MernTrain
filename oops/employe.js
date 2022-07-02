
class Employee{
    constructor(firstname,lastname,date,age,employeeId,monthlySalary,annualSalary){

        this.firstName = firstname
        this.lastname = lastname
        this.employeeId = employeeId
        this.monthlySalary = monthlySalary
        this.annualSalary = annualSalary
        this.DoB = date
        this.age = age
    }

    static #autoUpdateAge(Dob){
        
        const currentDate = new Date()
        let currentMonth = currentDate.getMonth()
        let currentYear = currentDate.getFullYear()
        let birthMonth = Dob.getMonth()
        let birthYear = Dob.getFullYear()

        let years;
        let month;
        let monthProportion

        if (currentMonth < birthMonth) {
            years = currentYear - birthYear - 1
            month = 12 - birthMonth - currentMonth
        }

        if (currentMonth >= birthMonth) {
            years = currentYear - birthYear
            month = currentMonth - birthMonth
        }

        monthProportion = month / 12
        month = monthProportion.toFixed(1)
        let age = parseInt(years) + parseFloat(month)
        return age
    }

    static createAnEmployee(fullname,dob,employeeId,monthlySalary){
        //fullname
        let splitedName = fullname.split(" ")
        let firstName = splitedName[0]
        let lastName = splitedName[1]

        let age = this.#autoUpdateAge(dob)
    
        let annualSalary = monthlySalary*12
    
        return new Employee(firstName,lastName,dob,age,employeeId,monthlySalary,annualSalary)
    }
    
}
const date = new Date()
date.setMonth(05)
date.setDate(14)
date.setFullYear(1997)

const venky = Employee.createAnEmployee("Koppisetti Venkatesh",date,1234,100000)
console.log(venky)

