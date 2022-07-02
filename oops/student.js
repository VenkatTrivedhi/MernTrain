
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
  
    // making auto updatefunction for derived field for code reusability
    static #autoUpdateFullname(firstname,lastname){
        let fullname = firstname+lastname
        return fullname
    }
    static #autoUpdateFirstname(fullname){
        let splitedname =  fullname.split()
        let firstname = splitedname[0]
        return firstname
    }

    static #autoUpdateLastname(fullname){
        let splitedname = fullname.split()
        let lastname = splitedname[1]
        return lastname
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

    

    static #autoUpdateCGPA(SGPA){
        let sumofGPA = 0;
        let countofGPAs = 0;

        for (let GPA of SGPA) {
            sumofGPA = sumofGPA + parseInt(GPA)

            countofGPAs++
        }

        let CGPA = parseFloat(sumofGPA / countofGPAs)
        return CGPA
    }

    static #autoUpdateGrade(sem_grades){

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


    static createStudent(firstname, lastname, Dob, SGPA, sem_grades, enrolled_year, passed_year){
        let fullname = this.#autoUpdateFullname(firstname,lastname)

        let age =this.#autoUpdateAge(Dob)
        
        let CGPA = this.#autoUpdateCGPA(SGPA)
        
        let finaleGrade =this.#autoUpdateGrade(sem_grades)
       
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

  
    update(propertyTobeUpdated,value){

        if (propertyTobeUpdated=="age"){
            console.log("age cannont be updated")
            return "age cannont be updated"       
        }
        if (propertyTobeUpdated=="finaleGrade"){
            console.log("finaleGrade cannont be updated")
            return "finaleGrade cannont be updated"       
        }
        if (propertyTobeUpdated=="finaleCGP"){
            console.log("finaleCGP cannont be updated")
            return "finaleCGP cannont be updated"       
        }

        //updating 
        this[propertyTobeUpdated]=value
        
        //re-updating derived fields
        if (propertyTobeUpdated=="firstname"){
            this.fullname =`${value} ${this.lastname}`
        }


        if (propertyTobeUpdated=="lastname"){
            this.fullname = `${this.firstname} ${value}`
        }
        if (propertyTobeUpdated="fullname"){
            this.firstname = Student.#autoUpdateFirstname(value)
            this.lastname = Student.#autoUpdateLastname(value)
        }

        if (propertyTobeUpdated=="dateofBirth"){
            this.age =this.#autoUpdateAge(value)
        }
        
        if (propertyTobeUpdated=="semisterGrades"){
            this.finaleGrade = this.#autoUpdateGrade(value)
        }

        if(propertyTobeUpdated=="semisterCGPs"){
            this.finaleCGP = this.#autoUpdateCGPA(value)
        }

        if (propertyTobeUpdated=="yearofEnrollement"){
            this.numberofYearsofGraduation = passed_year - enrolled_year
        }
        if (propertyTobeUpdated=="yearofPassed"){
            this.numberofYearsofGraduation = passed_year - enrolled_year
        }
    }

    updateFullname(fullname) {
        this.fullname = fullname
        this.firstname = this.#autoUpdateFirstname(fullname)
        this.lastname = this.#autoUpdateLastname(fullname)
    }
    updateFirstname(firstname) {
        this.firstname = firstname
        this.fullname = this.#autoUpdateFullname(firstname,this.lastname)
    }
    updateLastname(lastname){
        this.lastname = lastname
        this.fullname = this.#autoUpdateFullname(this.firstname,lastname)
    }
    updateDateofBirth(dateOfBirth){
        this.dateOfBirth = dateOfBirth
        this.age = this.#autoUpdateAge(dateOfBirth)
    }
    
    
    updateSemisterGrades(semisterGrades){
        this.semisterGrades = semisterGrades
        this.finaleGrade = this.#autoUpdateGrade(semisterGrades)
    }
  
    updateSemisterGPAs(semisterCGPs){
        this.semisterCGPs = semisterCGPs
        this.finaleCGP = this.#autoUpdateCGPA(semisterCGPs)
    }
    
    updateYearofEnrollment(yearofEnrollement){
        this.yearofEnrollement = yearofEnrollement
        this.numberofYearsofGraduation = this.yearofPassed -yearofEnrollement
    }
    
    updateYearofPassed(yearofPassed){
        this.yearofPassed = yearofPassed
        this.numberofYearsofGraduation = yearofPassed - this.yearofEnrollement    
    }


}


const date = new Date()

date.setDate(04)
date.setMonth(05)
date.setFullYear(2000)


const einsten = Student.createStudent("albert", "einsten", date, [5, 6, 7, 8, 9], ["A", "B", "A", "B"], 2014, 2018)
console.log("Created object :")
console.log(einsten)

console.log('Display all:')
console.log(einsten.display())

console.log("Upadate with robert:")
einsten.update('firstname','robert') 
console.log(einsten)

