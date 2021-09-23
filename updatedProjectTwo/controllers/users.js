const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')


// USER NEW ROUTE
router.get('/new', (req, res)=>{
    res.render('users/new.ejs', { currentUser: req.session.currentUser})
})


// USER CREATE ROUTE
router.post('/', (req, res)=>{
    console.log('making a new user....');
    // hashing and salting the password
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

    User.create(req.body, (err, createdUser)=>{
        if  (err){
            if (err.code === 11000){
                res.redirect('sessions/new')
            }
            else{
                res.redirect('sessions/new')
            }
        }
        else{
            res.redirect('/home')
        }
    })
})

module.exports = router
