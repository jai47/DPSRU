const bycrypt = require("bcrypt");
const saltRounds = 10;

const mongoose = require("mongoose");
const collection2 = new mongoose.Schema({
    title: String,
    F_NAME: String,
    L_NAME: String,
    Avtar: String,
    DOB: String,
    Courses: Array,
    Designation: String,
    Company: String,
    Attending: String,
    about: String,
    Mobile: String,
    Email: String,
    password: String
});

collection2.pre('save', async function(next){
    this.password = await bycrypt.hash(this.password,saltRounds)
    next();
})

const aprv = mongoose.model('approval', collection2);

module.exports = aprv