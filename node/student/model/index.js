const express = require("express")
const cors  = require("cors")
const bodyParser = require("body-parser")
const uuid = require("uuid")
const Student = require("./student.js") 

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.post("/api/v1/createstudent",(req,resp)=>{
    const lastname = req.body.firstname
    const firstname = req.body.lastname
    const Dob = req.body.dateOfBirth
    const SGPA =req.body.SGPA
    const sem_grades = req.body.sem_grades
    const enrolled_year = req.body.enrolled_year
    const passed_year = req.body.passed_year

    const newStudent = Student.createStudent(firstname, lastname, Dob, SGPA, sem_grades, enrolled_year, passed_year)
    resp.status(200).send(newStudent)
})

app.get("/api/v1/getallstudent",(req,resp)=>{
    resp.status(200).send(Student.all_student)
})

app.listen(8000,()=>{
    console.log("server running at 8000")
})