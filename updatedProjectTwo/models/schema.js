const mongoose = require('mongoose')
const Schema = mongoose.Schema


const procedueSchema = new Schema ({
    name: String,
    didItWork: {type: Boolean, default: false},
    myRating: Number,
    results: String,
    notes: String,
},{timestamps : true})


const Attempt = mongoose.model('attempt', procedueSchema)

module.exports = Attempt
