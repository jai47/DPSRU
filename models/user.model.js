const mongoose = require("mongoose");
// creating new schema
const collection1 = new mongoose.Schema({
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

const doc = mongoose.model('data', collection1);

module.exports = doc