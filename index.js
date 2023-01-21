const fs = require("fs");
const open = require("open");
const multer = require("multer");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');
const express = require("express");
const { get } = require("http");
const host = '192.168.1.6';
const app = express();
const port = 80;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        var newName = Date.now() + '-' + file.originalname;
        cb(null, newName);
    }
});
var upload = multer({ storage: storage });


// connection to database;
mongoose.set('strictQuery', true);
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb+srv://jaimishra2004:7october2004@cluster0.cmv7njg.mongodb.net/test');
}



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

const aprv = mongoose.model('approval', collection2);

const writer = () => {
    aprv.find({}, function (err, docs) {
        if (err) console.log(err);
        data = JSON.stringify(docs);
        fs.writeFile("admin/script/aprvData.json", data, (err, d) => {
            console.log("writing done")
        });
    })
    doc.find({}, function (err, docs) {
        if (err) console.log(err);
        data = JSON.stringify(docs);
        fs.writeFile("website/script/data.json", data, (err, d) => {
            console.log("writing done")
        });
    })
}

writer();

setInterval(
    writer, 600000
)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", express.static('website'));
app.use("/uploads", express.static('uploads'));
app.use("/reg", express.static('website/html/registration.html'));
app.use("/admin", express.static('admin'));

app.post("/register", upload.single('uploaded_file'), (req, res) => {
    doc.findOne({ $or: [{ Email: req.body.Email }, { Mobile: req.body.Mobile }] }, function (err, user) {
        if (err) {
            res.status(500).send("Error fetching user from the database");
        }
        if (user) {
            res.send("User already exist");
        } else {
            req.body.Avtar = `${req.file.filename}`;
            var user = new aprv(req.body);
            user.save(function (err, user) {
                if (err) return console.log(err);
                console.log("created");
            });
            res.redirect('/');
        }
    });
})

app.post("/auth", (req, res) => {
    const email = req.body.email;
    let password = req.body.password;
    doc.findOne({ $and: [{ Email: email }, { password: password }] }, function (err, user) {
        if (err) {
            res.status(500).send("Error fetching user from the database");
        }
        if (user) {
            res.cookie('user', `${user.id}`);
            res.send("Logged in");
        } else {
            res.redirect("/html/login.html");
        }
    });
})

app.get("/user", (req,res)=>{
    if(req.cookies.user){
        let cookieValue = req.cookies.user;
        doc.findOne({id:`${cookieValue}`}, function (err, docs) {
            if (err) console.log(err);
            data = JSON.stringify(docs);
            fs.writeFile("website/script/user.json", data, (err, d) => {
                console.log("writing done")
            })});
        res.send('Cookie value is: ' + cookieValue);
    }else{
        res.send('Cookie does not exist');
    }
})


app.listen(port, host, () => {
    console.log(`Serving @ http://${host}:${port}/`);
    open(`http://${host}:${port}/`)
})