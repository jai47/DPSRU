const fs = require("fs");
const doc = require("../models/user.model");
const aprv = require("../models/approve.model");

function writeNow(){
    aprv.find({}, function (err, docs) {
        if (err) console.log(err);
        data = JSON.stringify(docs);
        fs.writeFile("admin/script/aprvData.json", data, (err, d) => {
            console.log("writing done")
        });
    })
}

module.exports = writeNow