const express = require('express')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT

const session = require('express-session')

const systemControllers = require('./controllers/server.js')
const Attempt = require('./models/schema.js')
const Client  = require('./models/users.js')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))


const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const mongoose = require('mongoose')
const mongoURI = process.env.MONGODBURI
const db = mongoose.connection

// connection error handeling.
db.on('error', (err)=> console.log(err.message + ' Mongo is not running!!!'))
db.on('connected', ()=> console.log('Mongo connected: '))
db.on('disconnected', ()=> console.log('Mongo is now Disconnected, Have a good day!'))

mongoose.connect(mongoURI , {
    //useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
},()=>{console.log("Mongo connection is  established.")
})

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}


const homeControllers = require('./controllers/server')
app.use('/home', isAuthenticated,  homeControllers)
//app.use('/home', homeControllers)

const usersControllers = require('./controllers/users')
app.use('/users', usersControllers)

const sessionsControllers = require('./controllers/sessions')
app.use('/sessions', sessionsControllers)


// HOMEPAGE Route
app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/home', (req, res) => {
    res.render('home.ejs', {currentUser: req.session.currentUser})
})

app.listen(PORT, (req, res)=>{
    console.log('Project 2 App is listening.', PORT)
})
