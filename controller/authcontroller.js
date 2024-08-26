const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/usermodel');
const OTP = '1111';

async function handlerPhoneNuber(req, res) {
    // Extract phoneNumber from request body
    const { phoneNumber } = req.body;

    // Ensure phoneNumber is a string
    if (typeof phoneNumber !== 'string') {
        return res.status(400).json({ message: 'Invalid phone number format' });
    }

    // Check if user exists
    let user = await User.findOne({ phoneNumber });

    if (!user) {
        // Create new user if not found
        user = new User({ phoneNumber, otp: OTP });
        await user.save();
    }

    return res.json({ message: 'OTP sent successfully' });
}

async function handlerOtpVerify(req, res) {
    const { phoneNumber, otp } = req.body;

    // Ensure phoneNumber and otp are strings
    if (typeof phoneNumber !== 'string' || typeof otp !== 'string') {
        return res.status(400).json({ message: 'Invalid input format' });
    }

    // Find user by phoneNumber and otp
    const user = await User.findOne({ phoneNumber, otp });
    if (!user) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Generate JWT token
    const token = jwt.sign({ phoneNumber: user.phoneNumber }, config.jwtSecret, { expiresIn: '7d' });

    return res.json({ accessToken: token });
}

module.exports = {
    handlerPhoneNuber,
    handlerOtpVerify
};
