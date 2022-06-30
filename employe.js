
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

    static createAnEmployee(fullname,dob,employeeId,monthlySalary){
        //fullname
        let splitedName = fullname.split(" ")
        let firstName = splitedName[0]
        let lastName = splitedName[1]

        //dob
        let currentDate = new Date()
        let currentDay = currentDate.getDate()
        let currentMonth  =  currentDate.getMonth()
        let currentYear = currentDate.getFullYear()

        let dayofBirth = dob.getDate()
        let monthofBirth = dob.getMonth()
        let yearofBirth = dob.getFullYear()
        
        let age;
        if(monthofBirth>currentMonth){
            age = currentYear - yearofBirth-1
        }

        if(monthofBirth<=currentMonth){
            age = currentYear - yearofBirth        
        }
        
        //monthlysalary
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
