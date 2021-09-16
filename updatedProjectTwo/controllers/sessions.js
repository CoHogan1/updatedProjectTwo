const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')

// USER NEW ROUTE
router.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {currentUser: req.session.currentUser})
})

// USER LOGIN ROUTE (CREATE SESSION ROUTE)
router.post('/', (req, res) => {
    console.log(req.body.username, req.body.password + " name and password")
    User.findOne({ username: req.body.username}, (err, foundUser) => {
        //console.log(foundUser + " this is the found user...");
        if (err) {
                res.send(err)
        }
        else {
            if (foundUser){
                if (bcrypt.compareSync(req.body.password, foundUser.password)){ // this is the error
                    //login user and create session
                    req.session.currentUser = foundUser
                    res.redirect('/home/index') // this may need to be just index
                }
                else{
                    //console.log(req.body.password, foundUser.password + " name password");
                    res.send("<h1>invalid password")
                }
            }
            else{
                res.send("<h1>user not found</h1>")
            }
        }
    })
})

router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/home')
    })
})

module.exports = router
