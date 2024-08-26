const express = require('express');
const {
    handlerRegisterStudent,
    handlerLoginStudent

} = require('../controller/studentcontroller');

const routes = express.Router();

    
routes.post('/register-student',handlerRegisterStudent);
routes.post('/login',handlerLoginStudent);


module.exports = routes;