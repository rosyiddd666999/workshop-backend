// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

const cors = require('cors');
const express = require("express");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

//GET
app.get("/students", (req, res) => {
    const data = fs.readFileSync("students.json");
    const students = JSON.parse(data);
    res.json(students);
});

//GET by ID
app.get("/students/:id", (req, res) => {
    const data = fs.readFileSync("students.json");
    const students = JSON.parse(data);
    const student = students.find(
        (s) => s.id === parseInt(req.params.id)
    );
    res.json(student);
});

//ADD a new student
app.post("/students", (req, res) => {
    const data = fs.readFileSync("students.json");
    const students = JSON.parse(data);
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        age: req.body.age,
        grade: req.body.grade,    
    };
    students.push(newStudent);
    fs.writeFileSync("students.json", JSON.stringify(students));
    res.json({ message: "Student added successfully", student: newStudent });
});

// Akses data
app.listen(3000, () => {
    console.log("Server is running on port 3000");
    console.log("Access the students data at http://localhost:3000/students");
});