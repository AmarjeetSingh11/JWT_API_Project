const express = require('express');
const {
    handlerPhoneNuber,
    handlerOtpVerify
} = require('../controller/authcontroller');

const route = express.Router();

route.post('/phonenumber',handlerPhoneNuber);
route.post('/verify_otp',handlerOtpVerify);


module.exports = route;