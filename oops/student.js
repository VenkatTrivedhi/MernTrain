
class Student {
    constructor(firstname, lastname, fullname, Dob, age, SGPA, CGPA, sem_grades, grades, enrolled_year, passed_year, years_of_gradution) {

        this.firstname = firstname
        this.lastname = lastname
        this.fullname = fullname
        this.dateOfBirth = Dob
        this.age = age
        this.semisterCGPs = SGPA
        this.finaleCGP = CGPA
        this.semisterGrades = sem_grades
        this.finaleGrade = grades
        this.yearofEnrollement = enrolled_year
        this.yearofPassed = passed_year
        this.numberofYearsofGraduation = years_of_gradution

    }

    static autoAge(Dob){
        
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

    static autoCGPA(SGPA){
        let sumofGPA = 0;
        let countofGPAs = 0;

        for (let GPA of SGPA) {
            sumofGPA = sumofGPA + parseInt(GPA)

            countofGPAs++
        }

        let CGPA = parseFloat(sumofGPA / countofGPAs)
        return CGPA
    }

    static autoGrade(sem_grades){

        let finaleGrade;
        const scoreofTheGrade = {
            A: 95, B: 85, C: 75, D: 65, P: 50
        }

        let sumofGrades = 0;
        let countofGrades = 0;

        for (let grade of sem_grades) {
            let score = scoreofTheGrade[grade]
            sumofGrades = sumofGrades + score
            countofGrades++
        }
        let avarageofGrades = parseInt(sumofGrades / countofGrades)
        console.log(avarageofGrades)
        // declaring finaleGrade
        switch (true) {
            case avarageofGrades > 90: finaleGrade = "A"; break;
            case avarageofGrades > 80: finaleGrade = "B"; break;
            case avarageofGrades > 70: finaleGrade = "C"; break;
            case avarageofGrades > 60: finaleGrade = "D"; break;
            default: finaleGrade = "P"
        }
        return finaleGrade
    }


    static createStudent(firstname, lastname, Dob, SGPA, sem_grades, enrolled_year, passed_year) {
        let fullname = `${firstname} ${lastname}`

        let age =this.autoAge(Dob)
        
        let CGPA = this.autoCGPA(SGPA)
        
        let finaleGrade =this.autoGrade(sem_grades)
       
        let numberofYearsofGraduation = passed_year - enrolled_year

        return new Student(firstname, lastname, fullname, Dob, age, SGPA, CGPA, sem_grades, finaleGrade, enrolled_year, passed_year, numberofYearsofGraduation)
    }

    get getFullName() { return this.fullname }
    get getFirstName() { return this.firstname }
    get getLastName() { return this.lastname }
    get getDateOfBirth() { return this.dateOfBirth }
    get getAge() { return this.age }
    get getSemisterGrades() { return this.semisterGrades }
    get getFinaleGrade() { return this.finaleGrade }
    get getSemisterCGP() { return this.semisterCGP }
    get getFinaleCGP() { return this.finaleCGP }
    get getYearofEnrollement() { return this.yearofEnrollement }
    get getYearofPassed() { return this.yearofPassed }
    get getNumberofYearsofGraduation() { return this.numberofYearsofGraduation }




    displayFullname() { console.log(`name is : ${this.fullname}`) }
    displayFirstname() { console.log(`firstname is : ${this.firstname}`) }
    displayLastname() { console.log(`lastname is :${this.lastname}`) }
    displayDateofBirth() { console.log(`date of birth is : ${this.dateOfBirth}`) }
    displayAge() { console.log(`age is : ${this.age}`) }
    displaySemisterGrades() { console.log(`grades of all semisters is : ${this.semisterGrades}`) }
    displayFinaleGrade() { console.log(`final is : ${this.finaleGrade}`) }
    displaySemisterGPAs() { console.log(`GPAs of all semisters is : ${this.semisterCGPs}`) }
    displayFinaleCGP() { console.log(`CPG is : ${this.finaleCGP}`) }
    displayYearofEnrollment() { console.log(`year of enrollment is : ${this.yearofEnrollement}`) }
    displayYearofPassed() { console.log(`year of pass is : ${this.yearofPassed}`) }
    displayYearsofGraduation() { console.log(`no of years of graduation is ${this.numberofYearsofGraduation}`) }


    display() {
        this.displayFullname()
        this.displayFirstname()
        this.displayLastname()
        this.displayDateofBirth()
        this.displayAge()
        this.displaySemisterGrades()
        this.displayFinaleGrade()
        this.displaySemisterGPAs()
        this.displayFinaleCGP()
        this.displayYearofEnrollment()
        this.displayYearofPassed()
        this.displayYearsofGraduation()
    }

    displayFullname() { console.log(`name is : ${this.fullname}`) }
    displayFirstname() { console.log(`firstname is : ${this.firstname}`) }
    displayLastname() { console.log(`lastname is :${this.lastname}`) }
    displayDateofBirth() { console.log(`date of birth is : ${this.dateOfBirth}`) }
    displayAge() { console.log(`age is : ${this.age}`) }
    displaySemisterGrades() { console.log(`grades of all semisters is : ${this.semisterGrades}`) }
    displayFinaleGrade() { console.log(`final is : ${this.finaleGrade}`) }
    displaySemisterGPAs() { console.log(`GPAs of all semisters is : ${this.semisterCGPs}`) }
    displayFinaleCGP() { console.log(`CPG is : ${this.finaleCGP}`) }
    displayYearofEnrollment() { console.log(`year of enrollment is : ${this.yearofEnrollement}`) }
    displayYearofPassed() { console.log(`year of pass is : ${this.yearofPassed}`) }
    displayYearsofGraduation() { console.log(`no of years of graduation is ${this.numberofYearsofGraduation}`) }


    updateFullname(fullname) { this.fullname = fullname }
    updateFirstname(firstname) { this.firstname = firstname }
    updateLastname(lastname) { this.lastname = lastname }
    updateDateofBirth(dateOfBirth) { this.dateOfBirth = dateOfBirth }
    updateAge(age) { this.age = age }
    updateSemisterGrades(semisterGrades) { this.semisterGrades = semisterGrades }
    updateFinaleGrade(finaleGrade) { this.finaleGrade = finaleGrade }
    updateSemisterGPAs(semisterCGPs) { this.semisterCGPs = semisterCGPs }
    updateFinaleCGP(finaleCGP) { this.finaleCGP = finaleCGP }
    updateYearofEnrollment(yearofEnrollement) { this.yearofEnrollement = yearofEnrollement }
    updateYearofPassed(yearofPassed) { this.yearofPassed = yearofPassed }
    updateYearsofGraduation(numberofYearsofGraduation) { this.numberofYearsofGraduation = numberofYearsofGraduation }
   

    update(propertyTobeUpdated,value){
        this[propertyTobeUpdated]=value
        
        //special case for fullname as it is linked with first & lastname
        if (propertyTobeUpdated=="firstname"){
            this.fullname =`${value} ${this.lastname}`
        } 

        if (propertyTobeUpdated=="lastname"){
            this.fullname = `${this.firstname} ${value}`
        }
        if (propertyTobeUpdated="fullname"){
            let splitedname = value.split()
            this.firstname = splitedname[0]
            this.lastname = splitedname[1]
        }

        if (propertyTobeUpdated=="age"){
            console.log("age cannonot be updated")

        }

        if (propertyTobeUpdated=="dateofBirth"){
            this.age =this.autoAge(value)
        }
        
        if (propertyTobeUpdated=="semisterGrades"){
            this.finaleGrade = this.autoGrade(value)
        }

        if(propertyTobeUpdated=="semisterCGPs"){
            this.finaleCGP = this.autoCGPA(value)
        }

        if (propertyTobeUpdated=="yearofEnrollement"){
            this.numberofYearsofGraduation = passed_year - enrolled_year
        }
        if (propertyTobeUpdated=="yearofPassed"){
            this.numberofYearsofGraduation = passed_year - enrolled_year
        }


    }

}


const date = new Date()

date.setDate(04)
date.setMonth(05)
date.setFullYear(2000)

// display all
const einsten = Student.createStudent("albert", "einsten", date, [5, 6, 7, 8, 9], ["A", "B", "A", "B"], 2014, 2018)
console.log("Creation:")
console.log(einsten)

console.log('Read:')
console(einsten.display())

console("after Upadate :")
einsten.update('firstname','robert') 
console.log(einsten)