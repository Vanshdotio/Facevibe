const cookieParser = require('cookie-parser');
const express = require('express');
const authRoutes = require('./routes/auth.route')
const cors = require('cors')


const app = express();


//using middlewares
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(cookieParser());
app.use(express.json());

//using routes 
app.use('/api/auth', authRoutes)
app.use('/api', require('./routes/song.route'))
app.use('/api/mood', require('./routes/mood.route'))
app.use('/api/history', require('./routes/history.route'))

module.exports = app;