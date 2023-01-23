const fs = require("fs");
const doc = require("../models/user.model");
const aprv = require("../models/approve.model");

const writer = () => {
    aprv.find({}, function (err, docs) {
        if (err) console.log(err);
        data = JSON.stringify(docs);
        fs.writeFile("admin/script/aprvData.json", data, (err, d) => {
            console.log("writing done")
        });
    })
    doc.find({}, {"_id": 0,"title": 1, "F_NAME": 1, "L_NAME": 1, "Designation": 1, "Attending":1, "Avtar":1, "paid":1, "about":1}, function (err, docs) {
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