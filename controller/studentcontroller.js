const bcrypt = require('bcrypt');
const student = require('../models/studentmodel');


async function handlerRegisterStudent(req, res) {
    const body = req.body;

    if (!body || !body.firstname || !body.lastname || !body.email || 
        !body.dob || !body.class || !body.pass) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if the student already exists
        const existingStudent = await student.findOne({ where: { email: body.email } });

        if (existingStudent) {
            return res.status(409).json({ message: "Student is already registered" 

            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(body.pass, 10);

        // If not, create a new student
        const result = await student.create({
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            dob: body.dob,
            class: body.class,
            pass: hashedPassword
        });

        console.log("Result:- ", result);
        return res.status(201).json({ message: "Student registered successfully" });

    } catch (error) {
        console.error("Error registering student:", error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}

async function handlerLoginStudent(req, res){
    const body = req.body;
    const {email, pass} = req.body; 

    //this will check if the fields are entered or not
    if (!body || !body.pass || !body.email) {
        return res.status(400).json({ message: "Please Enter the Password and Email" });
    }
    

    try {
    
        const isStudent = await student.findOne({email:email});
        console.log('Database record:', isStudent);

        if(!isStudent){
            return res.status(401).json({message:"Invalid Email or Password (Inside the istudent IF block)"})
        }

        const passwordMatch = await bcrypt.compare(pass, isStudent.pass);

        if (passwordMatch) {
            return res.json({isStudent});
        } else {
            return res.status(401).json({ message: "Password Not Matched" });
        }

    } catch (error) {
       console.error("Error in Login the Student:- ",error);
       return res.status(500).json({message:"Internal Server Error"}); 
    }
}


module.exports = {
    handlerRegisterStudent,
    handlerLoginStudent

}
