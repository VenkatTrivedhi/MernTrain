
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
        // restricting chnage in age,finalgrade,finalCgp
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
        if (propertyTobeUpdated=="fullname"){
            this.firstname = Student.#autoUpdateFirstname(value)
            this.lastname = Student.#autoUpdateLastname(value)
        }

        if (propertyTobeUpdated=="dateofBirth"){
            this.age =Student.#autoUpdateAge(value)
        }
        
        if (propertyTobeUpdated=="semisterGrades"){
            this.finaleGrade = Student.#autoUpdateGrade(value)
        }

        if(propertyTobeUpdated=="semisterCGPs"){
            this.finaleCGP = Student.#autoUpdateCGPA(value)
        }

        if (propertyTobeUpdated=="yearofEnrollement"){
            this.numberofYearsofGraduation = this.yearofPassed - this.yearofEnrollement
        }
        if (propertyTobeUpdated=="yearofPassed"){
            this.numberofYearsofGraduation = this.yearofPassed - this.yearofEnrollement
        }
    }

    updateFullname(fullname) {
        this.fullname = fullname
        this.firstname = Student.#autoUpdateFirstname(fullname)
        this.lastname = Student.#autoUpdateLastname(fullname)
    }
    updateFirstname(firstname) {
        this.firstname = firstname
        this.fullname = Student.#autoUpdateFullname(firstname,this.lastname)
    }
    updateLastname(lastname){
        this.lastname = lastname
        this.fullname = Student.#autoUpdateFullname(this.firstname,lastname)
    }
    updateDateofBirth(dateOfBirth){
        this.dateOfBirth = dateOfBirth
        this.age = Student.#autoUpdateAge(dateOfBirth)
    }
    
    
    updateSemisterGrades(semisterGrades){
        this.semisterGrades = semisterGrades
        this.finaleGrade = Student.#autoUpdateGrade(semisterGrades)
    }
  
    updateSemisterGPAs(semisterCGPs){
        this.semisterCGPs = semisterCGPs
        this.finaleCGP = Student.#autoUpdateCGPA(semisterCGPs)
    }
    
    updateYearofEnrollment(yearofEnrollement){
        this.yearofEnrollement = yearofEnrollement
        this.numberofYearsofGraduation = this.yearofPassed - yearofEnrollement
    }
    
    updateYearofPassed(yearofPassed){
        this.yearofPassed = yearofPassed
        this.numberofYearsofGraduation = yearofPassed - this.yearofEnrollement    
    }


}


const einsten = Student.createStudent("albert", "einsten",'14/07/1960', [5, 6, 7, 8, 9], ["A", "B", "A", "B"], 2014, 2018)
console.log("Created object :")
console.log(einsten)
einsten.update("semisterGrades",["A","A","A"])
console.log('Display all:')
einsten.display()

