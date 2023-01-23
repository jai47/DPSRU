const multer = require("multer");

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

module.exports = upload;