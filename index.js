const open = require("open");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const bcrypt = require("bcrypt");
const express = require("express");
const host = '192.168.1.8';
const app = express();
const port = 80;
require("./helpers/init_monodb.js")
require("./helpers/data.writer.js")
const writeNow = require("./helpers/writer.onCall");
const aprv = require("./models/approve.model");
const doc = require("./models/user.model");
const upload = require("./models/image.storage")


app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", express.static('website'));
app.use("/uploads", express.static('uploads'));
app.use("/reg", express.static('website/html/registration.html'));
app.use("/admin", express.static('admin'));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "secret"
}));

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
                writeNow();
            });
            req.session.user = user;
            res.redirect('/');
        }
    });
})

app.post("/auth", (req, res) => {
    const email = req.body.email;
    let password = req.body.password;
    doc.findOne({ Email: email }, function (err, user) {
        if (err) {
            res.status(500).send("Error fetching user from the database");
        }
        const bool = bcrypt.compare(password,user.password);
        if (bool) {
            req.session.user = user._id;
            res.redirect('/profile');
        } else {
            res.redirect("/html/login.html");
        }
    });
})

app.get("/profile",(req,res)=>{
    if(req.session.user){
        let user = req.session.user;
        doc.findOne({_id:`${user}`}, (err,user)=>{
            if (err) {
                res.status(500).send("Error fetching user from the database");
            }
            if (user) {
                let name = `${user.title} `+`${user.F_NAME} `+`${user.L_NAME}`;
                let img = `${user.Avtar}`;
                let dob = `${user.DOB}`;
                let course = `${user.Courses}`;
                let desigination = `${user.Designation}`;
                let company = `${user.Company}`;
                let attend = `${user.Attending}`;
                let about = `${user.about}`;
                let mobile = `${user.Mobile}`;
                let email = `${user.Email}`;
                let params = {'name': name, 'img': img,'dob':dob,'course':course, 'desigination':desigination,'company':company, 'attend':attend,'about':about,'mobile':mobile, 'email':email}
                res.render('user',params)
            }
        })
    }else{
        res.status(200).redirect('/html/login.html')
    }
})

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.status(200).redirect('/');
})

app.get('/approve', async function(req, res) {
    // console.log(req.query.variable);
    const aprvUser = await aprv.findOne({ "_id": `${req.query.variable}` });
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://jaimishra2004:7october2004@cluster0.cmv7njg.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const targetCollection = client.db("test").collection("datas");
        targetCollection.insertOne(aprvUser);
    });
    client.close();

    aprv.deleteOne({ _id: req.query.variable }, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        writeNow();
    });
    res.send({approved:true});
});

app.get('/reject', function(req, res) {
    aprv.findOneAndDelete({ _id: req.query.variable }, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        console.log("removed");
        writeNow();
    });
    res.send({approved:true});
});

app.get("*", (req,res)=>{
    res.send("<h1 style=' font-size: 50vh;'>404</h1><p>Page Not found</p>")
})


app.listen(port, host, () => {
    console.log(`Serving @ http://${host}:${port}/`);
    open(`http://${host}:${port}/`)
})