
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
 
        let birthMonth = parseInt(Dob.slice(3,5))
        let birthYear = parseInt(Dob.slice(6,10))
        
        const currentDate = new Date()
        let currentMonth = currentDate.getMonth()
        let currentYear = currentDate.getFullYear()

        let yearsofAge;
        let monthsofAge ;
        let monthProportionofAge;

        if (currentMonth < birthMonth) {
            yearsofAge = currentYear - birthYear - 1
            monthsofAge = 12 + currentMonth -birthMonth
        }

        if (currentMonth >= birthMonth) {
            yearsofAge = currentYear - birthYear
            monthsofAge = currentMonth - birthMonth
        }

        monthProportionofAge = monthsofAge / 12
        monthsofAge = monthProportionofAge.toFixed(1)
        let age = parseInt(yearsofAge) + parseFloat(monthsofAge)
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

const venky = Employee.createAnEmployee("Koppisetti Venkatesh","14/05/1997",1234,100000)
console.log(venky)

