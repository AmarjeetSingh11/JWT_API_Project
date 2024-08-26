const express = require('express');
const bodyParse = require('body-parser');
const authRoute = require('./routes/authroutes');
const studentRoute = require('./routes/studentroute');
const authMiddleware =  require('./middlewares/authMiddleware');
const {connectToMongoDB} = require('./connect');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

connectToMongoDB(process.env.DB_URl).then(
    () => console.log("MongoDB is connected")
);

//Middleware
app.use(bodyParse.json());


//Routes
app.use('/api/auth',authRoute);
app.get('/api/user', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});
app.use('/api/student',authMiddleware,studentRoute);












app.listen(PORT ,() => console.log(`Server Started At ${PORT} PORT`));