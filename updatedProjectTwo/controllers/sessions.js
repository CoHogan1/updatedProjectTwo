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
    User.findOne({ username: req.body.username}, (err, foundUser) => {
        if (err) {
            res.send(err)
        }
        else {
            if (foundUser){
                if (bcrypt.compareSync(req.body.password, foundUser.password)){
                    req.session.currentUser = foundUser
                    res.redirect('/home/index')
                }
                else{
                    res.send("invalid password")
                }
            }
            else{
                res.send("user not found")
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
